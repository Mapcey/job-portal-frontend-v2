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
import RichTextBox from "../../components/RichTextBox";
import { useNotification } from "../../context/NotificationsProvider";

// import { COUNTRIES } from "../../assets/data/slCities";
import { LOCATION_DATA } from "../../types/locationOptions";

import { Paper, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SendIcon from "@mui/icons-material/Send";

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
    Country: "Sri Lanka",
    State: "",
    City: "",
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

  // Country options
  const countries = LOCATION_DATA;

  // Selected country
  const selectedCountry =
    countries.find((country) => country.name === formData.Country) || null;

  // Province / State options
  const states = selectedCountry?.provinces || [];

  // Selected province
  const selectedState =
    states.find((state) => state.name === formData.State) || null;

  // City options
  const cities = selectedState?.cities || [];

  const navigate = useNavigate();
  const { notify } = useNotification();

  const [editorKey, setEditorKey] = useState(0);

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
      notify("New job posted", "success");

      setFormData({
        JobTitle: "",
        Country: "Sri Lanka",
        State: "",
        City: "",
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

      setEditorKey((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      notify("Error posting job", "error");
    }
  };

  return (
    <div className="post-job-container">
      <Header_2 />

      <Breadcrumb
        title="Post a New Job"
        description="Create a job listing and connect with talented professionals across our network."
        backgroundImage="/imgs/backgrounds/bg-1.jpg"
      />

      <div className="post-job-page">
        {/* Page Header */}
        <div className="post-job-page-header">
          <div>
            <h2>Create Job Posting</h2>
            <p>
              Complete the information below to publish your job opportunity.
            </p>
          </div>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/employer/profile")}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Back to Profile
          </Button>
        </div>

        <div className="post-job-content">
          {/* Basic Information */}
          <Paper className="post-job-card" elevation={0}>
            <div className="post-job-section-header">
              <div className="post-job-icon">
                <WorkOutlineIcon />
              </div>
              <div>
                <h3>Job Information</h3>
                <p>Provide the essential details about this position.</p>
              </div>
            </div>

            <Divider sx={{ my: 3 }} />

            <div className="post-job-form-grid">
              <TextField
                fullWidth
                name="JobTitle"
                label="Job Title"
                placeholder="e.g. Senior Software Engineer"
                value={formData.JobTitle}
                onChange={handleChange}
                required
              />

              <Autocomplete
                sx={{ pb: 2 }}
                fullWidth
                options={countries}
                value={selectedCountry}
                getOptionLabel={(option) => option.name}
                onChange={(_event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    Country: newValue?.name || "",
                    State: "",
                    City: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Country"
                    placeholder="Select country"
                    required
                  />
                )}
              />

              {/* Keep your other existing fields here */}
            </div>

            <div className="post-job-form-grid">
              {/* State / Province */}
              <Autocomplete
                fullWidth
                sx={{ pb: 2 }}
                options={states}
                value={selectedState}
                getOptionLabel={(option) => option.name}
                disabled={!formData.Country}
                onChange={(_event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    State: newValue?.name || "",
                    City: "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="State / Province"
                    placeholder="Select state or province"
                  />
                )}
              />

              {/* City */}
              <Autocomplete
                fullWidth
                options={cities}
                value={cities.find((city) => city === formData.City) || null}
                disabled={!formData.State}
                onChange={(_event, newValue) => {
                  setFormData((prev) => ({
                    ...prev,
                    City: newValue || "",
                  }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="City"
                    placeholder="Select city"
                  />
                )}
              />
            </div>

            <div className="post-job-form-grid">
              {/* Job Category */}
              <TextField
                fullWidth
                sx={{ pb: 2 }}
                select
                name="JobCategory"
                label="Job Category"
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

              {/* Job Type */}
              <TextField
                fullWidth
                select
                name="JobType"
                label="Job Type"
                value={formData.JobType}
                onChange={handleChange}
                required
              >
                {JOB_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="post-job-form-grid">
              <TextField
                fullWidth
                sx={{ pb: 2 }}
                select
                name="EducationLevel"
                label="Education Level"
                variant="outlined"
                size="medium"
                value={formData.EducationLevel}
                onChange={handleChange}
              >
                {EDU_LEVELS.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                fullWidth
                select
                name="ProfExperience"
                label="Professional Experience"
                variant="outlined"
                size="medium"
                value={formData.ProfExperience}
                onChange={handleChange}
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

            <div className="post-job-form-grid">
              <TextField
                fullWidth
                sx={{ pb: 2 }}
                select
                name="Languages"
                label="Preferred Languages"
                variant="outlined"
                size="medium"
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
                fullWidth
                select
                name="SalaryRange"
                label="Salary Range"
                variant="outlined"
                size="medium"
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

            <div className="post-job-form-grid">
              {/* Work Type */}
              <TextField
                fullWidth
                sx={{ pb: 2 }}
                select
                name="WorkType"
                label="Work Type"
                variant="outlined"
                size="medium"
                value={formData.WorkType}
                onChange={handleChange}
              >
                {WORK_TYPE.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>

              {/* Closing Date */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Closing Date"
                  value={
                    formData.ExpiryDate ? dayjs(formData.ExpiryDate) : null
                  }
                  minDate={dayjs()}
                  onChange={(newValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      ExpiryDate: newValue ? newValue.format("YYYY-MM-DD") : "",
                    }));
                  }}
                  slotProps={{
                    textField: {
                      name: "ExpiryDate",
                      label: "Application Closing Date",
                      variant: "outlined",
                      size: "medium",
                      required: true,
                      fullWidth: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
          </Paper>

          {/* Job Description */}
          <Paper className="post-job-card" elevation={0}>
            <div className="post-job-section-header">
              <div className="post-job-icon">
                <DescriptionOutlinedIcon />
              </div>
              <div>
                <h3>Job Description</h3>
                <p>
                  Explain the responsibilities, qualifications and expectations
                  for this role.
                </p>
              </div>
            </div>

            <Divider sx={{ my: 3 }} />

            <RichTextBox
              key={editorKey}
              value={formData.Description}
              onChange={(val) =>
                setFormData((prev) => ({
                  ...prev,
                  Description: val,
                }))
              }
            />
          </Paper>

          {/* Submit Section */}
          <Paper className="post-job-submit-card" elevation={0}>
            <div>
              <h3>Ready to publish?</h3>
              <p>
                Review your job information before publishing it to potential
                candidates.
              </p>
            </div>

            <Button
              variant="contained"
              size="large"
              startIcon={<SendIcon />}
              onClick={handleSubmit}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
              }}
            >
              Publish Job
            </Button>
          </Paper>
        </div>
      </div>

      <FooterSection_1 />
    </div>
  );
};
export default PostJob;
