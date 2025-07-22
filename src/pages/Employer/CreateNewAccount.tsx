// import React from "react";
import Header_1 from "../../components/header/Header_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import FormSection_1 from "../../components/Employer/FormSection_1";

const CreateNewAcEmployer = () => {
  return (
    <div className="create-new-ac-seeker-container">
      <div>
        <Header_1 />
        <Breadcrumb
          title="Complete Your New Employer Profile"
          description="Create a new account to access all features and services. Create a new account to access all features and services."
          backgroundImage="/imgs/backgrounds/bg-1.jpg"
        />
        <FormSection_1 />
      </div>
    </div>
  );
};

export default CreateNewAcEmployer;
