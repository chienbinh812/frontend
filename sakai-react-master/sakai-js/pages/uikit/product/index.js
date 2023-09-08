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
import { ProductService } from '../../../demo/service/ProductService';
import { Link } from 'react-router-dom';
import productApi from '../../api/productApi';
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { Calendar } from 'primereact/calendar';


const Crud = () => {
    let emptyProduct = {    
        id: null,
        name: '',
        // image: null,
        // description: '',
        // category: null,
        price:null,

        dateOfManufacture:null
        // rating: 0,
        // inventoryStatus: 'INSTOCK'
    };

    const initFilterParams = {
        sortBy: null,
        sortDir: null,
    
        id: null,
        name: null,
        page: null,
        size: null,
      };
   

    // const [Products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const [role, setRole] = useState(null);
    const[id, setId] = useState(null);
    const [product, setProduct] = useState(emptyProduct);
    const [listProduct, setListProduct] = useState(null);
    const [date, setDate] = useState(product.dateOfManufacture);


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

    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
    // useEffect(() => {
    //     ProductService.getProduct().then((data) => {
    //         setListProduct(data.data);
    //     });
    // },
    // []);

    useEffect(() => {
        if (product.id) {
          ProductService.updateProduct(product.id, product)
            .then((data) => {
              // Optionally update the Product or handle the response data
              console.log('Product updated:', data);
            })
            .catch((error) => {
              // Handle error here
              console.error('Error updating product:', error);
            });
        }
      }, [product]);
    
    // useEffect(() => {
    //     ProductService.getProduct().then((data) => setProduct(data.data));
    // }, []);

    // const formatCurrency = (value) => {
    //     return   ('en-US', { style: 'currency', currency: 'USD' });
    // };

    const [lazyParams, setLazyParams] = useState(initFilterParams);
  

    const fetchData = async () => {
      try {
        const resProduct = await productApi.getAll(lazyParams);
        setListProduct(resProduct.content);
        setTotalRecords(resProduct.totalElements);
        setSize(resProduct.size);
        console.log("check response em", resProduct.content);
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
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const [updateTrigger, setUpdateTrigger] = useState(false);

    // const saveProduct = () => {
    //     setSubmitted(true);

    //     if (Product.name.trim()) {
    //         let _listProduct = [...listProduct];
    //         let _Product = { ...Product };
    //         if (Product.id) {
    //             const index = findIndexById(Product.id);
    //             _listProduct[index] = _Product;
    //             toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    // //    try {
    // //     ProductService.updateProduct(Product.id, _Product);
    // //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    // // } catch (error) {
    // //     // Handle error here
    // //     console.error("Error updating Product:", error);
    // //     toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update Product', life: 3000 });
    //   }
    //          else {
    //             // _Product.id = createId();
    //             // _Product.code = createId();
    //             // _Product.image = 'Product-placeholder.svg';
    //             // 
    //             // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //             // try {
    //     //         const createdProduct = ProductService.createProduct(_Product);
    //     // _listProduct.push(createdProduct);
    //     _listProduct.push(_Product);

    //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         // } catch {
    //     //         console.error("Error creating Product:", error);
    //     // toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to create Product', life: 3000 });
    //     //     }
    //     }
    //     setListProduct(_listProduct);
    //         setProductDialog(false);
    //         setProduct(emptyProduct);
    // }
            
    // };

    
    const saveProduct = async () => {
        setSubmitted(true);
      
        if (product.name.trim()) {
          try {
            let _listProduct = [...listProduct];
            let _product = { ...product };
      
            if (product.id) {
              const index = findIndexById(product.id);
      
              _listProduct[index] = _product;
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Updated",
                life: 3000,
              });
              const updatedProduct = await ProductService.updateProduct(_product);
              setProduct(updatedProduct.data);
            } else {
              _product.id = createId();
              _listUser.push(_product);
      
              toast.current.show({
                severity: "success",
                summary: "Successful",
                detail: "User Created",
                life: 3000,
              });
      
              const createdProduct = await ProductService.createProduct(_product);
              setProduct(createdProduct.data);
              hideDialog()
              
            }
      
            setListProduct(_listProduct);
            setProduct(emptyProduct);
            setProductDialog(false);
          } catch (error) {
            console.error("An error occurred:", error);
            
          }
        }
      };
      
    
    const editProduct = (Product) => {
        setProduct({ ...Product });
        setProductDialog(true);
    };

    //delete
    const confirmDeleteProduct = (Product) => {
        setProduct(Product);
        setDeleteProductDialog(true);
    };

    
    const deleteProduct = () => {
        ProductService.deleteProduct(product.id)
        .then(() => {
            let _listProduct = listProduct.filter((u) => u.id !== product.id);
            setListProduct(_listProduct);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
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
        for (let i = 0; i < listProduct.length; i++) {
            if (listProduct[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        const index = listProduct[listProduct.length - 1].id + 1;
        return index;
      };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        // let _listProduct = listProduct.filter((val) => !selectedProducts.includes(val));
        // setListProduct(_listProduct);
        // setDeleteProductsDialog(false);
        // setSelectedProducts(null);
        // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        try {
            const deletedProductIds = selectedProducts.map((Product) => Product.id);
            Promise.all(deletedProductIds.map((ProductId) => ProductService.deleteProduct(ProductId)));
            const updatedListProduct = listProduct.filter((Product) => !deletedProductIds.includes(Product.id));
            setListProduct(updatedListProduct);
            setSelectedProducts(null);
            setDeleteProductsDialog(false);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          } catch (error) {
            // Handle error here
            console.error("Error deleting Products:", error);
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to delete Products', life: 3000 });
          }
    };


    const onInputChange = (e, price) => {
        const val = (e.target && e.target.value) || '';
        let _Product = { ...product };
        _Product[`${price}`] = val;

        setProduct(_Product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _Product = { ...product };
        _Product[`${name}`] = val;

        setProduct(_Product);
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
                <span className="p-column-title">Date of manufacture</span>
                {rowData.dateOfManufacture}
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

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
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
    let _product = { ...product };
    _product[`${name}`] = val;
    

    setProduct(_product);
  };

  const onChangeInputPrice = (e, price) => {
    const val = (e.target && e.target.value) || "";
    let _product = { ...product };
    _product[`${price}`] = val;
    

    setProduct(_product);
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
            <Button label="Save" icon="pi pi-check" text onClick={saveProduct} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" text onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" text onClick={deleteProduct} />
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
                        value={listProduct}
                        selection={selectedProducts}
                        onSelectionChange={(e) => setSelectedProducts(e.value)}
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
                        emptyMessage="No Products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="Id" sortable body={idBodyTemplate} headerStyle={{ minWidth: '3rem' }}></Column>
                        <Column field="name" header="Name" body={nameBodyTemplate} filter  filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        {/* <Column header="Image" body={imageBodyTemplate}></Column> */}
                        <Column 
                        field="price" 
                        header="Price" 
                        body={priceBodyTemplate} 
                        mode="currency" currency="VND" locale="vi-VN"
                        sortable></Column> 
                        <Column field="dateOfManufacture" header="Date of manufacture" body={roleBodyTemplate} sortable></Column>
                        {/* <Column field="dateOfManufacture" header="Date of manufacture" style={{ minWidth: '10rem' }} /> */}

                         {/* <Column field="category" header="Category" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>  */}
                         
                         {/* <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable headerStyle={{ minWidth: '10rem' }}></Column>  */}
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>

                    </DataTable>

                    <Dialog 
                    visible={productDialog} 
                    style={{ width: '450px' }} 
                    header="Add Product" 
                    modal 
                    className="p-fluid" 
                    footer={productDialogFooter} 
                    onHide={hideDialog}>
                        
                
                    <div className="field1">
                    <label htmlFor="name">Name</label>
                    <InputText
                    id="name"
                    value={product.name}
                    onChange={(e) => onChangeInput(e, "name")}
                    required
                    autoFocus
                    className={classNames({
                        "p-invalid": submitted && !product.name,
                    })}
                    />
                    {submitted && !product.name && (
                    <small className="p-invalid">Name is required.</small>
                    )}
                    
              </div>
                
              <div className="formgrid grid">
                <div className="field2">
                    <label htmlFor="price">Price</label>                           
                    <InputNumber 
                    inputId="price" 
                    value={product.price} 
                    onChange={(e) => 
                    onInputNumberChange(e, 'price') }  
                    mode="currency" currency="VND" locale="vi-VN"
                    className={classNames({ 'p-invalid': submitted && !product.price })} />
                    {submitted && !product.price && <small className="p-invalid">Price is required.</small>}
                </div>
                </div>
                       

                        <div className="formgrid grid">
                        <div className="field col">
                            <label htmlFor="dom">Date of manufacture</label>
                            <InputText
                            id="dateOfManufacture"
                            value={product.dateOfManufacture}
                            onChange={(e) => onChangeInput(e, "dateOfManufacture")}
                            min="1950-01-01"
                            max="2100-01-01"
                            type="date"
                            />
                            </div>
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && (
                                <span>
                                    Are you sure you want to delete <b>{product.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteProductsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {product && <span>Are you sure you want to delete the selected Products?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
