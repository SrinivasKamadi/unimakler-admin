import React, { useState, useEffect } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import { toastSuccess, toastError, toastWarning, date } from '../../utils/toast';
const SpecificationHeader = () => {

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [specificationHeader, setSpecificationHeader] = useState([]);
    const [form, setForm] = useState({});
    const [formErr, setFormErr] = useState({});
    const [update, setUpdate] = useState({});
    const [countries, setCountries] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

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

    const validate = () => {
        let errors = {};
        let isFormValid = true;
        if (!form.country_code) {
            isFormValid = false;
            errors.country_code = 'Please select Country';
        }
        if (!form.name) {
            isFormValid = false;
            errors.name = 'Please Enter Specifications Header';
        }
        if (!form.description) {
            isFormValid = false;
            errors.description = 'Please Enter Description';
        }
        setFormErr(errors);
        return isFormValid;
    };

    //handle Submit
    const handleSubmit = async () => {
        if (validate()) {
            let res;
            if (update?.id) {
                res = await masterClient.put(`specificationsheader/${update.id}`, form);
            } else {
                res = await masterClient.post('specificationsheader', form);
            }
            try {
                setLoading(true);
                if (res?.data?.status) {
                    toastSuccess(res?.data?.message);
                    setFormErr({});
                    setForm({});
                    setShow(false);
                    setUpdate({});
                    getgalleryHeaders();
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

    //get Gallery Headers
    const getgalleryHeaders = async () => {
        setLoading(true);
        try {
            const res = await masterClient.get('specificationsheader');
            console.log('get Gallery Headers====', res);
            if (res?.data?.status) {
                setSpecificationHeader(res?.data?.data);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    //delete Gallery Header
    const deletgalleryHeader = async (feId) => {
        setLoading(true);
        try {
            const res = await masterClient.delete(`specificationsheader/${feId}`);
            if (res?.data?.status) {
                toastSuccess(res?.data?.message);
                getgalleryHeaders();
            }
        } catch (err) {
            toastError(err);
        } finally {
            setLoading(false);
        }
    };

    // Edit Gallery Header
    const handleEdit = (headerData) => {
        setShow(true);
        setForm({ ...headerData });
        setUpdate(headerData);
    };



    useEffect(() => {
        getCountry();
        getgalleryHeaders();
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
                                            <li className="breadcrumb-item active">Add Gallery Header</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        <button onClick={() => setShow(true)} className="btn btn-info">
                                            Add Gallery Header
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Gallery Headers</h3>
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
                                                        <th>Gallery Header</th>
                                                        <th>Country Code</th>
                                                        <th>Description</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {specificationHeader.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{index + 1}</td>
                                                            <td>{item.name}</td>
                                                            <td>{item.country_code}</td>
                                                            <td>{item.description}</td>
                                                            <td className="table-icons">
                                                                <tr>
                                                                    <td onClick={() => handleEdit(item)}>
                                                                        <i className="fas fa-edit"></i>
                                                                    </td>
                                                                    <td onClick={() => deletgalleryHeader(item.id)}>
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
                                        <h3 className="card-title">Add Gallery Header</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="custom-validation" action="#">
                                            <div className="mb-3">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        id="project-type"
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Enter Gallery Header"
                                                        value={form?.name || ''}
                                                        onChange={handleChange}
                                                    />
                                                    <label for="project-type" className="fw-normal">
                                                        Enter Gallery Header
                                                    </label>
                                                    {formErr.name && <p className="err">{formErr.name}</p>}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    name="country_code"
                                                    value={form?.country_code || ''}
                                                    onChange={handleChange}>
                                                    <option value="default">Select Country</option>
                                                    {countries.map((item, index) => (
                                                        <option key={index} value={item.country_code}>
                                                            {item.country_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                {formErr.country_code && <p className="err">{formErr.country_code}</p>}
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
    )
}

export default SpecificationHeader