import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaEye,
  FaUtensils,
  FaTruck,
  FaClipboardList,
  FaSearch,
} from "react-icons/fa";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";

/* Actions */
import { listOrders } from "../../actions/orderActions";

const OrderScreen = ({ history }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [keyword, setKeyword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders, page, pages } = orderList;

  useEffect(() => {
    dispatch(listOrders({ keyword, pageNumber, delivery: false }));
  }, [dispatch, history, userInfo, pageNumber, keyword]);

  const renderCreateButton = () => (
    <Link to="/order/create" className="btn btn-success mb-3">
      <FaEdit className="mr-2" /> New Order
    </Link>
  );

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="thead">
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th className="d-none d-sm-table-cell">Table</th>
            <th>Paid</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client.name}</td>
              <td className="d-none d-sm-table-cell">
                {order.table ? (
                  <span className="badge badge-primary p-2">
                    <FaUtensils className="mr-1" /> {order.table.name}
                  </span>
                ) : (
                  <span className="badge badge-info p-2">
                    <FaTruck className="mr-1" /> DELIVERY
                  </span>
                )}
              </td>
              <td>
                {order.isPaid ? (
                  <FaCheck className="text-success" />
                ) : (
                  <FaTimes className="text-danger" />
                )}
              </td>
              <td>
                <span className="badge badge-success p-2">${order.total}</span>
              </td>
              <td>
                <Link
                  to={`/order/${order.id}/view`}
                  className="btn btn-info btn-sm"
                >
                  <FaEye className="mr-1 mb-1" /> View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrders = () => (
    <div className="card shadow-sm">
      <div className="card-header bg-primary text-white">
        <div className="card-title">
          <FaClipboardList className="mr-2 mb-1" />
          All Orders
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
      <div className="card-body p-0">
        <LoaderHandler
          loading={loading}
          error={error}
          loader={<DataTableLoader />}
          render={renderTable}
        />
      </div>
      <div className="card-footer">
        <Pagination page={page} pages={pages} setPage={setPageNumber} />
      </div>
    </div>
  );

  return (
    <>
      <HeaderContent name={"Orders"} />
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              {renderCreateButton()}
              {renderOrders()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderScreen;
