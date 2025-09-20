import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import { CREATE_JOB } from "../../types/job";
import { sriLankaCities } from "../../assets/data/sriLankaCities";

import RichTextBox from "../../components/RichTextBox";

import {
  JOB_CAT,
  JOB_TYPES,
  EDU_LEVELS,
  LANG,
  SAL_RANGES,
  WORK_TYPE,
} from "../../types/jobOptions";
import { createNewJob } from "../../services/APIs/APIs";

const PostJob = () => {
  const [formData, setFormData] = useState<CREATE_JOB>({
    JobTitle: "",
    Location: "",
    JobCategory: "",
    JobType: "",
    WorkType: "",
    EducationLevel: "",
    ProfExperience: "",
    Languages: "",
    SalaryRange: "",
    ExpiryDate: "",
    Description: "",
    Status: "Active",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      console.log(formData);
      const response = await createNewJob(formData);
      console.log("Job created:", response);
      alert("Job posted successfully!");
    } catch (err) {
      console.error(err);
      alert("Error posting job");
    }
  };

  return (
    <div className="post-job-container">
      <Header_2 />
      <Breadcrumb
        title={"Post a New Job"}
        description={"this is the description"}
        backgroundImage={"/imgs/backgrounds/bg-1.jpg"}
      />
      <Button sx={{ p: 2 }} onClick={() => navigate("/employer/profile")}>
        Back to Profile
      </Button>
      <div className="post-job-content">
        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: "0", paddingTop: "0", marginTop: 30 }}>
            Job Information
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <div className="post-job-content-section-1">
            <div className="p-j-form-row">
              <TextField
                name="JobTitle"
                label="Job Title"
                variant="outlined"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                // placeholder="Add your full name"
                className="text-input-3"
                value={formData.JobTitle}
                onChange={handleChange}
                required
              />

              <Autocomplete
                options={sriLankaCities}
                value={formData.Location}
                className="text-input-3"
                sx={{ mr: 5, mt: 3 }}
                onChange={(_e, newValue) =>
                  setFormData((prev) => ({ ...prev, Location: newValue || "" }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="p-j-form-row">
              <TextField
                select
                name="JobCategory"
                label="Job Category"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.JobCategory}
                onChange={handleChange}
                required
              >
                {JOB_CAT.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="JobType"
                label="Job Type"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.JobType}
                onChange={handleChange}
                required
              >
                {JOB_TYPES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="p-j-form-row">
              <TextField
                select
                name="EducationLevel"
                label="Education Level"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.EducationLevel}
                onChange={handleChange}
              >
                {EDU_LEVELS.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              {/* <TextField
                label="Professional Experience"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              /> */}

              <TextField
                select
                name="ProfExperience"
                label="Professional Experience"
                variant="outlined"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.ProfExperience}
                onChange={handleChange}
                fullWidth
              >
                {[
                  "No experience",
                  "1 year",
                  "2 years",
                  "3 years",
                  "5 years",
                  "10+ years",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-j-form-row">
              <TextField
                select
                name="Languages"
                label="Prefered Languages"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.Languages}
                onChange={handleChange}
              >
                {LANG.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                name="SalaryRange"
                label="Salary Rage"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.SalaryRange}
                onChange={handleChange}
              >
                {SAL_RANGES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-j-form-row">
              {/* <TextField
                name="WorkType"
                label="Wrok Type"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.WorkType}
                onChange={handleChange}
              /> */}

              <TextField
                select
                name="WorkType" // ✅ match the formData key exactly
                label="Work Type"
                variant="outlined"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.WorkType}
                onChange={handleChange}
              >
                {WORK_TYPE.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Closing Date"
                  value={
                    formData.ExpiryDate ? dayjs(formData.ExpiryDate) : null
                  }
                  minDate={dayjs()} // ✅ prevents past dates
                  onChange={(newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      ExpiryDate: newValue ? newValue.format("YYYY-MM-DD") : "",
                    }));
                  }}
                  slotProps={{
                    textField: {
                      name: "ExpiryDate",
                      variant: "outlined",
                      size: "small",
                      sx: { mr: 5, mt: 3 },
                      required: true,
                      className: "text-input-3",
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: 5, paddingTop: "20", marginTop: 30 }}>
            Job Description
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          {/* <TextField
            name="Description"
            id="outlined-multiline-static"
            label="Add a Detailed Description"
            placeholder="Add a detailed summery of yor experience."
            multiline
            rows={6}
            className="text-input-3"
            size="small"
            sx={{ width: "100%" }}
            value={formData.Description || ""}
            onChange={handleChange}
          /> */}

          <RichTextBox
            value={formData.Description}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, Description: val }))
            }
          />
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <Button
            variant="contained"
            sx={{ marginTop: "20px" }}
            onClick={handleSubmit}
          >
            Post Job
          </Button>
        </div>
      </div>
      <FooterSection_1 />
    </div>
  );
};

export default PostJob;
