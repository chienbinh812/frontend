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
import React, { useEffect, Productef, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import accountApi from '../../api/accountApi';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Calendar } from 'primereact/calendar';
import { AccountService } from '../../../demo/service/AccountService';


const Crud = () => {
    let emptyAccount = {    
        id: null,
        username: '',
        // image: null,
        // description: '',
        // category: null,
        password:'',
        userId:null
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
    };

    const initFilterParams = {
        sortBy: null,
        sortDir: null,
    
        id: null,
        username: null,
        page: null,
        size: null,
      };
   

    // const [Products, setProducts] = useState(null);
    const [accountDialog, setAccountDialog] = useState(false);
    const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
    const [deleteWarehousesDialog, setDeleteWarehousesDialog] = useState(false);
    const [selectedWarehouses, setSelectedWarehouses] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [role, setRole] = useState(null);
    const[id, setId] = useState(null);
    const [account, setAccount] = useState(emptyAccount);
    const [listAccount, setListAccount] = useState(null);

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
    //     WarehouseService.getWarehouse().then((data) => {
    //         setListWarehouse(data.data);
    //     });
    // },
    // []);

    useEffect(() => {
        if (account.id) {
          AccountService.updateAccount(account.id, account)
            .then((data) => {
              // Optionally update the Product or handle the response data
              console.log('Account updated:', data);
            })
            .catch((error) => {
              // Handle error here
              console.error('Error updating account:', error);
            });
        }
      }, [account]);
    
    // useEffect(() => {
    //     ProductService.getProduct().then((data) => setProduct(data.data));
    // }, []);

    // const formatCurrency = (value) => {
    //     return   ('en-US', { style: 'currency', currency: 'USD' });
    // };

    const [lazyParams, setLazyParams] = useState(initFilterParams);
  

    const fetchData = async () => {
      try {
        const resAccount = await accountApi.getAll(lazyParams);
        setListAccount(resAccount.content);
        setTotalRecords(resAccount.totalElements);
        setSize(resAccount.size);
        console.log("check response em", resAccount.content);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
        fetchData();
      }, [lazyParams]);

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

     


    const openNew = () => {
        setAccount(emptyAccount);
        setSubmitted(false);
        setAccountDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setAccountDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteAccountDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteWarehousesDialog(false);
    };

    const [updateTrigger, setUpdateTrigger] = useState(false);

    
    const saveProduct = async () => {
        setSubmitted(true);
      
        if (account.name.trim()) {
          try {
            let _listProduct = [...listAccount];
            let _product = { ...account };
      
            if (account.id) {
              const index = findIndexById(account.id);
      
              _listProduct[index] = _product;
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Updated",
                life: 3000,
              });
              const updatedProduct = await WarehouseService.updateProduct(_product);
              setAccount(updatedProduct.data);
            } else {
              _product.id = createId();
              _listUser.push(_product);
      
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Created",
                life: 3000,
              });
      
              const createdProduct = await WarehouseService.createProduct(_product);
              setAccount(createdProduct.data);
              
            }
      
            setListAccount(_listProduct);
            setAccount(emptyAccount);
            setAccountDialog(false);
          } catch (error) {
            console.error("An error occurred:", error);
            
          }
        }
      };
      
    
    const editProduct = (Product) => {
        setAccount({ ...Product });
        setAccountDialog(true);
    };

    //delete
    const confirmDeleteProduct = (Product) => {
        setAccount(Product);
        setDeleteAccountDialog(true);
    };

   
    const deleteWarehouse = () => {
        WarehouseService.deleteWarehouse(account.id)
        .then(() => {
            let _listProduct = listAccount.filter((u) => u.id !== account.id);
            setListAccount(_listProduct);
            setDeleteAccountDialog(false);
            setAccount(emptyAccount);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        })
        .catch((error) => {
            // Handle error (if required)
            console.error('Error deleting Product:', error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete Product', life: 3000 });
        });
        // let _listProduct = listProduct.filter((val) => val.id !== listProduct.id);
        // setListProduct(_listProduct);
        // setDeleteProductDialog(false);
        // setProduct(emptyProduct);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        // setDeleteRequested(true);
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < listAccount.length; i++) {
            if (listAccount[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        const index = listAccount[listAccount.length - 1].id + 1;
        return index;
      };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteWarehousesDialog(true);
    };

    const deleteSelectedProducts = () => {
        // let _listProduct = listProduct.filter((val) => !selectedProducts.includes(val));
        // setListProduct(_listProduct);
        // setDeleteProductsDialog(false);
        // setSelectedProducts(null);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        try {
            const deletedProductIds = selectedWarehouses.map((Product) => Product.id);
            Promise.all(deletedProductIds.map((ProductId) => WarehouseService.deleteProduct(ProductId)));
            const updatedListProduct = listAccount.filter((Product) => !deletedProductIds.includes(Product.id));
            setListAccount(updatedListProduct);
            setSelectedWarehouses(null);
            setDeleteWarehousesDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          } catch (error) {
            // Handle error here
            console.error("Error deleting Products:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete Products', life: 3000 });
          }
    };

    const onCategoryChange = (e) => {
        let _Product = { ...account };
        _Product['category'] = e.value;
        setAccount(_Product);
    };

    const onInputChange = (e, price) => {
        const val = (e.target && e.target.value) || '';
        let _Product = { ...account };
        _Product[`${price}`] = val;

        setAccount(_Product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _Product = { ...account };
        _Product[`${name}`] = val;

        setAccount(_Product);
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">              
                    <Button label="Add" icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />                                  
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected}  />
                    {/* <Button label="Edit" icon="pi pi-Product-edit" severity="sucess" className="mr-2" onClick={openNew} /> */}

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

    const usernameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.username}
            </>
        );
    };


    const passwordBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Password</span>
                {rowData.password}
            </>
        );
    };

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

  const onChangeInput = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...account };
    _product[`${name}`] = val;
    

    setAccount(_product);
  };

  const onChangeInputPrice = (e, price) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...account };
    _product[`${price}`] = val;
    

    setAccount(_product);
  };

    const actionBodyTemplate = (rowData) => {
        return (
            <>
                <Button icon="pi pi-pencil" severity="success" rounded className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" severity="warning" rounded onClick={() => confirmDeleteProduct(rowData)} />
            </>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Warehouse</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onChange={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteWarehouse} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteSelectedProducts} />
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
                        value={listAccount}
                        selection={selectedWarehouses}
                        onSelectionChange={(e) => setSelectedWarehouses(e.value)}
                        dataKey="id"
                        lazy
                        paginator
                        // rows={10}
                        totalRecords={totalRecords}
                        filters={filters}
                        filterDisplay="row"
                        first={first}
                        rows={size}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
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
                        emptyMessage="No Warehouse found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '3rem' }}></Column>
                        <Column field="username" header="Username" body={usernameBodyTemplate} filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        <Column 
                        field="address" 
                        header="Address" 
                        body={passwordBodyTemplate} 
                        
                        sortable></Column> 
                     
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog visible={accountDialog} 
                    style={{ width: '450px' }} 
                    header="Add Product" 
                    modal 
                    className="p-fluid" 
                    footer={productDialogFooter} 
                    onHide={hideDialog}>
                        {/* {product.image && <img src={`/demo/images/product/${product.image}`} alt={product.image} width="150" className="mt-0 mx-auto mb-5 block shadow-2" />} */}
                        {/* <div className="field">
                            <label htmlFor="id">Id</label>                           
                            <InputNumber id="id" value={product.id} onChange={(e) => onInputChange(e, 'id')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.id })} />
                            {submitted && !product.id && <small className="p-invalid">Id is required.</small>}
                        </div> */}
                <div className="formgrid grid">
                    <div className="field1">
                    <label htmlFor="name">Name</label>
                    <InputText
                    id="name"
                    value={account.name}
                    onChange={(e) => onChangeInput(e, "name")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !account.name,
                    })}
                    />
                    {submitted && !account.name && (
                    <small className="p-invalid">Name is required.</small>
                    )}
                    </div>
              </div>
                
              <div className="formgrid grid">
                <div className="field2">
                    <label htmlFor="price">Price</label>                           
                    <InputNumber 
                    inputId="price" 
                    value={account.price} 
                    onChange={(e) => 
                    onInputNumberChange(e, 'price') }  
                    mode="currency" currency="VND" locale="vi-VN"
                    className={classNames({ 'p-invalid': submitted && !account.price })} />
                    {submitted && !account.price && <small className="p-invalid">Price is required.</small>}
                </div>
                </div>
                       

                        <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="dom">Date of manufacture</label>
                            <InputText
                            id="dateOfManufacture"
                            value={account.dateOfManufacture}
                            onChange={(e) => onChangeInput(e, "dateOfManufacture")}
                            min="1950-01-01"
                            max="2100-01-01"
                            type="date"
                            />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteAccountDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {account && (
                                <span>
                                    Are you sure you want to delete <b>{account.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteWarehousesDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {account && <span>Are you sure you want to delete the selected Products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
