import React, { useState, useEffect, useContext } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

const AmenitiesHeader = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [amenitiesHeader, setAmenitiesHeader] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({
            amenities_header_status: 'A',
            created_by: 1,
            created_date: date(),
            created_ip: ipInfo
  });
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});
  const [projects, setProjects] = useState([]);

  // getCountries
  const getCountry = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      console.log('get countries====', res);
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('projecttype');
      if (res?.data?.status) {
        setProjects(res?.data?.data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //   handle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_code) {
      isFormValid = false;
      errors.country_code = 'Please Select the Country';
    }
    if (!form.project_type) {
      isFormValid = false;
      errors.project_type = 'Please Select the Project';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter the Amenity Header';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter the Description';
    }
    setFormErr(errors);
    return isFormValid;
  };

  // handle Submit
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`amenitiesheader/${update.id}`, form);
      } else {
        res = await masterClient.post('amenitiesheader', form);
      }
      try {
        setLoading(true);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({
            amenities_header_status: 'A',
            created_by: 1,
            created_date: date(),
            created_ip: ipInfo
          });
          setShow(false);
          getAmenitiesHeader();
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

  //   get Amenities
  const getAmenitiesHeader = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('amenitiesheader');
      console.log('get Amenities=====', res);
      if (res?.data?.status) {
        setAmenitiesHeader(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // delete Amenities Header
  const dleteAmenityHeader = async (amId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`amenitiesheader/${amId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getAmenitiesHeader();
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  // Edit Amenities Header
  const handleEdit = (ameniHeader) => {
    setShow(true);
    setForm({ ...ameniHeader });
    setUpdate(ameniHeader);
  };

  useEffect(() => {
    getAmenitiesHeader();
    getCountry();
    getProjects();
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
                      <li className="breadcrumb-item active">Amenities Header</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Main Amenities
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Amenities Header</h3>
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
                            <th>Country</th>
                            <th>Amenity</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amenitiesHeader.map((amenity, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{amenity.country_code}</td>
                              <td className="align-middle">{amenity.name}</td>
                              <td className="align-middle">{amenity.description}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(amenity)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => dleteAmenityHeader(amenity.id)}>
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
                    <h3 className="card-title">Create Main Amenities</h3>
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
                        <select
                          className="form-select"
                          name="project_type"
                          onChange={handleChange}
                        >
                          <option value="default" disabled>Select Project Type</option>
                          {projects.map((project, index) => (
                            <option key={index} value={project.name}>
                              {project.name}
                            </option>
                          ))}
                        </select>
                        {formErr.project_type && <p className="err">{formErr.project_type}</p>}
                      </div>

                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="add-approval"
                            className="form-control"
                            name="name"
                            placeholder="Add Amenity Header"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="amenity-header" className="fw-normal">
                            Add Amenity Header
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

export default AmenitiesHeader;
