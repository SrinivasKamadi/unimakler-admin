import React from 'react';
import { Link } from 'react-router-dom';
const AddAmenities = () => {
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
                    <li className="breadcrumb-item active">Add Sub Amenities</li>
                  </ol>
                </div>
                <div className="page-title-right">
                  <Link to="/amenities">
                    <button className="btn btn-info">Amenities</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Add sub Amenities</h3>
                </div>
                <div className="card-body">
                  <form className="custom-validation" action="#">
                    <div className="mb-3">
                      <select className="form-select" name="property" required>
                        <option value="default">Select Property</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select className="form-select" name="subProperty" required>
                        <option value="default">Select Sub Property</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <select className="form-select" name="amenities" required>
                        <option value="default">Select Amenities</option>
                        <option value="">Club House</option>
                        <option value="">Fitness</option>
                        <option value="">Convinience</option>
                        <option value="">Saftey & Security</option>
                        <option value="">Others</option>
                        <option value="">Landscaping</option>
                        <option value="">Network & Connectivity</option>
                      </select>
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

export default AddAmenities;
