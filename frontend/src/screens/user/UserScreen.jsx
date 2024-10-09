import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus, FaTimes, FaUser, FaEnvelope, FaLock, FaUserShield, FaEdit, FaCheck, FaSearch, FaUsers } from 'react-icons/fa';

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Checkbox from "../../components/form/Checkbox";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Actions */
import { listUsers, register } from "../../actions/userActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const UserScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users, page, pages } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userRegister = useSelector((state) => state.userRegister);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = userRegister;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(keyword, pageNumber));
        }
        if (createSuccess) {
            setName("");
            setPassword("");
            setEmail("");
            setIsAdmin(false);

            setModalIsOpen(false);
        }
    }, [dispatch, userInfo, pageNumber, keyword, history, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};
        if (!name) {
            errorsCheck.name = "Name is required";
        }
        if (!password) {
            errorsCheck.password = "Password is required";
        }

        if (!email) {
            errorsCheck.email = "Email is required";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const user = {
                name: name,
                email: email,
                password: password,
                isAdmin: isAdmin,
            };

            dispatch(register(user));
        }
    };

    const renderTable = () => (
        <table className="table table-hover table-striped">
            <thead className="thead">
                <tr>
                    <th className="d-none d-sm-table-cell">ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className="d-none d-sm-table-cell">Photo</th>
                    <th className="d-none d-sm-table-cell">Admin</th>
                    <th className="d-none d-sm-table-cell">Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td className="d-none d-sm-table-cell">{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td className="d-none d-sm-table-cell">
                            <img
                                src={user.image || "/dist/img/user2-160x160.jpg"}
                                className="img-circle elevation-2"
                                alt="User"
                                style={{ height: "2em" }}
                            />
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {user.isAdmin ? (
                                <FaCheck className="text-success" />
                            ) : (
                                <FaTimes className="text-danger" />
                            )}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                            {!user.isAdmin && (
                                <Link to={`/user/${user.id}/edit`} className="btn btn-warning btn-sm px-3">
                                    <FaEdit className="mb-1" /> Edit
                                </Link>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderModalCreateUser = () => (
        <>
            <button
                className="btn btn-success mb-3"
                onClick={() => setModalIsOpen(true)}
            >
                <FaPlus className="mb-1" /> Add New User
            </button>
            <Modal
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
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">Create New User</h2>
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => setModalIsOpen(false)}
                    >
                        <FaTimes />
                    </button>
                </div>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        data={name}
                        setData={setName}
                        errors={errors}
                        icon={<FaUser />}
                        placeholder="Enter user name"
                    />
                    <Input
                        name="email"
                        type="email"
                        data={email}
                        setData={setEmail}
                        errors={errors}
                        icon={<FaEnvelope />}
                        placeholder="Enter email address"
                    />
                    <Input
                        name="password"
                        type="password"
                        data={password}
                        setData={setPassword}
                        errors={errors}
                        icon={<FaLock />}
                        placeholder="Enter password"
                    />
                    <Checkbox
                        name="Admin"
                        data={isAdmin}
                        setData={setIsAdmin}
                        icon={<FaUserShield />}
                    />

                    <hr className="my-4" />
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-secondary mr-2"
                            onClick={() => setModalIsOpen(false)}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            <FaPlus className="mr-2" /> Create User
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );

    return (
        <>
            <HeaderContent name={"Users"} />
            <section className="content">
                <div className="container-fluid">
                    <div className="card">
                        <div className="card-header bg-primary text-white">
                            <div className="card-title">
                                <FaUsers className="mb-1" /> User Management
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
                        <div className="card-body">
                            {renderModalCreateUser()}
                            <LoaderHandler
                                loading={loading}
                                error={error}
                                loader={<DataTableLoader />}
                                render={renderTable}
                            />
                        </div>
                        <div className="card-footer">
                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserScreen;