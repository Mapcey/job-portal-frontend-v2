// Form state type for controlled input
type ArrayFieldKey = "careers" | "educations" | "skills" | "languages";
type DraftCareer = Omit<Career, "id"> & { id?: number };
type DraftEducation = Omit<Education, "id"> & { id?: number };
type DraftSkill = Omit<Skill, "id"> & { id?: number };
type DraftLanguage = Omit<languages, "id"> & { id?: number };
type SeekerFormState = Omit<Partial<SEEKER_DATA>, "MinSalary" | "MaxSalary"> & {
  MinSalary: string;
  MaxSalary: string;
  careers?: DraftCareer[];
  educations?: DraftEducation[];
  skills?: DraftSkill[];
  languages?: DraftLanguage[];
};

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
  Alert,
  Chip,
} from "@mui/material";
import { currencies } from "../../data/currencies";
import { SEEKER_DATA, Skill, languages, Career, Education } from "../../types/users";
import {
  getSeekerData,
  updateSeeker,
  updateSkill,
  addSkill,
  deleteSkill,
  createLanguage,
  updateLanguage,
  deleteLanguage,
  addEducation,
  updateEducation,
  deleteEducation,
  addCareer,
  updateCareer,
  deleteCareer,
  addSeekerFile,
  getSeekerFiles,
} from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import Header_1 from "../../components/header/Header_1";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import { seekerFiles } from "../../types/users";
import { useNavigate } from "react-router-dom";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT = "#f36d00";
const ACCENT_LIGHT = "#eff6ff";
const BORDER = "#e2e8f0";
const SURFACE = "#f8fafc";
const TEXT_PRIMARY = "#0f172a";
const TEXT_MUTED = "#64748b";

// ─── Section card ─────────────────────────────────────────────────────────────
const SectionCard = ({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ border: `1px solid ${BORDER}`, borderRadius: 3, overflow: "hidden", bgcolor: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 3, py: 2, bgcolor: SURFACE, borderBottom: `1px solid ${BORDER}` }}>
      <Box sx={{ width: 34, height: 34, borderRadius: 2, bgcolor: ACCENT_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: ACCENT }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: TEXT_PRIMARY, lineHeight: 1.2 }}>{title}</Typography>
        {subtitle && <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{subtitle}</Typography>}
      </Box>
    </Box>
    <Box sx={{ p: 3 }}>{children}</Box>
  </Box>
);

// ─── Array item card ──────────────────────────────────────────────────────────
const ItemCard = ({ children, onRemove, isNew }: { children: React.ReactNode; onRemove: () => void; isNew: boolean }) => (
  <Box sx={{ border: `1px solid`, borderColor: isNew ? "#bfdbfe" : BORDER, borderRadius: 2, p: 2, mb: 2, bgcolor: isNew ? ACCENT_LIGHT : SURFACE, position: "relative" }}>
    {isNew && (
      <Chip label="New" size="small" sx={{ position: "absolute", top: 10, right: 10, bgcolor: ACCENT, color: "#fff", fontSize: "0.65rem", height: 20 }} />
    )}
    {children}
    <Box sx={{ mt: 1.5, display: "flex", justifyContent: "flex-end" }}>
      <Button variant="outlined" color="error" size="small" startIcon={<DeleteOutlineIcon fontSize="small" />} onClick={onRemove} sx={{ borderRadius: 2, textTransform: "none", fontSize: "0.78rem" }}>
        Remove
      </Button>
    </Box>
  </Box>
);

