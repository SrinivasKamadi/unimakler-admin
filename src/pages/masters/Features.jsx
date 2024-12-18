import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

const Features = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feature, setFeatures] = useState([]);
  const [featureHeader, setFeatureHeader] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  //getFeature Headers
  const getFeatureHeaders = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('specialfeaturesheader');
      console.log('get Feature Headers====', res);
      if (res?.data?.status) {
        setFeatureHeader(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //getFeatures
  const getFeatures = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('specialfeatures');
      console.log('get Features====', res);
      if (res?.data?.status) {
        setFeatures(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //handleChange
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //validate
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.special_features_header_id) {
      isFormValid = false;
      errors.special_features_header_id = 'Please select Feature Header';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter Feature';
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
        res = await masterClient.put(`specialfeatures/${update.id}`, form);
      } else {
        res = await masterClient.post('specialfeatures', form);
      }
      try {
        setLoading(true);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getFeatures();
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

  //delete Features
  const deletFeature = async (feId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`specialfeatures/${feId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getFeatures();
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit Features
  const handleEdit = (featureData) => {
    setShow(true);
    setForm({ ...featureData });
    setUpdate(featureData);
  };

  useEffect(() => {
    getFeatureHeaders();
    getFeatures();
    getFeatures();
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
                      <li className="breadcrumb-item active">Features</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button
                      onClick={() => {
                        setShow(true);
                      }}
                      className="btn btn-info">
                      Add Features
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Features</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by feature name"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Feature Header Id</th>
                            <th>Sub Feature Name</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feature.map((feature, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{feature.special_features_header_id}</td>
                              <td className="align-middle">{feature.name}</td>
                              <td className="align-middle">{feature.description}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(feature)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deletFeature(feature.id)}>
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
                          <h3 className="card-title">Add Features</h3>
                        </div>
                        <div className="card-body">
                          <form className="custom-validation">
                            <div className="mb-3">
                              <select
                                className="form-select"
                                name="special_features_header_id"
                                value={form?.special_features_header_id || ''}
                                onChange={handleChange}>
                                <option value="default">Select Feature Header</option>
                                {featureHeader.map((item, index) => (
                                  <option key={index} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                              {formErr.special_features_header_id && (
                                <p className="err">{formErr.special_features_header_id}</p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  id="project-type"
                                  className="form-control"
                                  name="name"
                                  placeholder="Feature Name"
                                  value={form?.name || ''}
                                  onChange={handleChange}
                                />
                                <label for="feature" className="fw-normal">
                                  Sub Feature Name
                                </label>
                                {formErr.name && <p className="err">{formErr.name}</p>}
                              </div>
                            </div>

                            <div className="mb-3">
                              <div className="form-floating">
                                <textarea
                                  type="text"
                                  id="project-type"
                                  className="form-control"
                                  name="description"
                                  value={form?.description || ''}
                                  onChange={handleChange}></textarea>
                                <label for="project-type" className="fw-normal">
                                  Description
                                </label>
                                {formErr.description && (
                                  <p className="err">{formErr.description}</p>
                                )}
                              </div>
                            </div>
                            <div className="col-12">
                              <button
                                className="btn btn-primary"
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
