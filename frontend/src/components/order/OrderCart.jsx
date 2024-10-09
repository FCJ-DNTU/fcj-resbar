import React from "react";
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import "./OrderInfo.css";
const OrderCart = ({ productsInOrder, setProductsInOrder }) => {
    //remove product from order
    const removeProduct = (e, product) => {
        e.preventDefault();

        //remove product
        const productsIn = productsInOrder.filter(function (item) {
            return item.id !== product.id;
        });

        setProductsInOrder(productsIn);
    };

    //increase product quantiity
    const addUnit = (e, product) => {
        e.preventDefault();

        const newProducts = productsInOrder.map((el) =>
            el.id === product.id ? { ...el, quantity: el.quantity + 1 } : el
        );
        setProductsInOrder(newProducts);
    };

    //decrease product quantity
    const removeUnit = (e, product) => {
        e.preventDefault();

        const newProducts = productsInOrder.map((el) =>
            el.id === product.id ? { ...el, quantity: el.quantity - 1 } : el
        );
        setProductsInOrder(newProducts);
    };

    const renderCart = () => (
        <>
            {productsInOrder.length > 0 ? (
                productsInOrder.map((productIn, i) => (
                    <tr key={i}>
                        <td className="align-middle">{productIn.name}</td>
                        <td className="align-middle">{productIn.quantity}</td>
                        <td>
                            <div className="btn-group" role="group">
                                <button
                                    disabled={productIn.quantity < 2}
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={(e) => removeUnit(e, productIn)}
                                >
                                    <FaMinus />
                                </button>
                                <button
                                    disabled={productIn.quantity >= productIn.stock}
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={(e) => addUnit(e, productIn)}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </td>
                        <td className="align-middle font-weight-bold">
                            ${(productIn.price * productIn.quantity).toFixed(2)}
                        </td>
                        <td>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={(e) => removeProduct(e, productIn)}
                            >
                                <FaTrash />
                            </button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="5" className="text-center text-muted">
                        Cart is empty
                    </td>
                </tr>
            )}
        </>
    );

    return (
        <div className="card shadow-sm">
            <div className="card-header bg-success text-white">
                <h5 className="mb-0">Order Cart</h5>
            </div>
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-striped table-hover mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th>Product</th>
                                <th>Units</th>
                                <th>Actions</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody>{renderCart()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrderCart;
