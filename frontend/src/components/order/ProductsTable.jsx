import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaSync, FaPlus, FaShoppingCart, FaExclamationTriangle, FaSearch, FaBoxOpen } from 'react-icons/fa';

/* components */
import LoaderHandler from "../loader/LoaderHandler";
import Pagination from "../Pagination";
import Search from "../Search";
import { BigSpin } from "../loader/SvgLoaders";

/* actions */
import { listProducts } from "../../actions/productActions";

const ProductsTable = ({ productsInOrder, setProductsInOrder, productsAlreadyOrdered }) => {
    const dispatch = useDispatch();
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [products, setProducts] = useState([]);

    const productList = useSelector((state) => state.productList);
    const { loading: loadingProductList, error: errorProductList, products: productsFromState, page, pages } = productList;

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    useEffect(() => {
        if (productsFromState) {
            setProducts(mapProducts(productsFromState));
        }
    }, [productsFromState, productsAlreadyOrdered]);

    const addProduct = (e, product) => {
        e.preventDefault();
        const productIn = { id: product.id, name: product.name, price: product.price, stock: product.stock, quantity: 1 };
        if (!inOrder(productIn, productsInOrder)) {
            setProductsInOrder([...productsInOrder, productIn]);
        } else {
            alert("Product already in order");
        }
    };

    const inOrder = (obj, list) => list.some(item => item.id === obj.id);
    const refreshProducts = () => dispatch(listProducts(keyword, pageNumber));
    const showStock = (product) => {
        const productInOrder = productsInOrder.find(productIn => productIn.id === product.id);
        return productInOrder ? product.stock - productInOrder.quantity : product.stock;
    };

    const mapProducts = (productsToMap) => {
        if (!productsAlreadyOrdered) return productsToMap;
        return productsToMap.map(item => {
            const orderedItem = productsAlreadyOrdered.find(orderedProduct => orderedProduct.id === item.id);
            return orderedItem ? { ...item, stock: item.stock + orderedItem.quantity } : item;
        });
    };

    const renderProducts = () => (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead className="thead-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.name}</td>
                            <td>${product.price.toFixed(2)}</td>
                            <td>
                                <span className={`badge p-2 ${showStock(product) > 0 ? 'badge-success' : 'badge-danger'}`}>
                                    {showStock(product)}
                                </span>
                            </td>
                            <td>
                                {inOrder(product, productsInOrder) ? (
                                    <button disabled className="btn btn-sm btn-secondary py-2 px-3">
                                        <FaShoppingCart className="mr-1 mb-1" /> In Order
                                    </button>
                                ) : product.stock > 0 ? (
                                    <button className="btn btn-sm btn-primary py-2 px-3" onClick={(e) => addProduct(e, product)}>
                                        <FaPlus className="mr-1 mb-1" /> Add to Order
                                    </button>
                                ) : (
                                    <button disabled className="btn btn-sm btn-danger py-2 px-3">
                                        <FaExclamationTriangle className="mr-1 mb-1" /> Out of Stock
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                        <h3 className="card-title mb-0">
                            <FaBoxOpen className="mr-2 mb-1" />
                            Available Products
                        </h3>
                        <button className="btn btn-light btn-sm" onClick={refreshProducts}>
                            <FaSync className="mr-1" /> Refresh
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <Search
                            keyword={keyword}
                            setKeyword={setKeyword}
                            setPage={setPageNumber}
                            icon={<FaSearch />}
                            placeholder="Search products..."
                        />
                    </div>
                    <LoaderHandler
                        loading={loadingProductList}
                        error={errorProductList}
                        render={renderProducts}
                        loader={<BigSpin />}
                    />
                </div>
            </div>
            <Pagination pages={pages} page={page} setPage={setPageNumber} />
        </>
    );
};

export default ProductsTable;