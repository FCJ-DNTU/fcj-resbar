import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaUtensils, FaChair, FaClipboardList } from 'react-icons/fa';

/* components */
import LoaderHandler from "../../components/loader/LoaderHandler";
import HeaderContent from "../../components/HeaderContent";
import Table from "../../components/Table";
import {
    OccupiedTableLoader,
    FreeTableLoader,
} from "../../components/loader/SkeletonLoaders";

/* actions */
import { allTables } from "../../actions/tableActions";

const ActiveOrdersScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const tableAll = useSelector((state) => state.tableAll);
    const { loading, error, tables } = tableAll;

    useEffect(() => {
        dispatch(allTables());
    }, [dispatch, history, userInfo]);

    const occupiedTableLoader = () => {
        let tableSkeleton = [];
        for (let i = 0; i < 16; i++) {
            tableSkeleton.push(
                <div className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4" key={i}>
                    <OccupiedTableLoader />
                </div>
            );
        }
        return tableSkeleton;
    };

    const freeTableLoader = () => {
        let tableSkeleton = [];
        for (let i = 0; i < 6; i++) {
            tableSkeleton.push(
                <div className="col-12 mb-3" key={i}>
                    <FreeTableLoader />
                </div>
            );
        }
        return tableSkeleton;
    };

    const filterTablesByState = (isOccupied) => {
        return tables.filter((table) => table.occupied === isOccupied);
    };

    const renderOccupiedTables = () =>
        filterTablesByState(true).map((table) => (
            <div key={table.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <Table table={table} />
            </div>
        ));

    const renderFreeTables = () =>
        filterTablesByState(false).map((table) => (
            <Link
                to={`/order/create/${table.id}/table`}
                key={table.id}
                className="btn btn-outline-success btn-block mb-3 py-3"
            >
                <FaChair className="mr-2" />
                {table.name}
            </Link>
        ));

    return (
        <>
            <HeaderContent name="Tables" />
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 col-lg-9">
                            <div className="card shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <div className="card-title mb-0">
                                        <FaUtensils className="mr-2" />
                                        Occupied Tables
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <LoaderHandler
                                            loading={loading}
                                            error={error}
                                            loader={occupiedTableLoader()}
                                            render={renderOccupiedTables}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3">
                            <div className="card shadow-sm">
                                <div className="card-header bg-success text-white">
                                    <div className="card-title mb-0">
                                        <FaChair className="mr-2" />
                                        Free Tables
                                    </div>
                                </div>
                                <div className="card-body">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={freeTableLoader()}
                                        render={renderFreeTables}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ActiveOrdersScreen;
