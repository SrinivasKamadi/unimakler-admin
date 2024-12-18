import React, { useReducer } from "react";
import Loader from "../components/Loader";
import { authClient } from "../utils/httpClient";
import { useNavigate } from "react-router-dom";
import { UserInfoContext } from "../utils/context";
import { toastError } from "../utils/toast";

// useReducer to manage form state
const initialState = {
    loginForm: { username: "", password: "" },
    formErrors: {},
    loader: false,
    user: {}
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_FORM":
            return { ...state, loginForm: { ...state.loginForm, [action.field]: action.value } };
        case "SET_ERRORS":
            return { ...state, formErrors: action.errors };
        case "SET_USER":
            return { ...state, user: action.user };
        case "SET_LOADER":
            return { ...state, loader: action.loader };
        default:
            return state;
    }
};


const Login = () => {
    const navigation = useNavigate();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        dispatch({ type: "SET_FORM", field: e.target.name, value: e.target.value });
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!state.loginForm.username) {
            formIsValid = false;
            errors.username = "Please enter your username.";
        }

        if (!state.loginForm.password) {
            formIsValid = false;
            errors.password = "Please enter your password.";
        }

        dispatch({ type: "SET_ERRORS", errors });
        return formIsValid;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            dispatch({ type: "SET_LOADER", loader: true });
            try {
                const response = await authClient.post('/userlogin', state.loginForm);
                if (response.status) {
                    localStorage.setItem('adminToken', response.data.data.token);
                    dispatch({ type: "SET_USER", user: response.data.data });
                    navigation('/home');
                } else {
                    localStorage.removeItem('adminToken');
                    toastError("Login failed. Please check your credentials.");
                }
            } catch (error) {
                toastError("An error occurred during login.");
                console.error(error);
            } finally {
                dispatch({ type: "SET_LOADER", loader: false });
            }
        } else {
            toastError("Please fix the validation errors.");
        }
    };

    return (
        <>
            <UserInfoContext.Provider value={{ user: state.user }}>
                {state.loader && <Loader />}
                <div className="container-fluid authentication-bg overflow-hidden">
                    <div className="bg-overlay"></div>
                    <div className="row align-items-center justify-content-center min-vh-100">
                        <div className="col-10 col-md-7 col-lg-6 col-xxl-4">
                            <div className="card mb-0">
                                <div className="card-body">
                                    <div className="text-center">
                                        <a className="logo-dark">
                                            <img
                                                src="assets/images/logo.png"
                                                alt=""
                                                width="100"
                                                className="auth-logo logo-dark mx-auto"
                                            />
                                        </a>
                                    </div>

                                    <div className="p-2 mt-3">
                                        <form>
                                            <div className="input-group auth-form-group-custom mb-3">
                                                <span
                                                    className="input-group-text bg-primary bg-opacity-10 fs-16 "
                                                    id="basic-addon1"
                                                >
                                                    <i className="mdi mdi-account-outline auti-custom-input-icon"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter username"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                    name="username"
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div>
                                                {state.formErrors.username && (
                                                    <p className="err">{state.formErrors.username}</p>
                                                )}
                                            </div>

                                            <div className="input-group auth-form-group-custom mb-3">
                                                <span
                                                    className="input-group-text bg-primary bg-opacity-10 fs-16"
                                                    id="basic-addon2"
                                                >
                                                    <i className="mdi mdi-lock-outline auti-custom-input-icon"></i>
                                                </span>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="userpassword"
                                                    placeholder="Enter password"
                                                    aria-label="Username"
                                                    aria-describedby="basic-addon1"
                                                    name="password"
                                                    onChange={handleChange}
                                                />

                                            </div>
                                            <div>
                                                {state.formErrors.password && (
                                                    <p className="err">{state.formErrors.password}</p>
                                                )}
                                            </div>

                                            <div className="pt-3 text-center">
                                                <button
                                                    className="btn btn-primary w-xl waves-effect waves-light"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Log In
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </UserInfoContext.Provider>
        </>
    );
};

export default Login;
