import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning } from '../../utils/toast';
import Loader from '../../components/Loader';

const SubProjectType = () => {
  const [show, setShow] = useState(false);
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({})
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [projectsubType, setProjectsubType] = useState([])

  // get all projects
  const allProjects = async () => {
    try {
      setLoading(true);
      const res = await masterClient.get('projecttype');
      if (res?.data?.status) {
        setProjects(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  };

  // get All sub projects

  const allSubProjects = async () => {
    try {
      setLoading(true);
      const res = await masterClient.get('projectsubtype');
      if (res?.data?.status) {
        setProjectsubType(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  };

  // delete sub project
  const deleteSubProject = async (subProjectId) => {
    try {
      setLoading(true);
      const res = await masterClient.delete(`projectsubtype/${subProjectId}`);
      if (res?.data?.status) {
        toastSuccess(res?.data?.message);
        allSubProjects();
      }
    } catch (e) {
      console.log(e);
    }
    finally {
      setLoading(false);
    }
  };

  // post sub project

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let error = true;
    let allErrs = {}
    if (!form.project_type_id) {
      error = false;
      allErrs.project_type_id = 'Project is mandatory'
    }
    if (!form.name) {
      error = false;
      allErrs.name = 'Sub Project name is mandatory'
    }
    if (!form.description) {
      error = false;
      allErrs.description = 'Sub Project description is mandatory'
    }
    setFormErr(allErrs)
    return (error);
  }

  const handleEdit = (data) => {
    setForm({ ...data })
    setUpdate(true);
    setShow(true);
  }

  const handleSubmit = async () => {
    if (validate()) {
      try {
        setLoading(true);
        let res;
        if (update) {
          res = await masterClient.put(`projectsubtype/${form.id}`, form)
        }
        else {
          res = await masterClient.post('projectsubtype', form)
        }
        if (res?.data?.status) {
          setShow(false)
          allSubProjects();
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
      toastWarning('Please fill the form correctly');
    }
  }




  useEffect(() => {
    allProjects();
    allSubProjects();
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
                      <li className="breadcrumb-item active">Add Sub Project type</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <button onClick={() => setShow(true)} className="btn btn-info">
                      Add Sub Project Type
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Sub Project Types</h3>
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
                            <th>Project type</th>
                            <th>Sub Project Type</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectsubType.map((project, index) => (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{project.project_type_id}</td>
                              <td>{project.name}</td>
                              <td className="table-icons">
                                <tr>
                                  <td>
                                    <i className="fas fa-edit" onClick={() => handleEdit(project)}></i>
                                  </td>
                                  <td>
                                    <i className="fa fa-trash" onClick={() => deleteSubProject(project?.id)}></i>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          ))
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                      <div className="card">
                        <div className="card-header">
                          <h3 className="card-title">Add Sub Project Type</h3>
                        </div>
                        <div className="card-body">
                          <form className="custom-validation">
                            <div className="mb-3">
                              <select className="form-select" name="project_type_id" required value={form.project_type_id || ''} onChange={onChange}>
                                <option value="default">Select Project</option>
                                {projects.map((project, index) => (
                                  <option key={index} value={project.id}>
                                    {project.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-3">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  id="sub-project-type"
                                  className="form-control"
                                  name="name"
                                  placeholder="Insert your firstname"
                                  required
                                  value={form?.name || ''}
                                  onChange={onChange}
                                />
                                <label for="sub-project-type" className="fw-normal">
                                  Enter Sub Project Type
                                </label>
                              </div>
                            </div>
                            <div className="mb-3">
                              <div className="form-floating">
                                <input
                                  type="text"
                                  id="sub-project-type"
                                  className="form-control"
                                  name="description"
                                  placeholder="Insert your firstname"
                                  required
                                  value={form?.description || ''}
                                  onChange={onChange}

                                />
                                <label for="sub-project-type" className="fw-normal">
                                  Enter Description
                                </label>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SubProjectType;
