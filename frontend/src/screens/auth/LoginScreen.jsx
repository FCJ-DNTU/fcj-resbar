import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import "./LoginScreen.css"; // Đảm bảo tạo file CSS này

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  React.useEffect(() => {
    if (userInfo) {
      navigate("/", { replace: true });
    }
  }, [history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">FCJ Resbar</h1>
        <div className="login-logo">
          <img src="/logo.png" alt="Restobar Logo" />
        </div>
        <h2 className="login-subtitle">Sign in to your account</h2>

        <div
          className="alert alert-info alert-dismissible fade show d-flex flex-column justify-content-center align-items-center p-3"
          role="alert"
        >
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <h5 className="alert-heading">
            <i className="fas fa-info-circle mr-2"></i>Test Users
          </h5>
          <p className="mb-0">
            <strong>Email:</strong> admin@example.com / user@example.com
          </p>
          <p className="mb-0">
            <strong>Password:</strong> 123456
          </p>
        </div>

        <form onSubmit={submitHandler} className="login-form">
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {loading && <Loader variable={loading} />}
          {error && <Message message={error} color={"danger"} />}
          <div className="form-footer">
            <div></div>
            <button type="submit" className="btn-signin">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
