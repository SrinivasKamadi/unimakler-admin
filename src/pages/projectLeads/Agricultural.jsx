import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import { projectClient } from '../../utils/httpClient';
import Loader from '../../components/Loader';
const Agricultural = () => {

  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    let res;
    try {
      setLoading(true)
      res = await projectClient.get(`/getProjects/${13}/${1}`);
      if (res?.data?.status) {
        setProjects(res?.data?.data)
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProjects();
  }, [])

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
                      <li className="breadcrumb-item active"><h4 className="m-0 font-bold">Project Leads -  Agricultural</h4></li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>

            <div className="row justify-content-center ">
              <div className="col-md-10">
                <div className="cardd mb-4 cardd-input">
                  <div className="card-body">
                    <h3 className="card-title mb-3">Search Leads</h3>
                    <form className="custom-validation" action="#">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <div className="">
                            <select className="form-select" name="subProperty" required>
                              <option value="default">Select Country</option>
                              <option value="">India</option>
                              <option value="">Dubai</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="">
                            <select className="form-select" name="subProperty" required>
                              <option value="default">Select State</option>
                              <option value="">India</option>
                              <option value="">Dubai</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="">
                            <select className="form-select" name="subProperty" required>
                              <option value="default">Select City</option>
                              <option value="">Hyderabad</option>
                              <option value="">Dubai</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="">
                            <select className="form-select" name="projectStatus" required>
                              <option value="default">Select Sub Property Type</option>
                              <option value="">Apartment</option>
                              <option value="">Villa</option>
                              <option value="">Plots</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="">
                            <select className="form-select" name="propertyType" required>
                              <option value="default">Project Name</option>
                              <option value=""></option>
                              <option value=""></option>
                            </select>
                          </div>
                        </div>
                        <div className="col-md-2 w-20 mt-3">
                          <div className="mb-3">
                            <div className="form-floating">
                              <input type="date" id="from-date" className="form-control" name="fromdate" placeholder="Insert your lastname" required />
                              <label htmlFor="from-date" className="fw-normal">From Date</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-2 w-20 mt-3">
                          <div className="mb-3">
                            <div className="form-floating">
                              <input type="date" id="from-date" className="form-control" name="fromdate" placeholder="Insert your lastname" required />
                              <label htmlFor="from-date" className="fw-normal">From Date</label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1">
                          <button className="btn btn-primary" type="submit">
                            Search
                          </button>
                        </div>
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
                    <h3 className="card-title">Agriculture Leads Lists</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive-md">
                      <table className="table text-nowrap mb-0">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>Project Name</th>
                            <th>Customer Name</th>
                            <th>Contact Number</th>
                            <th>Email Id</th>
                            <th>Leads</th>
                            <th>Action  </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projects.length > 0 ?
                            projects.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item?.project_name}</td>
                                <td>{item?.name}</td>
                                <td>{item?.mobile}</td>
                                <td>{item?.email}</td>
                                <td>
                                  <Link>{item?.user_response_count}</Link>
                                </td>
                                <td>
                                  <Link to='/home'> <FaRegEdit /></Link>
                                </td>
                              </tr>
                            ))
                            :
                            <tr>
                              <td colSpan={7} className='text-center'>No Projects Found</td>
                            </tr>
                          }
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
    </>
  )
}

export default Agricultural