// ─── File upload zone ─────────────────────────────────────────────────────────
const FileUploadZone = ({ label, hint, inputId, accept, file, onChange }: { label: string; hint: string; inputId: string; accept: string; file: File | null; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <Box>
    <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_PRIMARY, mb: 0.5 }}>{label}</Typography>
    <Box
      sx={{ border: "2px dashed", borderColor: file ? "#93c5fd" : "#cbd5e1", borderRadius: 2, p: 2, bgcolor: file ? ACCENT_LIGHT : SURFACE, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 1.5 }}
      onClick={() => document.getElementById(inputId)?.click()}
    >
      <input id={inputId} type="file" accept={accept} onChange={onChange} style={{ display: "none" }} />
      {file ? (
        <>
          <InsertDriveFileIcon sx={{ color: ACCENT, fontSize: 24 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e3a8a" }}>{file.name}</Typography>
            <Typography variant="caption" sx={{ color: TEXT_MUTED }}>{(file.size / 1024).toFixed(0)} KB · Click to change</Typography>
          </Box>
        </>
      ) : (
        <>
          <UploadFileIcon sx={{ color: "#94a3b8", fontSize: 24 }} />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_MUTED }}>Click to select</Typography>
            <Typography variant="caption" sx={{ color: "#94a3b8" }}>{hint}</Typography>
          </Box>
        </>
      )}
    </Box>
  </Box>
);

