import React, { useContext } from 'react';
import { Sidebar, SubMenu, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebars = () => {
  const userRole = useSelector((state) => state.user.role);

  return (
    <Sidebar>
      <Menu>

        <MenuItem component={<Link to="/home" />}>Dashboard </MenuItem>

        {userRole === 'executive' && (
          <>
            <SubMenu label="Masters">
              <MenuItem component={<Link to="/projectType" />}> Project type </MenuItem>
              <MenuItem component={<Link to="/subproject" />}> Sub project type </MenuItem>
              <MenuItem component={<Link to="/propertytype" />}> Property type </MenuItem>
              <MenuItem component={<Link to="/subproperty" />}> Sub Property type </MenuItem>
              <MenuItem component={<Link to="/approvals" />}> Approval authorities </MenuItem>
              <MenuItem component={<Link to="/featureHeader" />}> Special Features</MenuItem>
              <MenuItem component={<Link to="/features" />}>Special Sub Features </MenuItem>
              <MenuItem component={<Link to="/alocatefeatures" />}>Alocate Features </MenuItem>
              <MenuItem component={<Link to="/amenityheader" />}> Create Main Amenities </MenuItem>
              <MenuItem component={<Link to="/amenities" />}> Create Sub Amenities </MenuItem>
              <MenuItem component={<Link to="/alocateamenities" />}>Alocate Amenities </MenuItem>
              <MenuItem component={<Link to="/builders" />}>Add Builders </MenuItem>
              <MenuItem component={<Link to="/builderLocation" />}> Builder Details </MenuItem>
              <MenuItem component={<Link to="/banks" />}> Banks </MenuItem>
              <MenuItem component={<Link to="/listingType" />}> Listing Types </MenuItem>
              <MenuItem component={<Link to="/galleryHeader" />}> Gallery Header </MenuItem>
              <MenuItem component={<Link to="/PropertyFacing" />}> Property Facing </MenuItem>
              <MenuItem component={<Link to="/PropertSizes" />}> Land area Representation </MenuItem>
              <MenuItem component={<Link to="/CommunitiyType" />}> Communitiy Type </MenuItem>
              <MenuItem component={<Link to="/RegistrationGstPrices" />}>
                Registration & GST %{' '}
              </MenuItem>
              <MenuItem component={<Link to="/PossessionStatus" />}> Possession Status </MenuItem>
              <MenuItem component={<Link to="/PropertyUDIsizes" />}> Property UDS Representation </MenuItem>
              <MenuItem component={<Link to="/BHKsizes" />}> BHK Sizes </MenuItem>
              <MenuItem component={<Link to="/Form-houseTypes" />}> Form-house Types </MenuItem>
              <MenuItem component={<Link to="/VillaTypes" />}> Villa Types </MenuItem>
              <MenuItem component={<Link to="/specificationHeader" />}>
                {' '}
                Specifications header{' '}
              </MenuItem>
              <MenuItem component={<Link to="/SalebleAreaRepresentation" />}>
                Saleble Area Representation
              </MenuItem>
            </SubMenu>

            <SubMenu label="Locations">
              <MenuItem component={<Link to="/countries" />}>Countries </MenuItem>
              <MenuItem component={<Link to="/states" />}> States </MenuItem>
              <MenuItem component={<Link to="/cities" />}> Cities </MenuItem>
              <MenuItem component={<Link to="/localities" />}> Localities </MenuItem>
            </SubMenu>

            <SubMenu label="Banners">
              <MenuItem component={<Link to="/bannertype" />}>Add Banner Type </MenuItem>
              <MenuItem component={<Link to="/addbanners" />}>Add Banners </MenuItem>
            </SubMenu>

            <SubMenu label="Project Management">
              <MenuItem component={<Link to="/projectname" />}> Project Name / Projects Lists </MenuItem>
              <MenuItem component={<Link to="/masterprojects" />}>Master Projects </MenuItem>
              <MenuItem component={<Link to="/projects" />}>Add Projects </MenuItem>
              <MenuItem component={<Link to="/activeprojects" />}> Active Projects </MenuItem>
              <MenuItem component={<Link to="/inactiveprojects" />}> InActive Projects </MenuItem>
              <MenuItem component={<Link to="/rejectedprojects" />}> Rejected Projects </MenuItem>
            </SubMenu>

            <SubMenu label="Property Management">
              <MenuItem component={<Link to="/addproperties" />}> Add Properties </MenuItem>
              <MenuItem component={<Link to="/activeproperties" />}> Active Properties </MenuItem>
              <MenuItem component={<Link to="/inactiveproperties" />}> InActive Properties </MenuItem>
              <MenuItem component={<Link to="/rejectedpropertysales" />}> Rejected Properties </MenuItem>
            </SubMenu>

            <SubMenu label="Meta Project Management">
              <MenuItem component={<Link to="/AddListing" />}>Add Meta Project</MenuItem>
              <MenuItem >Active Meta Projects</MenuItem>
              <MenuItem >Inactive Meta Projects</MenuItem>
            </SubMenu>

            <SubMenu label="Project Approvals">
              <MenuItem component={<Link to="/residentialapproval" />}> Residential Approvals</MenuItem>
              <MenuItem component={<Link to="/commercialapproval" />}> Commercial Approvals</MenuItem>
              <MenuItem component={<Link to="/agricultureapproval" />}> Agriculture Approvals</MenuItem>
              <MenuItem component={<Link to="/industrialapproval" />}> Industrial Approvals</MenuItem>
              <MenuItem component={<Link to="/rejectedprojects" />}> Rejected Projects </MenuItem>
            </SubMenu>

            <SubMenu label="Property Approvals">
              <MenuItem component={<Link to="/residentialapprovalsales" />}> Sales Properties For Approval</MenuItem>
              <MenuItem component={<Link to="/residentialapprovalrentals" />}>Rentals Properties for Approval</MenuItem>
            </SubMenu>

            <SubMenu label="Meta Project Approvals">

            </SubMenu>

            <SubMenu label="Project Leads">
              <MenuItem component={<Link to="/residential" />}> Residential </MenuItem>
              <MenuItem component={<Link to="/commercial" />}> Commercial </MenuItem>
              <MenuItem component={<Link to="/agricultural" />}> Agricultural </MenuItem>
              <MenuItem component={<Link to="/industrial" />}> Industrial </MenuItem>
            </SubMenu>

            <SubMenu label="Property Leads Sales">
              <MenuItem component={<Link to="/residentialsales" />}> Residential </MenuItem>
              <MenuItem component={<Link to="/commercialsales" />}> Commercial </MenuItem>
              <MenuItem component={<Link to="/agriculturalsales" />}> Agricultural </MenuItem>
              <MenuItem component={<Link to="/industrialsales" />}> Industrial </MenuItem>
            </SubMenu>

            <SubMenu label="Property Leads Rentals">
              <MenuItem component={<Link to="/residentialrentals" />}> Residential </MenuItem>
              <MenuItem component={<Link to="/commercialrentals" />}> Commercial </MenuItem>
              <MenuItem component={<Link to="/agriculturalrentals" />}> Agricultural </MenuItem>
              <MenuItem component={<Link to="/industrialrentals" />}> Industrial </MenuItem>
            </SubMenu>

            <SubMenu label="Administration">
              <MenuItem component={<Link to="/createrolls" />}> Create Roles </MenuItem>
              <MenuItem component={<Link to="/userrolesassignment" />}>
                User Roles Assignments{' '}
              </MenuItem>
            </SubMenu>

            <SubMenu label="Add Admin Users">
              <MenuItem component={<Link to="/masteradmin" />}>Master Admin </MenuItem>
              <MenuItem component={<Link to="/superadmin" />}>Super Admin </MenuItem>
              <MenuItem component={<Link to="/zonaladmin" />}>Zonal Admin </MenuItem>
              <MenuItem component={<Link to="/statewiseadmin" />}>State Wise Admin </MenuItem>
              <MenuItem component={<Link to="/citywiseadmin" />}>City Wise Admin</MenuItem>
              <MenuItem component={<Link to="/addprojectmanager" />}>Add Project Manager </MenuItem>
              <MenuItem component={<Link to="/projectapprovalmanager" />}>
                Project Approval Manager
              </MenuItem>
              <MenuItem component={<Link to="/propertyapprovalmanager" />}>
                Property Approval Manager
              </MenuItem>
              <MenuItem component={<Link to="/projectleadmanager" />}>Project Lead Manager</MenuItem>
              <MenuItem component={<Link to="/propertyleadmanager" />}>Property Lead Manager</MenuItem>
              <MenuItem component={<Link to="/builderapprovalscitywise" />}>
                Builder Approvals City Wise
              </MenuItem>
            </SubMenu>

            <SubMenu label="Add Sales Users">
              <MenuItem component={<Link to="/zonalsalesmanager" />}>Zonal Sales Manager </MenuItem>
              <MenuItem component={<Link to="/statedirectorsales" />}>State Director Sales </MenuItem>
              <MenuItem component={<Link to="/citysalesmanager" />}>City Sales Manager </MenuItem>
              <MenuItem component={<Link to="/salesexecutive" />}>Sales Executive</MenuItem>
            </SubMenu>

            <SubMenu label="Franchise">
              <MenuItem>Add Franchise</MenuItem>
              <MenuItem>Remove Franchise</MenuItem>
            </SubMenu>

            <SubMenu label="Sub Franchise">
              <MenuItem>Add Sub Franchise</MenuItem>
            </SubMenu>

            <MenuItem component={<Link to="/cachemanagement" />}>CacheManagemenet </MenuItem>

            <SubMenu label="Scheduled visits">
              <MenuItem component={<Link to="/scheduledprojects" />}> Projects </MenuItem>
              <MenuItem component={<Link to="/scheduledproperty" />}> Property </MenuItem>
            </SubMenu>

            <SubMenu label="Responses">
              <MenuItem component={<Link to="/careers-response" />}> Careers </MenuItem>
              <MenuItem component={<Link to="/franchiseLedas" />}> Franchise Leads </MenuItem>
              <MenuItem component={<Link to="/contact-response" />}> Contact Us </MenuItem>
              <MenuItem component={<Link to="/feedback-response" />}> Feed Back </MenuItem>
              
            </SubMenu>
          </>
        )}

        {userRole === 'ProjectManager' && (
          <>
            <MenuItem component={<Link to="/projects" />}>Add Projects </MenuItem>
            <MenuItem component={<Link to="/activeprojects" />}> Active Projects </MenuItem>
            <MenuItem component={<Link to="/inactiveprojects" />}> InActive Projects </MenuItem>
            <MenuItem component={<Link to="/inactiveprojects" />}> Rejected Projects </MenuItem>
          </>
        )}

        {userRole === 'ProjectAPprovalManager' && (
          <>
            <MenuItem component={<Link to="/pendingprojects" />}> Pending Projects </MenuItem>
            <MenuItem component={<Link to="/masterprojects" />}> Approved Projects </MenuItem>
            <MenuItem component={<Link to="/rejectedprojects" />}> Rejected Projects </MenuItem>
          </>
        )}

      </Menu>
    </Sidebar>
  );
};

export default Sidebars;
