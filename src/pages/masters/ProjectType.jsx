import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning } from '../../utils/toast';
import Loader from '../../components/Loader';

const ProjectType = () => {

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({})
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState(false);
  // post form data

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let error = true;
    let allErrs = {}

    if (!form.country_code) {
      error = false;
      allErrs.country_code = 'country is mandatory'
    }
    if (!form.name) {
      error = false;
      allErrs.name = 'Project name is mandatory'
    }
    if (!form.description) {
      error = false;
      allErrs.description = 'project description is mandatory'
    }
    setFormErr(allErrs)
    return (error);
  }

  const edit = async (data) => {
    setForm({ ...data })
    setUpdate(true);
    setShow(true);
  }

  const storeProjectName = async () => {
    if (validate()) {
      try {
        setLoading(true);
        let res;
        if (update) {
          res = await masterClient.put(`projecttype/${form.id}`, form)
        }
        else {
          res = await masterClient.post('projecttype', form)
        }
        if (res?.data?.status) {
          setShow(false)
          allProjects();
          toastSuccess(res?.data?.message);
          setForm({})
          setFormErr({})
        }
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setLoading(false);
      }
    }
    else {
      toastError('pls check the mandatory fields')
    }
  }

  // get All countries

  const allCountries = async () => {
    try {
      setLoading(true)
      const res = await masterClient.get('country');
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    }
    catch (e) {
      toastError(e?.response?.data?.message)
    }
    finally {
      setLoading(false)
    }
  }

  // get all projects
  const allProjects = async () => {
    try {
      setLoading(true)
      const res = await masterClient.get('projecttype');
      if (res?.data?.status) {
        setProjects(res?.data?.data)
      }
    }
    catch (err) {
      toastError('something error');
    }
    finally {
      setLoading(false)
    }
  }


  // delete projects

  const deleteProject = async (id) => {
    try {
      setLoading(true);
      const res = await masterClient.delete(`projecttype/${id}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message)
        allProjects();
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    allCountries()
    allProjects()
  }, [])

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
                      <li className="breadcrumb-item active">Add Project type</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Project Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Project Types</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by location"
                        value={searchTerm}

                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Location</th>
                            <th>Project Name</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.map((project, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{project?.country_code}</td>
                              <td>{project?.name}</td>
                              <td className="table-icons">
                                <tr>
                                  <td>
                                    <i className="fas fa-edit" onClick={() => edit(project)}></i>
                                  </td>
                                  <td>
                                    <i className="fa fa-trash" onClick={() => deleteProject(project?.id)}></i>
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
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select className="form-select" name="country_code" required onChange={onChange} value={form.country_code || ''}>
                          <option value="default">Select Country</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country.country_code}>{country.country_name}</option>
                          ))}

                        </select>
                      </div>
                      {formErr.country_code && <p className='err'>{formErr.country_code}</p>}
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="project-type"
                            className="form-control"
                            name="name"
                            onChange={onChange}
                            required
                            value={form.name || ''}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Project Type
                          </label>
                        </div>
                        {formErr.name && <p className='err'>{formErr.name}</p>}
                      </div>
                      <div className="mb-3">
                        <div className="form-floating">
                          <input
                            type="text"
                            id="project-type"
                            className="form-control"
                            name="description"
                            onChange={onChange}
                            required
                            value={form.description || ''}
                          />
                          <label for="project-type" className="fw-normal">
                            Enter Project Description
                          </label>
                        </div>
                        {formErr.description && <p className='err'>{formErr.description}</p>}
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary" type="button" onClick={storeProjectName}>
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

export default ProjectType;
