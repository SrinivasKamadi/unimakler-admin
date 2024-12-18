import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastWarning, toastError, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

const Approvals = () => {
  const [show, setShow] = useState(false);
  const [approval, setApproval] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  // get countries
  const allCountries = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      console.log('get countries=====', res);
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   getAll States
  const getStatesByCountry = async (param) => {
    setLoading(true);
    try {
      const res = await masterClient.get(`state/${param}`);
      console.log('get states=====', res);
      if (res?.data?.status) {
        setStates(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  //   getAll Cities
  const allCities = async (param) => {
    setLoading(true);
    try {
      const res = await masterClient.get(`city/${param}`);
      console.log('get cities=====', res);
      if (res?.data?.status) {
        setCities(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   handle Change
  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name == 'country_code') {
      getStatesByCountry(e.target.value);
    }
    if (e.target.name == 'state_code') {
      allCities(e.target.value);
    }
  };

  //   validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_code) {
      isFormValid = false;
      errors.country_code = 'Please Select the Country';
    }
    if (!form.state_code) {
      isFormValid = false;
      errors.state_code = 'Please Select the State';
    }
    if (!form.city_code) {
      isFormValid = false;
      errors.city_code = 'Please Select the City';
    }

    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter the Approval';
    }

    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter the Description';
    }

    setFormErr(errors);
    return isFormValid;
  };

  // handleSubmit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`approval-authority/${update.id}`, form);
      }
      else {
        res = await masterClient.post('approval-authority', form);
      }
      try {
        setLoading(true);
        // const 
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getApprovalAuthority();
        }
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    } else {
      toastError('please fill mandatory fields');
      console.log(formErr);
    }
  };


  // get ApprovalAuthority
  const getApprovalAuthority = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('approval-authority');
      console.log('result===', res);
      if (res?.data?.status) {
        setApproval(res?.data?.data);
      }
    } catch (error) {
      console.log('error result=====', error);
    } finally {
      setLoading(false);
    }
  };


  // delete Approval 
  const deletApproval = async (appId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`approval-authority/${appId}`);
      console.log(res);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getApprovalAuthority();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  // edit approval
  const handleEdit = (approvalData) => {
    setShow(true);
    setForm({ ...approvalData })
    setUpdate(approvalData);
    // console.log('approvalData====', approvalData);
  }

  useEffect(() => {
    getApprovalAuthority();
    allCountries();
    if (update?.country_code) {
      getStatesByCountry(update?.country_code)
    }
    if (update?.state_code) {
      allCities(update?.state_code)
    }
  }, [update]);
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
                      <li className="breadcrumb-item active">Approval Authorities</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Approval authority
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Approval Authorities</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by authority name"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {approval.map((approv, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{approv.name}</td>
                              <td className="align-middle">{approv.country_code}</td>
                              <td className="align-middle">{approv.state_code}</td>
                              <td className="align-middle">{approv.city_code}</td>
                              <td className="align-middle">{approv.description}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(approv)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deletApproval(approv.id)}>
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
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add Approval Authorities</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="country_code"
                          value={form?.country_code || ''}
                          onChange={handleChange}>
                          <option value="default">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index + 1} value={country.country_code}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                        {formErr.country_code && <p className="err">{formErr.country_code}</p>}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="state_code"
                          value={form?.state_code || ''}
                          onChange={handleChange}>
                          <option value="default">Select State</option>
                          {states.map((state, index) => (
                            <option key={index + 1} value={state.state_code}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                        {formErr.state_code && <p className="err">{formErr.state_code}</p>}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="city_code"
                          value={form?.city_code || ''}
                          onChange={handleChange}>
                          <option value="default">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index + 1} value={city.city_code}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                        {formErr.city_code && <p className="err">{formErr.city_code}</p>}
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="name"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Add Approval Authority
                          </label>
                          {formErr.name && <p className="err">{formErr.name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <textarea
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="description"
                            value={form?.description || ''}
                            onChange={handleChange}></textarea>
                          <label for="Description" className="fw-normal">
                            Add Description
                          </label>
                          {formErr.description && <p className="err">{formErr.description}</p>}
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary" type="button" onClick={handleSubmit}>
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

export default Approvals;
