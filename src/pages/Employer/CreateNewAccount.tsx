// import React from "react";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import FormSection_1 from "../../components/Employer/FormSection_1";

const CreateNewAcEmployer = () => {
  return (
    <div className="create-new-ac-seeker-container">
      <div>
        <Header_2 />
        <Breadcrumb
          title="Complete Your New Employer Profile"
          description="Create a new account to access all features and services. "
          backgroundImage="/imgs/backgrounds/bg-1.jpg"
        />
        <FormSection_1 />
      </div>
    </div>
  );
};

export default CreateNewAcEmployer;
