import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { masterClient, projectClient } from '../../utils/httpClient';
import Accordion from "react-bootstrap/Accordion";
import { toastError, toastSuccess } from '../../utils/toast';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AlocateAmenities = () => {

  const [amenityHeader, setAmenityHeader] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [amenityValues, setAmenityValues] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [form, setForm] = useState({
    allocationType: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [subProjectType, setSubProjectType] = useState([]);
  const [allocatedAmenities, setAllocatedAmenities] = useState([]);
  const [allcatesByType, setallcatesByType] = useState([]);
  const [allSubTypes, setAllSubTypes] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [subProperty, setSubProperty] = useState([]);
  const [allSubPropTypes, setAllSubPropType] = useState([]);


  const getProjectTypes = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('projecttype');
      if (res?.data?.status) {
        setProjectTypes(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  const getSubProjectType = async (Propid) => {
    setLoading(true);
    try {
      const res = await masterClient.get('projectsubtype');
      if (res.data?.status) {
        setAllSubTypes(res?.data?.data)
        if (Propid != undefined) {
          const data = res?.data?.data?.filter((id) => id.project_type_id == Propid);
          if (!data.length) {
            toastError('No Sub Projects Type Found');
          }
          setSubProjectType(data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //get Property types
  const getPropertyTypes = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('propertytype');
      if (res?.data?.status) {
        setPropertyTypes(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //get Property types
  const getSubPropertyTypes = async (Propid) => {
    setLoading(true);
    try {
      const res = await masterClient.get('propertysubtype');
      if (res.data?.status) {
        setAllSubPropType(res?.data?.data)
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



  const getAmenitiesHeader = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('amenitiesheader');
      if (res?.data?.status) {
        setAmenityHeader(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getfilteredAmenities = async () => {
    try {
      setLoading(true);
      const res = await masterClient.get('amenities');
      if (res?.data?.status) {
        setAmenities(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e) => {
    const { name, value, checked, id } = e.target;
    if (name === 'amenityValues') {
      setAmenityValues((prevAmenities) => {
        const updatedAmenities = checked
          ? [...prevAmenities, { headId: id, id: value }]
          : amenityValues.filter((amenity) => amenity.id !== value);
        setForm((prev) => ({ ...prev, amenityValues: updatedAmenities }));
        return updatedAmenities;
      });
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (form.allocationType === 'Projects') {
      if (name === 'property_type_id') {
        getSubProjectType(value)
      }
    }

    if (form.allocationType === 'Properties') {
      if (name === 'property_type_id') {
        getSubPropertyTypes(value)
      }
    }
  }

  const validate = () => {
    let isValid = true;
    const error = {};
    if (!form?.amenityValues || form?.amenityValues.length === 0) {
      error.amenityValues = 'Amenities is required';
      isValid = false;
      toastError('Please select Amenities');
    }

    if (!isEdit) {
      if (allocatedAmenities) {
        const allocatedData = allocatedAmenities.filter(amenity =>
          amenity.allocationType == form.allocationType &&
          amenity.project_type_id == form.project_type_id &&
          amenity.sub_project_type_id == form.property_sub_type_id
        )
        if (allocatedData.length > 0) {
          isValid = false;
          toastError('Allocations has Added Earlier');
        }
      }
    }
    setFormError(error);
    return isValid;
  };


  useEffect(() => {
    async function getAddedAllocations() {
      let res;
      setLoading(true);
      try {
        res = await masterClient.get('allocate-amenities')
        if (res?.data?.status) {
          setAllocatedAmenities(res?.data?.data)
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }

    getAddedAllocations();
    getSubProjectType();
    getAmenitiesHeader();
    getfilteredAmenities();
    getProjectTypes();
    getPropertyTypes();
    getAllowcations("Projects");
    if (form?.amenityValues) {
      setAmenityValues(form?.amenityValues);
    }
    console.log('form =====>', form);
  }, []);

  const getAddedAllocations = async () => {
    let res;
    setLoading(true);
    try {
      res = await masterClient.get('allocate-amenities')
      if (res?.data?.status) {
        setAllocatedAmenities(res?.data?.data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }


  const handleSubmit = async () => {
    let res;
    if (validate()) {
      setLoading(true)
      if (!isEdit) {
        try {
          res = await masterClient.post('allocate-amenities', form)
          if (res.data.status) {
            toastSuccess('Allocations Added Successfully')
            getAddedAllocations();
            setForm({})
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false)
        }
      } else {
        try {
          res = await masterClient.put(`allocate-amenities/${form.id}`, form);
          if (res.data.status) {
            toastSuccess('Allocations Updated Successfully')
            await getAddedAllocations();
            getAllowcations(form.allocationType)
            setForm({})
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false)
        }
      }
    }
  }

  const getAllowcations = async (props) => {

    if (allocatedAmenities && allocatedAmenities.length > 0) {
      const addedData = allocatedAmenities.filter(
        (amenity) => amenity.allocationType === props
      );

      if (addedData.length === 0) {
        toastError('No Added Allocations Found');
        return;
      }
      const firstAdded = addedData[0];

      if (firstAdded.allocationType === 'Projects') {
        await getSubProjectType(firstAdded.property_type_id);
      } else {
        await getSubPropertyTypes(firstAdded.property_type_id);
      }

      setallcatesByType(addedData);
      getPropertyTypes();
    }
  };

  const transformData = (dataArray) => {
    const data = dataArray[0];
    const amenityValues = data.amenities?.reduce((acc, amenity) => {
      const allocated = amenity.allocatedAmenities?.map((allocatedAmenity) => ({
        headId: amenity.header_id,
        id: allocatedAmenity.id
      })) || [];
      return acc.concat(allocated);
    }, []) || [];
    return {
      id: data.id,
      allocationType: data.allocationType,
      property_type_id: data.property_type_id,
      property_sub_type_id: data.sub_project_type_id,
      amenityValues
    };
  };

  const handleEdit = async (id) => {
    setIsEdit(true);
    if (form) {
      setForm({});
    }
    const editData = transformData(allocatedAmenities.filter(amenity => amenity.id === id));

    setAmenityValues(editData.amenityValues)
    getSubProjectType(editData.property_type_id)
    setForm(({ ...editData }))
  }

  const handleDelete = async (id) => {
    setLoading(true)
    let res;
    try {
      res = await masterClient.delete(`allocate-amenities/${id}`)
      if (res?.data.status) {
        getAddedAllocations();
        getAllowcations('Projects')
        setallcatesByType([])
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

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
                      <li className="breadcrumb-item active">Alocate Amenities</li>
                    </ol>
                  </div>

                </div>
              </div>
            </div>

            <div className="card-body">
              <div className="row justify-content-center align-items">
                <div className="col-md-3">
                  <div className='propt_aloc'>
                    <ul className="d-flex justify-content-center slct-prp">
                      <li >
                        <label className="custom-radio">
                          <input
                            type="radio"
                            onChange={handleChange}
                            name="allocationType"
                            value="Projects"
                            id="project_type_id"
                            required
                            checked={form.allocationType === 'Projects' || ''}
                          />
                          <span className="radio-icon"></span>Projects</label>
                      </li>
                      <li>
                        <label className="custom-radio">
                          <input
                            type="radio"
                            onChange={handleChange}
                            name="allocationType"
                            value="Properties"
                            id="property_type_id"
                            required
                            checked={form.allocationType === 'Properties' || ''}
                          />
                          <span className="radio-icon"></span>Properties</label>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="">
                    {form.allocationType === 'Projects' ?
                      <select
                        className="form-select"
                        onChange={handleChange}
                        name="property_type_id"
                        id="property_type_id"
                        required
                        value={form.property_type_id || ''}
                      >
                        <option value="default">Select Project Type</option>
                        {projectTypes.map((project, index) => (
                          <option key={index} value={project?.id}>{project.name}</option>
                        ))}
                      </select>
                      :
                      <select
                        className="form-select"
                        onChange={handleChange}
                        name="property_type_id"
                        id="property_type_id"
                        required
                        value={form.property_type_id || ''}
                      >
                        <option value="default">Select Project Type</option>
                        {propertyTypes.map((property, index) => (
                          <option key={index} value={property?.id}>{property.name}</option>
                        ))}
                      </select>
                    }
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="">
                    {form.allocationType === 'Projects' ?
                      <select
                        className="form-select"
                        onChange={handleChange}
                        name="property_sub_type_id"
                        id='property_sub_type_id'
                        required
                        value={form.property_sub_type_id || ''}
                      >
                        <option value="default">Select Sub Project Type</option>
                        {subProjectType.map((subProject, index) => (
                          <option key={index} value={subProject.id}>
                            {subProject.name}
                          </option>
                        ))}
                      </select>
                      :
                      <select
                        className="form-select"
                        onChange={handleChange}
                        name="property_sub_type_id"
                        id='property_sub_type_id'
                        required
                        value={form.property_sub_type_id || ''}
                      >
                        <option value="default">Select Sub Project Type</option>
                        {subProperty.map((subProperty, index) => (
                          <option key={index} value={subProperty.id}>
                            {subProperty.name}
                          </option>
                        ))}
                      </select>
                    }
                  </div>
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="card mt-3">
              <div className="card-header">
                <h4 className="card-title">Alocate Amenities</h4>
              </div>
              <div className="card-body">
                <div className="row mb-3 amenities_row">
                  {amenityHeader.map((title, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                      <div>
                        <h6 className="headTag">{title.name}</h6>
                      </div>
                      {amenities
                        .filter((headId) => headId.amenities_header_id == title.id)
                        .map((item, index) => (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input bankcheckbox"
                              type="checkbox"
                              name="amenityValues"
                              value={item.id}
                              id={item.amenities_header_id}
                              checked={form.amenityValues?.some((a) => a.id == item.id)}
                              onChange={handleCheck}
                            />
                            <label className="form-check-label fw-medium" htmlFor={item.amenities_header_id}>
                              {item.name}
                            </label>
                          </div>
                        ))}

                    </div>
                  ))}
                  {formError.amenityValues && <p className="text-danger">{formError.amenityValues}</p>}
                </div>
              </div>
            </div>


            <div className="card-body mb-3">
              <div className="row justify-content-start align-items">
                <div className="col-md-3">
                  <div className='propt_aloc'>
                    <ul className="d-flex justify-content-center slct-prp">
                      <li>
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="allocationType"
                            value="Projects"
                            id="project_type_id"
                            onClick={() => getAllowcations("Projects")}
                          />
                          <span className="radio-icon"></span>Projects</label>
                      </li>
                      <li>
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="allocationType"
                            value="Properties"
                            id="property_type_id"
                            onClick={() => getAllowcations("Properties")}
                          />
                          <span className="radio-icon"></span>Properties</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


            {allcatesByType.map((amenity, index) => (
              <Accordion defaultActiveKey="0" key={index}>
                <Accordion.Item eventKey="0">
                  {amenity.allocationType === 'Projects' ?
                    <Accordion.Header>{amenity.allocationType} , {projectTypes.find((a) => a.id == amenity.property_type_id).name} , {allSubTypes.find((a) => a.id == amenity.sub_project_type_id).name}</Accordion.Header>
                    :
                    <Accordion.Header>{amenity.allocationType} , {propertyTypes.find((a) => a.id == amenity.property_type_id).name} , {allSubPropTypes.find((a) => a.id == amenity.sub_project_type_id).name} </Accordion.Header>
                  }
                  <Accordion.Body>
                    <div className='row'>
                      <div className='d-flex justify-content-end'>
                        <FaRegEdit onClick={() => { handleEdit(amenity.id) }} />
                        <MdDelete onClick={() => { handleDelete(amenity.id) }} />
                      </div>
                      {amenity.amenities.map((amenity) => (
                        <div className="col-4" key={amenity.header_id}>
                          <div>
                            <h6 className="headTag">{amenity.header_name}</h6>
                          </div>
                          <ul>
                            {amenity.allocatedAmenities.map((item) => (
                              <li key={item.id}>
                                {item.name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}

          </div>
        </div>
      </div>
    </>
  )
}

export default AlocateAmenities

