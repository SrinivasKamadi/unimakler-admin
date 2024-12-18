import React from 'react';
import { Link } from 'react-router-dom';
const AddBanks = () => {
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
                    <li className="breadcrumb-item active">Add Banks</li>
                  </ol>
                </div>
                <div className="page-title-right">
                  <Link to="/banks">
                    <button className="btn btn-info">Banks</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add Banks</h3>
                </div>
                <div className="card-body">
                  <form className="custom-validation" action="#">
                    <div className="mb-3">
                      <select className="form-select" name="country" required>
                        <option value="default">Select Country</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="text"
                          id="project-type"
                          className="form-control"
                          name="projectType"
                          placeholder="Insert your bankName"
                          required
                        />
                        <label for="project-type" className="fw-normal">
                          Bank Name
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-floating">
                        <input
                          type="file"
                          id="bank-logo"
                          className="form-control"
                          name="bankLogo"
                          accept="image/*"
                          required
                        />
                        <label for="project-type" className="fw-normal">
                          Bank Logo
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

export default AddBanks;
