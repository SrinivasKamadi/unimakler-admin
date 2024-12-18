import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepThree';
import StepFour from './stepFour';
import StepFive from './stepFive';
import MultiStep from './Multistep';

const Properties = () => {
  const [type, setType] = useState('');
  const [subType, setSubType] = useState('');
  const [isSale, setIsSale] = useState(true);
  const [isRent, setIsRent] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  const handleStep = () => {
    setCurrentStep(0)
    window.scrollTo(0, 0)
  }


  let componentStep;
  switch (currentStep) {
    case 0:
      // componentStep = <StepZero nextStep={handleNext} />
      componentStep = <StepOne nextStep={handleNext} prevStep={handlePrev} currentStep={currentStep} setType={setType} setSubType={setSubType} subType={subType} setIsRent={setIsRent} setIsSale={setIsSale} isRent={isRent} isSale={isSale} />;
      break;
    case 1:
      componentStep = <StepTwo nextStep={handleNext} prevStep={handlePrev} type={type} subType={subType} isSale={isSale} isRent={isRent} />;
      break;
    case 2:
      componentStep = <StepThree nextStep={handleNext} prevStep={handlePrev} type={type} subType={subType} />;
      break;
    case 3:
      componentStep = <StepFour nextStep={handleNext} prevStep={handlePrev} type={type} subType={subType} />;
      break;
    case 4:
      componentStep = <StepFive prevStep={handlePrev} type={type} subType={subType} stepOne={handleStep} />;
      break;
    default:
      break;
  }

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                  <div className="page-title-right">
                    <ol className="breadcrumb m-0">
                      <li className="breadcrumb-item">
                        <a>Terraterri</a>
                      </li>
                      <li className="breadcrumb-item active"> Properties</li>
                    </ol>
                  </div>
                  <div className="page-title-right">
                    <Link to="/addproperties">
                      <button className="btn btn-info">Add Properties</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-md-12">

                {componentStep}

              </div>
            </div>
            {/* <div className="row justify-content-center">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Properties</h3>
                  </div>
                  <div className="card-body">
                    <div className="App">
                      <MultiStep steps={steps} />
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Properties;