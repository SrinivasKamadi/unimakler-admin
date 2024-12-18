import React, { useState, useEffect, useContext } from 'react';
import { masterClient } from '../../utils/httpClient';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { toastSuccess, toastWarning, toastError, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';
import { findObjFromArr } from '../../utils/HOC';

const RegistrationGstPrices = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [regiisterPrices, setRegisterPrices] = useState([]);
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
    if (e.target.name == 'country_id') {
      const obj = findObjFromArr(countries, e.target.value, 'id');
      //   setForm({ ...form, [e.target.name]: obj['id'] });
      // console.log("objjjj", obj, e.target.value)
      getStatesByCountry(obj['country_code']);
    }
    if (e.target.name == 'state_id') {
      const obj = findObjFromArr(states, e.target.value, 'id');
      //   setForm({ ...form, [e.target.name]: obj['id'] });
      allCities(obj['state_code']);
    }
    // if (e.target.name == 'city_id') {
    const obj = findObjFromArr(cities, e.target.value, 'id');
    //   setForm({ ...form, [e.target.name]: obj['id'] });
    // }
  };

  //   validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_id) {
      isFormValid = false;
      errors.country_id = 'Please Select the Country';
    }
    if (!form.state_id) {
      isFormValid = false;
      errors.state_id = 'Please Select the State';
    }
    if (!form.city_id) {
      isFormValid = false;
      errors.city_id = 'Please Select the City';
    }

    if (!form.prices_name) {
      isFormValid = false;
      errors.prices_name = 'Please Enter the Price';
    }

    if (!form.registration_percentage) {
      isFormValid = false;
      errors.registration_percentage = 'Please Enter the Registration %';
    }
    if (!form.gst_percentage) {
      isFormValid = false;
      errors.gst_percentage = 'Please Enter the GST %';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter the Description';
    }

    setFormErr(errors);
    return isFormValid;
  };

  console.log(form);

  // handleSubmit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`registration-gst-prices/${update.id}`, form);
      } else {
        res = await masterClient.post('registration-gst-prices', form);
      }
      try {
        setLoading(true);
        // const
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getRegistarionGstPrices();
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

  // get RegistarionGstPrices
  const getRegistarionGstPrices = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('registration-gst-prices');
      console.log('result===', res);
      if (res?.data?.status) {
        setRegisterPrices(res?.data?.data);
      }
    } catch (error) {
      console.log('error result=====', error);
    } finally {
      setLoading(false);
    }
  };

  // delete Approval
  const deletRegistarionGstPrices = async (regPriceId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`registration-gst-prices/${regPriceId}`);
      console.log(res);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getRegistarionGstPrices();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // edit approval
  const handleEdit = (registerPriceData) => {
    setShow(true);
    setForm({ ...registerPriceData });
    setUpdate(registerPriceData);
    // console.log('registerPriceData====', registerPriceData);
  };

  useEffect(() => {
    getRegistarionGstPrices();
    allCountries();
    console.log('========', update);
    if (update?.country_id) {
      const obj = findObjFromArr(countries, update?.country_id, 'id');
      getStatesByCountry(obj['country_code']);
    }
    if (update?.state_id) {
      const obj = findObjFromArr(states, update?.state_id, 'id');
      allCities(obj['state_code']);
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
                      <li className="breadcrumb-item active">Registration & GST %</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Registration GST Prices
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Registration & GST %</h3>
                    <div className="mb-3">
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
                            <th>Registartion Price</th>
                            <th>Description</th>
                            <th>Country Id</th>
                            <th>State Id</th>
                            <th>City Id</th>
                            <th>Registration %</th>
                            <th>GST %</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regiisterPrices.map((registerPrice, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{registerPrice.prices_name}</td>
                              <td className="align-middle">{registerPrice.description}</td>
                              <td className="align-middle">{registerPrice.country_id}</td>
                              <td className="align-middle">{registerPrice.state_id}</td>
                              <td className="align-middle">{registerPrice.city_id}</td>
                              <td className="align-middle">
                                {registerPrice.registration_percentage}
                              </td>
                              <td className="align-middle">{registerPrice.gst_percentage}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(registerPrice)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deletRegistarionGstPrices(registerPrice.id)}>
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
                    <h3 className="card-title">Add Registration GST Price</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="country_id"
                          value={form?.country_id || ''}
                          onChange={handleChange}>
                          <option value="default">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index + 1} value={country.id}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                        {formErr.country_id && <p className="err">{formErr.country_id}</p>}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="state_id"
                          value={form?.state_id || ''}
                          onChange={handleChange}>
                          <option value="default">Select State</option>
                          {states.map((state, index) => (
                            <option key={index + 1} value={state.id}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                        {formErr.state_id && <p className="err">{formErr.state_id}</p>}
                      </div>

                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="city_id"
                          value={form?.city_id || ''}
                          onChange={handleChange}>
                          <option value="default">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index + 1} value={city.id}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                        {formErr.city_id && <p className="err">{formErr.city_id}</p>}
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="prices_name"
                            value={form?.prices_name || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Add Price Name
                          </label>
                          {formErr.prices_name && <p className="err">{formErr.prices_name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="registration_percentage"
                            value={form?.registration_percentage || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Add Registration %
                          </label>
                          {formErr.registration_percentage && (
                            <p className="err">{formErr.registration_percentage}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="gst_percentage"
                            value={form?.gst_percentage || ''}
                            onChange={handleChange}
                          />
                          <label for="add-approval" className="fw-normal">
                            Add GST %
                          </label>
                          {formErr.gst_percentage && (
                            <p className="err">{formErr.gst_percentage}</p>
                          )}
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

export default RegistrationGstPrices;
