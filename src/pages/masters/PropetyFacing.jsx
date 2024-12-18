import React, { useState, useEffect, useContext } from 'react';
import { masterClient } from '../../utils/httpClient';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { toastSuccess, toastWarning, toastError, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

const PropetyFacing = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [proFacing, getProFacing] = useState([]);
  const [countries, setCountries] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  // get countries

  const allCountries = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      console.log(res);
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //handle Change
  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
  };

  //Validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_code) {
      isFormValid = false;
      errors.country_code = 'Please Select the Country';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter Property Facing';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter Description';
    }
    setFormErr(errors);
    return isFormValid;
  };

  //handle Submit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`propertyfacing/${update.id}`, form);
      } else {
        res = await masterClient.post('propertyfacing', form);
      }
      try {
        setLoading(true);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setForm({});
          setFormErr({});
          getPropertyType();
          setShow(false);
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

  // get Property Facing
  const getPropertyType = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('/propertyfacing');
      console.log('get Prop Facing====', res);
      if (res.data?.status) {
        getProFacing(res.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete Property Facing
  const deletPropertyFacing = async (propId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`propertyfacing/${propId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getPropertyType();
      }
    } catch (err) {
      console.log(err);
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  //Edit Property Facing
  const handleEdit = (proFacingData) => {
    setShow(true);
    setForm({ ...proFacingData });
    setUpdate(proFacingData);
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
                      <li className="breadcrumb-item active">Add Property Facing</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Property Facing
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Property Facing</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by location"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Country Code</th>
                            <th>Propert Facing</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {proFacing.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.country_code}</td>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(item)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deletPropertyFacing(item.id)}>
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
                    <h3 className="card-title">Add Property Facing</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation" action="#">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="country_code"
                          value={form?.country_code || ''}
                          onChange={handleChange}>
                          <option value="default">Select Country</option>
                          {countries.map((item, index) => (
                            <option key={index} value={item.country_code}>
                              {item.country_name}
                            </option>
                          ))}
                        </select>
                        {formErr.country_code && <p className="err"> {formErr.country_code}</p>}
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="project-type"
                            className="form-control"
                            name="name"
                            placeholder="Enter Property Facing"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Property Facing{' '}
                          </label>
                          {formErr.name && <p className="err"> {formErr.name}</p>}
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
                          {formErr.description && <p className="err"> {formErr.description}</p>}
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
export default PropetyFacing;
