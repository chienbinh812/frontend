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
import { Link } from 'react-router-dom';
import { AccountService } from '../../demo/service/AccountService';



const Crud = () => {
    let emptyAccount = {    
        id: null,
        userName: '',
        // image: null,
        // description: '',
        // category: null,
        password:''
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
    };
   

    // const [users, setUsers] = useState(null);
    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    // const [user, setUser] = useState(emptyUser);
    const [user, setUser] = useState(emptyAccount);
    const [listUser, setListUser] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [role, setRole] = useState(null);
    const[id, setId] = useState(null);

    // useEffect(() => {
    //     ProductService.getProducts().then((data) => setProducts(data));
    // }, []);

    useEffect(() => {
        UserService.getUser().then((data) => {
            setListUser(data.data);
        });
    },
    []);

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
    // //post
    // useEffect(() => {
    //     UserService.createUser().then((data) => {
    //         setListUser(data.data);
    //     });
    // },
    // []);

    //put
    // useEffect(() => {
    //     UserService.updateUser().then((data) => {  
    //         setUser(data.data);
    //     });
    // },
    // []);


    //delete
    // useEffect(() => {
    //     UserService.deleteUser().then((data) => {
    //         setUser(data.data);
    //     });
    // },
    // []);



    // useEffect(() => {
    //     ProductService.getProduct().then((data) => setProduct(data.data));
    // }, []);

    // const formatCurrency = (value) => {
    //     return   ('en-US', { style: 'currency', currency: 'USD' });
    // };




    
    const openNew = () => {
        setUser(emptyAccount);
        setSubmitted(false);
        setUserDialog(true);
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

    // const saveUser = () => {
    //     setSubmitted(true);

    //     if (user.name.trim()) {
    //         let _listUser = [...listUser];
    //         let _user = { ...user };
    //         if (user.id) {
    //             const index = findIndexById(user.id);
    //             _listUser[index] = _user;
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Updated', life: 3000 });
    // //    try {
    // //     UserService.updateUser(user.id, _user);
    // //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
    // // } catch (error) {
    // //     // Handle error here
    // //     console.error("Error updating user:", error);
    // //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update user', life: 3000 });
    //   }
    //          else {
    //             // _user.id = createId();
    //             // _user.code = createId();
    //             // _user.image = 'user-placeholder.svg';
    //             // 
    //             // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Created', life: 3000 });
    //             // try {
    //     //         const createdUser = UserService.createUser(_user);
    //     // _listUser.push(createdUser);
    //     _listUser.push(_user);

    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
    //         // } catch {
    //     //         console.error("Error creating user:", error);
    //     // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create user', life: 3000 });
    //     //     }
    //     }
    //     setListUser(_listUser);
    //         setUserDialog(false);
    //         setUser(emptyUser);
    // }
            
    // };

    const saveUser = () => {
        setSubmitted(true);
      };
      
      useEffect(() => {id
    
        if (submitted && user.name.trim()) {
          let _listUser = [...listUser];
          let _user = { ...user };
          if (user.id) {
            const index = findIndexById(user.id);
            _listUser[index] = _user;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
            UserService.updateUser(user.id, _user)
              .then(() => {               
              })
              .catch((error) => {                
                console.error('Error updating user:', error);
              });
          } else {
            _listUser.push(_user);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            UserService.createUser(_user)
              .then(() => {              
              })
              .catch((error) => {
                console.error('Error creating user:', error);
              });
          }
          setListUser(_listUser);
          setUserDialog(false);
          setUser(emptyAccount);
          UserService.getUser();

        }
      }, [submitted, user]);
      
    
    const editUser = (user) => {
        setUser({ ...user });
        setUserDialog(true);
    };

    //delete
    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    };

    const [deleteRequested, setDeleteRequested] = useState(false);
    useEffect(() => {
        if (deleteRequested) {
            const userIdToDelete = user.id; 
            UserService.deleteUser(userIdToDelete)
                .then(() => {
                    
                    const updatedListUser = listUser.filter((u) => u.id !== userIdToDelete);
                    setListUser(updatedListUser);
                    setDeleteRequested(false); 
                    setUser(emptyAccount);
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
                })
                .catch((error) => {
                   
                    console.error("Error deleting user:", error);
                    setDeleteRequested(false); 
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete user', life: 3000 });
                });
        }
    }, [deleteRequested]);
    
    //delete
    const deleteUser = () => {
        // let _listUser = listUser.filter((val) => val.id !== listUser.id);
        // setListUser(_listUser);
        // setDeleteUserDialog(false);
        // setUser(emptyUser);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'user Deleted', life: 3000 });
        setDeleteRequested(true);
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
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
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
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}  />
                    <Button label="Edit" icon="pi pi-user-edit" severity="sucess" className="mr-2" onClick={openNew} />

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

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
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

    const roleBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Role</span>
                {rowData.role}
            </>
        );
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
            <h5 className="m-0">Manage Products</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
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
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No users found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '5rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        <Column field="role" header="Role" body={roleBodyTemplate} sortable></Column>
                        {/* <Column field="dateOfManufacture" header="Date of manufacture" style={{ minWidth: '10rem' }} /> */}

                         {/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>  */}
                         {/* <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable></Column>  */}
                         {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>  */}
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="Add user" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        <div className="field">
                            <label htmlFor="id">Id</label>                           
                            <InputNumber id="id" value={user.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': submitted && !user.id })} />
                            {submitted && !user.id && <small className="p-invalid">Id is required.</small>}
                        </div>
                        
                        <div className="field2">
                            <label htmlFor="name">Name</label>                           
                            <InputText name="name" value={user.name} onChange={(e) => onInputChange(e, 'name')}  className={classNames({ 'p-invalid': submitted && !user.name })} />
                            {submitted && !user.name && <small className="p-invalid">Name is required.</small>}
                        </div>
                        {/* <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea id="description" value={user.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                        </div> */}

                        {/* <div className="field">
                            <label className="mb-3">Category</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                                    <label htmlFor="category1">Accessories</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                                    <label htmlFor="category2">Clothing</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                                    <label htmlFor="category3">Electronics</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                                    <label htmlFor="category4">Fitness</label>
                                </div>
                            </div>
                        </div> */}

                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="role">Role</label>
                                <select name="cars" id="cars">
                                    <option value="1">Admin</option>
                                    <option value="0">Employee</option>
                                </select>
                                {/* <InputNumber id="role" value={user.role} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" /> */}
                                {/* <InputNumber role="role" value={user.role}/> */}
                                {submitted && !user.role && <small className="p-invalid"> is required.</small>}

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
