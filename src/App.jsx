import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import LazyLoad from "./routes/LazyLoad";
import Loader from "./components/Loader";
import { authClient } from "./utils/httpClient";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserInfoContext, IpInfoContext } from "./utils/context";
import { Provider } from "react-redux";
import Store from "./store/Store";
import { useDispatch } from 'react-redux';
import { setUserRole, setUserData, clearUser } from "./store/slices/UserSlice";
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loader, setLoader] = useState(true);
  const [ipInfo, setIpInfo] = useState({});

  const dispatch = useDispatch();
  const token = localStorage.getItem('adminToken');

  /////////////////// Validating Existing Token   ///////////////////////

  const ValidateToken = async () => {

    if (token == null) {
      setLoader(false);
      navigate('/')
      return;
    }
    try {
      const response = await authClient.post('/validate-token');
      if (response.status) {
        const userId = response?.data?.data?.user?.id;
        const res = await authClient.get(`/userinfo/${userId}`);
        if (res.data.status) {
          dispatch(setUserRole(res.data.data?.role));
          dispatch(setUserData(res.data?.data));
          if (location.pathname == '/') {
            navigate('/home')
          } else {
            navigate(location.pathname);
          }
        } else {
          handleInvalidToken();
        }
      }
    }
    catch (err) {
      console.error("Token validation failed:", err);
      handleInvalidToken();
      // localStorage.removeItem('adminToken');
      // dispatch(clearUser());
      // console.log(err);
      // navigate('/');
    }
    finally {
      setLoader(false);
    }
  }
  const handleInvalidToken = async () => {
    navigate('/')
  }

  const getIpInfo = async () => {
    try {
      const response = await authClient.get('http://ip-api.com/json');
      if (response.data) {
        setIpInfo(response?.data?.query);
      }
    } catch (err) {
      console.log("Failed to fetch IP info:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');

    if (token != null) {
      ValidateToken();
      getIpInfo();
    } else {
      setLoader(false);
    }
  }, [token]);

  if (loader) return <Loader />;

  return (
    <>
      <Provider store={Store}>
        <IpInfoContext.Provider value={{ ipInfo }}>
          <div id="layout-wrapper">
            <ToastContainer />
            {loader && <Loader />}
            {token && <Header />}
            {token && <Sidebar />}
            <LazyLoad />
            {token && <Footer />}
          </div>
        </IpInfoContext.Provider>
      </Provider>
    </>
  );
}

export default App;
