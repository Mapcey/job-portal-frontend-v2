import React from "react";
import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import FormSection_1 from "../../components/Seeker/FormSection_1";
import FormSection_2 from "../../components/Seeker/formSection_2";

const CreateNewAcSeeker = () => {
  return (
    <div className="create-new-ac-seeker-container">
      <div>
        <Header_2 />
        <Breadcrumb
          title="Profile > Create New Account"
          description="Create a new account to access all features and services. Create a new account to access all features and services."
          backgroundImage="/imgs/backgrounds/bg-1.jpg"
        />
        <FormSection_1 />
        {/* <FormSection_2 /> */}
      </div>
    </div>
  );
};

export default CreateNewAcSeeker;
