import React, { useState, useEffect } from 'react';
import { masterClient } from '../../utils/httpClient';
import Loader from '../../components/Loader';
import { toastError, toastSuccess } from '../../utils/toast';
import Offcanvas from "react-bootstrap/Offcanvas";
import { Country, State, City } from 'country-state-city';

const Cities = () => {

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [Allcities, setAllCities] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState({});
    const [update, setUpdate] = useState({});

    // get all countries

    const getAllCountries = async () => {
        try {
            const res = await masterClient.get('/country');
            if (res?.data?.status) {
                setAllCountries(res?.data?.data);
            }
        }
        catch (error) {
            console.log(error);
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // get all cities

    const getAllCities = async () => {
        try {
            const res = await masterClient.get('/city');
            if (res?.data?.status) {
                setCities(res?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        } 899
    }

    //delete cities
    const deleteCity = async (code) => {
        try {
            setLoading(true);
            const res = await masterClient.delete(`/city/${code}`);
            if (res?.data?.status) {
                toastSuccess(res?.data?.message);
                getAllCities();
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // get states by country Id

    const getStatesByCountryId = async (countryId) => {
        try {
            setLoading(true);
            const res = await masterClient.get(`/state/${countryId}`);
            if (res?.data?.status) {
                setStates(res?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // update cities

    const handleEdit = (city) => {
        setFormData({ ...city });
        setShow(true);
        setUpdate(city);
    }

    // post cities

    const handleChange = async (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'country_code') {
            await getStatesByCountryId(e.target.value);
        }
        if (e.target.name === 'state_code') {
            setAllCities(City.getCitiesOfState(formData.country_code, e.target.value));
        }
    }

    const validate = () => {
        let err = {};
        let isValid = true;
        if (!formData.country_code) {
            err.country_code = 'Country is required';
            isValid = false;
        }
        if (!formData.state_code) {
            err.state_code = 'State is required';
            isValid = false;
        }
        if (!formData.city_name) {
            err.city_name = 'City is required';
            isValid = false;
        }
        if (!formData.city_code) {
            err.city_code = 'City Code is required';
            isValid = false;
        }
        setFormErr(err);
        return isValid;

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            let res;
            if (update?.city_code) {
                res = await masterClient.put(`/city/${update?.city_code}`, formData);
            }
            else {
                res = await masterClient.post('/city', formData);
            }
            try {
                setLoading(true);
                if (res?.data?.status) {
                    toastSuccess(res?.data?.message);
                    setShow(false);
                    setFormData({});
                    setFormErr({});
                    getAllCities();
                }
            }
            catch (error) {
                if (error?.response?.data?.type === "Validation error" && error?.response?.data?.data) {
                    setFormErr(error?.response?.data?.data);
                } else {
                    toastError(error?.response?.data?.message);
                }
            }
            finally {
                setLoading(false);
            }
        }
        else {
            toastError('Please fill all the fields');
        }
    }

    useEffect(() => {
        getAllCities();
        getAllCountries();
    },
        []
    );

    useEffect(() => {
        if (update?.country_code) {
            getStatesByCountryId(update?.country_code);
        }
        if (update?.state_code) {
            setAllCities(City.getCitiesOfState(update?.country_code, update?.state_code));
        }
    }, [update?.country_code && update?.state_code]);

    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="page-title-box d-flex align-items-center justify-content-between">
                                    <div className="page-title-right">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item">Terraterri</li>
                                            <li className="breadcrumb-item active">Cities</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        <button className='btn btn-info' onClick={() => setShow(true)}>Add Cities</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-md-12'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Cities</h3>
                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by city name"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body">

                                        <div className="table-responsive-md">
                                            <table className="table text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>City</th>
                                                        <th>City Code</th>
                                                        <th>Country code</th>
                                                        <th>State code</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {loading && <Loader />}
                                                {cities?.map((city, index) => (
                                                    <tbody key={city.id}>
                                                        <tr>
                                                            <td className="align-middle">{index + 1}</td>
                                                            <td className="align-middle">{city.city_name}</td>
                                                            <td className="align-middle">{city.city_code}</td>
                                                            <td className="align-middle">{
                                                                city.country_code
                                                            }</td>
                                                            <td className="align-middle">{
                                                                city.state_code
                                                            }</td>
                                                            <td className="table-icons">
                                                                <td onClick={() => handleEdit(city)}>
                                                                    <i className="fas fa-edit"></i>
                                                                </td>
                                                                <td onClick={() => deleteCity(city.city_code)}>
                                                                    <i className="fa fa-trash"></i>
                                                                </td>
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
                                        <h3 className="card-title">Add Cities</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="custom-validation" action="#">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <select
                                                        className="form-select"
                                                        name="country_code"
                                                        value={formData.country_code || ''}
                                                        onChange={handleChange}>
                                                        <option value="default">Select Country</option>
                                                        {allCountries?.map((country, index) => (
                                                            < option key={index} value={country.country_code} > {country.country_name}</option>
                                                        ))}
                                                    </select>
                                                    {formErr.country_code && <p className='err'>{formErr.country_code}</p>}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <select
                                                        className="form-select"
                                                        name="state_code"
                                                        value={formData.state_code || ''}
                                                        onChange={handleChange} >
                                                        <option value="default">Select State</option>
                                                        {states?.map((state, index) => (
                                                            < option key={index} value={state.state_code} > {state.state_name}</option>
                                                        ))}
                                                    </select>
                                                    {formErr.state_code && <p className='err'>{formErr.state_code}</p>}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <select
                                                        className="form-select"
                                                        name="city_name"
                                                        onChange={handleChange}
                                                        value={formData.city_name || ''}
                                                    >
                                                        <option value="default">Select City</option>
                                                        {Allcities?.map((city, index) => (
                                                            < option key={index} value={city.name} > {city.name}</option>
                                                        ))}
                                                    </select>
                                                    {formErr.city_name && <p className='err'>{formErr.city_name}</p>}
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" id="city-name" className="form-control"
                                                        name="city_code"
                                                        placeholder="Insert your firstname"
                                                        onChange={handleChange}
                                                        value={formData.city_code || ''}
                                                    />
                                                    <label htmlFor="city-name" className="fw-normal"> City Code</label>
                                                    {formErr.city_code && <p className='err'>{formErr.city_code}</p>}
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

                    </div >
                </div >
            </div >
        </>
    );
}

export default Cities;
