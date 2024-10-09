import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const HeaderContent = ({ name, icon }) => {
    return (
        <section className="content-header bg-light py-3">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark d-flex align-items-center">
                            {icon && <span className="mr-2 mb-1">{icon}</span>}
                            {name}
                        </h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right m-0">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-info">
                                    <FaHome className="mr-2 mb-1" />
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item active">{name}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeaderContent;