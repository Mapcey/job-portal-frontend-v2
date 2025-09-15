import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  LinearProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert
} from "@mui/material";
import { SEEKER_DATA, Skill } from "../../types/users";
import {
  getSeekerData,
  updateSeeker,
  updateSkill,
  addSkill,
  deleteSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  addCareer,
  updateCareer,
  deleteCareer,
  addSeekerFile
} from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const EditSeekerProfile = () => {
  const { userInfo } = useAuth();
  const [seekerID, setSeekerID] = useState<number>(0);
  const [form, setForm] = useState<Partial<SEEKER_DATA>>({});
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [originalSkills, setOriginalSkills] = useState<Skill[]>([]);
  const [originalCareers, setOriginalCareers] = useState<any[]>([]);
  const [originalEducations, setOriginalEducations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && "UserId" in userInfo) setSeekerID(userInfo.UserId);
  }, [userInfo]);

  useEffect(() => {
    const fetchData = async () => {
      if (seekerID !== 0) {
        try {
          const data = await getSeekerData(seekerID.toString());
          setForm(data);
          setOriginalSkills(data.skills ?? []);
          setOriginalCareers(data.careers ?? []);
          setOriginalEducations(data.educations ?? []);
        } catch (error) {
          console.error("Failed to fetch seeker data:", error);
        }
      }
    };
    fetchData();
  }, [seekerID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const jobTypeOptions = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Internship", label: "Internship" },
    { value: "Contract", label: "Contract" },
  ];

  const jobModeOptions = [
    { value: "On-site", label: "On-site" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
  ];
  const validateProfileImage = (file: File) => {
    const validFormats = ["image/jpeg", "image/png"];
    if (!validFormats.includes(file.type)) return "Profile image must be JPG or PNG";
    if (file.size > 1 * 1024 * 1024) return "Profile image must be ≤ 1 MB";
    return null;
  };

  const validateCV = (file: File) => {
    const validFormats = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!validFormats.includes(file.type)) return "CV must be PDF or DOCX";
    if (file.size > 5 * 1024 * 1024) return "CV must be ≤ 5 MB";
    return null;
  };

  const validateVideo = (file: File) => {
    if (file.type !== "video/mp4") return "Video must be MP4";
    if (file.size > 50 * 1024 * 1024) return "Video must be ≤ 50 MB";
    return null;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "cv" | "video"
  ) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    let error: string | null = null;
    switch (type) {
      case "image":
        error = validateProfileImage(file);
        if (!error) setProfileImage(file);
        break;
      case "cv":
        error = validateCV(file);
        if (!error) setCvFile(file);
        break;
      case "video":
        error = validateVideo(file);
        if (!error) setVideoFile(file);
        break;
    }

    if (error) {
      alert(error);
      e.target.value = ""; // reset input
    }
  };

  const uploadFile = async (file: File, path: string) => {
    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(prog);
        },
        (error) => reject(error),
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      if (profileImage) {
      const url = await uploadFile(profileImage, `profileImages/${seekerID}_${profileImage.name}`);
      await addSeekerFile(seekerID, {
        user_id: seekerID,
        file_name: profileImage.name,
        file_url: url/*,
        type: "image"*/
      });
    }
    if (cvFile) {
      const url = await uploadFile(cvFile, `cvFiles/${seekerID}_${cvFile.name}`);
      await addSeekerFile(seekerID, {
        user_id: seekerID,
        file_name: cvFile.name,
        file_url: url/*,
        type: "cv"*/
      });
    }
    if (videoFile) {
      const url = await uploadFile(videoFile, `videoFiles/${seekerID}_${videoFile.name}`);
      await addSeekerFile(seekerID, {
        user_id: seekerID,
        file_name: videoFile.name,
        file_url: url/*,
        type: "video"*/
      });
    }
      const updatedData: Partial<SEEKER_DATA> = {
        ...form,
        Salary: Number(form.Salary),
        ProfessionalExperience: Number(form.ProfessionalExperience),
        /*ProfileImage: profileImageUrl,
        CV: cvUrl,
        IntroVideo: videoUrl,*/
      };
      // Remove array fields before main update
      delete (updatedData as any).skills;
      delete (updatedData as any).educations;
      delete (updatedData as any).careers;

      await updateSeeker(seekerID, updatedData);

      // Skills update
      const currentSkills: Skill[] = form.skills ?? [];
      const toAddSkills = currentSkills.filter((s) => !s.id);
      const toUpdateSkills = currentSkills.filter((s) => {
        if (!s.id) return false;
        const prev = originalSkills.find((p) => p.id === s.id);
        return !prev || prev.Skill !== s.Skill || prev.ExpertLevel !== s.ExpertLevel;
      });
      const toDeleteSkills = originalSkills.filter((p) => !currentSkills.some((s) => s.id === p.id));

      await Promise.all([
        ...toAddSkills.map((s) => addSkill(seekerID, { Skill: s.Skill, ExpertLevel: s.ExpertLevel })),
        ...toUpdateSkills.map((s) => updateSkill(seekerID, s.id!, { Skill: s.Skill, ExpertLevel: s.ExpertLevel })),
        ...toDeleteSkills.map((s) => deleteSkill(seekerID, s.id!)),
      ]);

      // Careers update
      const currentCareers = form.careers ?? [];
      const careersToAdd = currentCareers.filter((c) => !c.id);
      const careersToUpdate = currentCareers.filter((c) => {
        if (!c.id) return false;
        const prev = originalCareers.find((p) => p.id === c.id);
        return !prev || JSON.stringify(prev) !== JSON.stringify(c);
      });
      const careersToDelete = originalCareers.filter((p) => !currentCareers.some((c) => c.id === p.id));

      await Promise.all([
        ...careersToAdd.map((c) => addCareer(seekerID, c)),
        ...careersToUpdate.map((c) => updateCareer(seekerID, c.id!, c)),
        ...careersToDelete.map((c) => deleteCareer(seekerID, c.id)),
      ]);

      // Educations update
      const currentEducations = form.educations ?? [];
      const educationsToAdd = currentEducations.filter((e) => !e.id);
      const educationsToUpdate = currentEducations.filter((e) => {
        if (!e.id) return false;
        const prev = originalEducations.find((p) => p.id === e.id);
        return !prev || JSON.stringify(prev) !== JSON.stringify(e);
      });
      const educationsToDelete = originalEducations.filter((p) => !currentEducations.some((e) => e.id === p.id));

      await Promise.all([
        ...educationsToAdd.map((e) => addEducation(seekerID, e)),
        ...educationsToUpdate.map((e) => updateEducation(seekerID, e.id!, e)),
        ...educationsToDelete.map((e) => deleteEducation(seekerID, e.id)),
      ]);

      // Save originals
      setOriginalCareers(currentCareers);
      setOriginalEducations(currentEducations);
      setOriginalSkills(currentSkills);

      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch (err: any) {
      if (err?.response?.status === 409) {
        setErrorMsg("A user with this email or phone already exists.");
      } else {
        setErrorMsg("Failed to update profile.");
      }
      console.error("Failed to update profile:", err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // ----------------- Array helpers -----------------
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
    updated[idx] = { ...(updated[idx] as any), [field]: value };
    setForm({ ...form, [type]: updated } as Partial<SEEKER_DATA>);
  };

  const addArrayItem = (type: "careers" | "educations" | "skills") => {
    const item =
      type === "careers"
        ? { id: undefined, Designation: "", CompanyName: "", StartDate: "", EndDate: "", Description: "" }
        : type === "educations"
        ? { id: undefined, InstituteName: "", FieldOfStudy: "", StartDate: "", EndDate: "", LevelOfStudy: "", Status: "" }
        : { id: undefined, Skill: "", ExpertLevel: "" };
    setForm({ ...form, [type]: [...getArray(type), item] } as Partial<SEEKER_DATA>);
  };

  const removeArrayItem = (type: "careers" | "educations" | "skills", idx: number) => {
    const updated = [...getArray(type)];
    updated.splice(idx, 1);
    setForm({ ...form, [type]: updated } as Partial<SEEKER_DATA>);
  };

  const renderArraySection = (type: "careers" | "educations" | "skills", title: string, fields: string[]) => (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <Button variant="outlined" size="small" sx={{ mb: 1 }} onClick={() => addArrayItem(type)}>
        Add {title.slice(0, -1)}
      </Button>
      {getArray(type).length > 0 ? (
        getArray(type).map((item, idx) => (
          <Box
            key={(item as any).id ?? `new-${idx}`}
            sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2, boxShadow: 1, backgroundColor: "#fafafa" }}
          >
            {fields.map((field) => (
            <TextField
              key={field}
              label={field}
              type={field === "StartDate" || field === "EndDate" ? "date" : "text"}
              InputLabelProps={field === "StartDate" || field === "EndDate" ? { shrink: true } : {}}
              value={(item as any)[field] || ""}
              onChange={(e) => handleArrayChange(type, idx, field, e.target.value)}
              fullWidth
              margin="dense"
            />
          ))}
            <Button variant="text" color="error" size="small" onClick={() => removeArrayItem(type, idx)} sx={{ mt: 1 }}>
              Remove
            </Button>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No {title.toLowerCase()} available.</Typography>
      )}
    </Box>
  );

  // ----------------- Render Form -----------------
  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 6 }}>
      <Typography variant="h4" mb={3} textAlign="center">
        Edit Profile
      </Typography>
      <Typography variant="h6">Basic Profile</Typography>
      {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
      {successMsg && <Alert severity="success" sx={{ mb: 2 }}>{successMsg}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "grid", gap: 2 }}>
          <TextField label="First Name" name="FirstName" value={form.FirstName || ""} onChange={handleChange} fullWidth />
          <TextField label="Last Name" name="LastName" value={form.LastName || ""} onChange={handleChange} fullWidth />
          <TextField label="Email" name="Email" disabled value={form.Email || ""} onChange={handleChange} fullWidth />
          <TextField label="Contact No" name="ContactNo" value={form.ContactNo || ""} onChange={handleChange} fullWidth />
          <TextField label="Address" name="Address" value={form.Address || ""} onChange={handleChange} fullWidth />
          <TextField
            label="Date of Birth"
            name="DateOfBirth"
            type="date"
            value={form.DateOfBirth instanceof Date ? form.DateOfBirth.toISOString().slice(0, 10) : form.DateOfBirth || ""}
            onChange={handleChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="job-type-label">Job Type</InputLabel>
            <Select
              labelId="job-type-label"
              value={form.JobType || ""}
              name="JobType"
              onChange={(e) => setForm({ ...form, JobType: e.target.value })}
            >
              {jobTypeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="job-mode-label">Work Mode</InputLabel>
            <Select
              labelId="job-mode-label"
              value={form.JobType2 || ""}
              name="JobType2"
              onChange={(e) => setForm({ ...form, JobType2: e.target.value })}
            >
              {jobModeOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Location X" name="LocationX" type="number" value={form.LocationX || ""} onChange={handleChange} fullWidth />
          <TextField label="Location Y" name="LocationY" type="number" value={form.LocationY || ""} onChange={handleChange} fullWidth />
          <TextField
            label="Professional Experience (years)"
            name="ProfessionalExperience"
            type="number"
            value={form.ProfessionalExperience || ""}
            onChange={handleChange}
            fullWidth
          />
          <TextField label="Salary" name="Salary" type="number" value={form.Salary || ""} onChange={handleChange} fullWidth />
          <TextField label="Social Links" name="SocialLinks" value={form.SocialLinks || ""} onChange={handleChange} fullWidth />
          <TextField label="Summary" name="Summary" value={form.Summary || ""} onChange={handleChange} fullWidth multiline rows={3} />
        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography>Profile Image (.jpg / .png, ≤5 MB)</Typography>
          <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleFileChange(e, "image")} />
          <Typography>CV (.pdf / .docx, ≤5 MB)</Typography>
          <input type="file" accept=".pdf,.docx" onChange={(e) => handleFileChange(e, "cv")} />
          <Typography>Intro Video (.mp4, ≤50 MB)</Typography>
          <input type="file" accept="video/mp4" onChange={(e) => handleFileChange(e, "video")} />
        </Box>

        {uploading && <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />}

        {renderArraySection("careers", "Career History", ["Designation", "CompanyName", "StartDate", "EndDate", "Description"])}
        {renderArraySection("educations", "Education", ["InstituteName", "FieldOfStudy", "StartDate", "EndDate", "LevelOfStudy", "Status"])}
        {renderArraySection("skills", "Skills", ["Skill", "ExpertLevel"])}

        <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "center" }}>
          <Button type="submit" variant="contained" size="large" disabled={uploading}>
            {uploading ? "Uploading..." : "Save"}
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
