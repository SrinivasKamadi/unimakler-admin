import React from 'react';
import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from '../components/Loader';
const LazyLoad = () => {


  //////////////////////////////////// Masters    //////////////////////////////////////////
  const Login = lazy(() => import(`../pages/Login`));
  const Dashboard = lazy(() => import(`../pages/Dashboard`));
  const Amenities = lazy(() => import(`../pages/masters/Amenities`));
  const AddAmenities = lazy(() => import(`../pages/masters/AddAmenities`));
  const ProjectType = lazy(() => import(`../pages/masters/ProjectType`));
  const AddProjectType = lazy(() => import(`../pages/masters/AddProjectType`));
  const SubProject = lazy(() => import(`../pages/masters/SubProject`));
  const AddSubProjectType = lazy(() => import(`../pages/masters/AddSubProjectType`));
  const PropertyType = lazy(() => import(`../pages/masters/PropertyType`));
  const AddPropertyType = lazy(() => import(`../pages/masters/AddPropertyType`));
  const AddSubPropertyType = lazy(() => import(`../pages/masters/AddSubPropertyType`));
  const SubProperty = lazy(() => import(`../pages/masters/SubProperty`));
  const Approvals = lazy(() => import(`../pages/masters/Approvals`));
  const AddApprovals = lazy(() => import(`../pages/masters/AddApprovals`));
  const Features = lazy(() => import(`../pages/masters/Features`));
  const AddFeatures = lazy(() => import(`../pages/masters/AddFeatures`));
  const AlocateSpeacial = lazy(() => import(`../pages/masters/AlocateSpeacial`));
  const Banks = lazy(() => import(`../pages/masters/Banks`));
  const AddBanks = lazy(() => import(`../pages/masters/AddBanks`));
  const AmnityHeader = lazy(() => import(`../pages/masters/AmenitiesHeader`));
  const AlocateAmenities = lazy(() => import(`../pages/masters/AlocateAmenities`));
  const Builders = lazy(() => import(`../pages/masters/Builders`));
  const Builderlocations = lazy(() => import(`../pages/masters/BuilderLocation`));
  const PropetyFacing = lazy(() => import(`../pages/masters/PropetyFacing`));
  const PropertySizes = lazy(() => import(`../pages/masters/PropertySizes`));
  const CommunityType = lazy(() => import(`../pages/masters/CommunityType`));
  const PossessionStatus = lazy(() => import(`../pages/masters/PossessionStatus`));
  const PropertyUDIsizes = lazy(() => import(`../pages/masters/PropertyUDIsizes`));
  const BhkSizes = lazy(() => import(`../pages/masters/BhkSizes`));
  const FormHouseTypes = lazy(() => import(`../pages/masters/FormHouseTypes`));
  const VillaTypes = lazy(() => import(`../pages/masters/VillaTypes`));
  const SalebleAreaRepresentation = lazy(() =>
    import(`../pages/masters/SalebleAreaRepresentation`)
  );
  const FeatureHeader = lazy(() => import(`../pages/masters/FeatureHeader`));
  const GalleryHeader = lazy(() => import(`../pages/masters/GalleryHeader`));
  const ListingType = lazy(() => import(`../pages/masters/ListingType`));
  const SpecificationHeader = lazy(() => import(`../pages/masters/SpecificationHeader`));
  const BannerType = lazy(() => import(`../pages/masters/BannerType`));
  const RegistrationGstPrices = lazy(() => import(`../pages/masters/RegistrationGstPrices.jsx`));


  //////////////////////////////////// Locations    //////////////////////////////////////////

  const Countries = lazy(() => import(`../pages/locations/Countries`));
  const AddCountries = lazy(() => import(`../pages/locations/AddCountries`));

  const States = lazy(() => import(`../pages/locations/States`));
  const AddStates = lazy(() => import(`../pages/locations/AddStates`));

  const Cities = lazy(() => import(`../pages/locations/Cities`));
  const AddCities = lazy(() => import(`../pages/locations/AddCities`));

  const Localities = lazy(() => import(`../pages/locations/Localities`));
  const AddLocalities = lazy(() => import(`../pages/locations/AddLocalities`));

  //////////////////////////////////// Add Banners    //////////////////////////////////////////

  const AddBanners = lazy(() => import(`../pages/AddBanners`));

  //////////////////////////////////// Project Management ////////////////////////

  const ProjectName = lazy(() => import(`../pages/projects/ProjectName`));
  const MasterProjects = lazy(() => import(`../pages/projects/MasterProjects`));
  const AddProjectName = lazy(() => import(`../pages/projects/AddProjectName`));
  const AddProjects = lazy(() => import(`../pages/projects/AddProjects`));
  const ProjectsList = lazy(() => import(`../pages/projects/Projects`));
  const ActiveProjects = lazy(() => import(`../pages/projects/ActiveProjects`));
  const InActiveProjects = lazy(() => import(`../pages/projects/InActiveProjects`));
  const ProjectDetails = lazy(() => import(`../pages/projects/ProjectDetails.jsx`));
  const AddListings = lazy(() => import(`../pages/projects/AddListings`));


  //////////////////////////////// Scheduled Visits ////////////////////////

  const ScheduledProjects = lazy(() => import(`../pages/scheduledVisits/ScheduledProjects`));
  const ScheduledProperty = lazy(() => import(`../pages/scheduledVisits/ScheduledProperty`));

  //////////////////////////////// Project Leads ////////////////////////

  const Residential = lazy(() => import(`../pages/projectLeads/Residential`));
  const Agricultural = lazy(() => import(`../pages/projectLeads/Agricultural`));
  const Commercial = lazy(() => import(`../pages/projectLeads/Commercial`));
  const Industrial = lazy(() => import(`../pages/projectLeads/Industrial`));

  //////////////////////////////// Property Leads Sales ////////////////////////

  const ResidentialSales = lazy(() => import(`../pages/propertyLeadsSales/ResidentialSales`));
  const AgriculturalSales = lazy(() => import(`../pages/propertyLeadsSales/AgriculturalSales`));
  const CommercialSales = lazy(() => import(`../pages/propertyLeadsSales/CommercialSales`));
  const IndustrialSales = lazy(() => import(`../pages/propertyLeadsSales/IndustrialSales`));

  //////////////////////////////// Property Leads Rentals ////////////////////////

  const ResidentialRentals = lazy(() => import(`../pages/propertyLeadsRentals/ResidentialRentals`));
  const AgriculturalRentals = lazy(() =>
    import(`../pages/propertyLeadsRentals/AgriculturalRentals`)
  );
  const CommercialRentals = lazy(() => import(`../pages/propertyLeadsRentals/CommercialRentals`));
  const IndustrialRentals = lazy(() => import(`../pages/propertyLeadsRentals/IndustrialRentals`));

  //////////////////////////////// Project Approvals ////////////////////////

  // const ApprovedProjects = lazy(() => import(`../pages/projectApprovals/ApprovedProjects`));
  const PendingProjects = lazy(() => import(`../pages/projectApprovals/PendingProjects`));
  const RejectedProjects = lazy(() => import(`../pages/projectApprovals/RejectedProjects`));
  const ResidentialApprov = lazy(() => import(`../pages/projectApprovals/ResidentialApprov`));
  const CommercialApprov = lazy(() => import(`../pages/projectApprovals/CommercialApprov.jsx`));
  const AgricultureApprov = lazy(() => import(`../pages/projectApprovals/AgricultureApprov.jsx`));
  const IndustrialApprov = lazy(() => import(`../pages/projectApprovals/IndustrialApprov.jsx`));

  //////////////////////////////// property Approval Sales ////////////////////////

  // const ApprovedPropertySales = lazy(() =>
  //   import(`../pages/propertyApprovalSales/ApprovedPropertySales`)
  // );

  // const PendingPropertySales = lazy(() =>
  //   import(`../pages/propertyApprovalSales/PendingPropertySales`)
  // );
  const RejectedPropertySales = lazy(() =>
    import(`../pages/propertyApprovalSales/RejectedPropertySales`)
  );
  const ResidentialArovSale = lazy(() => import(`../pages/propertyApprovalSales/ResidentialArovSale.jsx`));
  const CommercialAprovSale = lazy(() => import(`../pages/propertyApprovalSales/CommercialAprovSale.jsx`));
  const AgricultureAprovSale = lazy(() => import(`../pages/propertyApprovalSales/AgricultureAprovSale.jsx`));
  const IndustrialAprovSale = lazy(() => import(`../pages/propertyApprovalSales/IndustrialAprovSale.jsx`));
  //   const ResidentialArovSale = lazy(() => import(`../pages/propertyApprovalSales/ResidentialArovSale.jsx`)
  // );

  //////////////////////////////// property Approval Rentals ////////////////////////

  // const ApprovedPropertyRentals = lazy(() =>
  //   import(`../pages/propertyApprovalRentals/ApprovedPropertyRentals`)
  // );
  // const PendingPropertyRentals = lazy(() =>
  //   import(`../pages/propertyApprovalRentals/PendingPropertyRentals`)
  // );
  const RejectedPropertyRentals = lazy(() =>
    import(`../pages/propertyApprovalRentals/RejectedPropertyRentals`)
  );
  const ResidentialAprovRentals = lazy(() =>
    import(`../pages/propertyApprovalRentals/ResidentialAprovRentals.jsx`)
  );
  const AgricultureAprovRentals = lazy(() =>
    import(`../pages/propertyApprovalRentals/AgricultureAprovRentals.jsx`)
  );
  const CommercialAprovRentals = lazy(() =>
    import(`../pages/propertyApprovalRentals/CommercialAprovRentals.jsx`)
  );
  const IndustrialAprovRentals = lazy(() =>
    import(`../pages/propertyApprovalRentals/IndustrialAprovRentals.jsx`)
  );

  //////////////////////////////// Properties ////////////////////////

  const ActiveProperties = lazy(() => import(`../pages/properties/ActiveProperties`));
  const InactiveProperties = lazy(() => import(`../pages/properties/InactiveProperties`));
  const AddProperties = lazy(() => import(`../pages/properties/AddProperties`));

  //////////////////////////////// Administration ////////////////////////

  const CreateRolls = lazy(() => import(`../pages/administration/CreateRoles`));
  const UserRollsAssignment = lazy(() => import(`../pages/administration/UserRolesAssignment`));

  //////////////////////////////// Add Admin Users ////////////////////////

  const MasterAdmin = lazy(() => import(`../pages/addAdminUsers/MasterAdmin`));
  const SuperAdmin = lazy(() => import(`../pages/addAdminUsers/SuperAdmin`));
  const ZonalAdmin = lazy(() => import(`../pages/addAdminUsers/ZonalAdmin`));
  const StateWiseAdmin = lazy(() => import(`../pages/addAdminUsers/StateWiseAdmin`));
  const CityWiseAdmin = lazy(() => import(`../pages/addAdminUsers/CityWiseAdmin`));
  const ProjectApprovalManager = lazy(() =>
    import(`../pages/addAdminUsers/ProjectApprovalManager`)
  );
  const PropertyApprovalManager = lazy(() =>
    import(`../pages/addAdminUsers/PropertyApprovalManager`)
  );
  const ProjectLeadManager = lazy(() => import(`../pages/addAdminUsers/ProjectLeadManager`));
  const PropertyLeadManager = lazy(() => import(`../pages/addAdminUsers/PropertyLeadManager`));
  const Addprojectsmanager = lazy(() => import(`../pages/addAdminUsers/Addprojectsmanager`));
  const BuilderApprovalsCityWise = lazy(() =>
    import(`../pages/addAdminUsers/BuilderApprovalsCityWise`)
  );

  //////////////////////////////// Add Sales Users ////////////////////////

  const ZonalSalesManager = lazy(() => import(`../pages/addSalesUsers/ZonalSalesManager`));
  const StateDirectorSales = lazy(() => import(`../pages/addSalesUsers/StateDirectorSales`));
  const CitySalesManager = lazy(() => import(`../pages/addSalesUsers/CitySalesManager`));
  const SalesExecutive = lazy(() => import(`../pages/addSalesUsers/SalesExecutive`));

  //////////////////////////////// Cache Management ////////////////////////

  const CacheManagemenet = lazy(() => import(`../pages/CacheManagement`));

  //////////////////////////////// Backups ////////////////////////

  const Backups = lazy(() => import(`../pages/Backups`));

  /////////////////////////////// Meta vese listings ///////////////////////

  const AddMetaListings = lazy(() => import(`../pages/metaverseListings/AddListings`));

  const CareersRes = lazy(() => import(`../pages/responses/CareersRes`));
  const ContactRes = lazy(() => import(`../pages/responses/ContactRes`));
  const FeedBack = lazy(() => import(`../pages/responses/FeedBack`));


  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* //////////////////////////////// Masters    /////////////////////////////// */}
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/addamenities" element={<AddAmenities />} />
        <Route path="/projecttype" element={<ProjectType />} />
        <Route path="/addprojecttype" element={<AddProjectType />} />
        <Route path="/subproject" element={<SubProject />} />
        <Route path="/addsubproject" element={<AddSubProjectType />} />
        <Route path="/propertytype" element={<PropertyType />} />
        <Route path="/addpropertytype" element={<AddPropertyType />} />
        <Route path="/addsubpropertytype" element={<AddSubPropertyType />} />
        <Route path="/subproperty" element={<SubProperty />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/addapprovals" element={<AddApprovals />} />
        <Route path="/features" element={<Features />} />
        <Route path="/addfeatures" element={<AddFeatures />} />
        <Route path="/alocatefeatures" element={<AlocateSpeacial />} />
        <Route path="/banks" element={<Banks />} />
        <Route path="/addbanks" element={<AddBanks />} />
        <Route path="/amenityheader" element={<AmnityHeader />} />
        <Route path="/alocateamenities" element={<AlocateAmenities />} />
        <Route path="/builders" element={<Builders />} />
        <Route path="/builderLocation" element={<Builderlocations />} />
        <Route path="/PropertyFacing" element={<PropetyFacing />} />
        <Route path="/PropertSizes" element={<PropertySizes />} />
        <Route path="/CommunitiyType" element={<CommunityType />} />
        <Route path="/PropertyUDIsizes" element={<PropertyUDIsizes />} />
        <Route path="/PossessionStatus" element={<PossessionStatus />} />
        <Route path="/BHKsizes" element={<BhkSizes />} />
        <Route path="/Form-houseTypes" element={<FormHouseTypes />} />
        <Route path="/VillaTypes" element={<VillaTypes />} />
        <Route path="/SalebleAreaRepresentation" element={<SalebleAreaRepresentation />} />
        <Route path="/featureHeader" element={<FeatureHeader />} />
        <Route path="/galleryHeader" element={<GalleryHeader />} />
        <Route path="/listingType" element={<ListingType />} />
        <Route path="/specificationHeader" element={<SpecificationHeader />} />
        <Route path="/RegistrationGstPrices" element={<RegistrationGstPrices />} />
        {/* //////////////////////////////// Locations    /////////////////////////////// */}
        <Route path="/countries" element={<Countries />} />
        <Route path="/addcountries" element={<AddCountries />} />
        <Route path="/states" element={<States />} />
        <Route path="/addstates" element={<AddStates />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/addcities" element={<AddCities />} />
        <Route path="/localities" element={<Localities />} />
        <Route path="/addlocalities" element={<AddLocalities />} />
        {/* //////////////////////////////// Add Banners    /////////////////////////////// */}
        <Route path="/addbanners" element={<AddBanners />} />
        <Route path="/bannertype" element={<BannerType />} />
        {/* //////////////////////////////// Project Management //////////////////////// */}
        <Route path="/projectname" element={<ProjectName />} />
        <Route path="/masterprojects" element={<MasterProjects />} />
        <Route path="/addprojectname" element={<AddProjectName />} />
        <Route path="/addprojects" element={<AddProjects />} />
        <Route path="/addlistings" element={<AddListings />} />
        <Route path="/projects" element={<ProjectsList />} />
        <Route path="/activeprojects" element={<ActiveProjects />} />
        <Route path="/inactiveprojects" element={<InActiveProjects />} />
        <Route path="/ProjectDetails" element={<ProjectDetails />} />

        {/* //////////////////////////////// Scheduled Visits //////////////////////// */}
        <Route path="/scheduledprojects" element={<ScheduledProjects />} />
        <Route path="/scheduledproperty" element={<ScheduledProperty />} />
        {/* //////////////////////////////// Project Leads //////////////////////// */}
        <Route path="/residential" element={<Residential />} />
        <Route path="/agricultural" element={<Agricultural />} />
        <Route path="/industrial" element={<Industrial />} />
        <Route path="/commercial" element={<Commercial />} />
        {/* //////////////////////////////// Property Leads Sales//////////////////////// */}
        <Route path="/residentialsales" element={<ResidentialSales />} />
        <Route path="/agriculturalsales" element={<AgriculturalSales />} />
        <Route path="/industrialsales" element={<IndustrialSales />} />
        <Route path="/commercialsales" element={<CommercialSales />} />
        {/* //////////////////////////////// Property Leads Rentals//////////////////////// */}
        <Route path="/residentialrentals" element={<ResidentialRentals />} />
        <Route path="/commercialrentals" element={<CommercialRentals />} />
        <Route path="/agriculturalrentals" element={<AgriculturalRentals />} />
        <Route path="/industrialrentals" element={<IndustrialRentals />} />
        {/* //////////////////////////////// Project Approvals //////////////////////// */}
        {/* <Route path="/approvedprojects" element={<ApprovedProjects />} /> */}
        <Route path="/pendingprojects" element={<PendingProjects />} />
        <Route path="/rejectedprojects" element={<RejectedProjects />} />
        <Route path="/residentialapproval" element={<ResidentialApprov />} />
        <Route path="/commercialapproval" element={<CommercialApprov />} />
        <Route path="/agricultureapproval" element={<AgricultureApprov />} />
        <Route path="/industrialapproval" element={<IndustrialApprov />} />

        {/* //////////////////////////////// Property Approvals Sales //////////////////////// */}



        {/* <Route path="/approvedpropertysales" element={<ApprovedPropertySales />} /> */}
        {/* <Route path="/pendingpropertysales" element={<PendingPropertySales />} /> */}

        <Route path="/residentialapprovalsales" element={<ResidentialArovSale />} />
        <Route path="/commercialapprovalsales" element={<CommercialAprovSale />} />
        <Route path="/agricultureapprovalsales" element={<AgricultureAprovSale />} />
        <Route path="/industrialapprovalsales" element={<IndustrialAprovSale />} />

        <Route path="/rejectedpropertysales" element={<RejectedPropertySales />} />


        {/* //////////////////////////////// Property Approvals Rentals //////////////////////// */}
        {/* <Route path="/approvedpropertyrentals" element={<ApprovedPropertyRentals />} />
        <Route path="/pendingpropertyrentals" element={<PendingPropertyRentals />} /> */}
        <Route path="/rejectedpropertyrentals" element={<RejectedPropertyRentals />} />
        <Route path="/residentialapprovalrentals" element={<ResidentialAprovRentals />} />
        <Route path="/commercialapprovalrentals" element={<CommercialAprovRentals />} />
        <Route path="/agricultureapprovalrentals" element={<AgricultureAprovRentals />} />
        <Route path="/industrialapprovalrentals" element={<IndustrialAprovRentals />} />
        {/* //////////////////////////////// Properties //////////////////////// */}
        <Route path="/activeproperties" element={<ActiveProperties />} />
        <Route path="/inactiveproperties" element={<InactiveProperties />} />
        <Route path="/addproperties" element={<AddProperties />} />
        {/* //////////////////////////////// Administration //////////////////////// */}
        <Route path="/createrolls" element={<CreateRolls />} />
        <Route path="/userrolesassignment" element={<UserRollsAssignment />} />
        {/* //////////////////////////////// Add Admin Users ////////////////////////  */}
        <Route path="/masteradmin" element={<MasterAdmin />} />
        <Route path="/superadmin" element={<SuperAdmin />} />
        <Route path="/zonaladmin" element={<ZonalAdmin />} />
        <Route path="/statewiseadmin" element={<StateWiseAdmin />} />
        <Route path="/citywiseadmin" element={<CityWiseAdmin />} />
        <Route path="/projectapprovalmanager" element={<ProjectApprovalManager />} />
        <Route path="/propertyapprovalmanager" element={<PropertyApprovalManager />} />
        <Route path="/projectleadmanager" element={<ProjectLeadManager />} />
        <Route path="/propertyleadmanager" element={<PropertyLeadManager />} />
        <Route path="/builderapprovalscitywise" element={<BuilderApprovalsCityWise />} />
        <Route path="/addprojectmanager" element={<Addprojectsmanager />} />
        {/* //////////////////////////////// Add Sales Users ////////////////////////  */}
        <Route path="/zonalsalesmanager" element={<ZonalSalesManager />} />
        <Route path="/statedirectorsales" element={<StateDirectorSales />} />
        <Route path="/citysalesmanager" element={<CitySalesManager />} />
        <Route path="/salesexecutive" element={<SalesExecutive />} />
        {/* //////////////////////////////// Cache Management ////////////////////////  */}
        <Route path="/cachemanagement" element={<CacheManagemenet />} />
        {/* //////////////////////////////// Backups ////////////////////////  */}
        <Route path="/backups" element={<Backups />} />
        {/* /////////////////////// Meta listing ///////////////// */}
        <Route path='/AddListing' element={<AddMetaListings />} />
        <Route path='/careers-response' element={<CareersRes />} />
        <Route path='/contact-response' element={<ContactRes />} />
        <Route path='/feedback-response' element={<FeedBack />} />

      </Routes>
    </Suspense>
  );
};

export default LazyLoad;
