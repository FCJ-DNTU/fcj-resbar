import React from 'react';
import { Link } from 'react-router-dom';

const DeliveryListItem = ({ id, name, address }) => {
    return (
        <li className="list-group-item p-3 my-3">
            <Link to={`/order/${id}/view`} className="text-decoration-none">
                <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                        <div className="bg-light rounded-circle p-3">
                            <i className="fas fa-truck text-primary fa-lg" />
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="mb-1 text-dark">
                            {name}
                            <span className="badge badge-light text-primary ml-2">ID: {id}</span>
                        </h6>
                        <p className="mb-0 text-muted small">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {address}
                        </p>
                    </div>
                    <div className="ml-auto">
                        <i className="fas fa-chevron-right text-muted"></i>
                    </div>
                </div>
            </Link>
        </li>
    );
}

export default DeliveryListItem;