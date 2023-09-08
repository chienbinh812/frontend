import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
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
import { ProgressBar } from "primereact/progressbar";
import { Image } from "primereact/image";



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
    const [eventUpdate, setEventUpdate] = useState(false);

    const [globalFilterValue, setGlobalFilterValue] = useState("");
    // const [filters, setFilters] = useState(null);
    const [filters, setFilters] = useState({
      id: { value: null, matchMode: FilterMatchMode.EQUALS },
      name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // lname: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
      // positionId: { value: null, matchMode: FilterMatchMode.IN },
      // departmentId: { value: null, matchMode: FilterMatchMode.IN },
    });

    const fileUploadRef = useRef(null);
    const [totalSize, setTotalSize] = useState(0);
    const [showDialogImport, setShowDialogImport] = useState(false);
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
  }, [lazyParams, eventUpdate]);
    

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
            const updatedUser = await UserService.updateUser(_user);
            setUser(updatedUser.data);
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
          // setEventUpdate(!eventUpdate);
        } catch (error) {
          console.error("An error occurred:", error);
          
        }
      }
    };
    
    
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
            toast.current.show({ 
              severity: 'success', 
              summary: 'Successful', 
              detail: 'User Deleted', 
              life: 3000 });
        })
        .catch((error) => {
            // Handle error (if required)
            console.error('Error deleting user:', error);
            toast.current.show({ 
              severity: 'error', 
              summary: 'Error', 
              detail: 'Failed to delete user', 
              life: 3000 });
        });
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

    const openImport = () => {
      setShowDialogImport(true);
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                 <Button
          label="Import"
          type="button"
          icon="pi pi-upload"
          severity="warning"
          className="mr-2"
          outlined
          onClick={openImport}
        />
                <Button label="Export" 
                icon="pi pi-upload" 
                severity="help" 
                outlined
                onClick={exportExcel} /> 
            </React.Fragment>
        );
    };

    const onTemplateSelect = (e) => {
      let _totalSize = totalSize;
      let files = e.files;
      _totalSize = files[0].size || 0;
  
      setTotalSize(_totalSize);
    };

    const onTemplateUpload = async (event) => {
      if (event.files[0].name.split(".")[1] !== "xlsx") {
        // console.log("mamam")
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "File Uploaded",
        });
        return null;
      }
      var formData = new FormData();
      formData.append("file", event.files[0]);
      await userApi
        .importExcel(formData)
        .then((res) => res)
        .then((success) => {
          toast.current.show({
            severity: "info",
            summary: "Success",
            detail: "File Uploaded",
          });
          console.log(success);
          setShowDialogImport(false);
          event.options.clear();
        })
        .catch((error) => {
          console.log(error);
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "File Uploaded",
          });
        });
      setEventUpdate(!eventUpdate);
    };

    const onTemplateClear = () => {
      setTotalSize(0);
    };

    const headerTemplate = (options) => {
      const { className, chooseButton, uploadButton, cancelButton } = options;
      const value = totalSize / 100000;
  
      console.log("check totalSize", totalSize);
      const formatedValue =
        fileUploadRef && fileUploadRef.current
          ? fileUploadRef.current.formatSize(totalSize)
          : "0 B";
  
      return (
        <div
          className={className}
          style={{
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
          }}
        >
          {chooseButton}
          {uploadButton}
          {cancelButton}
          <div className="flex align-items-center gap-3 ml-auto">
            <span>{formatedValue} / 10 MB</span>
            <ProgressBar
              value={value}
              showValue={false}
              style={{ width: "10rem", height: "12px" }}
            ></ProgressBar>
          </div>
        </div>
      );
    };

    const itemTemplate = (file) => {
      const dotPath = file.name.split(".")[1];
      let imageSelectSrc;
  
      if (dotPath === "xlsx") {
        imageSelectSrc = "/demo/images/microsoft/excel-image.jpg";
      } else if (dotPath === "docx") {
        imageSelectSrc = "/demo/images/microsoft/word-icon.jpg";
      } else {  
        imageSelectSrc = "/demo/images/microsoft/images-png.jpg";
      }
  
      return (
        <div className="flex align-items-center flex-wrap">
          <div className="flex align-items-center">
            <div className="flex flex-column text-left ml-3 p-2 ">
              <Image src={imageSelectSrc} alt="}Icon" width="70" />
              <span className="mb-1">{file.name}</span>
            </div>
          </div>
        </div>
      );
    };

    const emptyTemplate = () => {
      return (
        <div className="flex align-items-center flex-column">
          <i
            className="pi pi-file mt-3 p-5"
            style={{
              fontSize: "5em",
              borderRadius: "50%",
              backgroundColor: "var(--surface-b)",
              color: "var(--surface-d)",
            }}
          ></i>
          <span
            style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
            className="my-5"
          >
            Drag and Drop File Here
          </span>
        </div>
      );
    };

    const chooseOptions = {
      icon: "pi pi-fw pi-file",
      iconOnly: true,
      className: "custom-choose-btn p-button-rounded p-button-outlined",
    };
    const uploadOptions = {
      icon: "pi pi-fw pi-cloud-upload",
      iconOnly: true,
      className:
        "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
    };
    const cancelOptions = {
      icon: "pi pi-fw pi-times",
      iconOnly: true,
      className:
        "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
    };

    const idBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Id</span>
                {rowData.id}
            </>
        );
    };

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {/* <span>{getUserName(rowData.name)}</span> */}
                <span>{rowData.name}</span>
            </>
        );
    };

    const nameItem = (option) => {
      return (
        <div className="flex align-items-center gap-2">
          <span>{option.name}</span>
        </div>
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

    const exportCSV = () => {
      dt.current.exportCSV();
    };

    const exportExcel = async () => {
      const userDataAll = await userApi.getAllData().then((res) => res);
      import("xlsx").then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(userDataAll);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
        const excelBuffer = xlsx.write(workbook, {
          bookType: "xlsx",
          type: "array",
        });
  
        saveAsExcelFile(excelBuffer, "users");
      });
    };
  
    const saveAsExcelFile = (buffer, fileName) => {
      import("file-saver").then((module) => {
        if (module && module.default) {
          let EXCEL_TYPE =
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
          let EXCEL_EXTENSION = ".xlsx";
          const data = new Blob([buffer], {
            type: EXCEL_TYPE,
          });
  
          module.default.saveAs(
            data,
            fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
          );
        }
      });
    };

    const roleBodyTemplate = (rowData) => {
        const roleText = rowData.role === 0 ? "Employee" : "Admin";
        return <>{roleText}</>;
      };    

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
    setLazyParams({
      ...lazyParams,
      id: e.filters?.id.value,
      name: e.filters?.name.value,
      page:0, 
      // name : userNameSelected,
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
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                {/* <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." /> */}
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

      const applyIdFilter = () => {
        setFirst(0); // Reset the page to the first page when applying a new filter
        setLazyParams({
            ...lazyParams,
            id: filterParams.id,
            page: 0,
        });
    };

    const idFilterTemplate = (options) => {
      return (
        <MultiSelect
          value={options.value}
          options={listUser}
          optionLabel="name"
          itemTemplate={idBodyTemplate}
          onChange={(e) => {
            options.filterApplyCallback(e.value);
          }}
          maxSelectedLabels={1}
          placeholder="Select"
          className="p-column-filter"
          style={{ minWidth: "8rem" }}
          // style={{ minWidth: "12rem" }}
        />
      );
    };


    
    // const handleNameSearch = async () => {
    //   try {
    //     const response = await userApi.getByName(nameFilter);
    //     const searchData = response.data; 
    //     setListUser(searchData); 
    //     setFirst(0); 
    //     setTotalRecords(searchData.length); 
    //   } catch (error) {
    //     console.error('Error searching by name:', error);
    //   }
    // };
    
      
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
        ...prevFilters,
        [field]: { ...prevFilters[field], value: value }
    }));
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


                        <Column selectionMode="multiple" />
                        <Column
                          header="No."
                          headerStyle={{ width: "4rem" }}
                          body={(data, options) => options.rowIndex + 1}
                        ></Column>
                        
                        
                        <Column
                        field="id"
                        header="Id"
                        filterHeaderStyle="equals"
                        filter
                        filterPlaceholder="Search by id"
                        showFilterMenu={false}
                        sortable
                        body={idBodyTemplate}
                        filterElement = {idFilterTemplate}
                        headerStyle={{ minWidth: "5rem", width: "10rem" }}
                        ></Column>
           
                        <Column
                        field="name"
                        header="Name"
                        filter
                        filterMatchMode="contains"
                        filterPlaceholder="Search by name"
                        showFilterMenu={false}
                        sortable
                        body={nameBodyTemplate} 
                        filterElement = {nameFilterTemplate}
                        headerStyle={{ minWidth: "5rem", width: "10rem" }}                                              
                        >
        
                        </Column>
                        <Column field="role" header="Role" body={roleBodyTemplate}  sortable></Column>                 
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

                    <Dialog
                    visible={showDialogImport}
                    style={{ width: "600px" }}
                    header="Import"
                    modal
                    onHide={() => setShowDialogImport(false)}
                  >
              <div className="flex align-items-center justify-content-center">
              <Toast ref={toast}></Toast>
              <FileUpload
                ref={fileUploadRef}
                name="file"
                mode="advanced"
                url="http://localhost:8080/api/excel/upload"
                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                chooseLabel="Import"
                maxFileSize={10000000}
                className="mr-2 inline-block w-full"
                onUpload={onTemplateUpload}
                onSelect={onTemplateSelect}
                onError={onTemplateClear}
                onClear={onTemplateClear}
                emptyTemplate={emptyTemplate}
                headerTemplate={headerTemplate}
                itemTemplate={itemTemplate}
                chooseOptions={chooseOptions}
                uploadOptions={uploadOptions}
                cancelOptions={cancelOptions}
                customUpload={true}
                uploadHandler={onTemplateUpload}
              />
            </div>
            </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
