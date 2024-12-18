import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader';
import { masterClient } from '../../utils/httpClient';
import Accordion from "react-bootstrap/Accordion";
import { toastSuccess, toastError } from '../../utils/toast';
import 'react-tabs/style/react-tabs.css';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const AlocateSpeacial = ({ type, subType }) => {

  const [featureHeader, setFeatureHeader] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featureValues, setFeatureValues] = useState([]);
  const [projectTypes, setProjectTypes] = useState([]);
  const [form, setForm] = useState({
    allocationType: '',
  });
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const [subProjectType, setSubProjectType] = useState([]);
  const [allocatedFeatures, setAllocatedFeatures] = useState([]);
  const [allocatesByType, setallocatesByType] = useState([]);
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

  //getFeature Headers
  const getFeatureHeaders = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('specialfeaturesheader');
      if (res?.data?.status) {
        setFeatureHeader(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  //getFeatures
  const getFilteredFeatures = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('specialfeatures');
      if (res?.data?.status) {
        setFeatures(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheck = (e) => {
    const { name, value, checked, id } = e.target;
    if (name === 'special_feature_id') {
      setFeatureValues((prevFeatures) => {
        const updatedFeatures = checked
          ? [...prevFeatures, { headId: id, id: value }]
          : featureValues.filter((feature) => feature.id !== value);
        setForm((prev) => ({ ...prev, featureValues: updatedFeatures }));
        return updatedFeatures;
      })
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
    if (!form?.featureValues || form?.featureValues.length === 0) {
      error.featureValues = 'Features is required';
      isValid = false;
      toastError('Please select Features');
    }
    if (!isEdit) {
      if (allocatedFeatures) {
        const allocatedData = allocatedFeatures.filter(feature =>
          feature.allocationType == form.allocationType &&
          feature.project_type_id == form.project_type_id &&
          feature.sub_project_type_id == form.property_sub_type_id
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
        res = await masterClient.get('allocate-features')
        if (res?.data?.status) {
          setAllocatedFeatures(res?.data?.data)
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }
    }
    getAddedAllocations();
    getSubProjectType();
    getFeatureHeaders();
    getFilteredFeatures();
    getProjectTypes();
    getPropertyTypes();
    getAllowcations('Projects')
    if (form?.special_feature_id) {
      setFeatureValues(form?.special_feature_id);
    }
    console.log('form =====>', form);
  }, []);


  const getAddedAllocations = async () => {
    let res;
    setLoading(true);
    try {
      res = await masterClient.get('allocate-features')
      if (res?.data?.status) {
        setAllocatedFeatures(res?.data?.data)
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
          res = await masterClient.post('allocate-features', form)
          if (res.data.status) {
            toastSuccess('Allocations Added Successfully')
            setForm({})
          }
        } catch (err) {

        } finally {
          setLoading(false)
        }
      } else {
        try {
          res = await masterClient.put(`allocate-features/${form.id}`, form);
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
    if (allocatedFeatures != []) {
      const addedData = allocatedFeatures.filter(amenity => amenity.allocationType === props)
      if (!addedData.length) {
        toastError('No Added Allocations Found');
      }
      if (addedData.allocationType === 'Projects') {
        await getSubProjectType(addedData?.property_type_id)
      } else {
        await getSubPropertyTypes(addedData?.property_type_id)
      }
      setallocatesByType(addedData)
    }
  }

  const transformData = (dataArray) => {
    const data = dataArray[0];
    const featureValues = data.features?.reduce((acc, feature) => {
      const allocated = feature.allocatedFeatures?.map((allocatedFeature) => ({
        headId: feature.header_id,
        id: allocatedFeature.id
      })) || [];
      return acc.concat(allocated);
    }, []) || [];
    return {
      id: data.id,
      allocationType: data.allocationType,
      property_type_id: data.property_type_id,
      property_sub_type_id: data.sub_project_type_id,
      featureValues
    };
  };

  const handleEdit = async (id) => {
    setIsEdit(true);
    if (form) {
      setForm({});
    }
    const editData = transformData(allocatedFeatures.filter(feature => feature.id === id));
    setFeatureValues(editData.featureValues)
    getSubProjectType(editData.property_type_id)
    setForm(({ ...editData }))
  }


  const handleDelete = async (id) => {
    setLoading(true)
    let res;
    try {
      res = await masterClient.delete(`allocate-features/${id}`)
      if (res?.data.status) {
        getAllowcations('Projects')
        setallocatesByType([])
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
                      <li className="breadcrumb-item active">Alocate Speacial Feature</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body mb-3">
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

            <div className="card">
              <div className="card-header">
                <h4 className="card-title">Special Features</h4>
              </div>
              <div className="card-body">
                <div className="row mb-3 amenities_row">
                  {featureHeader.map((title, index) => (
                    <div className="col-md-3 mb-3" key={index}>
                      <div>
                        <h6 className="headTag">{title.name}</h6>
                      </div>
                      {features
                        .filter((headId) => {
                          return headId.special_features_header_id == title.id;
                        })
                        .map((item, index) => (
                          <div className="form-check" key={index}>
                            <input
                              className="form-check-input bankcheckbox"
                              type="checkbox"
                              name="special_feature_id"
                              value={item.id}
                              id={item.special_features_header_id}
                              required
                              checked={form.featureValues?.some((a) => a.id == item.id)}
                              onClick={handleCheck}
                            />
                            <label className="form-check-label fw-medium" htmlFor="poojaRoom">
                              {item.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  ))}
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
                            onClick={() => { getAllowcations('Projects') }}
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
                            onClick={() => { getAllowcations('Properties') }}
                          />
                          <span className="radio-icon"></span>Properties</label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {allocatesByType.map((feature, index) => (
              <Accordion defaultActiveKey="0" key={index}>
                <Accordion.Item eventKey="0">
                  {feature.allocationType === 'Projects' ?
                    <Accordion.Header>{feature.allocationType} , {projectTypes.find((a) => a.id == feature.property_type_id).name} , {allSubTypes.find((a) => a.id == feature.sub_project_type_id).name}</Accordion.Header>
                    :
                    <Accordion.Header>{feature.allocationType} , {propertyTypes.find((a) => a.id == feature.property_type_id).name} , {allSubPropTypes.find((a) => a.id == feature.sub_project_type_id).name}</Accordion.Header>
                  }
                  <Accordion.Body>
                    <div className='row'>
                      <div className='d-flex justify-content-end'>
                        <FaRegEdit onClick={() => { handleEdit(feature.id) }} />
                        <MdDelete onClick={() => { handleDelete(feature.id) }} />
                      </div>
                      {feature.features.map((feature) => (
                        <div className="col-4" key={feature.header_id}>
                          <div>
                            <h6 className="headTag">{feature.header_name}</h6>
                          </div>
                          <ul>
                            {feature.allocatedFeatures.map((item) => (
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

export default AlocateSpeacial

