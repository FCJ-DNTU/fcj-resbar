import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaSearch, FaList } from 'react-icons/fa';

/* Components */
import HeaderContent from "../../components/HeaderContent";
import ModalButton from "../../components/ModalButton";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";

/* Actions */
import { createCategory, listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const CategoryScreen = ({ history }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({});
    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { loading, error, categories, page, pages } = categoryList;

    const categoryCreate = useSelector((state) => state.categoryCreate);
    const { loading: createLoading, success: createSuccess, error: createError } = categoryCreate;

    useEffect(() => {
        dispatch(listCategories(keyword, pageNumber));
        if (createSuccess) {
            setName("");
            setModalIsOpen(false);
        }
    }, [dispatch, history, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setErrors({ name: "Name is required" });
        } else {
            setErrors({});
            dispatch(createCategory({ name }));
        }
    };

    const renderModalCreateCategory = () => (
        <>
            <button onClick={() => setModalIsOpen(true)} className="btn btn-success mb-3">
                <FaPlus /> Create New Category
            </button>
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <h4 className="mb-4">Create New Category</h4>
                <LoaderHandler loading={createLoading} error={createError} />
                <form onSubmit={handleSubmit}>
                    <Input
                        name="name"
                        type="text"
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <hr />
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes="btn-danger float-right"
                    />
                </form>
            </Modal>
        </>
    );

    const renderTable = () => (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th className="d-none d-sm-table-cell">Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.id}</td>
                            <td>{category.name}</td>
                            <td className="d-none d-sm-table-cell">
                                {new Date(category.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <Link to={`/category/${category.id}/edit`} className="btn btn-warning btn-sm py-2 px-3">
                                    <FaEdit className="mr-1 mb-1" /> Edit
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
            <HeaderContent name="Categories Management" />
            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateCategory()}
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <div className="card-title">
                                <FaList className="mr-2 mb-1" />
                                All Categories
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
                        <div className="card-body table-responsive p-0">
                            <LoaderHandler
                                loading={loading}
                                error={error}
                                loader={<DataTableLoader />}
                                render={renderTable}
                            />
                        </div>
                    </div>
                    <Pagination page={page} pages={pages} setPage={setPageNumber} />
                </div>
            </section>
        </>
    );
};

export default CategoryScreen;