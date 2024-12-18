import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { Offcanvas } from 'react-bootstrap';
import { IpInfoContext } from '../../utils/context';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';

const BuilderLocation = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ipInfo } = useContext(IpInfoContext);
  const [builderLocation, setBuilderLocation] = useState([]);
  const [builders, setBuilders] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  //get Builders
  const getBuilders = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('builder');
      console.log('Get Builders====', res);
      if (res?.data?.status) {
        setBuilders(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

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

  //get All States
  const getAllStates = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('state');
      console.log('get All States=====', res);
      if (res?.daat?.status) {
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
    if (e.target.name == 'state') {
      allCities(e.target.value);
    }
  };

  // validation

  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.builder_id) {
      isFormValid = false;
      errors.builder_id = 'Please Select the Builder';
    }
    if (!form.state) {
      isFormValid = false;
      errors.state = 'Please Select the State';
    }
    if (!form.city) {
      isFormValid = false;
      errors.city = 'Please Select the City';
    }

    if (!form.address) {
      isFormValid = false;
      errors.address = 'Please Enter the Address';
    }

    if (!form.contact_person_name) {
      isFormValid = false;
      errors.contact_person_name = 'Please Enter COntact Person (CP)';
    }
    if (!form.contact_person_phone_number) {
      isFormValid = false;
      errors.contact_person_phone_number = 'Please Enter CP Phone Number';
    }

    setFormErr(errors);
    return isFormValid;
  };

  // handleSubmit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`builderlocations/${update.id}`, form);
      } else {
        res = await masterClient.post('builderlocations', form);
      }
      try {
        setLoading(true);
        // console.log('submit result=====', res);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getBuilderLocation();
        }
      } catch (error) {
        if (error?.response?.data?.type === 'Validation error' && error?.response?.data?.data) {
          setFormErr(error?.response?.data?.data);
        } else {
          toastError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toastError('please fill mandatory fields');
      console.log(formErr);
    }
  };

  //getBulder Locations
  const getBuilderLocation = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('builderlocations');
      console.log('get Builder Locations======', res);
      if (res?.data?.status) {
        setBuilderLocation(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //delete Builder
  const deleteBuilderLocaion = async (bId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`builderlocations/${bId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getBuilderLocation();
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit Builder location
  const handleEdit = (builderLocationData) => {
    setShow(true);
    setForm({ ...builderLocationData });
    setUpdate(builderLocationData);
  };

  useEffect(() => {
    getBuilderLocation();
    getBuilders();
    allCountries();
    getAllStates();

    if (update?.country_code) {
      getStatesByCountry(update?.country_code);
    }
    if (update?.state) {
      allCities(update?.state);
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
                      <li className="breadcrumb-item active">Builder Location</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Builder Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Builder Details</h3>
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
                            <th>Builder ID</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Contact person (CP)</th>
                            <th>CP Phone Number</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {builderLocation.map((location, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{location.builder_id}</td>
                              <td className="align-middle">{location.state}</td>
                              <td className="align-middle">{location.city}</td>
                              <td className="align-middle">{location.address}</td>
                              <td className="align-middle">{location.contact_person_name}</td>
                              <td className="align-middle">
                                {location.contact_person_phone_number}
                              </td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(location)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deleteBuilderLocaion(location.id)}>
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
                    <h3 className="card-title">Add Builder Location</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="builder_id"
                          value={form?.builder_id || ''}
                          onChange={handleChange}>
                          <option value="default">Select Builder</option>
                          {builders.map((builder, index) => (
                            <option key={index} value={builder.id}>
                              {builder.name}
                            </option>
                          ))}
                        </select>
                        {formErr.builder_id && <p className="err">{formErr.builder_id}</p>}
                      </div>

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
                        {/* {formErr.country_code && <p className="err">{formErr.country_code}</p>} */}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="state"
                          value={form?.state || ''}
                          onChange={handleChange}>
                          <option value="default">Select State</option>
                          {states.map((state, index) => (
                            <option key={index} value={state.state_code}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                        {formErr.state && <p className="err">{formErr.state}</p>}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="city"
                          value={form?.city || ''}
                          onChange={handleChange}>
                          <option value="default">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city.city_name}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                        {formErr.city && <p className="err">{formErr.city}</p>}
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <textarea
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="address"
                            value={form?.address || ''}
                            onChange={handleChange}></textarea>
                          <label for="Address" className="fw-normal">
                            Add Address
                          </label>
                          {formErr.address && <p className="err">{formErr.address}</p>}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="contact_person_name"
                            placeholder="Insert your firstname"
                            value={form?.contact_person_name || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Contact Person Name
                          </label>
                          {formErr.contact_person_name && (
                            <p className="err">{formErr.contact_person_name}</p>
                          )}
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="number"
                            id="add-approval"
                            className="form-control"
                            name="contact_person_phone_number"
                            placeholder="Insert your firstname"
                            value={form?.contact_person_phone_number || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Contact person Phone No
                          </label>
                          {formErr.contact_person_phone_number && (
                            <p className="err">{formErr.contact_person_phone_number}</p>
                          )}
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
export default BuilderLocation;
