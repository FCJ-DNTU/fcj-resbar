import React from "react";
import { Link } from "react-router-dom";
import { FaUserFriends, FaInfoCircle, FaChair } from 'react-icons/fa';

const Table = ({ table }) => {
    return (
        <Link
            to={table.orders[0] ? `/order/${table.orders[0].id}/view` : "/active"}
            className="text-decoration-none"
        >
            <div className="card shadow-md h-100 table-card">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="card-title mb-0 text-primary">
                            <FaChair className="mr-2" />
                            {table.name}
                        </h4>
                        <span className="table-icon">
                            <FaUserFriends size={24} className="text-secondary" />
                        </span>
                    </div>
                    <p className="card-text text-muted">
                        Orders ID: {table.orders.map(order => order.id).join(', ')}
                    </p>
                </div>
                <div className="card-footer bg-light text-center">
                    <small className="text-primary">
                        More info <FaInfoCircle className="ml-1" />
                    </small>
                </div>
            </div>
        </Link>
    );
};

export default Table;