import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

const Amenities = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amenityHeader, setAmenityHeader] = useState([]);
  const [amenity, setAmenity] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState({});

  //get Amenity Headers
  const getAmenityHeaders = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('amenitiesheader');
      console.log('Amenity headers=====', res);
      if (res?.data?.status) {
        setAmenityHeader(res?.data?.data);
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

  //validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.amenities_header_id) {
      isFormValid = false;
      errors.amenities_header_id = 'Please select the Amenity Header';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter the Amenity Name';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter the Description';
    }
    setFormErr(errors);
    return isFormValid;
  };

  //post Amenities
  const handleSubmit = async () => {
    if (validate()) {
      let res;
      if (update?.id) {
        res = await masterClient.put(`amenities/${update.id}`, form);
      } else {
        res = await masterClient.post('amenities', form);
      }
      try {
        setLoading(true);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setFormErr({});
          setForm({});
          setShow(false);
          getAllAmenities();
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

  //get Amenities
  const getAllAmenities = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('amenities');
      console.log('getAmenities====', res);
      if (res?.data?.status) {
        setAmenity(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //delete Amenities
  const deleteAmenities = async (amId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`amenities/${amId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getAllAmenities();
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };

  //Edit Amenity
  const handleEdit = (amenityData) => {
    setShow(true);
    setForm({ ...amenityData });
    setUpdate(amenityData);
  };

  useEffect(() => {
    getAmenityHeaders();
    getAllAmenities();
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
                      <li className="breadcrumb-item active">Amenities</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Sub Amenities
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Amenities</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by amenity name"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Amenities Header Id</th>
                            <th>Sub Amenity</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amenity.map((amenity, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{amenity.amenities_header_id}</td>
                              <td className="align-middle">{amenity.name}</td>
                              <td className="align-middle">{amenity.description}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(amenity)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deleteAmenities(amenity.id)}>
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
                    <h3 className="card-title">Add Sub Amenities</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="amenities_header_id"
                          value={form?.amenities_header_id || ''}
                          onChange={handleChange}>
                          <option value="default">Select Amenity Header</option>
                          {amenityHeader.map((amenityHeader, index) => (
                            <option key={index} value={amenityHeader.id}>
                              {amenityHeader.name}
                            </option>
                          ))}
                        </select>
                        {formErr.amenities_header_id && (
                          <p className="err">{formErr.amenities_header_id}</p>
                        )}
                      </div>

                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="project-type"
                            className="form-control"
                            name="name"
                            placeholder="Amenity Name"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Sub Amenity Name
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

export default Amenities;
