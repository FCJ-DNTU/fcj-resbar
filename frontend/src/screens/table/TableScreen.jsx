import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaCheck,
  FaTimes,
  FaSearch,
  FaTable,
} from "react-icons/fa";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Search from "../../components/Search";
import Pagination from "../../components/Pagination";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Actions */
import { listTables, createTable } from "../../actions/tableActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const TableScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const tableList = useSelector((state) => state.tableList);
  const { loading, error, tables, page, pages } = tableList;

  const tableCreate = useSelector((state) => state.tableCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = tableCreate;

  useEffect(() => {
    dispatch(listTables(keyword, pageNumber));
    if (createSuccess) {
      setName("");
      setModalIsOpen(false);
    }
  }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      setErrors({ name: "Name is required" });
    } else {
      setErrors({});
      dispatch(createTable({ name }));
    }
  };

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th className="d-none d-sm-table-cell">Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr key={table.id}>
              <td>{table.id}</td>
              <td>{table.name}</td>
              <td>
                {table.occupied ? (
                  <span className="badge badge-success p-2">
                    <FaCheck className="mr-1 mb-1" /> Occupied
                  </span>
                ) : (
                  <span className="badge badge-danger p-2">
                    <FaTimes className="mr-1 mb-1" /> Available
                  </span>
                )}
              </td>
              <td className="d-none d-sm-table-cell">
                {new Date(table.createdAt).toLocaleDateString()}
              </td>
              <td>
                <Link
                  to={`/table/${table.id}/edit`}
                  className="btn btn-warning btn-sm py-2 px-3"
                >
                  <FaEdit className="mr-1 mb-1" /> Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderModalCreateTable = () => (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="btn btn-success mb-3"
      >
        <FaPlus /> Create New Table
      </button>
      <Modal
        style={modalStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h3 className="mb-4">Create New Table</h3>
        <LoaderHandler loading={createLoading} error={createError} />
        <form onSubmit={handleSubmit}>
          <Input
            name={"name"}
            type={"text"}
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
            classes={"btn-danger float-right"}
          />
        </form>
      </Modal>
    </>
  );

  return (
    <>
      <HeaderContent name={"Tables Management"} />
      {/* Main content */}

      <section className="content">
        <div className="container-fluid">
          {renderModalCreateTable()}

          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="card-title">
                <FaTable className="mr-2 mb-1" />
                All Tables
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
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default TableScreen;
