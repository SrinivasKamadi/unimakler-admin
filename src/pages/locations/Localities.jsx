import React, { useState, useEffect } from 'react';
import { masterClient } from '../../utils/httpClient';
import Loader from '../../components/Loader';
import { toastError, toastSuccess } from '../../utils/toast';
import Offcanvas from "react-bootstrap/Offcanvas";
const Localities = () => {
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [localities, setLocalities] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState({});
    const [update, setUpdate] = useState({});

    // get Localities
    const getLocalities = async () => {
        try {
            const response = await masterClient.get('/locality');
            if (response?.data?.status) {
                setLocalities(response?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // delete localities
    const deleteLocalities = async (id) => {
        try {
            setLoading(true);
            const response = await masterClient.delete(`/locality/${id}`);
            if (response?.data?.status) {
                toastSuccess(response?.data?.message);
                getLocalities();
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // get countries
    const getCountries = async () => {
        try {
            setLoading(true);
            const response = await masterClient.get('/country');
            if (response?.data?.status) {
                setAllCountries(response?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // get states
    const getStates = async (country_code) => {
        try {
            setLoading(true);
            const response = await masterClient.get(`/state/${country_code}`);
            if (response?.data?.status) {
                setStates(response?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // get cities
    const getCities = async (state_code) => {
        try {
            setLoading(true);
            const response = await masterClient.get(`/city/${state_code}`);
            if (response?.data?.status) {
                setCities(response?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // update localities
    const handleEdit = (locality) => {
        setFormData({
            ...locality
        });
        // formData.country_code = locality.country_code;
        // formData.state_code = locality.state_code;
        // formData.city_code = locality.city_code;
        // formData.locality_name = locality.locality_name;
        setUpdate(locality);
        setShow(true);
    }

    // post locality

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'country_code') {
            getStates(e.target.value);
        }
        if (e.target.name === 'state_code') {
            getCities(e.target.value);
        }
    }

    const Validate = () => {
        let isValid = true;
        let errors = {};
        if (!formData.country_code) {
            isValid = false;
            errors.country_code = "Please select country";
        }
        if (!formData.state_code) {
            isValid = false;
            errors.state_code = "Please select state";
        }
        if (!formData.city_code) {
            isValid = false;
            errors.city_code = "Please select city";
        }
        if (!formData.locality_name) {
            isValid = false;
            errors.locality_name = "Please enter locality name";
        }
        setFormErr(errors);
        return isValid;
    }

    const handleSubmit = async () => {
        if (Validate()) {
            try {
                setLoading(true);
                let response;
                if (update?.id) {
                    response = await masterClient.put(`/locality/${update?.id}`, formData);
                }
                else {
                    response = await masterClient.post('/locality', formData);
                }
                if (response?.data?.status) {
                    toastSuccess(response?.data?.message);
                    setShow(false);
                    setFormData({});
                    setFormErr({});
                    getLocalities();
                }
            }
            catch (error) {
                if (error?.response?.data?.data) {
                    setFormErr(error?.response?.data?.data);
                }
                else {
                    toastError(error?.response?.data?.message);
                }
            }
            finally {
                setLoading(false);
            }
        }
        else {
            console.log(formErr);
            toastError("Please fill all the fields");
        }
    }

    useEffect(() => {
        getLocalities();
        getCountries();
    }, []);

    useEffect(() => {
        getStates(formData.country_code);
        getCities(formData.state_code);
    }, [formData.country_code, formData.state_code]);

    return (
        <>
            {loading && <Loader />}
            {!loading && <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><a href="/">Terraterri</a></li>
                                            <li className="breadcrumb-item active">Localities</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        <button className='btn btn-info' onClick={() => setShow(true)}>Add Localities</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-md-12'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Localities</h3>
                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by locality name"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <div className="table-responsive-md">
                                            <table className="table text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Locality</th>
                                                        <th>Country</th>
                                                        <th>State</th>
                                                        <th>City</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {localities?.map((locality, index) => (
                                                    <tbody key={index}>
                                                        <tr>
                                                            <td className="align-middle">{index + 1}</td>
                                                            <td className="align-middle">{locality.locality_name}</td>
                                                            <td className="align-middle">{locality.country_code}</td>
                                                            <td className="align-middle">{locality.state_code}</td>
                                                            <td className="align-middle">{locality.city_code}</td>
                                                            <td className="table-icons">
                                                                <tr>
                                                                    <td onClick={() => handleEdit(locality)}>
                                                                        <i className="fas fa-edit"></i>
                                                                    </td>
                                                                    <td onClick={() => deleteLocalities(locality.id)}>
                                                                        <i className="fa fa-trash"></i>
                                                                    </td>
                                                                </tr>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Add Localities</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="custom-validation">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <select
                                                        className="form-select"
                                                        name="country_code"
                                                        required
                                                        onChange={handleChange}
                                                        value={formData.country_code || ''}
                                                    >
                                                        <option value="default">Select Country</option>
                                                        {allCountries?.map((country, index) => (
                                                            <option key={index} value={country.country_code}>{country.country_name}</option>
                                                        ))}
                                                    </select>
                                                    {formErr?.country_code && <p className="err">{formErr?.country_code}</p>}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    name="state_code"
                                                    required
                                                    onChange={handleChange}
                                                    value={formData.state_code || ''}
                                                >
                                                    <option value="default">Select State</option>
                                                    {states?.map((state, index) => (
                                                        <option key={index} value={state.state_code}>{state.state_name}</option>
                                                    ))}
                                                </select>
                                                {formErr?.state_code && <p className="err">{formErr?.state_code}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    name="city_code"
                                                    required
                                                    onChange={handleChange}
                                                    value={formData.city_code || ''}
                                                >
                                                    <option value="default">Select City</option>
                                                    {cities?.map((city, index) => (
                                                        <option key={index} value={city.city_code}>{city.city_name}</option>
                                                    ))}
                                                </select>
                                                {formErr?.city_code && <p className="err">{formErr?.city_code}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" id="locality-name" className="form-control"
                                                        name="locality_name"
                                                        placeholder="Insert your firstname"
                                                        onChange={handleChange}
                                                        value={formData.locality_name || ''}
                                                    />
                                                    {formErr?.locality_name && <p className="err">{formErr?.locality_name}</p>}
                                                    <label for="locality-name" className="fw-normal">Add Locality Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary" type="button" onClick={handleSubmit}>Save</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </Offcanvas.Body>
                        </Offcanvas>

                    </div>
                </div>
            </div>}
        </>
    );
}

export default Localities;
