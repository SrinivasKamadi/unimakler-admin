import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';

import Modal from "react-bootstrap/Modal";



const AddBuilders = () => {
  // const ProjectType = () => {
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bulders, setBuilders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ipInfo } = useContext(IpInfoContext);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //hanndle Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter Builder Name';
    }
    if (!form.headoffice_location) {
      isFormValid = false;
      errors.headoffice_location = 'Please Enter Location';
    }
    if (!form.md_name) {
      isFormValid = false;
      errors.md_name = 'Please Enter MD Name';
    }
    if (!form.md_phone_number) {
      isFormValid = false;
      errors.md_phone_number = 'Enter Phone Number';
    }
    if (!form.cp_manager_name) {
      isFormValid = false;
      errors.cp_manager_name = 'Please Enter CP Name';
    }
    if (!form.cp_manager_phone_number) {
      isFormValid = false;
      errors.cp_manager_phone_number = 'Enter Phone Number';
    }
    if (!form.sales_manager_name) {
      isFormValid = false;
      errors.sales_manager_name = 'Please Enter Sale Manager Name';
    }
    if (!form.sales_manager_phone_number) {
      isFormValid = false;
      errors.sales_manager_phone_number = ' Enter Phone Number';
    }
    if (!form.slug) {
      isFormValid = false;
      errors.slug = 'Please Enter Slug';
    }
    if (!form.logo_path) {
      isFormValid = false;
      errors.logo_path = 'Please Choose Logo';
    }
    setFormErr(errors);
    return isFormValid;
  };

  //handle Submit
  const handleSubmit = async () => {
    if (validate()) {
      try {
        setLoading(true);
        const res = await masterClient.post('builder', form);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message);
          setForm({});
          setFormErr({});
          setShow(false);
          getBuilders();
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.type === 'Validation error' && error?.response?.data?.data) {
          setFormErr(error?.response?.data?.data);
        } else {
          toastError(error?.response?.data?.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      toastWarning('Please fill Mandetory Fields');
    }
  };

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

  //delete Builder
  const deleteBuilder = async (bId) => {
    setLoading(true);
    try {
      const res = await masterClient.delete(`builder/${bId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        getBuilders();
      }
    } catch (err) {
      toastError(err);
    } finally {
      setLoading(false);
    }
  };



  // Edit Builder
  const handleEdit = (builderData) => {
    setShow(true);
    setForm({ ...builderData });
  }

  useEffect(() => {
    getBuilders();
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
                      <li className="breadcrumb-item active">Add Builders</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Builder
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Builder</h3>
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
                            <th>Builder Name</th>
                            <th>Head Office Location</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bulders.map((builder, index) => (
                            <tr key={index + 1}>
                              <td>{builder.id}</td>
                              <td>{builder.name}</td>
                              <td>{builder.headoffice_location}</td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(builder)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td  onClick={handleShow}>
                                    <i className="fa fa-eye"></i>
                                  </td>
                                  <td onClick={() => deleteBuilder(builder.id)}>
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
                    <h3 className="card-title">Add Project Type</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation" action="#">
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="name"
                            placeholder="Builder Name"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Builder Name{' '}
                          </label>
                          {formErr.name && <p className="err">{formErr.name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="headoffice_location"
                            placeholder="Head Office Location"
                            value={form?.headoffice_location || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Head Office Location
                          </label>
                          {formErr.headoffice_location && (
                            <p className="err">{formErr.headoffice_location}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="md_name"
                            placeholder="Enter MD Name"
                            value={form?.md_name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter MD Name
                          </label>
                          {formErr.md_name && <p className="err">{formErr.md_name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="number"

                            className="form-control"
                            name="md_phone_number"
                            placeholder="MD Phone Number"
                            value={form?.md_phone_number || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Phone Number
                          </label>
                          {formErr.md_phone_number && (
                            <p className="err">{formErr.md_phone_number}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="cp_manager_name"
                            placeholder="CP Manager Name"
                            value={form?.cp_manager_name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Channel Partner Manager Name
                          </label>
                          {formErr.cp_manager_name && (
                            <p className="err">{formErr.cp_manager_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="number"

                            className="form-control"
                            name="cp_manager_phone_number"
                            placeholder="Phone Number"
                            value={form?.cp_manager_phone_number || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Phone Number
                          </label>
                          {formErr.cp_manager_phone_number && (
                            <p className="err">{formErr.cp_manager_phone_number}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="sales_manager_name"
                            placeholder="Sales manager Name"
                            value={form?.sales_manager_name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Sales manager Name
                          </label>
                          {formErr.sales_manager_name && (
                            <p className="err">{formErr.sales_manager_name}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="number"

                            className="form-control"
                            name="sales_manager_phone_number"
                            placeholder="Phone Number"
                            value={form?.sales_manager_phone_number || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Phone Number
                          </label>
                          {formErr.sales_manager_phone_number && (
                            <p className="err">{formErr.sales_manager_phone_number}</p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"

                            className="form-control"
                            name="slug"
                            placeholder="Slug"
                            value={form?.slug || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Builder Website URL{' '}
                          </label>
                          {formErr.slug && <p className="err">{formErr.slug}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="file"
                            id="build-logo"
                            className="form-control"
                            name="logo_path"
                            accept="image/*"
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Logo
                          </label>
                          {formErr.logo_path && <p className="err">{formErr.logo_path}</p>}
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


          {/* ///////////////////// */}



          <Modal show={show} onHide={handleClose} className="listings_popup services_sub">
            <Modal.Header closeButton>

            </Modal.Header>

           <div className='card-body'>
            <div className="row">
            <div className="col-md-12">
                <div className="card">
                  <div className="card-header  content_header">
                    <h3 className="card-title">Builder Details </h3>
                    <i className="fas fa-edit"></i>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                            <h6>Builder Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Prestige Group
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <h6>Head Office Location</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                          <h6>MD Name</h6>
                          </div>
                          <div className="col-md-6">
                            <p>
                              <span className="me-3">:</span>Residential Plot
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
           </div>
            </Modal>
          <div className="row justify-content-center">
{/*--------------------> title & types<-------------------------*/}
         

              Prestige Group
Enter Builder Name
Hyderabad
Head Office Location
Prestige MD
Enter MD Name
7676879999
Enter Phone Number
Prestige CP
Channel Partner Manager Name
7676879999
Enter Phone Number
Prestige SM
Sales manager Name
7676879999
Enter Phone Number
A
Builder Website URL
No file chosen
Logo
            </div>

          {/* ///////////////////// */}
        </div>
      </div>
    </>
  );
};

export default AddBuilders;
