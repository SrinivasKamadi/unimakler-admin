import React, { useState, useEffect } from 'react'
import Loader from '../../components/Loader'
import { masterClient } from '../../utils/httpClient'
import { toastWarning, toastError, toastSuccess } from '../../utils/toast'
import Offcanvas from 'react-bootstrap/Offcanvas';

const BannerType = () => {

    const [loading, setloader] = useState(false);
    const [show, setShow] = useState(false);
    const [bannerType, setBannerType] = useState([]);
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [update, setUpdate] = useState(false);

    /** function get data for banner types from db  */

    const getBannerType = async () => {
        setloader(true);
        try {
            const response = await masterClient.get('/banner-types');
            if (response?.data?.status) {
                setBannerType(response?.data?.data);
            } else {
                toastWarning('No data found');
            }
        } catch (error) {
            toastError('Failed to fetch data');
        } finally {
            setloader(false);
        }
    }

    /** function to delete the banner type from db */

    const deleteBannerType = async (id) => {
        setloader(true);
        try {
            const response = await masterClient.delete(`/banner-types/${id}`);
            if (response?.data?.status) {
                toastSuccess(response?.data?.message);
                getBannerType(); // method call to refresh the updated data in the table
            } else {
                toastWarning('Failed to delete banner type');
            }
        } catch (error) {
            toastError('Failed to delete banner type');
        } finally {
            setloader(false);
        }

    }

    /** function to handle the form input changes */

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    /** function to handle the form validation */

    const Validation = () => {
        let errors = {};
        let isValid = true;
        if (!form?.name) {
            errors.name = 'Name is required';
            isValid = false;
        }
        if (!form?.description) {
            errors.description = 'Description is required';
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    }

    /** function to handle the form submit based on validation condition */

    const handleSubmit = async () => {
        if (Validation()) {
            setloader(true);
            let response;
            try {
                if (update) {
                    response = await masterClient.put(`/banner-types/${form?.id}`, form);
                } else {
                    response = await masterClient.post('/banner-types', form);
                }
                if (response?.data?.status) {
                    toastSuccess(response?.data?.message);
                    getBannerType(); // method call to refresh the updated data in the table
                    setShow(false);
                    setForm({});
                    setUpdate(false);
                } else {
                    toastWarning('Failed to add banner type');
                }
            } catch (error) {
                toastError('Failed to add banner type');
            } finally {
                setloader(false);
            }
        }

    }

    /** function to handle the updation of banner types based on id */

    const editBannerType = async (id) => {
        const selectedBannerType = bannerType.find((item) => item.id === id);
        if (selectedBannerType) {
            setForm(selectedBannerType);
            setShow(true)
            setUpdate(true);
        } else {
            toastWarning('Banner type not found');
        }
    };

    /** function to hide the offcanvas and setting some states to default values */

    const hideOffcanvas = () => {
        setShow(false);
        setForm({});
        setErrors({});
        setUpdate(false);

    }


    useEffect(() => {
        getBannerType(); // get data for banner types from db
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
                                            <li className="breadcrumb-item active">Add Banner</li>
                                        </ol>
                                    </div>
                                    <div className="page-title-right">
                                        <button className="btn btn-info" onClick={() => setShow(true)}>
                                            Add Banner
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Banners</h3>
                                        <div className="mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Search"
                                            />
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive-md">
                                            <table className="table text-nowrap mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Banner type name</th>
                                                        <th>Banner type description</th>

                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bannerType.map((item, index) => (
                                                        <tr key={item?.id}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.name}</td>
                                                            <td>{item?.description}</td>
                                                            <td>
                                                                <td>
                                                                    <i className="fas fa-edit" onClick={() => editBannerType(item?.id)}></i>
                                                                </td>
                                                                <td>
                                                                    <i
                                                                        className="fa fa-trash" onClick={() => deleteBannerType(item?.id)}></i>
                                                                </td>
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

                        <Offcanvas show={show} onHide={hideOffcanvas} placement="end">
                            <Offcanvas.Header closeButton></Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Add Banner Type</h3>
                                    </div>
                                    <div className="card-body">
                                        <form className="custom-validation">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    id="name"
                                                    className="form-control"
                                                    name="name"
                                                    placeholder="please enter banner type name"
                                                    onChange={handleChange}
                                                    required
                                                    value={form?.name || ''}
                                                />
                                                <label for="project-type" className="fw-normal">
                                                    banner type name
                                                </label>
                                            </div>

                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    id="description"
                                                    className="form-control"
                                                    name="description"
                                                    placeholder="please enter banner type description"
                                                    onChange={handleChange}
                                                    value={form?.description || ''}
                                                    required
                                                />
                                                <label for="project-type" className="fw-normal">
                                                    banner type description
                                                </label>
                                            </div>


                                            <div className="col-12">
                                                <button
                                                    className="btn btn-primary"
                                                    type="button"
                                                    onClick={handleSubmit}
                                                >
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

export default BannerType