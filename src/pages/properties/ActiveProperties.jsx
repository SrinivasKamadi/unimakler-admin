import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { masterClient, projectClient } from '../../utils/httpClient';
import Loader from '../../components/Loader';
import { RiDeleteBinFill } from "react-icons/ri";
import { toastSuccess, toastError } from '../../utils/toast';
const ActiveProperties = () => {

  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [builders, setBuilders] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [statesByCountry, setStatesByCountry] = useState([]);
  const [cityBystates, setCityBystates] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [subProperty, setSubProperty] = useState([]);
  const [radioBtn, setRadioBtn] = useState('isSale')
  const [search, setSearch] = useState({ radioBtn: 1 });

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [
          projectNamesRes,
          buildersRes,
          countriesRes,
          statesRes,
          citiesRes,
          projectsRes,
          projectTypesRes,
        ] = await Promise.all([
          masterClient.get('projectname'),
          masterClient.get('builder'),
          masterClient.get('country'),
          masterClient.get('state'),
          masterClient.get('city'),
          projectClient.get('projects/2/A'),
          masterClient.get('propertytype')
        ]);

        if (projectNamesRes?.data?.status) setProjectNames(projectNamesRes?.data?.data);

        if (buildersRes?.data?.status) setBuilders(buildersRes?.data?.data);

        if (countriesRes?.data?.status) setCountries(countriesRes?.data?.data);

        if (statesRes?.data?.status) setStates(statesRes?.data?.data);

        if (citiesRes?.data?.status) setCities(citiesRes?.data?.data);

        if (projectsRes?.data?.status) {
          setAllProperties(projectsRes?.data?.data);
          const data = projectsRes?.data?.data.filter(property => property.isSale == 1);
          setProperties(data);
        }

        if (projectTypesRes?.data?.status) setPropertyTypes(projectTypesRes?.data?.data)

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);


  //   getAll States
  const getStatesByCountry = async (param) => {
    const data = states.filter(state => state.country_code == param)
    if (data.length > 0) {
      setStatesByCountry(data);
    } else {
      toastError('No States Found')
    }
  };

  //   getAll Cities
  const getCitiesByState = async (param) => {
    const data = cities.filter(city => city.state_code == param)
    if (data) {
      setCityBystates(data);
    } else {
      toastError('No Cities Found')
    }
  };

  //get Property types
  const getSubPropertyTypes = async (Propid) => {
    setLoading(true);
    try {
      const res = await masterClient.get('propertysubtype');
      if (res.data?.status) {
        const data = res?.data?.data?.filter((id) => id.property_type_id == Propid);
        if (!data.length) {
          toastError('No Sub Properties Type Found');
        }
        setSubProperty(data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlesearch = async (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
    if (name === 'country_code') getStatesByCountry(value);
    if (name === 'state_code') getCitiesByState(value);
    if (name === 'property_type_id') getSubPropertyTypes(value);
  }

  const searchProjects = async () => {

    const data = allProperties.filter(item => {
      return Object.keys(search).every(key => {
        if (search[key] !== 'default') {
          return item[key] === search[key];
        }
        return true;
      });
    });

    console.log('search ====>', data);


    setProperties(data)


    // let res
    // setLoading(true)
    // try {
    //   res = await projectClient.post('search', search)
    //   if (res.data.status) {
    //     setProjects(res.data.data);
    //   }
    // } catch (err) {
    //   console.log(err)
    // } finally {
    //   setLoading(false)
    // }
  };

  const toggleProjectStatus = async (id, status) => {
    let res;
    setLoading(true);
    const payload = {
      id: id,
      status: status
    }
    try {
      res = await projectClient.post('toggleProjectStatus', payload)
      if (res.data.status) {
        toastSuccess('Deactivated SuccessFully')
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  const filterProperties = async (e) => {
    const { name, value } = e.target;
    setRadioBtn(value)
    if (allProperties.length > 0) {
      const data = allProperties.filter(property => (property[value] == 1));
      setProperties(data);
    }
  }


  if (!projectNames.length || !builders.length || !countries.length || !states.length || !cities.length) {
    return <Loader />;
  }

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item active"><h4 className="m-0 font-bold">Active Properties</h4></li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center ">
            <div className="col-md-10">
              <div className="cardd mb-4 cardd-input">
                <div className="card-body">
                  {/* <h3 className="card-title mb-3">Search Properties</h3> */}
                  <div className="col-md-12 mb-3">
                    <div className='propt_aloc'>
                      <ul className="d-flex justify-content-center slct-prp">
                        <li >
                          <label className="custom-radio radio-button-custom">
                            <input
                              type="radio"
                              name="PropertyFor"
                              value="isSale"
                              id="sale"
                              checked={radioBtn === 'isSale' || ''}
                              onClick={filterProperties}
                            />
                            <span className="radio-icon"></span>Sale</label>
                        </li>
                        <li>
                          <label className="custom-radio radio-button-custom">
                            <input
                              type="radio"
                              name="PropertyFor"
                              value="isRent"
                              id="Rent"
                              checked={radioBtn === 'isRent' || ''}
                              onClick={filterProperties}
                            />
                            <span className="radio-icon"></span>Rent</label>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="">
                        <select
                          className="form-select"
                          onChange={handlesearch}
                          name="country_code"
                          id="country_code"
                          required>
                          <option value="default">Country</option>
                          {countries.map((country, index) => (
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
                          id="state_code"
                          required>
                          <option value="default">State</option>
                          {statesByCountry.map((state, index) => (
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
                          id="city_code"
                          required>
                          <option value="default">City</option>
                          {cityBystates.map((city, index) => (
                            <option key={index} value={city.city_code}>
                              {city.city_name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-2 w-20">
                      <div className="">
                        <select
                          className="form-select"
                          onChange={handlesearch}
                          name="property_type_id"
                          id="property_type_id"
                          required>
                          <option value="default"> Property Type</option>
                          {propertyTypes.map((property, index) => (
                            <option key={index} value={property?.id}>{property.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-3 w-20">
                      <div className="">
                        <select
                          className="form-select"
                          onChange={handlesearch}
                          name="property_sub_type_id"
                          id='property_sub_type_id'
                          required>
                          <option value="default"> Sub Property Type</option>
                          {subProperty.map((subProperty, index) => (
                            <option key={index} value={subProperty.id}>
                              {subProperty.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <button className="btn btn-primary" onClick={searchProjects}>
                        Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Active Properties Lists</h3>
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <table className="table text-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Property Title</th>
                          <th>Project Name</th>
                          <th>Bulider Name</th>
                          <th>Property Id</th>
                          <th>City</th>
                          <th>Posted By</th>
                          <th>Posted id</th>
                          <th>Approved By</th>
                          <th>Change Status  </th>
                          <th>Action </th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.length > 0 ? (
                          properties.map((property, index) => {
                            const projectName = projectNames.find((p) => p.id === property.project_name_id)?.name || 'Unknown';
                            const builderName = builders.find((a) => a.id == property.builder_id).name || 'Unknown';
                            const city_name = cities.find((a) => a.city_code == property.city_code).city_name || 'Unknown'
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='text-overflow'>{property.project_listing_name}</td>
                                <td>{projectName}</td>
                                <td>{builderName}</td>
                                <td>{property?.propertyId}</td>
                                <td>{city_name}</td>
                                <td>{property?.created_by_type}</td>
                                <td>{property?.created_by}</td>
                                <td><Link>Ganga</Link></td>
                                <td>{property?.project_status == 'A' ?
                                  <>
                                    <button onClick={() => { editProject(property) }}> <FaRegEdit /></button> | <Link onClick={() => toggleProjectStatus(property.id, 'B')}  >Deactivate</Link>
                                  </>
                                  :
                                  <>
                                    <button onClick={() => { editProject(property) }}> <FaRegEdit /></button> | <Link onClick={() => toggleProjectStatus(property.id, 'A')} >Activate</Link>
                                  </>
                                }</td>
                                <td>
                                  <RiDeleteBinFill onClick={() => { handleDelete(property.id) }} />
                                </td>
                              </tr>
                            )
                          })
                        ) : (
                          <tr>
                            <td colSpan="5">No Properties Found.</td>
                          </tr>
                        )}
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
  )
}

export default ActiveProperties