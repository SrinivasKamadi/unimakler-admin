import React, { useState, useEffect } from "react";
import { masterClient } from "../../utils/httpClient";
import Loader from "../../components/Loader";
import { toastError, toastSuccess } from "../../utils/toast";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Country } from "country-state-city";

const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [formData, setFormData] = useState({});
    const [allCountries, setAllCountries] = useState([]);
    const [formError, setFormError] = useState({});
    const [update, setUpdate] = useState(false);

    //post countries
    const handleCountryChange = (e) => {
        const countryCode = allCountries.find(
            (country) => country.name === e.target.value
        ).isoCode;
        const countryCodePrefix = allCountries.find(
            (country) => country.name === e.target.value
        ).phonecode;
        setFormData({
            ...formData,
            country_name: e.target.value,
            country_code: countryCode,
            phone_code: `+${countryCodePrefix}`,
        });
    };

    const validateForm = () => {
        let errors = {};
        if (
            formData.country_name == undefined ||
            formData.country_name == "default"
        ) {
            errors.country_name = "Country is required";
            setFormError(errors);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                setLoading(true);
                const response = await masterClient.post("/country", formData);
                if (response?.data?.status) {
                    toastSuccess(response?.data?.message);
                    setFormData({});
                    setFormError({});
                    handleClose();
                    getCountries();
                }
            } catch (error) {
                if (error?.response?.data?.data) {
                    setFormError(error?.response?.data?.data);
                }
                else {
                    toastError(error?.response?.data?.message);
                }
            } finally {
                setLoading(false);
            }
        } else {
            console.log("error");
        }
    };

    // get countries
    const getCountries = async () => {
        try {
            const response = await masterClient.get("/country");
            if (response?.data?.status) {
                setCountries(response.data.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // delete country
    const deleteCountry = async (code) => {
        try {
            setLoading(true);
            const response = await masterClient.delete(`/country/${code}`);
            if (response?.data?.status) {
                toastSuccess(response?.data?.message);
                getCountries();
            }
        } catch (error) {
            console.log(error);
            toastError(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCountries();
        setAllCountries(Country.getAllCountries());
    }, []);

    return (
        <>
            {loading && <Loader />}
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">
                                                <a href="/">Terraterri</a>
                                            </li>
                                            <li className="breadcrumb-item active">Countries</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        {/* <Link to='/addcountries'> */}
                                        <button className="btn btn-info" onClick={handleShow}>
                                            Add Country
                                        </button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Countries</h3>
                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by country name"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive-md">
                                            <table className="table text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Country Name</th>
                                                        <th>Country Code</th>
                                                        <th>Phone Code</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {countries.map((country, index) => (
                                                        <tr key={country.id}>
                                                            <td className="align-middle">{index + 1}</td>
                                                            <td className="align-middle">
                                                                {country.country_name}
                                                            </td>
                                                            <td className="align-middle">
                                                                {country.country_code}
                                                            </td>
                                                            <td className="align-middle">
                                                                {country.phone_code}
                                                            </td>
                                                            <td className="table-icons">
                                                                <tr>
                                                                    <td>
                                                                        <i
                                                                            className="fa fa-trash"
                                                                            onClick={() =>
                                                                                deleteCountry(country.country_code)
                                                                            }
                                                                        ></i>
                                                                    </td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Offcanvas show={show} onHide={handleClose} placement="end">
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Add Countries</h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    name="country_name"
                                                    required
                                                    onChange={handleCountryChange}
                                                >
                                                    <option value="default">Select Country</option>
                                                    {allCountries.map((country) => (
                                                        <option value={country.name}>{country.name}</option>
                                                    ))}
                                                </select>
                                                {formError.country_name && (
                                                    <p className="err">{formError.country_name}</p>
                                                )}
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        id="country-name"
                                                        className="form-control"
                                                        name="country_code"
                                                        placeholder="Enter Country Name"
                                                        value={formData.country_code || ""}
                                                        readOnly
                                                    />
                                                    <label for="country-name" className="fw-normal">
                                                        Country Code
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        id="country-code-prefix"
                                                        className="form-control"
                                                        name="phone_code"
                                                        placeholder="Enter Country Name"
                                                        value={formData.phone_code || ""}
                                                        readOnly
                                                    />
                                                    <label
                                                        for="country-code-prefix"
                                                        className="fw-normal"
                                                    >
                                                        Country Code Prefix
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Countries;
