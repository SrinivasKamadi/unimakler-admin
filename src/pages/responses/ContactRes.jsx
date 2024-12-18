import React, { useEffect, useState } from 'react';
import { masterClient } from '../../utils/httpClient';

import Loader from '../../components/Loader';

const ContactRes = () => {
  const [enquiries, setEnquries] = useState([]);
  
  const [loading, setLoading] = useState(false);

  const getEnquiries = async () => {
    setLoading(true);
    try {
      const res = await masterClient.get('enquiries');
      if (res?.data?.status) {
        setEnquries(res?.data?.data);
        console.log(res?.data?.data);
        
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnquiries()
  },[])


  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-flex align-items-center justify-content-between">
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item active">
                      <h4 className="m-0 font-bold">Contact Response</h4>
                    </li>
                  </ol>
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
                  <h3 className="card-title mb-3">Search Lst</h3>
                  <form className="custom-validation" action="#">
                    <div className="row align-items-center">
                      <div className="col-md-3">
                        <div className="">
                          <select className="form-select" name="subProperty" required>
                            <option value="default">Select Country</option>
                            <option value="">India</option>
                            <option value="">Dubai</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="">
                          <select className="form-select" name="subProperty" required>
                            <option value="default">Select State</option>
                            <option value="">India</option>
                            <option value="">Dubai</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="">
                          <select className="form-select" name="subProperty" required>
                            <option value="default">Select City</option>
                            <option value="">Hyderabad</option>
                            <option value="">Dubai</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-1">
                        <button className="btn btn-primary" type="submit">
                          Search
                        </button>
                      </div>
                      {/* <div className="col-12 text-center">
                      <button className="btn btn-primary" type="submit">
                        Save
                      </button>
                    </div> */}
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
                  <h3 className="card-title">Contact</h3>
                  {/* <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by location"
                    />
                  </div> */}
                </div>
                <div className="card-body">
                  <div className="table-responsive-md">
                    <table className="table text-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Email</th>
                          <th>Country</th>
                          <th>City</th>
                          <th>Subject</th>
                          <th>Message</th>
                        </tr>
                      </thead>
                      <tbody>
                      {enquiries.map((item, index) => (
                        <tr key={item?.id}>
                          <td>{index + 1}</td>
                          <td>{item?.name}</td>
                          <td>{item?.mobile}</td>
                          <td>{item?.email}</td>
                          <td>{item?.country}</td>
                          <td>{item?.city}</td>
                          <td>{item?.subject}</td>
                          <td>{item?.message}</td>
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
  );
};

export default ContactRes;
