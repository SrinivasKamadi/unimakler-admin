import React, { useState, useEffect, useContext } from 'react';
import Loader from '../../components/Loader'
import { authClient, masterClient } from '../../utils/httpClient'
import { toastError, toastSuccess } from '../../utils/toast';

const Addprojectsmanager = () => {

  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [form, setForm] = useState({});
  const [formError, setFormError] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [projectManagers, setProjectmanagers] = useState([]);
  const [AllCities, setAllCities] = useState([]);
  const [projects, setProjects] = useState([]);

  // get countries
  const allCountries = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('country');
      if (res?.data?.status) {
        setCountries(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   getAll States
  const getStatesByCountry = async (param) => {
    setLoading(true);
    try {
      const res = await masterClient.get(`state/${param}`);
      if (res?.data?.status) {
        setStates(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   getCities By State
  const getCitiesByState = async (param) => {
    setLoading(true);
    try {
      const res = await masterClient.get(`city/${param}`);
      if (res?.data?.status) {
        setCities(res?.data?.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  //   getAll Localities
  const getLocalityByCity = async (param) => {
    setLoading(true);
    try {
      const res = await masterClient.get(`locality/${param}`);
      if (res?.data?.status) {
        const sortedLocalities = res?.data?.data.sort((a, b) =>
          a.locality_name.localeCompare(b.locality_name)
        );
        setLocalities(sortedLocalities);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    let isValid = true;
    const error = {};
    if (!form.country_code) {
      error.country_code = 'Country is required';
      isValid = false;
    }
    if (!form.state_code) {
      error.state_code = 'State is required';
      isValid = false;
    }
    if (!form.city_code) {
      error.city_code = 'City is required';
      isValid = false;
    }
    if (!form.project_type_id) {
      error.project_type_id = 'Project Type is required';
      isValid = false;
    }
    if (!form.username) {
      error.name = 'Name is required';
      isValid = false;
    }
    if (!form.mobile) {
      error.contact = 'Contact is required';
      isValid = false;
    }
    if (!form.email) {
      error.email = 'Email is required';
      isValid = false;
    }
    setFormError(error);
    return isValid;
  };

  useEffect(() => {
    allCountries();
    getAllCities();
    getProjects();
  }, [])

  // *  handle Change
  const handleChange = async (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    if (e.target.name == 'country_code') {
      getStatesByCountry(e.target.value);
    }
    if (e.target.name == 'state_code') {
      getCitiesByState(e.target.value);
    }
    if (e.target.name == 'city_code') {
      getLocalityByCity(e.target.value);
    }
  }

  const handleErrorMsgs = (data) => {
    if (data.username) {
      return 'Name has already been taken.'
    }
    if (data.mobile) {
      return 'Contact has already been taken.'
    }
    if (data.email) {
      return 'Email has already been taken.'
    }
    if (data.project_type_id) {
      return 'User has already been created with the Property'
    }

    return 'Error in saving Project Manager'
  }

  const handleSearch = (e) => {
    console.log(e.target.value);
  }

  // handleSubmit
  const handleSubmit = async () => {
    if (validate()) {
      setLoading(true);
      let res;
      try {
        const payload = {...form, role_id: '4'}
        res = await authClient.post('createUser', payload);
        if (res?.data?.status) {
          toastSuccess(res?.data?.message)
          setForm({});
          setFormError({});
          await getAllCities();
        } else {
          toastError(handleErrorMsgs(res?.data))
        }
      } catch (e) {
        console.log(e);
        toastError(handleErrorMsgs(e.response.data.data))
      } finally {
        setLoading(false);
      }
    } else {
      toastError('please fill mandatory fields');
    }
  }

  const getAllCities = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get(`city`);
      if (res?.data?.status) {
        setAllCities(res?.data?.data);
        await getProjectManagers();
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }


  // * get project types
  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('projecttype');
      if (res?.data?.status) {
        setProjects(res?.data?.data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };


  // * get All Project Managers
  const getProjectManagers = async () => {
    setLoading(true);
    try {
      const res = await authClient.get('users/4');
      if (res?.data?.status) {
        setProjectmanagers(res?.data?.data);
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item"><a href="javascript: void(0);">Terraterri</a></li>
                      <li className="breadcrumb-item active">Project Listing Manager</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className='col-md-6'>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Add Project Listing Manager </h3>
                  </div>
                  <div className="card-body">
                    <form className="custom-validation">
                      <div className="row mb-3">
                        <div className="col-6">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              name="country_code"
                              id="country_code"
                              required
                              onChange={handleChange}
                              value={form.country_code || ''}
                            >
                              <option value="default">Select Country</option>
                              {countries.map((country, index) => (
                                <option key={index + 1} value={country.country_code}>
                                  {country.country_name}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="country_code" className="fw-normal">
                              Select Country
                            </label>
                            {formError.country_code && <p className="err">{formError.country_code}</p>}
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              name="state_code"
                              id="state_code"
                              required
                              onChange={handleChange}
                              value={form?.state_code || ''}>
                              <option value="default">Select State</option>
                              {states.map((state, index) => (
                                <option key={index} value={state.state_code}>
                                  {state.state_name}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="state_code" className="fw-normal">
                              Select State
                            </label>
                            {formError.state_code && <p className="err">{formError.state_code}</p>}
                          </div>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="col">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              name="city_code"
                              id="city_code"
                              required
                              onChange={handleChange}
                              value={form?.city_code || ''}>
                              <option value="default">Select City</option>
                              {cities.map((city, index) => (
                                <option key={index + 1} value={city.city_code}>
                                  {city.city_name}
                                </option>
                              ))}
                            </select>
                            <label htmlFor="city_code" className="fw-normal">
                              Select City
                            </label>
                            {formError.city_code && <p className="err">{formError.city_code}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <div className="col">
                          <div className="form-floating">
                            <select
                              className="form-select"
                              name='project_type_id'
                              onChange={handleChange}
                              value={form.project_type_id || ''}
                              id="project_type_id"
                              required
                            >
                              <option value="default">Select Project Type</option>
                              {projects.map((project, index) => (
                                <option key={index} value={project.id}>
                                  {project.name}
                                </option>
                              ))}
                            </select>
                            {formError.project_type_id && <p className="err">{formError.project_type_id}</p>}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3'>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="text"
                              id="name"
                              className="form-control"
                              placeholder="Insert your firstname"
                              name="username"
                              value={form?.username || ''}
                              onChange={handleChange}
                            />
                            <label htmlFor="name" className="fw-normal">
                              Name
                            </label>
                            {formError.name && <p className="err">{formError.name}</p>}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3'>
                        <div className="col">
                          <div className="form-floating">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              placeholder="Insert your firstname"
                              name="password"
                              value={form?.password || ''}
                              onChange={handleChange}
                            />
                            <label htmlFor="password" className="fw-normal">
                              Password
                            </label>
                            {formError.password && <p className="err">{formError.password}</p>}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3'>
                        <div className="col-6">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="contact"
                              class="form-control"
                              placeholder="Insert your firstname"
                              name="mobile"
                              value={form?.mobile || ''}
                              onChange={handleChange} />
                            <label htmlFor="contact" class="fw-normal">Contact</label>
                            {formError.contact && <p className="err">{formError.contact}</p>}
                          </div>
                        </div>
                      </div>

                      <div className='mb-3'>
                        <div className="col">
                          <div class="form-floating">
                            <input
                              type="text"
                              id="email"
                              class="form-control"
                              name="email"
                              placeholder="Insert your firstname"
                              value={form?.email || ''}
                              onChange={handleChange}
                            />
                            <label htmlFor="email" class="fw-normal">Email</label>
                            {formError.email && <p className="err">{formError.email}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary" type="button" onClick={handleSubmit}>Save</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Project Listing Managers</h3>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>S.no</th>
                            <th>City</th>
                            <th>Name</th>
                            <th>Contact</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectManagers.map((project, index) => (
                            <tr key={index}>
                              <td className="align-middle">{index + 1}</td>
                              <td className="align-middle">{AllCities.find((a) => a.city_code == project.city_code).city_name}</td>
                              <td className="align-middle">{project?.username}</td>
                              <td className="align-middle">{project?.mobile}</td>
                              <td className="align-middle">{project?.email}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Addprojectsmanager