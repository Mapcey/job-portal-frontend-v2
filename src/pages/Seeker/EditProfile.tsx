import { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";
import { SEEKER_DATA } from "../../types/users";
import { getSeekerData } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EditSeekerProfile = () => {
  const { userInfo } = useAuth();
  const [seekerID, setSeekerID] = useState<number>(0);
  const [form, setForm] = useState<Partial<SEEKER_DATA>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) {
      setSeekerID(userInfo.UserId);
    }
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (seekerID !== 0) {
        try {
          const data = await getSeekerData(seekerID.toString());
          setForm(data);
        } catch (error) {
          console.error("Failed to fetch seeker data:", error);
        }
      }
    };
    fetchData();
  }, [seekerID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Type-safe helper function
  const getArray = (type: "careers" | "educations" | "skills") => {
    switch (type) {
      case "careers":
        return form.careers || [];
      case "educations":
        return form.educations || [];
      case "skills":
        return form.skills || [];
    }
  };

  const handleArrayChange = (
    type: "careers" | "educations" | "skills",
    idx: number,
    field: string,
    value: string
  ) => {
    const updated = [...getArray(type)];
    updated[idx] = { ...updated[idx], [field]: value };

    setForm({ ...form, [type]: updated } as Partial<SEEKER_DATA>);
  };

  const addArrayItem = (type: "careers" | "educations" | "skills") => {
    const item =
      type === "careers"
        ? {
            id: Date.now(),
            Designation: "",
            CompanyName: "",
            StartDate: "",
            EndDate: "",
            Description: "",
          }
        : type === "educations"
        ? {
            id: Date.now(),
            InstituteName: "",
            FieldOfStudy: "",
            StartDate: "",
            EndDate: "",
            LevelOfStudy: "",
            Status: "",
          }
        : { id: Date.now(), Skill: "", ExpertLevel: "" };

    setForm({
      ...form,
      [type]: [...getArray(type), item],
    } as Partial<SEEKER_DATA>);
  };

  const removeArrayItem = (type: "careers" | "educations" | "skills", idx: number) => {
    const updated = [...getArray(type)];
    updated.splice(idx, 1);
    setForm({ ...form, [type]: updated } as Partial<SEEKER_DATA>);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      //await updateSeekerData(seekerID.toString(), form);
      navigate(-1);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const renderArraySection = (
    type: "careers" | "educations" | "skills",
    title: string,
    fields: string[]
  ) => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <Button variant="outlined" size="small" sx={{ mb: 1 }} onClick={() => addArrayItem(type)}>
        Add {title.slice(0, -1)}
      </Button>
      {getArray(type).length > 0 ? (
        getArray(type).map((item, idx) => (
          <Box
            key={(item as any).id || idx}
            sx={{
              mb: 2,
              p: 2,
              border: "1px solid #ddd",
              borderRadius: 2,
              boxShadow: 1,
              backgroundColor: "#fafafa",
            }}
          >
            {fields.map((field) => (
              <TextField
                key={field}
                label={field}
                value={(item as any)[field] || ""}
                onChange={(e) => handleArrayChange(type, idx, field, e.target.value)}
                fullWidth
                margin="dense"
              />
            ))}
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={() => removeArrayItem(type, idx)}
              sx={{ mt: 1 }}
            >
              Remove
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No {title.toLowerCase()} available.</Typography>
      )}
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 6 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="First Name"
            name="FirstName"
            value={form.FirstName || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="LastName"
            value={form.LastName || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Email"
            name="Email"
            value={form.Email || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Contact No"
            name="ContactNo"
            value={form.ContactNo || ""}
            InputProps={{ readOnly: true }}
            fullWidth
          />
          <TextField
            label="Address"
            name="Address"
            value={form.Address || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Professional Experience (years)"
            name="ProfessionalExperience"
            type="number"
            value={form.ProfessionalExperience || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Salary"
            name="Salary"
            type="number"
            value={form.Salary || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Job Type"
            name="JobType"
            value={form.JobType || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Summary"
            name="Summary"
            value={form.Summary || ""}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>

        <Divider sx={{ my: 3 }} />

        {renderArraySection("careers", "Career History", [
          "Designation",
          "CompanyName",
          "StartDate",
          "EndDate",
          "Description",
        ])}

        {renderArraySection("educations", "Education", [
          "InstituteName",
          "FieldOfStudy",
          "StartDate",
          "EndDate",
          "LevelOfStudy",
          "Status",
        ])}

        {renderArraySection("skills", "Skills", ["Skill", "ExpertLevel"])}

        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button type="submit" variant="contained" size="large">
            Save
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditSeekerProfile;
