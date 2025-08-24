import { useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Button, MenuItem } from "@mui/material";

import Header_2 from "../../components/header/Header_2";
import Breadcrumb from "../../components/common/Breadcrumb";
import { CREATE_JOB } from "../../types/job";
import { createNewJob } from "../../services/APIs/APIs";

const jobCategories = [
  "Engineering",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "Human Resources",
];

const jobType = ["full-time", "part-time"];

const language = ["Sinhala", "English", "Tamil"];

const educationLevel = ["O/L", "A/L", "Diploma", "Bachelor", "Master", "PhD"];

const salaryRange = ["0 - 60k", "60k - 100k", "100k - 150k", "150k +"];

const PostJob = () => {
  const [formData, setFormData] = useState({
    JobTitle: "",
    Location: "",
    JobCategory: "",
    JobType: "",
    WorkType: "",
    EducationLevel: "",
    ProfExperience: "",
    Languages: "",
    SalaryRange: "",
    ExpiryDate: "", // default today
    Description: "",
    Status: "Active",
  });

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
      <div className="post-job-content">
        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: "0", paddingTop: "20", marginTop: 30 }}>
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
              <TextField
                name="Location"
                label="Location"
                variant="outlined"
                // placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.Location}
                onChange={handleChange}
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
                {jobCategories.map((category) => (
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
                {jobType.map((category) => (
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
                {educationLevel.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Professional Experience"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
              />
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
                {language.map((category) => (
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
                {salaryRange.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="p-j-form-row">
              <TextField
                name="WorkType"
                label="Wrok Type"
                variant="outlined"
                placeholder="Add your full name"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                value={formData.WorkType}
                onChange={handleChange}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Closing Date"
                  value={
                    formData.ExpiryDate ? dayjs(formData.ExpiryDate) : null
                  }
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
          <TextField
            label="Professional Experience"
            variant="outlined"
            placeholder="Add your professional experience"
            className="text-input-3"
            size="small"
            sx={{ mr: 5, mt: 3 }}
            value={formData.ProfExperience || ""}
            onChange={handleChange}
            fullWidth
          />
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: "0", paddingTop: "20", marginTop: 30 }}>
            Job Description
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <TextField
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
    </div>
  );
};

export default PostJob;
