import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTruck, FaSearch, FaEye } from 'react-icons/fa';

/* components */
import HeaderContent from "../../components/HeaderContent";
import DataTableLoader from "../../components/loader/DataTableLoader";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";

/* actions */
import { listOrders } from "../../actions/orderActions";

const DeliveryScreen = ({ history }) => {
    const dispatch = useDispatch();
    const [pageNumber, setPageNumber] = useState(1);
    const [keyword, setKeyword] = useState("");

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders, page, pages } = orderList;

    useEffect(() => {
        dispatch(listOrders({ keyword, pageNumber, delivery: true }));
    }, [dispatch, history, pageNumber, keyword]);

    const renderCreateButton = () => (
        <Link to="/order/create/delivery" className="btn btn-success mb-3">
            <FaTruck className="mr-2" /> New Delivery
        </Link>
    );

    const renderTable = () => (
        <div className="table-responsive">
            <table className="table table-hover table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th className="d-none d-sm-table-cell">Address</th>
                        <th className="d-none d-sm-table-cell">Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.client.name}</td>
                            <td className="d-none d-sm-table-cell">{order.client.address}</td>
                            <td className="d-none d-sm-table-cell">{order.client.phone}</td>
                            <td>
                                <Link to={`/order/${order.id}/view`} className="btn btn-info btn-sm py-2 px-3">
                                    <FaEye className="mr-1 mb-1" /> View
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
            <HeaderContent name="Delivery Management" />
            <section className="content">
                <div className="container-fluid">
                    {renderCreateButton()}
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <div className="card-title">
                                <FaTruck className="mr-2 mb-1" />
                                Active Delivery Orders
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

export default DeliveryScreen;