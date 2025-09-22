import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Box } from "@mui/material";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import Breadcrumb from "../../components/common/Breadcrumb";
import { getEmployerData, putEmployerData } from "../../services/APIs/APIs";
import { EMPLOYER_DATA } from "../../types/users";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationsProvider";

const EditProfileEmployer = () => {
  const [formData, setFormData] = useState<EMPLOYER_DATA>({
    EmployerId: 0,
    FirebaseUID: "",
    CompanyName: "",
    ContactNo: "",
    WebSite: "",
    Location: "",
    LinkedIn: "",
    Overview: "",
    IsSub: false,
  });

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { notify } = useNotification();

  // Set EmployerId from logged-in user
  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setFormData((prev) => ({
        ...prev,
        EmployerId: userInfo.EmployerId,
      }));
    }
  }, [userInfo]);

  // Fetch employer data and set to form
  useEffect(() => {
    const fetchData = async () => {
      if (formData.EmployerId) {
        try {
          const data = await getEmployerData(formData.EmployerId.toString());
          setFormData(data); // pre-fill form with existing data
          console.log("Employer data fetched:", data);
        } catch (error) {
          console.error("Failed to fetch employer data:", error);
        }
      }
    };

    fetchData();
  }, [formData.EmployerId]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Save updated data
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await putEmployerData(formData.EmployerId, formData);
      console.log("Profile updated successfully:", response);
      notify("Profile details saved", "success");
      navigate("/employer/profile");
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const handleCancel = () => {
    navigate("/employer/profile");
  };
  return (
    <div className="employer-edit-profile-container">
      <Header_2 />
      <Breadcrumb
        title="Edit Employer Profile"
        description="Edit Account details"
        backgroundImage="/imgs/backgrounds/bg-1.jpg"
      />
      <Container sx={{ mt: 4, mb: 4 }}>
        <div>
          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Company Name"
              name="CompanyName"
              value={formData.CompanyName}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
            <TextField
              fullWidth
              label="Email"
              name="Email"
              value={userInfo.Email}
              size="small"
              className="text-field-1"
              disabled
            />
          </Box>
          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Contact Number"
              name="ContactNo"
              value={formData.ContactNo}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />

            <TextField
              fullWidth
              label="WebSite"
              name="WebSite"
              value={formData.WebSite}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>

          <Box gap={2} display={"flex"} flexDirection={"row"} mb={3}>
            <TextField
              fullWidth
              label="Location"
              name="Location"
              value={formData.Location}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />

            <TextField
              fullWidth
              label="LinkedIn"
              name="LinkedIn"
              value={formData.LinkedIn}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>
          <Box gap={2} display={"flex"} flexDirection={"row"}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Overview"
              name="Overview"
              value={formData.Overview}
              onChange={handleChange}
              size="small"
              className="text-field-1"
            />
          </Box>
        </div>

        {/* Buttons */}
        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Edits
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Container>
      <FooterSection_1 />
    </div>
  );
};

export default EditProfileEmployer;
