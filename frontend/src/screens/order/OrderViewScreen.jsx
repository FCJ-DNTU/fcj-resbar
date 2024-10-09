import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import {
  FaShoppingCart,
  FaClipboard,
  FaCheck,
  FaTimes,
  FaUser,
  FaUtensils,
  FaTruck,
  FaStickyNote,
  FaEdit,
  FaMoneyBillWave,
  FaBoxOpen,
  FaSearch,
} from "react-icons/fa";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import ButtonGoBack from "../../components/ButtonGoBack";
import ViewBox from "../../components/ViewBox";
import LoaderHandler from "../../components/loader/LoaderHandler";
import ModalButton from "../../components/ModalButton";
import { BigSpin } from "../../components/loader/SvgLoaders";

/* constants */
import { ORDER_UPDATE_RESET } from "../../constants/orderConstants";

/* actions */
import {
  listOrderDetails,
  updateOrderToPaid,
} from "../../actions/orderActions";

/* Styles */
import { modalStyles } from "../../utils/styles";

const OrderViewScreen = ({ history, match }) => {
  const orderId = parseInt(match.params.id);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //order details state
  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  //order edit state
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    errorUpdate,
  } = orderUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
      if (order.delivery) {
        navigate("/delivery", { replace: true });
      } else {
        navigate("/active", { replace: true });
      }
    }
    if (order) {
      if (!order.id || order.id !== orderId) {
        dispatch(listOrderDetails(orderId));
      }
    }
  }, [dispatch, history, order, orderId, successUpdate]);

  const renderModalPay = () => (
    <Modal
      style={modalStyles}
      isOpen={modal}
      onRequestClose={() => setModal(false)}
    >
      <h2 className="text-center mb-4">Order Payment</h2>
      <p className="text-center mb-4">Is the order already paid?</p>
      <form onSubmit={handlePay} className="d-flex justify-content-center">
        <button type="submit" className="btn btn-success mr-3">
          <FaCheck className="mr-2" /> Yes, close order
        </button>
        <ModalButton
          modal={modal}
          setModal={setModal}
          classes={"btn-danger"}
          icon={<FaTimes className="mr-2" />}
          text="Cancel"
        />
      </form>
    </Modal>
  );

  const handlePay = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      id: orderId,
    };
    setModal(false);
    dispatch(updateOrderToPaid(updatedOrder));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/order/${orderId}/edit`, { replace: true });
  };

  //get all order items
  const totalItems = (productsIn) => {
    return productsIn.reduce(
      (acc, item) => acc + item.OrderProduct.quantity,
      0
    );
  };

  const renderCartInfo = () =>
    order &&
    order.products && (
      <div className="card bg-success text-white mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-auto pr-4">
              <div className="bg-white rounded-circle p-3 text-info">
                <FaShoppingCart color="gray" size={24} />
              </div>
            </div>
            <div className="col">
              <div className="mb-0">TOTAL ${order.total.toFixed(2)}</div>
              <p className="mb-0 mt-2">
                <FaBoxOpen className="mr-2" />
                {order.products.length > 0
                  ? totalItems(order.products)
                  : 0}{" "}
                Items in Order
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  const renderOrderProducts = () => (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <div className="card-title mb-0">
          <FaShoppingCart className="mr-2 mb-1" />
          Order Products
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order &&
                order.products &&
                order.products.length > 0 &&
                order.products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <span className="badge badge-primary p-2">
                        {product.OrderProduct.quantity}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-info p-2">
                        ${product.price}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-success p-2">
                        ${product.price * product.OrderProduct.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrderInfo = () =>
    order && (
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <div className="card-title mb-0">
            <FaShoppingCart className="mr-2 mb-1" />
            Order Information
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 mb-3">
              <ViewBox
                title={order.id}
                paragraph={"ORDER ID"}
                icon={<FaClipboard size={20} />}
                color={"bg-info"}
              />
            </div>
            <div className="col-md-6 mb-3">
              <ViewBox
                title={order.isPaid ? "Paid" : "Not Paid"}
                paragraph={
                  order.isPaid
                    ? "Order is already paid"
                    : "Order is still not paid"
                }
                icon={
                  order.isPaid ? <FaCheck size={20} /> : <FaTimes size={20} />
                }
                color={order.isPaid ? "bg-success" : "bg-danger"}
              />
            </div>
            {order.client && (
              <div className="col-md-6 mb-3">
                <ViewBox
                  title={order.client.name}
                  paragraph={`ID: ${order.client.id}`}
                  icon={<FaUser size={20} />}
                  color={"bg-info"}
                />
              </div>
            )}
            <div className="col-md-6 mb-3">
              {order.table ? (
                <ViewBox
                  title={order.table.name}
                  paragraph={`ID: ${order.table.id}`}
                  icon={<FaUtensils size={20} />}
                  color={"bg-info"}
                />
              ) : (
                order.client && (
                  <ViewBox
                    title={"Delivery"}
                    paragraph={order.client.address}
                    icon={<FaTruck size={20} />}
                    color={"bg-primary"}
                  />
                )
              )}
            </div>
          </div>
          <ViewBox
            title={"Note:"}
            paragraph={order.note}
            icon={<FaStickyNote />}
            color={"bg-light"}
          />
        </div>
      </div>
    );

  const renderOrderEdit = () => (
    <button
      className="btn btn-warning btn btn-block mb-3 font-small"
      onClick={handleEdit}
    >
      <FaEdit className="mr-2 mb-1" /> Edit Order
    </button>
  );

  const renderOrderPay = () => (
    <button
      className="btn btn-success btn btn-block mb-3"
      onClick={() => setModal(true)}
    >
      <FaMoneyBillWave className="mr-2" /> Pay Order (${order.total})
    </button>
  );

  const renderInfo = () => (
    <>
      <div className="col-12 col-md-6">
        {renderCartInfo()}
        {renderOrderProducts()}
      </div>

      <div className="col-12 col-md-6">{renderOrderInfo()}</div>
    </>
  );

  const renderOrderButton = () => (
    <div className="col-12 col-md-3">
      {order && !order.isPaid && renderOrderEdit()}
    </div>
  );

  const renderPayButton = () => (
    <div className="col-12 col-md-3">
      {order && !order.isPaid && renderOrderPay()}
    </div>
  );

  return (
    <>
      <HeaderContent name={"Order Details"} />
      <LoaderHandler loading={loadingUpdate} error={errorUpdate} />
      <section className="content">
        <div className="container-fluid">
          {renderModalPay()}
          <ButtonGoBack history={history} />
          <div className="row">
            <div className="col-md-7">
              <LoaderHandler
                loading={loading}
                error={error}
                render={() => (
                  <>
                    {renderCartInfo()}
                    {renderOrderProducts()}
                  </>
                )}
                loader={<BigSpin />}
              />
            </div>
            <div className="col-md-5">
              <LoaderHandler
                loading={loading}
                error={error}
                render={() => (
                  <>
                    {renderOrderInfo()}
                    {order && !order.isPaid && renderOrderEdit()}
                    {order && !order.isPaid && renderOrderPay()}
                  </>
                )}
                loader={<BigSpin />}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderViewScreen;
