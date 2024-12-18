import React from "react";
import { useSelector } from 'react-redux';

const AdminDashboard = () => {

    const userData = useSelector((state) => state.user.userData);

    return <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 className="fs-16 fw-semibold mb-1 mb-md-2">Good Morning, <span
                                        className="text-primary">{userData?.username}</span></h4>
                                </div>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a>Terraterri</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                            <br /><br />

                            <div className="card-body">
                                <div className="row">
                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Projects</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Properties</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Cities</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Country</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="row">

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Builders</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Agents</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Owner</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>

                                    <div className="col cardbackground">
                                        <h5 className="text-uppercase text-muted mb-0 card-title">Total Visitors</h5>
                                        <span className="h2 font-weight-bold mb-0">350,897</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

const ProjectManagerDashboard = () => <>
    <div className="main-content">
        <div className="page-content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="page-title-box d-flex align-items-center justify-content-between">
                            <div>
                                <h4 className="fs-16 fw-semibold mb-1 mb-md-2">Good Morning, <span
                                    className="text-primary"> Project Manager</span></h4>
                                <p className="text-muted mb-0">Here's what's happening with your store today.</p>
                            </div>
                            <div className="page-title-right">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><a>Terraterri</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                        <br /><br />
                    </div>
                </div>
            </div>
        </div>
    </div>
</>

const ProjectApprovalManager = () =>
    <>
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 className="fs-16 fw-semibold mb-1 mb-md-2">Good Morning, <span
                                        className="text-primary"> Project Approval Manager</span></h4>
                                    <p className="text-muted mb-0">Here's what's happening with your store today.</p>
                                </div>
                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><a>Terraterri</a></li>
                                        <li className="breadcrumb-item active">Dashboard</li>
                                    </ol>
                                </div>
                            </div>
                            <br /><br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>



const Dashboard = () => {

    const userRole = useSelector((state) => state.user.role);



    if (userRole === 'ProjectManager') {
        return <ProjectManagerDashboard />;
    }

    if (userRole === 'ProjectAPprovalManager') {
        return <ProjectApprovalManager />;
    }

    return <AdminDashboard />
};

export default Dashboard;
