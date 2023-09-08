import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { UserService } from '../../../demo/service/UserService';
import ReactPaginate from 'react-paginate';
import { Dropdown } from "primereact/dropdown";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import userApi from '../../api/userApi';
import { MultiSelect } from "primereact/multiselect";



const Crud = () => {
    let emptyUser = {    
        id: null,
        name: '',
        // image: null,
        // description: '',
        // category: null,
        role:false
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
    };

    const roleList = [
        {
          id: 0,
          name: "Employee",
        },
        {
          id: 1,
          name: "Admin",
        },
      ];

      const initFilterParams = {
        sortBy: null,
        sortDir: null,
    
        id: null,
        name:null,
        page: null,
        size: null,
      };
   

    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [updateUserDialog, setUpdateUserDialog] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const [listUser, setListUser] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [role, setRole] = useState(null);
    const[id, setId] = useState(null);
    const[account, setAccount] = useState(null);
    const[listAccount, setListAccount]= useState(null)

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    // const [filters, setFilters] = useState(null);
    const [filters, setFilters] = useState({
      id: { value: null, matchMode: FilterMatchMode.EQUALS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // lname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // positionId: { value: null, matchMode: FilterMatchMode.IN },
      // departmentId: { value: null, matchMode: FilterMatchMode.IN },
    });
    const [size, setSize] = useState(0);
    const [filterParams, setFilterParams] = useState(initFilterParams);
  
    const [totalRecords, setTotalRecords] = useState(0);
    const [first, setFirst] = useState(0);

    // useEffect(() => {
    //     UserService.getUser().then((data) => {
    //         setListUser(data.data);
    //     });
    // },
    // []);

    useEffect(() => {
        if (user.id) {
          UserService.updateUser(user.id, user)
            .then((data) => {
              // Optionally update the user or handle the response data
              console.log('User updated:', data);
            })
            .catch((error) => {
              // Handle error here
              console.error('Error updating user:', error);
            });
        }
      }, [user]);

    //   useEffect(() => {
    //     UserService.getUser().then((data) => {
    //         setListUser(data.data);
    //     });
    // },
    // []);

   //    LazyParams
  const [lazyParams, setLazyParams] = useState(initFilterParams);
  

  const fetchData = async () => {
    try {
      const resUser = await userApi.getAll(lazyParams);
      setListUser(resUser.content);
      setTotalRecords(resUser.totalElements);
      setSize(resUser.size);
      console.log("check response em", resUser.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [lazyParams]);
    

    const openNew = () => {
        setUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    };

    const clearFilter = () => {
        initFilters();
      };

      const onGlobalFilterClick = (event) => {
        console.log(event);
      };

      const initFilters = () => {
        setFirst(0);
        setLazyParams(initFilterParams);
        setFilters({
          id: { value: null },
          name: { value: null },
        });
      };

      const nameItem = (option) => {
        return (
          <div className='flex align-items-center gap-2'>
            <span>
              {option.name}
            </span>
          </div>
        );
      };

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    };

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    };

    const hideDeleteUsersDialog = () => {
        setDeleteUsersDialog(false);
    };

    const [updateTrigger, setUpdateTrigger] = useState(false);

    const saveUser = async () => {
      setSubmitted(true);
    
      if (user.name.trim()) {
        try {
          let _listUser = [...listUser];
          let _user = { ...user };
    
          if (user.id) {
            const index = findIndexById(user.id);
    
            _listUser[index] = _user;
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Updated",
              life: 3000,
            });
            // const updatedUser = await UserService.updateUser(_user);
            // setUser(updatedUser.data);
            await userApi.update(_user).then((res) => {
              setListUser(res.content);
            });
          } else {
            _user.id = createId();
            _user.role = _user.role === "Admin" ? 1 : 0; // Set role value based on selection
    
            _listUser.push(_user);
    
            toast.current.show({
              severity: "success",
              summary: "Successful",
              detail: "User Created",
              life: 3000,
            });
    
            const createdUser = await UserService.createUser(_user);
            setUser(createdUser.data);
            
          }
    
          setListUser(_listUser);
          setUser(emptyUser);
          setUserDialog(false);
        } catch (error) {
          console.error("An error occurred:", error);
          
        }
      }
    };

    // const saveUser = () => {
    //   setSubmitted(true);
    // };
    
    // useEffect(() => {id
  
    //   if (submitted && user.name.trim()) {
    //     let _listUser = [...listUser];
    //     let _user = { ...user };
    //     if (user.id) {
    //       const index = findIndexById(user.id);
    //       _listUser[index] = _user;
    //       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //       UserService.updateUser(user.id, _user)
    //         .then(() => {               
    //         })
    //         .catch((error) => {                
    //           console.error('Error updating User:', error);
    //         });
    //     } else {
    //       _user.id = createId();
    //       _user.role = _user.role === "Admin" ? 1 : 0; 
    //       _listUser.push(_user);
    //       toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //       UserService.createUser(_user)
    //         .then(() => {              
    //         })
    //         .catch((error) => {
    //           console.error('Error creating User:', error);
    //         });
    //     }
    //     setListUser(_listUser);
    //     setUserDialog(false);
    //     setUser(emptyUser);
    //     UserService.getUser();

    //   }
    // }, [submitted, user]);
    
    
    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    //delete
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

  
    
    //delete
    const deleteUser = () => {
        UserService.deleteUser(user.id)
        .then(() => {
            let _listUser = listUser.filter((u) => u.id !== user.id);
            setListUser(_listUser);
            setDeleteUserDialog(false);
            setUser(emptyUser);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
        })
        .catch((error) => {
            // Handle error (if required)
            console.error('Error deleting user:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
        });
        // let _listUser = listUser.filter((val) => val.id !== listUser.id);
        // setListUser(_listUser);
        // setDeleteUserDialog(false);
        // setUser(emptyUser);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
        // setDeleteRequested(true);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < listUser.length; i++) {
            if (listUser[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        const index = listUser[listUser.length - 1].id + 1;
        return index;
      };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    };

    const deleteSelectedUsers = () => {
        // let _listUser = listUser.filter((val) => !selectedUsers.includes(val));
        // setListUser(_listUser);
        // setDeleteUsersDialog(false);
        // setSelectedUsers(null);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
        try {
            const deletedUserIds = selectedUsers.map((user) => user.id);
            Promise.all(deletedUserIds.map((userId) => UserService.deleteUser(userId)));
            const updatedListUser = listUser.filter((user) => !deletedUserIds.includes(user.id));
            setListUser(updatedListUser);
            setSelectedUsers(null);
            setDeleteUsersDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
          } catch (error) {
            // Handle error here
            console.error("Error deleting users:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete users', life: 3000 });
          }
    };

    const onCategoryChange = (e) => {
        let _user = { ...user };
        _user['category'] = e.value;
        setUser(_user);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = { ...user };
        _user[`${name}`] = val;

        setUser(_user);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">              
                    <Button label="Add" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />                                  
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length}  />
                    {/* <Button label="Edit" icon="pi pi-user-edit" severity="sucess" className="mr-2" onClick={openNew} /> */}

                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={exportCSV} /> */}
            </React.Fragment>
        );
    };

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const getUserName = (name) => {
      const curUser = user?.find((u) => u.name === name);
      if (curUser) {
        return curUser.name;
      }
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                <span>{getUserName(rowData.name)}</span>
            </>
        );
    };

    const nameFilterTemplate = (options) => {
      return (
        <MultiSelect
          value={options.value}
          options={listUser}
          optionLabel="name"
          itemTemplate={nameItem}
          onChange={(e) => {
            options.filterApplyCallback(e.value);
          }}
          maxSelectedLabels={1}
          placeholder="Select"
          className="p-column-filter"
          style={{ minWidth: "12rem" }}
        />
      );
    };

    // const imageBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Image</span>
    //             <img src={`/demo/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2" width="100" />
    //         </>
    //     );
    // };

    // const roleBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Role</span>
    //             {rowData.role}
    //         </>
    //     );
    // };

    const roleBodyTemplate = (rowData) => {
        const roleText = rowData.role === 0 ? "Employee" : "Admin";
        return <>{roleText}</>;
      };

      

    // const categoryBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Category</span>
    //             {rowData.category}
    //         </>
    //     );
    // };

    // const ratingBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Reviews</span>
    //             <Rating value={rowData.rating} readOnly cancel={false} />
    //         </>
    //     );
    // };

    // const statusBodyTemplate = (rowData) => {
    //     return (
    //         <>
    //             <span className="p-column-title">Status</span>
    //             <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
    //         </>
    //     );
    // };

    const listenOnFliedSort = (e) => {
        const { sortField, sortOrder } = e;
        const { sortDir, sortBy } = lazyParams;
        if (sortField === null) {
          return "ASC";
        }
        if (sortField === sortBy) {
          return sortDir === "ASC" ? "DESC" : "ASC";
        }
        return "DESC";
      };
    
      const handleOnPage = (e) => {
        setFirst(e.first);
        setLazyParams({ ...lazyParams, page: e.page, size: e.rows });
      };

      // Handle Filter
      const handleOnFilter = (e) => {
        console.log("check e", e.filters);
        const nameSelected = e.filters.name.value?.map(
          (item) => item.name
        );
      
        setLazyParams({
          ...lazyParams,
          id: e.filters?.id.value,
          name: e.filters?.name.value,
        });
      };

  // Handle Sort:
  const handleOnSort = (e) => {
    if (e.sortField === "id" && lazyParams.sortBy === null) {
      setLazyParams({
        ...lazyParams,
        sortBy: e.sortField,
        sortDir: "DESC",
      });
    } else if (
      (e.sortField !== "id" && lazyParams.sortBy === null) ||
      e.sortField !== lazyParams.sortBy
    ) {
      setLazyParams({
        ...lazyParams,
        sortBy: e.sortField,
        sortDir: "ASC",
      });
    } else if (e.sortField === lazyParams.sortBy) {
      setLazyParams({
        ...lazyParams,
        sortBy: e.sortField,
        sortDir: lazyParams.sortDir === "ASC" ? "DESC" : "ASC",
      });
    }
  };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteUser(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage User</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <Button
                type = 'button'
                icon = "pi pi-filter-slash"
                label='Clear'
                outlined
                onClick={clearFilter}
                className='mr-2 w-7rem'                  
                />
            </span>
        </div>
    );

    const userDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveUser} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteUser} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteUsersDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedUsers} />
        </>
    );

    const onChangeInput = (e, name) => {
        const val = (e.target && e.target.value) || "";
        let _user = { ...user };
        _user[`${name}`] = val;
        if (name === "role") {
          // Convert role value to number (0 or 1)
          _user[name] = val === "Admin" ? 1 : 0;
        } else {
          _user[name] = val;
        }
        setUser(_user);
      };

      const getUpdate = (e) => {
        console.log(e);
        setLazyParams({
          sortBy: e.sortField,
          sortDir: listenOnFliedSort(e),
          id: e.filters?.id.value,
          name: e.filters?.name.value,
          page: e.page,
          size: e.rows,
        });
        const idFilterOnChange = (event) => {
          console.log("check id filter on change", event);
        };
      };

      const getRoleLabel = (role) => {
        return role === 0 ? "Employee" : "Admin";
      };

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                    
                        ref={dt}
                        value={listUser}                     
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="id"
                        lazy
                        paginator
                        totalRecords={totalRecords}
                        filters={filters}
                        filterDisplay="row"
                        first={first}
                        rows={size}
                        rowsPerPageOptions={[5, 10,25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter}
                        // emptyMessage="No users found."
                        // header={header}
                        // responsiveLayout="scroll"
                        // onFilter={(e) => {
                        //     getUpdate(e);
                        //   }}
                        //   onSort={(e) => {
                        //     getUpdate(e);
                        //   }}
                        onFilter={(e) => {
                            handleOnFilter(e);
                          }}
                          onSort={(e) => {
                            handleOnSort(e);
                          }}
                          sortMode="single"
                          onPage={(e) => {
                            handleOnPage(e);
                          }}
                          showGridlines
                          stripedRows
                          emptyMessage="No users found."
                          header={header}
                          responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        {/* <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '3rem' }}></Column> */}
                        <Column
                        field="id"
                        header="Id"
                        // filterHeaderStyle="equals"
                        filter
                        showFilterMenu={false}
                        sortable
                        body={idBodyTemplate}
                        headerStyle={{ minWidth: "5rem", width: "10rem" }}
                        ></Column>
                        {/* <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} /> */}
                        
                        <Column
                        // field="name"
                        header="Name"
                        filter
                        filterField='name'
                        showFilterMenu={false}
                        filterMenuStyle={{width:"10rem"}}
                        sortable
                        body={nameBodyTemplate}
                        headerStyle={{ minWidth: "10rem" }}
                        filterElement={nameFilterTemplate}
                        // filterElement={nameFilterTemplate}
                        ></Column>
                        
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        <Column 
                        field="role" 
                        header="Role" 
                        
                        body={roleBodyTemplate}  
                        sortable></Column>
                        {/* <Column field="dateOfManufacture" header="Date of manufacture" style={{ minWidth: '10rem' }} /> */}

                         {/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>  */}
                         {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column>  */}
                         {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>  */}
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog 
                    visible={userDialog} 
                    style={{ width: '450px' }} 
                    header="Add user" 
                    modal 
                    className="p-fluid" 
                    footer={userDialogFooter} 
                    onHide={hideDialog}>
                        {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        {/* <div className="field">
                            <label htmlFor="id">Id</label>                           
                            <InputNumber id="id" value={user.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus 
                            className={classNames({ 'p-invalid': submitted && !user.id })} />
                            {submitted && !user.id && <small className="p-invalid">Id is required.</small>}
                        </div> */}                       
                        <div className="field2">
                            <label htmlFor="name">Name</label>                           
                            <InputText name="name" 
                            value={user.name} 
                            onChange={(e) => onInputChange(e, 'name')}  
                             required
                             autoFocus
                            className={classNames({ 'p-invalid': submitted && !user.name })} />
                            {submitted && !user.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="role">Role</label>
                                <Dropdown
                                inputId="role"
                                value={user.role === 1 ? "Admin" : "Employee"}
                                onChange={(e) => onChangeInput(e, "role")}
                                options={roleList}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="Select one"
                                />
                          

                            </div>
                            {/* <div className="field col">
                                <label htmlFor="quantity">Quantity</label>
                                <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} integeronly="true" />
                            </div> */}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && (
                                <span>
                                    Are you sure you want to delete <b>{user.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteUsersDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete the selected users?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
