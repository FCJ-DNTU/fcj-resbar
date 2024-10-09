import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaPlus, FaEdit, FaSearch, FaBox } from "react-icons/fa";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Select from "../../components/Select";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Message from "../../components/Message";

/* Actions */
import { listProducts, createProduct } from "../../actions/productActions";
import { listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

Modal.setAppElement("#root");

const ProductScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState(null);
  const [errors, setErrors] = useState({});
  const [keyword, setKeyword] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: createLoading,
    success: createSuccess,
    error: createError,
  } = productCreate;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    if (createSuccess) {
      setName("");
      setPrice(0);
      setStock(0);
      setCategory(null);
      setModalIsOpen(false);
    }
  }, [dispatch, history, pageNumber, keyword, createSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorsCheck = {};
    if (!name) errorsCheck.name = "Name is required";
    if (!price) errorsCheck.price = "Price is required";
    if (!stock) errorsCheck.stock = "Stock is required";
    if (!category) errorsCheck.category = "Category is required";

    if (Object.keys(errorsCheck).length === 0) {
      dispatch(createProduct({ name, price, stock, categoryId: category }));
    } else {
      setErrors(errorsCheck);
    }
  };

  const searchCategories = (e) => {
    dispatch(listCategories(e.target.value));
  };

  const renderModalCreateProduct = () => (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="btn btn-success mb-3"
      >
        <FaPlus /> Create New Product
      </button>
      <Modal
        style={modalStyles}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <h3 className="mb-4">Create New Product</h3>
        <LoaderHandler loading={createLoading} error={createError} />
        <form onSubmit={handleSubmit}>
          <Input
            name="name"
            type="text"
            data={name}
            setData={setName}
            errors={errors}
          />
          <Input
            name="price"
            type="number"
            data={price}
            setData={setPrice}
            errors={errors}
          />
          <Input
            name="stock"
            type="number"
            data={stock}
            setData={setStock}
            errors={errors}
          />
          <Select
            data={category}
            setData={setCategory}
            items={categories}
            search={searchCategories}
          />
          {errors.category && (
            <Message message={errors.category} color="warning" />
          )}
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

  const renderProductsTable = () => (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th className="d-none d-sm-table-cell">Created At</th>
            <th className="d-none d-sm-table-cell">Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td className="d-none d-sm-table-cell">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
              <td className="d-none d-sm-table-cell">
                {product.category.name}
              </td>
              <td>
                <Link
                  to={`/product/${product.id}/edit`}
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

  return (
    <>
      <HeaderContent name="Products Management" />
      <section className="content">
        <div className="container-fluid">
          {renderModalCreateProduct()}
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <div className="card-title">
                <FaBox className="mr-2 mb-1" />
                All Products
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
                render={renderProductsTable}
              />
            </div>
          </div>
          <Pagination page={page} pages={pages} setPage={setPageNumber} />
        </div>
      </section>
    </>
  );
};

export default ProductScreen;
