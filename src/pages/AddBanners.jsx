import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { masterClient, projectClient } from '../utils/httpClient';
import { toastSuccess, toastError, toastWarning } from '../utils/toast';
// import { toast } from 'react-toastify';


const AddBanners = () => {
  const [loading, setloader] = useState(false);
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [update, setUpdate] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [banners, setBanners] = useState([]);
  const [bannerTypes, setBannerTypes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [eliteBanner, seteliteBanners] = useState([]);
  const [primeBanner, setprimeBanners] = useState([]);
  const [featureBanner, setfeatureBanners] = useState([]);
  const [search, setSearch] = useState({});

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    console.log(e.target.name, e.target.value);
  };

  /** get projects based on the filter */

  const filterProjectNames = async () => {
    setloader(true);
    try {
      const response = await projectClient.get(`listing-data`);
      if (response?.data?.status) {
        const data = response?.data?.data;
        if (data) {
          const projects = data.filter(
            (project) =>
              project.country_code === form.country_code &&
              project.state_code == form.state_code &&
              project.city_code === form.city_code
          );
          setProjects(projects);
          if (projects.length === 0) {
            toastWarning('No projects found');
          }
        } else {
          toastWarning('No projects found');
        }
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  // get countries
  const getCountries = async () => {
    try {
      setloader(true);
      const response = await masterClient.get('/country');
      if (response?.data?.status) {
        setAllCountries(response?.data?.data);
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  // get states
  const getStates = async (country) => {
    try {
      setloader(true);
      const response = await masterClient.get(`/state/${country}`);
      if (response?.data?.status) {
        setStates(response?.data?.data);
        console.log('response ====', response?.data?.data);
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  // get cities
  const getCities = async (state) => {
    try {
      setloader(true);
      const response = await masterClient.get(`/city/${state}`);
      if (response?.data?.status) {
        setCities(response?.data?.data);
        console.log('response ====', response?.data?.data);
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  /** function to get the website banners data from db */

  const getBanners = async () => {
    try {
      setloader(true);
      const response = await masterClient.get('/website-banners');
      if (response?.data?.status) {
        setBanners(response?.data?.data);
        const elite = response?.data?.data.filter((banner) => banner.placement === 'Elite');
        seteliteBanners(elite);
        const prime = response?.data?.data.filter((banner) => banner.placement === 'prime');
        setprimeBanners(prime);
        const feature = response?.data?.data.filter((banner) => banner.placement === 'featured');
        setfeatureBanners(feature);
        console.log('======>', response?.data?.data);
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  const handlesearch = async (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));

    if (name === 'country_code') getStates(value);
    if (name === 'state_code') getCities(value);
    
  };

  const searchBanners = async () => {

    let elite = eliteBanner;
    let prime = primeBanner;
    let featured = featureBanner;


    if (search.country_code) {
      elite = elite.filter((project) => project.country_code === search.country_code);
      prime = prime.filter((project) => project.country_code === search.country_code);
      featured = featured.filter((project) => project.country_code === search.country_code);
    }
    if (search.state_code) {
      elite = elite.filter((project) => project.state_code === search.state_code);
      prime = prime.filter((project) => project.state_code === search.state_code);
      featured = featured.filter((project) => project.state_code === search.state_code);
    }
    if (search.city_code) {
      elite = elite.filter((project) => project.city_code === search.city_code);
      prime = prime.filter((project) => project.city_code === search.city_code);
      featured = featured.filter((project) => project.city_code === search.city_code);
    }
    seteliteBanners(elite);
    setprimeBanners(prime);
    setfeatureBanners(featured);
    setSearch({})
  };
  /** function to get removed the website banner */

  const deleteBanner = async (id) => {
    try {
      setloader(true);
      const response = await masterClient.delete(`/website-banners/${id}`);
      if (response?.data?.status) {
        toastSuccess(response?.data?.message);
        getBanners();
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  /** function to get the banner types data */

  const getBannerTypes = async () => {
    try {
      setloader(true);
      const response = await masterClient.get('/banner-types');
      if (response?.data?.status) {
        setBannerTypes(response?.data?.data);
      }
    } catch (error) {
      toastError(error?.response?.data?.message);
    } finally {
      setloader(false);
    }
  };

  /** function for validating the form upon clicking on submit */

  const validate = () => {
    let isValid = true;
    let allErr = {};

    if (!form.country_code) {
      isValid = false;
      allErr.country = 'Country is madatory';
    }
    if (!form.state_code) {
      isValid = false;
      allErr.state = 'State is madatory';
    }
    if (!form.city_code) {
      isValid = false;
      allErr.city = 'City is madatory';
    }
    if (!form.banner_type_id) {
      isValid = false;
      allErr.banner_type = 'Banner type is madatory';
    }
    if (!form.project_listing_id) {
      isValid = false;
      allErr.project = 'Project is madatory';
    }

    setFormErr(allErr);
    return isValid;
  };

  /** function to handle form submit if satisfies the validation function */

  const handleSubmit = async () => {
    if (validate()) {
      if (form.banner_type_id == 7 && eliteBanner.length > 3) {
        toastError('Only Enter Four Banner Only');
        return;
      }
      if (form.banner_type_id == 5 && primeBanner.length > 7) {
        toastError('Only Enter Eight Banner Only');
        return;
      }
      if (form.banner_type_id == 7 && primeBanner.length > 15) {
        toastError('Only Enter Eight Banner Only');
        return;
      }
      try {
        setloader(true);
        let response;
        if (update) {
          response = await masterClient.put(`/website-banners/${form.id}`, form);
        } else {
          response = await masterClient.post('/website-banners', form);
        }
        if (response?.data?.status) {
          toastSuccess(response?.data?.message);
          getBanners();
          setShow(false);
          setForm({});
          setFormErr({});
          setUpdate(false);
        }
      } catch (error) {
        toastError(error?.response?.data?.message);
      } finally {
        setloader(false);
      }
    }
  };

  const edit = async (data) => {
    setForm({ ...data });
    setUpdate(true);
    setShow(true);
  };

  useEffect(() => {
    getCountries();
    getBannerTypes();
    getBanners(); // get banners
  }, []);

  useEffect(() => {
    getStates(form.country_code);
    getCities(form.state_code);
    filterProjectNames(form.city_code);
  }, [form.country_code, form.state_code, form.city_code]);

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

            <div className="row justify-content-center ">
              <div className="col-md-10">
                <div className="cardd mb-4 cardd-input">
                  {/* <div className="card-header">
                    <h3 className="card-title">Search Projects</h3>
                  </div> */}
                  <div className="card-body">
                    <h3 className="card-title mb-3">Search Banners</h3>

                    
                      <div className="row">
                        <div className="col-md-2">
                          <div className="">
                            <select
                              className="form-select"
                              onChange={handlesearch}
                              name="country_code"
                              required>
                              <option value="default">Select Country</option>
                              {allCountries.map((country, index) => (
                                <option key={index + 1} value={country.country_code}>
                                  {country.country_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="">
                            <select
                              className="form-select"
                              onChange={handlesearch}
                              name="state_code"
                              required>
                              <option value="default">Select State</option>
                              {states?.map((state, index) => (
                                <option key={index} value={state.state_code}>
                                  {state.state_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="">
                            <select
                              className="form-select"
                              onChange={handlesearch}
                              name="city_code"
                              required>
                              <option value="default">Select City</option>
                              {cities?.map((city, index) => (
                                <option key={index} value={city.city_code}>
                                  {city.city_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* <div className="col-md-3">
                          <div className="">
                            <select className="form-select" name="propertyType" required>
                              <option value="default">Select Project Placement</option>
                              <option value="default">Project Placement</option>
                              {bannerTypes?.map((bannerType, index) => (
                                <option key={bannerType?.id} value={bannerType?.id}>
                                  {bannerType?.name}
                            </option>
                          ))}
                            </select>
                          </div>
                        </div> */}

                        <div className="col-md-1">
                          <button className="btn btn-primary" onClick={searchBanners}>
                            Search
                          </button>
                        </div>
                        {/* <div className="col-12 text-center">
                        <button className="btn btn-primary" type="submit">
                          Save
                        </button>
                      </div> */}
                      </div>
                   
                  </div>
                </div>
              </div>
            </div>

              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Hyderabad Home Banners</h3>
                      <h3 className="card-title">Elite</h3>
                      {/* <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          value={searchTerm}
                        />
                      </div> */}
                    </div>
                    <div className="card-body">
                      <div className="table-responsive-md">
                        <table className="table text-nowrap mb-0">
                          <thead>
                            <tr>
                              <th>S.No</th>
                              <th>Country</th>
                              <th>State</th>
                              <th>City</th>
                              <th>Project Placement</th>
                              <th>Project</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {eliteBanner.map((elite, index) => (
                              <tr key={elite?.id}>
                                <td>{index + 1}</td>
                                <td>{elite?.country_code}</td>
                                <td>{elite?.state_code}</td>
                                <td>{elite?.city_code}</td>
                                <td>{elite?.placement}</td>
                                <td>{elite?.name}</td>

                                <td>
                                  <td>
                                    <i className="fas fa-edit" onClick={() => edit(elite)}></i>
                                  </td>
                                  <td>
                                    <i
                                      className="fa fa-trash"
                                      onClick={() => deleteBanner(elite?.id)}></i>
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

            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Hyderabad Home Banners</h3>
                    {/* <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                      />
                    </div> */}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Project Placement</th>
                            <th>Project</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {primeBanner.map((prime, index) => (
                            <tr key={prime?.id}>
                              <td>{index + 1}</td>
                              <td>{prime?.country_code}</td>
                              <td>{prime?.state_code}</td>
                              <td>{prime?.city_code}</td>
                              <td>{prime?.placement}</td>
                              <td>{prime?.name}</td>

                              <td>
                                <td>
                                  <i className="fas fa-edit" onClick={() => edit(prime)}></i>
                                </td>
                                <td>
                                  <i
                                    className="fa fa-trash"
                                    onClick={() => deleteBanner(prime?.id)}></i>
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

            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Hyderabad Home Banners</h3>
                    {/* <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                      />
                    </div> */}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Country</th>
                            <th>State</th>
                            <th>City</th>
                            <th>Project Placement</th>
                            <th>Project</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {featureBanner.map((feature, index) => (
                            <tr key={feature?.id}>
                              <td>{index + 1}</td>
                              <td>{feature?.country_code}</td>
                              <td>{feature?.state_code}</td>
                              <td>{feature?.city_code}</td>
                              <td>{feature?.placement}</td>
                              <td>{feature?.name}</td>

                              <td>
                                <td>
                                  <i className="fas fa-edit" onClick={() => edit(feature)}></i>
                                </td>
                                <td>
                                  <i
                                    className="fa fa-trash"
                                    onClick={() => deleteBanner(feature?.id)}></i>
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

            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add Banner</h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="country_code"
                          required
                          onChange={onChange}
                          value={form.country_code || ''}>
                          <option value="default">Select Country</option>
                          {allCountries?.map((country, index) => (
                            <option key={index} value={country.country_code}>
                              {country.country_name}
                            </option>
                          ))}
                        </select>
                        {formErr.country_code && <p className="err">{formErr.country_code}</p>}
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="state_code"
                          required
                          onChange={onChange}
                          value={form?.state_code || ''}>
                          <option value="default">Select State</option>
                          {states?.map((state, index) => (
                            <option key={index} value={state.state_code}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                        {formErr.state_code && <p className="err">{formErr.state_code}</p>}
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="city_code"
                          required
                          onChange={onChange}
                          value={form?.city_code || ''}>
                          <option value="default">Select City</option>
                          {cities?.map((city, index) => (
                            <option key={index} value={city.city_code}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                        {formErr.city_code && <p className="err">{formErr.city_code}</p>}
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          aria-placeholder="Select Expo Type"
                          name="banner_type_id"
                          onChange={onChange}
                          value={form?.banner_type_id || ''}>
                          <option value="default">Project Placement</option>
                          {bannerTypes?.map((bannerType, index) => (
                            <option key={bannerType?.id} value={bannerType?.id}>
                              {bannerType?.name}
                            </option>
                          ))}
                        </select>
                        {formErr.banner_type_id && <p className="err">{formErr.banner_type_id}</p>}
                      </div>
                      <div className="mb-3">
                        <select
                          className="form-select"
                          name="project_listing_id"
                          onChange={onChange}
                          required
                          value={form.project_listing_id || ''}>
                          <option value="">Select Project</option>
                          {projects?.map((project, index) => (
                            <option key={project?.id} value={project?.id}>
                              {project?.name}
                            </option>
                          ))}
                        </select>
                        {formErr.project_listing_id && (
                          <p className="err">{formErr.project_listing_id}</p>
                        )}
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
  );
};

export default AddBanners;
