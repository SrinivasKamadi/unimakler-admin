import React from 'react'
import { Link } from 'react-router-dom'
const AddCities = () => {
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
                                        <li className="breadcrumb-item active">Add Cities</li>
                                    </ol>
                                </div>
                                <div className="page-title-right">
                                    <Link to='/cities'><button className='btn btn-info'>Cities</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col-md-6'>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Add Cities</h3>
                                </div>
                                <div className="card-body">
                                    <form className="custom-validation" action="#">
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input type="text" id="country" className="form-control" name="country" placeholder="Insert your firstname" required />
                                                <label for="country" className="fw-normal">Enter Country</label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input type="text" id="state" className="form-control" name="state" placeholder="Insert your firstname" required />
                                                <label for="state" className="fw-normal">Enter State</label>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <div className="form-floating">
                                                <input type="text" id="city-name" className="form-control" name="cityName" placeholder="Insert your firstname" required />
                                                <label for="city-name" className="fw-normal">Add City Name</label>
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

export default AddCities