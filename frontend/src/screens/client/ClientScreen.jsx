import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUserPlus, FaEdit, FaSearch, FaUsers, FaTimes, FaClipboardList } from 'react-icons/fa';

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

/* Actions */
import { createClient, listClients } from "../../actions/clientActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const ClientScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");
    const [formData, setFormData] = useState({
        name: "", address: "", phone: "", email: "", dni: ""
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const clientList = useSelector((state) => state.clientList);
    const { loading, error, clients, page, pages } = clientList;

    const clientCreate = useSelector((state) => state.clientCreate);
    const { loading: createLoading, success: createSuccess, error: createError } = clientCreate;

    useEffect(() => {
        dispatch(listClients(keyword, pageNumber));
        if (createSuccess) {
            setFormData({ name: "", address: "", phone: "", email: "", dni: "" });
            setModalIsOpen(false);
        }
    }, [dispatch, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = Object.keys(formData).reduce((acc, key) => {
            if (!formData[key]) acc[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            return acc;
        }, {});

        if (Object.keys(newErrors).length === 0) {
            dispatch(createClient(formData));
        } else {
            setErrors(newErrors);
        }
    };

    const renderModalCreateClient = () => (
        <>
            <button onClick={() => setModalIsOpen(true)} className="btn btn-primary mb-3">
                <FaUserPlus className="mr-2 mb-1" /> Add New Client
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '500px',
                        width: '100%',
                        padding: '2rem',
                        borderRadius: '8px',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                    }
                }}
            >
                <div className="modal-header bg-primary text-white p-3 mb-4 rounded">
                    <h3 className="modal-title mb-0">
                        <FaUserPlus className="mr-2" /> Create New Client
                    </h3>
                    <button onClick={() => setModalIsOpen(false)} className="close text-white">
                        <FaTimes />
                    </button>
                </div>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    {Object.keys(formData).map((key) => (
                        <Input
                            key={key}
                            name={key}
                            type={key === "email" ? "email" : "text"}
                            data={formData[key]}
                            setData={(value) => setFormData({ ...formData, [key]: value })}
                            errors={errors}
                            placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                        />
                    ))}
                    <div className="mt-4 d-flex justify-content-end">
                        <button onClick={() => setModalIsOpen(false)} className="btn btn-secondary mr-2">
                            <FaTimes className="mr-2" /> Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <FaUserPlus className="mr-2" /> Create Client
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );

    const renderClientsTable = () => (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead className="thead">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="d-none d-md-table-cell">Address</th>
                        <th className="d-none d-md-table-cell">Phone</th>
                        <th className="d-none d-md-table-cell">Email</th>
                        <th className="d-none d-md-table-cell">DNI</th>
                        <th className="d-none d-md-table-cell">Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.name}</td>
                            <td className="d-none d-md-table-cell">{client.address}</td>
                            <td className="d-none d-md-table-cell">{client.phone}</td>
                            <td className="d-none d-md-table-cell ">{client.email}</td>
                            <td className="d-none d-md-table-cell">{client.dni}</td>
                            <td className="d-none d-md-table-cell">
                                {new Date(client.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <Link to={`/client/${client.id}/edit`} className="btn btn-warning btn-sm py-2 px-3">
                                    <FaEdit className="br-1 mb-1" /> Edit
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <>
            <HeaderContent name={"Clients Management"} />
            <section className="content">
                <div className="container-fluid">
                    <div className="row mb-3">
                        <div className="col-md-6">{renderModalCreateClient()}</div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <div className="card-title">
                                <FaClipboardList className="mr-2 mb-1" />
                                Clients List
                            </div>
                            <div className="card-tools">
                                <Search
                                    keyword={keyword}
                                    setKeyword={setKeyword}
                                    setPage={setPageNumber}
                                    icon={<FaSearch />}
                                />
                            </div>
                        </div>
                        {/* <div className="card-header bg-primary text-white">
                            <div className="card-title mb-0">
                                <FaUsers className="mr-2" /> Clients List
                                <Search
                                    keyword={keyword}
                                    setKeyword={setKeyword}
                                    setPage={setPageNumber}
                                    icon={<FaSearch />}
                                />
                            </div>
                        </div> */}
                        <div className="card-body p-0">
                            <LoaderHandler
                                loading={loading}
                                error={error}
                                loader={<DataTableLoader />}
                                render={renderClientsTable}
                            />
                        </div>
                    </div>
                    <Pagination page={page} pages={pages} setPage={setPageNumber} />
                </div>
            </section>
        </>
    );
};

export default ClientScreen;