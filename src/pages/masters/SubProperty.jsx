import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastWarning, toastError, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';
const SubProperty = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subProperty, setSubProperty] = useState([]);
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [update, setUpdate] = useState({});

  // get Country
  const getCountry = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      console.log('countries===', res);
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // get PropertTypes
  const getProperty = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('propertytype');
      console.log(res);
      if (res?.data?.status) {
        setProperty(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // get subProperties
  const getSubProperty = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('propertysubtype');
      console.log('subPro====', res);
      if (res?.data?.status) {
        setSubProperty(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // handlechange
  const handleChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.property_type_id) {
      isFormValid = false;
      errors.property_type_id = 'Please select the Property type';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter the Sub-Property';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter the Description';
    }
    setFormError(errors);
    return isFormValid;
  };

  // handleSubmit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`propertysubtype/${update.id}`, form);
      } else {
        res = await masterClient.post('propertysubtype', form);
      }
      try {
        setLoading(true);
        // console.log('subtype===', res);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormError({});
          setForm({});
          setShow(false);
          getSubProperty();
        }
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    } else {
      toastError('please fill mandatory fields');
      console.log(err);
    }
  };

  // delete sub properties
  const deleteSubProp = async (subId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`propertysubtype/${subId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getSubProperty();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //Edit Sub Property
  const handleEdit = (subPropertyData) => {
    setShow(true);
    setForm({ ...subPropertyData });
    setUpdate(subPropertyData);
  };

  useEffect(() => {
    getSubProperty();
    getCountry();
    getProperty();
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
                      <li className="breadcrumb-item active">Sub Property type</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Sub Property Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Sub Property Types</h3>
                    <div className="">
                      <input
                        type="text"
                        id="searchSubProperty"
                        className="form-control"
                        placeholder="Search sub property name"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Property ID</th>
                            <th>Property Type</th>
                            <th>Sub Property</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subProperty.map((subProp, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{subProp.property_type_id}</td>
                              <td>Residential</td>
                              <td>{subProp.name}</td>
                              <td>{subProp.description}</td>
                              {/* <td>{subProp.}</td> */}
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(subProp)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deleteSubProp(subProp.id)}>
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
                  <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Add Sub Property Type</h3>
                        </div>
                        <div className="card-body">
                          <form className="custom-validation">
                            <div className="mb-3"></div>
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="property_type_id"
                                value={form?.property_type_id || ''}
                                onChange={handleChange}>
                                <option value="default">Select Property Type</option>
                                {property.map((property, index) => (
                                  <option key={index + 1} value={property.id}>
                                    {property.name}
                                  </option>
                                ))}
                              </select>
                              {formError.property_type_id && (
                                <p className="err">{formError.property_type_id}</p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  id="property-type"
                                  className="form-control"
                                  name="name"
                                  placeholder="Insert your firstname"
                                  value={form?.name || ''}
                                  onChange={handleChange}
                                />
                                <label for="property-type" className="fw-normal">
                                  Enter sub Property Type
                                </label>
                                {formError.name && <p className="err">{formError.name}</p>}
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="form-floating">
                                <textarea
                                  type="text"
                                  id="property-type"
                                  className="form-control"
                                  name="description"
                                  value={form?.description || ''}
                                  onChange={handleChange}></textarea>
                                <label for="description" className="fw-normal">
                                  Enter Description
                                </label>
                                {formError.description && (
                                  <p className="err">{formError.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-12">
                              <button
                                onClick={handleSubmit}
                                className="btn btn-primary"
                                type="button">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SubProperty;
