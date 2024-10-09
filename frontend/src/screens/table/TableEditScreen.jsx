import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaCheck, FaTimes, FaTable } from "react-icons/fa";

/* Components */
import Input from "../../components/form/Input";
import HeaderContent from "../../components/HeaderContent";
import Checkbox from "../../components/form/Checkbox";
import ButtonGoBack from "../../components/ButtonGoBack";
import LoaderHandler from "../../components/loader/LoaderHandler";

/* Constants */
import {
  TABLE_UPDATE_RESET,
  TABLE_DETAILS_RESET,
  TABLE_DELETE_RESET,
} from "../../constants/tableConstants";

/* Actions */
import { listTableDetails, updateTable } from "../../actions/tableActions";

const TableEditScreen = ({ history, match }) => {
  const tableId = parseInt(match.params.id);
  const [name, setName] = useState("");
  const [occupied, setOccupied] = useState(false);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //table details state
  const tableDetails = useSelector((state) => state.tableDetails);
  const { loading, error, table } = tableDetails;

  //table update state
  const tableUpdate = useSelector((state) => state.tableUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = tableUpdate;

  useEffect(() => {
    //after update redirect to users
    if (successUpdate) {
      dispatch({ type: TABLE_UPDATE_RESET });
      dispatch({ type: TABLE_DETAILS_RESET });
      dispatch({ type: TABLE_DELETE_RESET });

      navigate("/table", { replace: "/" });
    }

    //load table data
    if (table) {
      if (!table.name || table.id !== tableId) {
        dispatch(listTableDetails(tableId));
      } else {
        //set states
        setName(table.name);
        setOccupied(table.occupied);
      }
    }
  }, [dispatch, history, tableId, table, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setErrors({ name: "Name is required" });
    } else {
      setErrors({});
      dispatch(updateTable({ id: tableId, name, occupied }));
    }
  };

  const renderForm = () => (
    <form onSubmit={handleSubmit}>
      <Input
        name="name"
        type="text"
        data={name}
        setData={setName}
        errors={errors}
        label="Table Name"
        placeholder="Enter table name"
      />
      <Checkbox
        name="occupied"
        data={occupied}
        setData={setOccupied}
        label="Is Occupied?"
      />
      <div className="mt-4">
        <button type="submit" className="btn btn-primary mr-2">
          <FaCheck className="mr-1" /> Update Table
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          <FaTimes className="mr-1" /> Cancel
        </button>
      </div>
    </form>
  );

  return (
    <>
      <HeaderContent name="Edit Table" />
      <section className="content">
        <div className="container-fluid">
          <ButtonGoBack history={history} />
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <div className="card-title mb-0">
                    <FaEdit className="mr-2" /> Edit Table
                  </div>
                </div>
                <div className="card-body">
                  <LoaderHandler loading={loadingUpdate} error={errorUpdate} />
                  <LoaderHandler
                    loading={loading}
                    error={error}
                    render={renderForm}
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

export default TableEditScreen;
