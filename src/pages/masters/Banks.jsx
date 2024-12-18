import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
import { IpInfoContext } from '../../utils/context';
import { handleImages3 } from '../../utils/S3Handler';
// import swal from 'sweetalert';
// import SweetAlert2 from 'react-sweetalert2';
// import { SwalOptions } from 'sweetalert/typings/modules/options';
import Swal from 'sweetalert2';

const Banks = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const { ipInfo } = useContext(IpInfoContext);
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});

  // get Countries
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

  // handleChanhe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = async (e, index) => {
    setLoading(true);
    let resFromMiddleware = await handleImages3(e);
    console.log('resFromMiddleware===', resFromMiddleware);
    setLoading(false);
    if (resFromMiddleware.clientStatus) {
      setForm((prev) => ({
        ...form,
        [e.target.name]: resFromMiddleware.data.original_image_url
      }));
    } else {
      toastError(resFromMiddleware.data);
    }
  };

  // validation
  const validate = () => {
    let errors = {};
    let isFormValid = true;
    if (!form.country_code) {
      isFormValid = false;
      errors.country_code = 'Please Select Country';
    }
    if (!form.name) {
      isFormValid = false;
      errors.name = 'Please Enter Bank Name';
    }
    if (!form.logo_path) {
      isFormValid = false;
      errors.logo_path = 'Please Choose Bank Logo';
    }
    if (!form.description) {
      isFormValid = false;
      errors.description = 'Please Enter Description';
    }
    setFormErr(errors);
    return isFormValid;
  };

  // post Banks
  const handleSubmit = async () => {
    if (validate()) {
      try {
        setLoading(true);
        const res = await masterClient.post('banks', form);
        console.log(res);
        if (res?.data?.status) {
          // toastSuccess(res?.data?.message);
          Swal.fire('Success!', res?.data?.message, 'success');
          setFormErr({});
          setForm({});
          setShow(false);
          getBanks();
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

  // get Banks
  const getBanks = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('banks');
      console.log('banks result ====', res);
      if (res?.data?.status) {
        setBanks(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // delete banks

  const deleteBank = async (bankId) => {
    setLoading(true);
    try {
      // if (res?.data?.status) {
      // toastSuccess(res?.data?.message);
      // Swal.fire('Success!',res?.data?.message,'success');
      Swal.fire({
        title: 'Are you Sure to Delete the Bank?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: `No`
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await masterClient.delete(`banks/${bankId}`);
          if (res?.data?.status) {
            Swal.fire('success!', res?.data?.message, 'success');
            getBanks();
            setLoading(false);
          } else {
            Swal.fire('failed...', res?.data?.message, 'error');
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      });
    } catch (err) {
      // toastError(err);
      Swal.fire('Failed', res?.data?.message, 'error');
    } finally {
    }
  };

  // Edit Banks
  const handleEdit = (editBank) => {
    setShow(true);
    setForm({ ...editBank });
  };

  useEffect(() => {
    getBanks();
    getCountry();
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
                      <li className="breadcrumb-item active">Banks</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Banks
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Banks</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by bank name"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th> Country</th>
                            <th>Bank Name</th>
                            <th>Bank Logo</th>
                            <th>Description</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {banks.map((bank, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{bank.country_name}</td>
                              <td className="align-middle">{bank.name} </td>
                              <td className="align-middle">
                                {' '}
                                <img src={bank.logo_path} alt="" style={{ width: '100px' }} />
                              </td>
                              <td className="align-middle">{bank.description} </td>
                              <td className="table-icons">
                                <tr>
                                  <td onClick={() => handleEdit(bank)}>
                                    <i className="fas fa-edit"></i>
                                  </td>
                                  <td onClick={() => deleteBank(bank.id)}>
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
                    <h3 className="card-title">Add Banks</h3>
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
                            id="project-type"
                            className="form-control"
                            name="name"
                            placeholder="Insert your bankName"
                            value={form?.name || ''}
                            onChange={handleChange}
                          />
                          <label for="project-type" className="fw-normal">
                            Bank Name
                          </label>
                          {formErr.name && <p className="err">{formErr.name}</p>}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="file"
                            id="bank-logo"
                            className="form-control"
                            name="logo_path"
                            accept="image/*"
                            onChange={handleImage}
                          />
                          <label for="project-type" className="fw-normal">
                            Bank Logo
                          </label>
                          {formErr.logo_path && <p className="err">{formErr.logo_path}</p>}
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

export default Banks;
