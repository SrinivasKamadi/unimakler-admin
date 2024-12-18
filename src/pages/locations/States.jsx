import React, { useState, useEffect } from 'react';
import { masterClient } from '../../utils/httpClient';
import Loader from '../../components/Loader';
import { toastError, toastSuccess } from '../../utils/toast';
import Offcanvas from "react-bootstrap/Offcanvas";
import { State } from 'country-state-city';
const States = () => {

    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    const [allCountries, setAllCountries] = useState([]);
    const [allStates, setAllStates] = useState([]);
    const [formData, setFormData] = useState({});
    const [formErr, setFormErr] = useState({});

    // get states data
    const getStates = async () => {
        try {
            const statesData = await masterClient.get('/state');
            if (statesData?.data?.status) {
                setStates(statesData?.data?.data);
                console.log(states);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // delete state

    const deleteState = async (stateCode) => {
        try {
            setLoading(true);
            const res = await masterClient.delete(`/state/${stateCode}`);
            if (res?.data?.status) {
                toastSuccess(res?.data?.message);
                getStates();
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
            const res = await masterClient.get('/country');
            if (res?.data?.status) {
                setAllCountries(res?.data?.data);
            }
        }
        catch (error) {
            toastError(error?.response?.data?.message);
        }
        finally {
            setLoading(false);
        }
    }

    // post States
    const handleCountryChange = (e) => {
        const countryName = e.target.value;
        setAllStates(State.getStatesOfCountry(countryName))
        setFormData({ ...formData, country_code: countryName })
    }

    const handleStateChange = (e) => {
        const stateName = e.target.value;
        const stateCode = allStates?.find((state) => state.name === stateName)?.isoCode;
        setFormData({ ...formData, state_name: stateName, state_code: stateCode })
    }

    const validation = () => {
        let isValid = true;
        const err = {};

        if (!formData?.country_code) {
            isValid = false;
            err.country_code = 'Please select country';
        }
        if (!formData?.state_name) {
            isValid = false;
            err.state_name = 'Please select state';
        }
        if (!formData?.state_code) {
            isValid = false;
            err.state_code = 'Please enter state code';
        }
        setFormErr(err);
        return isValid;
    }

    const handleSubmit = async () => {
        if (!validation()) {
            console.log('error');
        }
        else {
            try {
                setLoading(true);
                const response = await masterClient.post('/state', formData);
                if (response?.data?.status) {
                    toastSuccess(response?.data?.message);
                    getStates();
                    setFormData({});
                    setFormErr({});
                    setShow(false);
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
    }


    useEffect(() => {
        getStates();
        getCountries();
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
                                            <li className="breadcrumb-item"><a href="/">Terraterri</a></li>
                                            <li className="breadcrumb-item active">States</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        <button className='btn btn-info' onClick={() => setShow(true)}>Add States</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className='col-md-12'>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">States</h3>
                                        <div className="">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search by state name"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive-md">
                                            <table className="table text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>State name</th>
                                                        <th>State code</th>
                                                        <th>Country code</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {states?.map((state, index) => (
                                                        <tr key={state.id}>
                                                            <td className="align-middle">{index + 1}</td>
                                                            <td className="align-middle">{state.state_name}</td>
                                                            <td className="align-middle">{state.state_code}</td>
                                                            <td className="align-middle">{state.country_code}</td>
                                                            <td className="table-icons">
                                                                <tr>
                                                                    <td onClick={() => deleteState(state.state_code)}>
                                                                        <i className="fa fa-trash"></i>
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

                        <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
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
                                                <select className="form-select" name="country_code" required onChange={handleCountryChange}>
                                                    <option value="default">Select Country</option>
                                                    {allCountries?.map((country) => (
                                                        <option key={country.country_code} value={country.country_code}>{country.country_name}</option>
                                                    ))}
                                                </select>
                                                {formErr?.country_code && <p className='text-danger'>{formErr?.country_code}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <select className="form-select" name="state_name" required onChange={handleStateChange}>
                                                    <option value="default">Select State</option>
                                                    {allStates?.map((state) => (
                                                        <option key={state.isoCode} value={state.name}>{state.name}</option>
                                                    ))}
                                                </select>
                                                {formErr?.state_name && <p className='text-danger'>{formErr?.state_name}</p>}
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input type="text" id="state-name" className="form-control" name="state_code"
                                                        value={formData.state_code || ''}
                                                        required />
                                                    <label for="state-name" className="fw-normal">State Code</label>
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
            </div>
        </>
    );
}

export default States;
