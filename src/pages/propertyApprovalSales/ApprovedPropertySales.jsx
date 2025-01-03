import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";

const ApprovedPropertySales = () => {
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
                                        <li className="breadcrumb-item active">Approved Property Sales</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className='col-md-6'>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Approved Property Sales</h3>
                                </div>
                                <div className="card-body">
                                    <form className="custom-validation" action="#">
                                        <div className="mb-3">
                                            <select className="form-select" name="subProperty" required>
                                                <option value="default">Select Country</option>
                                                <option value="">India</option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" name="propertyType" required>
                                                <option value="default">Select Property Type</option>
                                                <option value=""></option>
                                                <option value=""></option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <select className="form-select" name="subPropertyType" required>
                                                <option value="default">Select Sub Property Type</option>
                                                <option value=""></option>
                                                <option value=""></option>
                                            </select>
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

export default ApprovedPropertySales