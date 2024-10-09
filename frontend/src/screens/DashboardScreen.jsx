import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../components/HeaderContent";
import SmallBox from "../components/SmallBox";
import DeliveryListItem from "../components/DeliveryListItem";
import DataTableLoader from "../components/loader/DataTableLoader";
import LoaderHandler from "../components/loader/LoaderHandler";

/* Actions */

import {
  OccupiedTableLoader,
  SkeletonBoxes,
  SkeletonSales,
} from "../components/loader/SkeletonLoaders";
import { getStatistics } from "../actions/orderActions";

const DashboardScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //user state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderStatistics = useSelector((state) => state.orderStatistics);
  const { loading, error, data } = orderStatistics;

  const { orders, sales, statistics } = data;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login", { replace: true });
    }
    dispatch(getStatistics());
  }, [dispatch, history, userInfo]);

  //get all in place orders
  const ordersInPlace = (orders) => {
    const ordersInPlace = orders.filter(function (item) {
      return item.delivery === false;
    });

    return ordersInPlace;
  };

  const getTodaySales = (items) => {
    let day = new Date();
    day = day.toISOString().slice(8, 10);
    const newSales = items.filter(function (item) {
      const saleDay = item.updatedAt.slice(8, 10);
      return day === saleDay;
    });
    return newSales;
  };

  //get all delivery orders
  const ordersForDelivery = (orders) => {
    const ordersForDelivery = orders.filter(function (item) {
      return item.delivery === true;
    });

    return ordersForDelivery;
  };

  //table row click from in place orders
  const handleRowClick = (e, id) => {
    e.preventDefault();
    navigate(`/order/${id}/view`, { replace: true });
  };

  const returnSales = () => {
    var indents = [];
    for (var i = 0; i < (sales.length > 3 ? 4 : sales.length); i++) {
      indents.push(
        <tr key={sales[i].id}>
          <td className="font-weight-bold">{sales[i].id}</td>
          <td>
            {sales[i].delivery ? (
              <span className={"badge bg-primary p-2"}>IN PLACE</span>
            ) : (
              <span className={"badge bg-info p-2"}>DELIVERY</span>
            )}
          </td>
          <td>
            <span className={"badge bg-success p-2"}>${sales[i].total}</span>
          </td>
          <td>
            <span className={"badge bg-warning p-2"}>
              {sales[i].products.length}
            </span>
          </td>
          <td>
            <Link
              to={`/order/${sales[i].id}/view`}
              className="btn-small btn-info p-2 rounded"
            >
              <i className="fas fa-search "></i>
            </Link>
          </td>
        </tr>
      );
    }
    return indents;
  };

  const renderSmallBoxes = () => (
    <div className="row">
      <SmallBox
        number={orders.length}
        paragraph={"Active orders"}
        link={"order"}
        color={"primary"}
        icon={"fas fa-utensils"}
      />
      <SmallBox
        number={ordersInPlace(orders).length}
        paragraph={"In Place Orders"}
        link={"active"}
        color={"success"}
        icon={"fas fa-users"}
      />
      <SmallBox
        number={ordersForDelivery(orders).length}
        paragraph={"Orders for delivery"}
        link={"delivery"}
        color={"warning"}
        icon={"fas fa-truck"}
      />
      <SmallBox
        number={orders.length}
        paragraph={"Total orders"}
        link={"order"}
        color={"info"}
        icon={"fas fa-shopping-bag"}
      />
    </div>
  );

  const renderSales = () => (
    <div className="row">
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-primary text-white">
            <div className="card-title">
              <i className="fas fa-chart-line mr-2"></i>Last Sales
            </div>
            <div className="card-tools">
              <Link to="/order" className="btn btn-tool btn-sm text-white">
                <i className="fas fa-external-link-alt"></i>
              </Link>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="thead-light">
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Total</th>
                    <th>Products</th>
                    <th>More</th>
                  </tr>
                </thead>
                <tbody>{returnSales(sales)}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="card shadow-sm">
          <div className="card-header bg-success text-white">
            <div className="card-title">
              <i className="fas fa-chart-pie mr-2"></i>Restobar Overview
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-shopping-cart fa-2x text-warning mr-3"></i>
                <div>
                  <div className="mb-0 font-weight-bold">
                    {statistics && statistics.orders}
                  </div>
                  <small className="text-muted">TOTAL ORDERS COMPLETED</small>
                </div>
              </div>
              <i className="fas fa-arrow-up text-success"></i>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-truck fa-2x text-info mr-3"></i>
                <div>
                  <div className="mb-0 font-weight-bold">
                    {statistics && statistics.deliveries}
                  </div>
                  <small className="text-muted">
                    TOTAL DELIVERIES COMPLETED
                  </small>
                </div>
              </div>
              <i className="fas fa-arrow-up text-success"></i>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-money-bill-wave fa-2x text-success mr-3"></i>
                <div>
                  <div className="mb-0 font-weight-bold font-weight-bold">
                    ${statistics && statistics.today}
                  </div>
                  <small className="text-muted">TODAY SALES</small>
                </div>
              </div>
              <i className="fas fa-arrow-up text-success"></i>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <i className="fas fa-piggy-bank fa-2x text-danger mr-3"></i>
                <div>
                  <div className="mb-0 font-weight-bold">
                    ${statistics && statistics.total}
                  </div>
                  <small className="text-muted">TOTAL SALES</small>
                </div>
              </div>
              <i className="fas fa-arrow-up text-success"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <table className="table m-0 table-hover">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Client</th>
          <th>Table</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {ordersInPlace(orders)
          .splice(0, 5)
          .map((order) => (
            <tr
              key={order.id}
              onClick={(e) => handleRowClick(e, order.id)}
              style={{
                cursor: "pointer",
              }}
            >
              <td>
                <div>
                  <span className={"badge bg-primary p-2"}>{order.id}</span>
                </div>
              </td>
              <td>{order.client ? order.client.name : ""}</td>
              <td>{order.table ? order.table.name : ""}</td>
              <td>
                <span className={"badge bg-success p-2"}>${order.total}</span>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );

  const renderDeliveries = () =>
    ordersForDelivery(orders)
      .splice(0, 5)
      .map((order) => (
        <DeliveryListItem
          id={order.id}
          name={order.client ? order.client.name : ""}
          address={order.client ? order.client.address : ""}
          key={order.id}
        />
      ));

  return (
    <>
      <HeaderContent name={"Dashboard"} />

      <section className="content">
        <div className="container-fluid">
          <LoaderHandler
            loading={loading}
            error={error}
            loader={<SkeletonBoxes />}
            render={renderSmallBoxes}
          />

          {userInfo.isAdmin && (
            <LoaderHandler
              loading={loading}
              error={error}
              loader={<SkeletonSales />}
              render={renderSales}
            />
          )}

          <div className="row">
            <div className="col-12 col-md-8">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <div className="card-title d-flex align-items-center">
                    <i className="fas fa-utensils mr-2"></i>
                    Latest In-Place Orders
                  </div>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <LoaderHandler
                      loading={loading}
                      error={error}
                      loader={<DataTableLoader />}
                      render={renderOrders}
                    />
                  </div>
                </div>
                <div className="card-footer clearfix ">
                  <Link
                    to={"/order/create"}
                    className="btn btn-outline-primary btn-sm float-left"
                  >
                    <i className="fas fa-plus-circle mr-1"></i> New Order
                  </Link>
                  <Link
                    to={"/order"}
                    className="btn btn-link btn-sm text-muted float-right"
                  >
                    View All <i className="fas fa-chevron-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <div className="card-title d-flex align-items-center">
                    <i className="fas fa-truck mr-2"></i>
                    Recently Added Delivery Orders
                  </div>
                  <div className="card-tools">
                    <button
                      type="button"
                      className="btn btn-tool text-white"
                      data-card-widget="collapse"
                    >
                      <i className="fas fa-minus" />
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <ul className="products-list product-list-in-card px-4">
                    <LoaderHandler
                      loading={loading}
                      loader={<DataTableLoader />}
                      error={error}
                      render={renderDeliveries}
                    />
                  </ul>
                </div>
                <div className="card-footer text-center">
                  <Link to={"/delivery"} className="uppercase">
                    View All Delivery Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /.container-fluid */}
      </section>
    </>
  );
};

export default DashboardScreen;