// ─── Main component ───────────────────────────────────────────────────────────
const EditSeekerProfile = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const [seekerID, setSeekerID] = useState<number>(0);
  const [form, setForm] = useState<SeekerFormState>({ MinSalary: "", MaxSalary: "" });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [originalSkills, setOriginalSkills] = useState<Skill[]>([]);
  const [originalLanguages, setOriginalLanguages] = useState<languages[]>([]);
  const [originalCareers, setOriginalCareers] = useState<any[]>([]);
  const [originalEducations, setOriginalEducations] = useState<any[]>([]);
  const [files, setFiles] = useState<seekerFiles[]>([]);
  const navigate = useNavigate();

  const isEqualRecord = (prev: any, current: any) => {
    if (!prev || !current) return false;
    const keys = Array.from(new Set([...Object.keys(prev).filter((k) => k !== "id"), ...Object.keys(current).filter((k) => k !== "id")])).sort();
    return keys.every((k) => String(prev[k] ?? "").trim() === String(current[k] ?? "").trim());
  };

  const normalizeSkillItems = (skills?: any[]): Skill[] => {
    if (!Array.isArray(skills)) return [];
    return skills.map((s) => ({ ...s, id: s?.id ?? s?.Id ?? 0, UserId: s?.UserId ?? s?.userId ?? undefined })) as Skill[];
  };

  const normalizeLanguageItems = (items?: any[]): languages[] => {
    if (!Array.isArray(items)) return [];
    return items.map((i) => ({ ...i, id: i?.id ?? i?.Id ?? 0, UserId: i?.UserId ?? i?.userId ?? undefined })) as languages[];
  };

  const normalizeFetchedSeekerData = (data: any) => ({
    ...data,
    JobType: data?.JobType ?? data?.JobTypeName ?? "",
    JobType2: data?.JobType2 ?? data?.WorkType ?? data?.WorkMode ?? "",
    WorkType: data?.WorkType ?? data?.JobType2 ?? data?.WorkMode ?? "",
  });

  const loadSeekerData = async (id: number) => {
    try {
      const data = await getSeekerData(id.toString());
      const nd = normalizeFetchedSeekerData(data);
      const ns = normalizeSkillItems(nd.skills);
      const nl = normalizeLanguageItems(nd.languages);
      setForm({ ...nd, MinSalary: nd.MinSalary != null ? String(nd.MinSalary) : "", MaxSalary: nd.MaxSalary != null ? String(nd.MaxSalary) : "", languages: nl, skills: ns });
      setOriginalSkills(ns);
      setOriginalLanguages(nl);
      setOriginalCareers(data.careers ?? []);
      setOriginalEducations(data.educations ?? []);
      const f = await getSeekerFiles(id.toString());
      setFiles(f || []);
    } catch (error) {
      console.error("Failed to load seeker data:", error);
    }
  };

  useEffect(() => { if (userInfo && "UserId" in userInfo) setSeekerID(userInfo.UserId); }, [userInfo]);
  useEffect(() => { if (seekerID !== 0) loadSeekerData(seekerID); }, [seekerID]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const jobTypeOptions = [{ value: "Full-time", label: "Full-time" }, { value: "Part-time", label: "Part-time" }, { value: "Internship", label: "Internship" }, { value: "Contract", label: "Contract" }];
  const jobModeOptions = [{ value: "On-site", label: "On-site" }, { value: "Remote", label: "Remote" }, { value: "Hybrid", label: "Hybrid" }];

  const validateProfileImage = (file: File) => { if (!["image/jpeg", "image/png"].includes(file.type)) return "Profile image must be JPG or PNG"; if (file.size > 5 * 1024 * 1024) return "Profile image must be ≤ 5 MB"; return null; };
  const validateCV = (file: File) => { const valid = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]; if (!valid.includes(file.type)) return "CV must be PDF or DOCX"; if (file.size > 5 * 1024 * 1024) return "CV must be ≤ 5 MB"; return null; };
  const validateVideo = (file: File) => { if (file.type !== "video/mp4") return "Video must be MP4"; if (file.size > 50 * 1024 * 1024) return "Video must be ≤ 50 MB"; return null; };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "cv" | "video") => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    const validators = { image: validateProfileImage, cv: validateCV, video: validateVideo };
    const error = validators[type](file);
    if (error) { setErrorMsg(error); e.target.value = ""; return; }
    setErrorMsg("");
    if (type === "image") setProfileImage(file);
    else if (type === "cv") setCvFile(file);
    else setVideoFile(file);
  };

  const uploadFile = async (file: File, path: string) =>
    new Promise<string>((resolve, reject) => {
      const uploadTask = uploadBytesResumable(ref(storage, path), file);
      uploadTask.on("state_changed", (snap) => setProgress((snap.bytesTransferred / snap.totalBytes) * 100), reject, async () => resolve(await getDownloadURL(uploadTask.snapshot.ref)));
    });

  const wrapUpdatePromise = (p: Promise<any>, label: string) => p.catch((err) => { console.error(`[EditProfile] ${label}`, err); throw err; });

  const getArrayDiffPromises = <T extends { id?: number }>(typeLabel: string, current: T[], original: T[], addFn: (i: T) => Promise<any>, updateFn: (i: T) => Promise<any>, deleteFn: (id: number) => Promise<any>) => {
    const toAdd = current.filter((i) => !i.id);
    const toUpdate = current.filter((i) => i.id && !isEqualRecord(original.find((p) => p.id === i.id), i));
    const toDelete = original.filter((i) => i.id != null && !current.some((c) => c.id === i.id));
    return [
      ...toAdd.map((i, idx) => wrapUpdatePromise(addFn(i), `${typeLabel}:add:${idx}`)),
      ...toUpdate.map((i) => wrapUpdatePromise(updateFn(i), `${typeLabel}:update:${i.id}`)),
      ...toDelete.map((i) => wrapUpdatePromise(deleteFn(i.id!), `${typeLabel}:delete:${i.id}`)),
    ];
  };

  const filterDuplicateArrayItems = (type: ArrayFieldKey, items: any[] = []) => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = type === "skills" ? String(item?.Skill || "").trim().toLowerCase() : type === "languages" ? String(item?.Language || "").trim().toLowerCase() : "";
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setErrorMsg("");
    setSuccessMsg("");
    try {
      const minSalary = form.MinSalary === "" ? null : Number(form.MinSalary);
      const maxSalary = form.MaxSalary === "" ? null : Number(form.MaxSalary);
      if (minSalary !== null && maxSalary !== null && minSalary > maxSalary) { setErrorMsg("Minimum salary cannot be greater than maximum salary."); return; }

      const fileUploads: Promise<void>[] = [];
      if (profileImage) fileUploads.push(uploadFile(profileImage, `profileImages/${seekerID}_${profileImage.name}`).then(async () => { await addSeekerFile(seekerID, profileImage, "image", seekerID); }));
      if (cvFile) fileUploads.push(uploadFile(cvFile, `cvFiles/${seekerID}_${cvFile.name}`).then(async () => { await addSeekerFile(seekerID, cvFile, "CV", seekerID); }));
      if (videoFile) fileUploads.push(uploadFile(videoFile, `videoFiles/${seekerID}_${videoFile.name}`).then(async () => { await addSeekerFile(seekerID, videoFile, "video", seekerID); }));
      await Promise.all(fileUploads);
      try { const f = await getSeekerFiles(seekerID.toString()); setFiles(f || []); } catch (e) { console.warn("Failed to refresh files", e); }

      const updatedData: Partial<SEEKER_DATA> = { ...form, ProfessionalExperience: Number(form.ProfessionalExperience) || 0, MinSalary: minSalary, MaxSalary: maxSalary, Currency: form.Currency || undefined, PayPeriod: form.PayPeriod || "Monthly", JobType2: form.JobType2 || form.WorkType || "", WorkType: form.JobType2 || form.WorkType || "" };
      delete (updatedData as any).skills; delete (updatedData as any).educations; delete (updatedData as any).careers; delete (updatedData as any).languages;
      await updateSeeker(seekerID, updatedData);

      const currentSkills = filterDuplicateArrayItems("skills", form.skills ?? []);
      const currentCareers = form.careers ?? [];
      const currentEducations = form.educations ?? [];
      const currentLanguages = filterDuplicateArrayItems("languages", form.languages ?? []);

      await Promise.all([
        ...getArrayDiffPromises("skills", currentSkills, originalSkills, (s) => addSkill(seekerID, { Skill: s.Skill, ExpertLevel: s.ExpertLevel }), (s) => updateSkill(seekerID, s.id!, { Skill: s.Skill, ExpertLevel: s.ExpertLevel }), (id) => deleteSkill(seekerID, id)),
        ...getArrayDiffPromises("languages", currentLanguages, originalLanguages, (l) => createLanguage(seekerID, { Language: l.Language, ExpertLevel: l.ExpertLevel }), (l) => updateLanguage(seekerID, l.id!, { Language: l.Language, ExpertLevel: l.ExpertLevel }), (id) => deleteLanguage(seekerID, id)),
        ...getArrayDiffPromises("careers", currentCareers, originalCareers, (c) => addCareer(seekerID, c), (c) => updateCareer(seekerID, c.id!, c), (id) => deleteCareer(seekerID, id)),
        ...getArrayDiffPromises("educations", currentEducations, originalEducations, (ed) => addEducation(seekerID, ed), (ed) => updateEducation(seekerID, ed.id!, ed), (id) => deleteEducation(seekerID, id)),
      ]);

      await loadSeekerData(seekerID);
      setSuccessMsg("Profile updated successfully!");
      setTimeout(() => navigate(-1), 1500);
    } catch (err: any) {
      if (err?.response?.status === 409) setErrorMsg("A user with this email or phone already exists.");
      else if (err?.response?.data?.message?.includes("salary")) setErrorMsg("Invalid salary. Check min/max salary and currency.");
      else setErrorMsg("Failed to update profile. Please try again.");
      console.error("[EditProfile] submit failed", err);
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  // ── Array helpers ──────────────────────────────────────────────────────────
  const defaultArrayItems: Record<ArrayFieldKey, any> = {
    careers: { id: undefined, Designation: "", CompanyName: "", StartDate: "", EndDate: "", Description: "" },
    educations: { id: undefined, InstituteName: "", FieldOfStudy: "", StartDate: "", EndDate: "", LevelOfStudy: "", Status: "" },
    skills: { id: undefined, Skill: "", ExpertLevel: "" },
    languages: { id: undefined, Language: "", ExpertLevel: "" },
  };

  const getArray = (type: ArrayFieldKey) => (form[type] as any[]) ?? [];

  const handleArrayChange = (type: ArrayFieldKey, idx: number, field: string, value: string) => {
    const updated = [...getArray(type)];
    if ((type === "skills" && field === "Skill") || (type === "languages" && field === "Language")) {
      const dupField = type === "skills" ? "Skill" : "Language";
      const isDuplicate = updated.some((item, i) => i !== idx && String((item as any)[dupField] || "").trim().toLowerCase() === value.trim().toLowerCase());
      if (isDuplicate) { setErrorMsg(type === "skills" ? "This skill is already added." : "This language is already added."); return; }
    }
    updated[idx] = { ...(updated[idx] as any), [field]: value };
    setForm({ ...form, [type]: updated });
    if (errorMsg) setErrorMsg("");
  };

  const addArrayItem = (type: ArrayFieldKey) => setForm({ ...form, [type]: [...getArray(type), defaultArrayItems[type]] });
  const removeArrayItem = (type: ArrayFieldKey, idx: number) => { const updated = [...getArray(type)]; updated.splice(idx, 1); setForm({ ...form, [type]: updated }); };
  const removeAllLanguages = () => setForm({ ...form, languages: [] });

  const languageOptions = ["English", "Sinhala", "Tamil", "Hindi", "French", "German", "Spanish", "Chinese", "Japanese", "Arabic"];
  const skillOptions = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C#", "SQL", "HTML", "CSS", "AWS", "Docker"];
  const expertLevelOptions = ["Beginner", "Intermediate", "Advanced", "Fluent", "Native"];

  const renderArraySection = (type: ArrayFieldKey, icon: React.ReactNode, title: string, subtitle: string, fields: string[]) => {
    const items = getArray(type);
    return (
      <SectionCard icon={icon} title={title} subtitle={subtitle}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Button variant="outlined" size="small" startIcon={<AddIcon />} onClick={() => addArrayItem(type)} sx={{ borderRadius: 2, textTransform: "none", borderColor: ACCENT, color: ACCENT, fontWeight: 600 }}>
            Add {title.slice(0, -1)}
          </Button>
          {type === "languages" && items.length > 0 && (
            <Button variant="outlined" size="small" color="error" startIcon={<DeleteOutlineIcon />} onClick={removeAllLanguages} sx={{ borderRadius: 2, textTransform: "none" }}>
              Remove all
            </Button>
          )}
        </Box>
        {items.length === 0 ? (
          <Box sx={{ py: 3, textAlign: "center", border: `1px dashed ${BORDER}`, borderRadius: 2, bgcolor: SURFACE }}>
            <Typography variant="body2" sx={{ color: TEXT_MUTED }}>No {title.toLowerCase()} added yet. Click "Add" to get started.</Typography>
          </Box>
        ) : (
          items.map((item: any, idx: number) => (
            <ItemCard key={item.id ?? `new-${idx}`} onRemove={() => removeArrayItem(type, idx)} isNew={!item.id}>
              {fields.map((field) => {
                if (type === "languages" && field === "Language") return (
                  <FormControl key={field} fullWidth margin="dense" size="small">
                    <InputLabel>Language</InputLabel>
                    <Select value={(item as any)[field] || ""} label="Language" onChange={(e) => handleArrayChange(type, idx, field, e.target.value)}>
                      {languageOptions.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                    </Select>
                  </FormControl>
                );
                if (type === "skills" && field === "Skill") return (
                  <FormControl key={field} fullWidth margin="dense" size="small">
                    <InputLabel>Skill</InputLabel>
                    <Select value={(item as any)[field] || ""} label="Skill" onChange={(e) => handleArrayChange(type, idx, field, e.target.value)}>
                      {skillOptions.map((s) => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                    </Select>
                  </FormControl>
                );
                if ((type === "skills" || type === "languages") && field === "ExpertLevel") return (
                  <FormControl key={field} fullWidth margin="dense" size="small">
                    <InputLabel>Expertise level</InputLabel>
                    <Select value={(item as any)[field] || ""} label="Expertise level" onChange={(e) => handleArrayChange(type, idx, field, e.target.value)}>
                      {expertLevelOptions.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
                    </Select>
                  </FormControl>
                );
                return (
                  <TextField key={field} label={field} size="small" type={field === "StartDate" || field === "EndDate" ? "date" : "text"} InputLabelProps={field === "StartDate" || field === "EndDate" ? { shrink: true } : {}} value={(item as any)[field] || ""} onChange={(e) => handleArrayChange(type, idx, field, e.target.value)} fullWidth margin="dense" />
                );
              })}
            </ItemCard>
          ))
        )}
      </SectionCard>
    );
  };

  const dateOfBirthValue = typeof form.DateOfBirth === "object" && form.DateOfBirth !== null ? (form.DateOfBirth as Date).toISOString().slice(0, 10) : String(form.DateOfBirth ?? "");

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      {/* Hero bar */}
      <Box sx={{ bgcolor: ACCENT, py: 3, px: 2 }}>
        <Box sx={{ maxWidth: 760, mx: "auto" }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#fff" }}>Edit profile</Typography>
          <Typography variant="body2" sx={{ color: "#bfdbfe", mt: 0.25 }}>Keep your profile complete to get discovered faster</Typography>
        </Box>
      </Box>

      <Box sx={{ maxWidth: 760, mx: "auto", px: 2, py: 4, display: "flex", flexDirection: "column", gap: 3 }}>

        {errorMsg && <Alert severity="error" sx={{ borderRadius: 2 }} onClose={() => setErrorMsg("")}>{errorMsg}</Alert>}
        {successMsg && <Alert severity="success" sx={{ borderRadius: 2 }}>{successMsg}</Alert>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Basic info */}
          <SectionCard icon={<PersonOutlineIcon fontSize="small" />} title="Basic info" subtitle="Your personal details">
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <TextField label="First name" name="FirstName" value={form.FirstName || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Last name" name="LastName" value={form.LastName || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Email" name="Email" value={form.Email || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Contact number" name="ContactNo" value={form.ContactNo || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Address" name="Address" value={form.Address || ""} onChange={handleChange} fullWidth size="small" sx={{ gridColumn: { sm: "1 / -1" } }} />
              <TextField label="Date of birth" name="DateOfBirth" type="date" value={dateOfBirthValue} onChange={handleChange} fullWidth size="small" InputLabelProps={{ shrink: true }} />
              <TextField label="Social links" name="SocialLinks" value={form.SocialLinks || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Summary" name="Summary" value={form.Summary || ""} onChange={handleChange} fullWidth size="small" multiline rows={3} sx={{ gridColumn: { sm: "1 / -1" } }} />
            </Box>
          </SectionCard>

          {/* Job preferences */}
          <SectionCard icon={<WorkOutlineIcon fontSize="small" />} title="Job preferences" subtitle="What you're looking for">
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Job type</InputLabel>
                <Select value={form.JobType || ""} label="Job type" onChange={(e) => setForm({ ...form, JobType: e.target.value })}>
                  {jobTypeOptions.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl fullWidth size="small">
                <InputLabel>Work mode</InputLabel>
                <Select value={form.JobType2 || ""} label="Work mode" onChange={(e) => setForm({ ...form, JobType2: e.target.value })}>
                  {jobModeOptions.map((o) => <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Experience (years)" name="ProfessionalExperience" type="number" value={form.ProfessionalExperience || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Location X" name="LocationX" type="number" value={form.LocationX || ""} onChange={handleChange} fullWidth size="small" />
              <TextField label="Location Y" name="LocationY" type="number" value={form.LocationY || ""} onChange={handleChange} fullWidth size="small" />
            </Box>
            <Divider sx={{ my: 2.5 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_PRIMARY, mb: 1.5 }}>Salary expectations</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr 1fr" }, gap: 2 }}>
              <TextField label="Min salary" name="MinSalary" type="number" value={form.MinSalary} onChange={handleChange} fullWidth size="small" />
              <TextField label="Max salary" name="MaxSalary" type="number" value={form.MaxSalary} onChange={handleChange} fullWidth size="small" />
              <FormControl fullWidth size="small">
                <InputLabel>Currency</InputLabel>
                <Select value={form.Currency || ""} label="Currency" onChange={(e) => setForm({ ...form, Currency: e.target.value })}>
                  {currencies.map((c) => <MenuItem key={c.code} value={c.code}>{c.code} – {c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Box>
          </SectionCard>

          {/* Documents */}
          <SectionCard icon={<AttachFileIcon fontSize="small" />} title="Documents & media" subtitle="Upload your CV, profile photo, and intro video">
            {files.length > 0 && (
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: TEXT_PRIMARY, mb: 1 }}>Uploaded files</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {files.map((f) => (
                    <Chip key={f.id} icon={<InsertDriveFileIcon fontSize="small" />} label={f.file_name} component="a" href={f.file_url} target="_blank" clickable size="small" sx={{ bgcolor: SURFACE, border: `1px solid ${BORDER}` }} />
                  ))}
                </Box>
                <Divider sx={{ mt: 2 }} />
              </Box>
            )}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <FileUploadZone label="Profile photo" hint="JPG or PNG · max 5 MB" inputId="upload-image" accept="image/png,image/jpeg" file={profileImage} onChange={(e) => handleFileChange(e, "image")} />
              <FileUploadZone label="CV / Resume" hint="PDF or DOCX · max 5 MB" inputId="upload-cv" accept=".pdf,.docx" file={cvFile} onChange={(e) => handleFileChange(e, "cv")} />
              <FileUploadZone label="Intro video" hint="MP4 · max 50 MB" inputId="upload-video" accept="video/mp4" file={videoFile} onChange={(e) => handleFileChange(e, "video")} />
            </Box>
            {uploading && (
              <Box sx={{ mt: 2 }}>
                <LinearProgress variant="determinate" value={progress} sx={{ borderRadius: 2, height: 6 }} />
                <Typography variant="caption" sx={{ color: TEXT_MUTED, mt: 0.5, display: "block" }}>Uploading… {Math.round(progress)}%</Typography>
              </Box>
            )}
          </SectionCard>

          {/* Array sections */}
          {renderArraySection("careers", <WorkOutlineIcon fontSize="small" />, "Career history", "Your past roles and experience", ["Designation", "CompanyName", "StartDate", "EndDate", "Description"])}
          {renderArraySection("educations", <SchoolOutlinedIcon fontSize="small" />, "Education", "Degrees, diplomas, and certifications", ["InstituteName", "FieldOfStudy", "StartDate", "EndDate", "LevelOfStudy", "Status"])}
          {renderArraySection("skills", <CodeOutlinedIcon fontSize="small" />, "Skills", "Technical and professional skills", ["Skill", "ExpertLevel"])}
          {renderArraySection("languages", <TranslateIcon fontSize="small" />, "Languages", "Languages you speak", ["Language", "ExpertLevel"])}

          {/* Actions */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 1, borderTop: `1px solid ${BORDER}` }}>
            <Button variant="outlined" size="large" onClick={() => navigate(-1)} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 600 }}>Cancel</Button>
            <Button type="submit" variant="contained" size="large" disabled={uploading} sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: ACCENT, "&:hover": { bgcolor: "#1d4ed8" }, minWidth: 120 }}>
              {uploading ? "Saving…" : "Save changes"}
            </Button>
          </Box>
        </form>
      </Box>

      <FooterSection_1 />
    </div>
  );
};

export default EditSeekerProfile;