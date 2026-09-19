import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import { Button, MenuItem, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import { CREATE_JOB } from "../../types/job";
// import { sriLankaCities } from "../../assets/data/sriLankaCities";
import RichTextBox from "../../components/RichTextBox";
import { useNotification } from "../../context/NotificationsProvider";

// import { Country, State, City } from "country-state-city";
import { COUNTRIES } from "../../assets/data/slCities";

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

  // const countries = Country.getAllCountries();

  // const selectedCountry = countries.find(
  //   (country) => country.name === formData.Country,
  // );

  // const states = selectedCountry
  //   ? State.getStatesOfCountry(selectedCountry.isoCode)
  //   : [];

  // const selectedState = states.find((state) => state.name === formData.State);

  // const cities =
  //   selectedCountry && selectedState
  //     ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
  //     : [];

  const countries = COUNTRIES;

  const selectedCountry = countries.find(
    (country) => country.name === formData.Country,
  );

  const states = selectedCountry?.states || [];

  const selectedState = states.find((state) => state.name === formData.State);

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
        title={"Post a New Job"}
        description={
          "Fill out the details below to publish your opening and connect with top talent across our network."
        }
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
                fullWidth
                name="JobTitle"
                label="Job Title"
                variant="outlined"
                size="small"
                sx={{ mr: 5, mt: 3 }}
                className="text-input-3"
                value={formData.JobTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div className="p-j-form-row">
              {/* Country */}
              {/* Country */}
              <Autocomplete
                fullWidth
                options={countries}
                value={selectedCountry || null}
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
                    size="small"
                    variant="outlined"
                  />
                )}
              />

              {/* State / Province */}
              <Autocomplete
                fullWidth
                options={states}
                value={selectedState || null}
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
                    size="small"
                    variant="outlined"
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
                    size="small"
                    variant="outlined"
                  />
                )}
              />
            </div>

            <div className="p-j-form-row">
              <TextField
                fullWidth
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
                fullWidth
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
                fullWidth
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

              <TextField
                fullWidth
                select
                name="ProfExperience"
                label="Professional Experience"
                variant="outlined"
                className="text-input-3"
                size="small"
                sx={{ mr: 5, mt: 3 }}
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
            <div className="p-j-form-row">
              <TextField
                fullWidth
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
                fullWidth
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
              <TextField
                fullWidth
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
                      fullWidth: true,
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
          <p style={{ color: "#666", fontSize: "14px", marginTop: 0 }}>
            <i>Add your job description below, or paste an existing one.</i>
          </p>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
          <RichTextBox
            key={editorKey}
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
