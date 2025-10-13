import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import {
  Typography,
  TextField,
  Autocomplete,
  MenuItem,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  JOB_CAT,
  JOB_TYPES,
  EDU_LEVELS,
  LANG,
  SAL_RANGES,
  WORK_TYPE,
} from "../../types/jobOptions";
import { CREATE_JOB } from "../../types/job";
import { useNotification } from "../../context/NotificationsProvider";
import { createNewJob } from "../../services/APIs/APIs";
import { sriLankaCities } from "../../assets/data/sriLankaCities";
import RichTextBox from "../../components/RichTextBox";

const CreateNewPost = () => {
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
    Status: "Pending",
  });

  const navigate = useNavigate();
  const { notify } = useNotification();

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
    } catch (err) {
      console.error(err);
      notify("Error posting job", "error");
    }
  };

  return (
    <div className="editor-post-job">
      <div className="post-job-content-section-1">
        <Typography variant="h4">Job Information</Typography>
      </div>

      <div className="post-job-content-section-1">
        <div className="editor-p-j-form-row">
          <TextField
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

        <div className="editor-p-j-form-row">
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

        <div className="editor-p-j-form-row">
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
        <div className="editor-p-j-form-row">
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

        <div className="editor-p-j-form-row">
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
              value={formData.ExpiryDate ? dayjs(formData.ExpiryDate) : null}
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

        <div className="post-job-content-section-1">
          <h3 style={{ marginBottom: 5, paddingTop: "20", marginTop: 30 }}>
            Job Description
          </h3>
        </div>

        {/* section */}
        <div className="post-job-content-section-1">
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
    </div>
  );
};

export default CreateNewPost;
