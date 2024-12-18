import React from 'react';
import { Link } from 'react-router-dom';
const AddSubProjectType = () => {
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="javascript: void(0);">Terraterri</a>
                    </li>
                    <li className="breadcrumb-item active">Add Sub Project type</li>
                  </ol>
                </div>
                <div className="page-title-right">
                  <Link to="/ProjectType">
                    <button className="btn btn-info">Project Types</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Sub Project Type</h3>
                </div>
                <div className="card-body">
                  <form className="custom-validation" action="#">
                    <div className="mb-3">
                      <select className="form-select" name="subProject" required>
                        <option value="default">Select Sub Project</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="sub-project-type"
                          className="form-control"
                          name="subProjectType"
                          placeholder="Insert your firstname"
                          required
                        />
                        <label for="sub-project-type" className="fw-normal">
                          Enter Sub Project Type{' '}
                        </label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubProjectType;
