import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
  Divider,
  Chip,
  LinearProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { createSeekerSubscription, submitPaymentProof } from "../../services/APIs/APIs";
import Header_1 from "../../components/header/Header_1";
import Header_2 from "../../components/header/Header_2";
import FooterSection_1 from "../../components/footer/FooterSection_1";
import { useAuth } from "../../context/AuthContext";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const priceMap: Record<string, string> = {
  Basic: "$20/month",
  Standard: "$45/month",
  Premium: "$70/month",
};

const BANK_DETAILS = [
  { label: "Bank", value: "ACME Bank" },
  { label: "Account name", value: "ACME Careers Pvt Ltd" },
  { label: "Account number", value: "123-456-789" },
  { label: "Branch", value: "Colombo Main" },
];

const getPriceNumber = (search: string, plan: string): number => {
  const priceParam = new URLSearchParams(search).get("price");
  const raw = priceParam || priceMap[plan] || "";
  const match = raw.match(/\$(\d+)/);
  return match ? parseInt(match[1]) : 0;
};

const SeekerSubscriptionUpload = () => {
  const { search } = useLocation();
  const { isAuthenticated, userInfo } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");
  const [snackMessage, setSnackMessage] = useState("");
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const p = params.get("plan");
    if (p) setPlan(p);
  }, [search]);

  const displayedPrice =
    new URLSearchParams(search).get("price") ||
    (plan ? priceMap[plan] : null) ||
    "—";

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFileError(null);
    if (!selected) return;
    const valid = ["image/jpeg", "image/png", "application/pdf"];
    if (!valid.includes(selected.type)) {
      setFileError("Only JPG, PNG, or PDF files are accepted.");
      e.target.value = "";
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setFileError("File must be 5 MB or smaller.");
      e.target.value = "";
      return;
    }
    setFile(selected);
  };

  const resolveSeekerId = (info: any): number | null => {
    if (!info) return null;
    const id = info.UserId ?? info.SeekerId ?? info.userId ?? info.id ?? info.seekerId ?? null;
    if (id == null) return null;
    if (typeof id === "number") return id;
    const parsed = parseInt(id as string, 10);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setSnackMessage("Please select a payslip file.");
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }
    if (!plan) {
      setSnackMessage("No plan selected. Please go back and choose a plan.");
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }

    const seekerId = resolveSeekerId(userInfo);
    if (!seekerId) {
      setSnackMessage("Unable to resolve your account ID. Please log in again.");
      setSnackSeverity("error");
      setSnackOpen(true);
      return;
    }

    try {
      setLoading(true);
      const price = getPriceNumber(search, plan);
      const today = new Date();
      const startDate = today.toISOString().split("T")[0];
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 30);

      await createSeekerSubscription(seekerId, {
        SubscriptionTier: plan,
        Price: price,
        StartDate: startDate,
        EndDate: endDate.toISOString().split("T")[0],
        Status: "pending",
      });

      await submitPaymentProof({
        SubscriptionTier: plan,
        Price: price,
        file,
      });

      setSnackMessage("Subscription created and payment proof submitted. Verification is pending.");
      setSnackSeverity("success");
      setSnackOpen(true);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.detail ||
        err?.message ||
        "Submission failed. Please try again.";
      setSnackMessage(errMsg);
      setSnackSeverity("error");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isAuthenticated ? <Header_2 /> : <Header_1 />}

      <Box sx={{ display: "flex", justifyContent: "center", p: { xs: 2, md: 4 } }}>
        <Box sx={{ maxWidth: 600, width: "100%", display: "flex", flexDirection: "column", gap: 3 }}>

          {submitted ? (
            /* ── Success state ── */
            <Box
              sx={{
                textAlign: "center",
                border: "1px solid #bbf7d0",
                borderRadius: 3,
                p: 5,
                bgcolor: "#f0fdf4",
              }}
            >
              <CheckCircleOutlineIcon sx={{ fontSize: 52, color: "#16a34a", mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: "#15803d", mb: 1 }}>
                Payslip submitted!
              </Typography>
              <Typography variant="body2" sx={{ color: "#4b5563" }}>
                Our admin team will verify your payment and activate your{" "}
                <strong>{plan}</strong> plan within 24–48 hours. You'll be notified once it's confirmed.
              </Typography>
            </Box>
          ) : (
            <>
              {/* Page title */}
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, color: "#0f172a" }}>
                  Complete your subscription
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
                  Transfer the payment and upload your bank payslip below.
                </Typography>
              </Box>

              {/* Selected plan banner */}
              {plan && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid #bfdbfe",
                    borderRadius: 2,
                    p: 2,
                    bgcolor: "#eff6ff",
                  }}
                >
                  <Box>
                    <Typography variant="caption" sx={{ color: "#2563eb", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.68rem" }}>
                      Selected plan
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "#1e3a8a", lineHeight: 1.2 }}>
                      {plan}
                    </Typography>
                  </Box>
                  <Chip
                    label={displayedPrice}
                    sx={{ bgcolor: "#2563eb", color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}
                  />
                </Box>
              )}

              {/* Bank details */}
              <Box sx={{ border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1.5,
                    bgcolor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <AccountBalanceIcon sx={{ fontSize: 18, color: "#475569" }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                    Bank transfer details
                  </Typography>
                </Box>
                <Box sx={{ px: 2, py: 2, display: "flex", flexDirection: "column", gap: 1.5 }}>
                  {BANK_DETAILS.map(({ label, value }) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" sx={{ color: "#94a3b8", minWidth: 120 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b", textAlign: "right" }}>
                        {value}
                      </Typography>
                    </Box>
                  ))}
                  <Divider sx={{ my: 0.5 }} />
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <InfoOutlinedIcon sx={{ fontSize: 15, color: "#94a3b8", mt: "2px", flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ color: "#64748b", lineHeight: 1.5 }}>
                      Include your User ID and selected plan in the transfer reference. Your plan will be activated within 24–48 hours after verification.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Upload form */}
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ border: "1px solid #e2e8f0", borderRadius: 2, overflow: "hidden" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 2,
                    py: 1.5,
                    bgcolor: "#f8fafc",
                    borderBottom: "1px solid #e2e8f0",
                  }}
                >
                  <UploadFileIcon sx={{ fontSize: 18, color: "#475569" }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#334155" }}>
                    Upload payslip
                  </Typography>
                </Box>

                <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Drop zone */}
                  <Box
                    sx={{
                      border: "2px dashed",
                      borderColor: file ? "#93c5fd" : "#cbd5e1",
                      borderRadius: 2,
                      p: 3,
                      textAlign: "center",
                      bgcolor: file ? "#eff6ff" : "#f8fafc",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                    onClick={() => document.getElementById("payslip-file-seeker")?.click()}
                  >
                    <input
                      id="payslip-file-seeker"
                      type="file"
                      accept="image/jpeg,image/png,application/pdf"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    {file ? (
                      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5 }}>
                        <InsertDriveFileIcon sx={{ color: "#2563eb", fontSize: 28 }} />
                        <Box sx={{ textAlign: "left" }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e3a8a" }}>
                            {file.name}
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#64748b" }}>
                            {(file.size / 1024).toFixed(0)} KB · Click to change
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <UploadFileIcon sx={{ fontSize: 36, color: "#94a3b8", mb: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "#475569" }}>
                          Click to select a file
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                          JPG, PNG or PDF — max 5 MB
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {fileError && (
                    <Alert severity="error" sx={{ py: 0.5, borderRadius: 2, fontSize: "0.8rem" }}>
                      {fileError}
                    </Alert>
                  )}

                  {loading && <LinearProgress sx={{ borderRadius: 2 }} />}

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !file}
                    size="large"
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      bgcolor: "#2563eb",
                      "&:hover": { bgcolor: "#1d4ed8" },
                    }}
                  >
                    {loading ? "Submitting…" : "Submit payslip"}
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>

      <FooterSection_1 />
    </div>
  );
};

export default SeekerSubscriptionUpload;
