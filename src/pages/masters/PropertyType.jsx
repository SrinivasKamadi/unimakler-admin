import React, { useState, useEffect, useContext } from 'react';
import { masterClient } from '../../utils/httpClient';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { toastSuccess, toastWarning, toastError, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';
const PropertyType = () => {
  const [show, setShow] = useState(false);
  const [propertyType, setPropertyType] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  // get countries

  const allCountries = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      // console.log(res);
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (e) {
      // console.log(e);
    } finally {
      setLoading(false);
    }
  };

  // delete Property
  const deletProperty = async (propId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`propertytype/${propId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getPropertyType();
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // get Property type
  const getPropertyType = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('/propertytype');
      if (res.data?.status) {
        setPropertyType(res.data?.data);
      }
    } catch (error) {
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // post property type

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_code) {
      isFormValid = false;
      errors.country_code = 'please select the country';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'please enter the property type';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'please enter the description';
    }
    setFormErr(errors);
    return isFormValid;
  };

  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      let res;
      if (update?.id) {
        res = await masterClient.put(`propertytype/${update.id}`, form);
      } else {
        res = await masterClient.post('propertytype', form);
      }
      try {

        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getPropertyType();
        }
      } catch (err) {
        toastError(err);
      } finally {
        setLoading(false);
      }
    } else {
      toastError('please fill mandatory fields');
      // console.log(formErr);
    }
  };

  //edit property type
  const handleEdit = (propertydata) => {
    setShow(true);
    setForm({ ...propertydata });
    setUpdate(propertydata);
  };

  useEffect(() => {
    getPropertyType();
    allCountries();
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
                      <li className="breadcrumb-item active">Property type</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Property Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Property Types</h3>
                    <div className="">
                      <input type="text" className="form-control" placeholder="Search by name" />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Country</th>
                            <th>Property Type</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {propertyType.map((property, index) => (
                            <tr key={property.id}>
                              <td>{index + 1}</td>
                              <td>{property.country_code}</td>
                              <td>{property.name}</td>
                              <td>{property.description}</td>
                              <td >
                                <i onClick={() => handleEdit(property)} className="far fa-edit"></i>
                                <i onClick={() => deletProperty(property.id)} className="fa fa-trash"></i>
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
                    <h3 className="card-title">Add Property Type</h3>
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
                            <option key={index} value={country.country_code}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                        {formErr.country_code && <p className="err">{formErr.country_code}</p>}
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
                          <label htmlFor="property-type" className="fw-normal">
                            Enter Property Type
                          </label>
                          {formErr.name && <p className="err">{formErr.name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <textarea
                            id="property-type"
                            className="form-control"
                            name="description"
                            value={form?.description || ''}
                            onChange={handleChange}></textarea>
                          <label htmlFor="description" className="fw-normal">
                            Enter Description
                          </label>
                          {formErr.description && <p className="err">{formErr.description}</p>}
                        </div>
                      </div>
                      <div className="col-12">
                        <button
                          className="btn btn-primary text-center"
                          type="button"
                          onClick={handleSubmit}>
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

export default PropertyType;
