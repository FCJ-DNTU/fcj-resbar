import React, { useEffect } from "react";
import { FaShoppingCart, FaBoxes } from 'react-icons/fa';

const OrderInfo = ({ productsInOrder, total, setTotal }) => {
    //get all order items
    const totalItems = (productsIn) => {
        return productsIn.reduce((acc, item) => acc + item.quantity, 0);
    };

    useEffect(() => {
        setTotal(totalPrice(productsInOrder));
    }, [productsInOrder]);

    //get order total price
    const totalPrice = (productsIn) => {
        return productsIn
            .reduce((acc, item) => acc + item.quantity * item.price, 0)
            .toFixed(2);
    };

    return (
        <div className="card bg-gradient-success text-white shadow-sm mb-4">
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-2 text-center">
                        <FaShoppingCart size={32} />
                    </div>
                    <div className="col-10">
                        <h3 className="mb-0 font-weight-bold">TOTAL: ${total}</h3>
                        <p className="mb-0">
                            <FaBoxes className="mr-2" />
                            {productsInOrder.length > 0
                                ? totalItems(productsInOrder)
                                : 0}{" "}
                            Items in Order
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderInfo;
