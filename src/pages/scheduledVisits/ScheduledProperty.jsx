import React from 'react'

const ScheduledProperty = () => {
  return (
    <div className="main-content">

      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item"><a href="javascript: void(0);">Terraterri</a></li>
                    <li className="breadcrumb-item active">Scheduled Property</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className='col-md-6'>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Property Scheduled Visits</h3>
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
                      <select className="form-select" name="state" required>
                        <option value="default">Select State</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <select className="form-select" name="city" required>
                        <option value="default">Select City</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <select className="form-select" name="subProject" required>
                        <option value="default">Select Sub Project</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <select className="form-select" name="projectName" required>
                        <option value="default">Project Name</option>
                        <option value=""></option>
                        <option value=""></option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <div className="form-floating">
                        <input type="date" id="from-date" className="form-control" name="fromdate" placeholder="Insert your lastname" required />
                        <label for="from-date" className="fw-normal">From Date</label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="form-floating">
                        <input type="date" id="to-date" className="form-control" name="todate" placeholder="Insert your lastname" required />
                        <label for="to-date" className="fw-normal">To Date</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button className="btn btn-primary" type="submit">Save</button>
                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScheduledProperty