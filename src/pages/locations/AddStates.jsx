import React from 'react'
import { Link } from 'react-router-dom'
const AddStates = () => {
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
                                        <li className="breadcrumb-item active">Add States</li>
                                    </ol>
                                </div>
                                <div className="page-title-right">
                                    <Link to='/states'><button className='btn btn-info'>States</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col-md-6'>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Add States</h3>
                                </div>
                                <div className="card-body">
                                    <form className="custom-validation" action="#">
                                        <div className="mb-3">
                                            <select className="form-select" name="country" required>
                                                <option value="default">Select Country</option>
                                                <option value="">India</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" name="state" required>
                                                <option value="default">Select State</option>
                                                <option value="">Telangana</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input type="text" id="state-name" className="form-control" name="stateName" placeholder="Insert your firstname" required />
                                                <label for="state-name" className="fw-normal">State Code</label>
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

export default AddStates