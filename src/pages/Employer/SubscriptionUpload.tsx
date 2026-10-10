import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";

import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import { submitPaymentProof } from "../../services/APIs/APIs";
import { employerPricingPlans } from "../../assets/data/pricePlane";

const EmployerSubscriptionUpload = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const [file, setFile] = useState<File | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">(
    "success",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(search);
    setPlan(params.get("plan"));
    setFile(null);
  }, [search]);

  // Always use the shared pricing configuration.
  const selectedPlan = employerPricingPlans.find((item) => item.title === plan);

  const showMessage = (text: string, severity: "success" | "error") => {
    setMessage(text);
    setSnackSeverity(severity);
    setSnackOpen(true);
  };

  const handleFileChange = (selectedFile?: File) => {
    if (!selectedFile) return;

    const isAllowedType =
      selectedFile.type === "application/pdf" ||
      selectedFile.type.startsWith("image/");

    if (!isAllowedType) {
      setFile(null);
      showMessage("Please upload an image or PDF file.", "error");
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedPlan) {
      showMessage(
        "Please select a valid subscription plan from the pricing page.",
        "error",
      );
      return;
    }

    if (!file) {
      showMessage("Please select your payment receipt to upload.", "error");
      return;
    }

    try {
      setLoading(true);

      // Derive the amount from the trusted shared plan configuration,
      // rather than accepting a price supplied in the URL.
      const priceMatch = selectedPlan.price.match(/\d+(?:\.\d+)?/);
      const price = priceMatch ? Number(priceMatch[0]) : 0;

      if (!price) {
        throw new Error("The selected plan has an invalid price.");
      }

      const res = await submitPaymentProof({
        SubscriptionTier: selectedPlan.title,
        Price: price,
        file,
      });

      showMessage(
        res.data?.message || "Payment proof submitted successfully.",
        "success",
      );

      setFile(null);

      const input = document.getElementById(
        "payslip-file-employer",
      ) as HTMLInputElement | null;

      if (input) input.value = "";
    } catch (err: any) {
      console.error("Payment proof submission failed:", err);

      showMessage(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to submit your payment proof. Please try again.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        py: { xs: 4, md: 7 },
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 850, mx: "auto" }}>
        {/* Page heading */}
        <Button
          startIcon={<ArrowBackOutlinedIcon />}
          onClick={() => navigate("/pricing")}
          sx={{
            mb: 3,
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          Back to Pricing
        </Button>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.8px",
              fontSize: { xs: "1.8rem", md: "2.3rem" },
            }}
          >
            Complete Your Subscription
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1, lineHeight: 1.8 }}>
            Review your selected plan, transfer the payment, and upload your
            receipt for verification.
          </Typography>
        </Box>

        {!selectedPlan ? (
          <Alert
            severity="warning"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => navigate("/pricing")}
              >
                View Plans
              </Button>
            }
            sx={{ borderRadius: 3 }}
          >
            No valid subscription plan was selected. Please choose a plan from
            the pricing page.
          </Alert>
        ) : (
          <Stack spacing={3}>
            {/* Selected plan summary */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "#ffe0c2",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  height: 5,
                  bgcolor: "primary.main",
                }}
              />

              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={2}
                >
                  <Box>
                    <Chip
                      label="SELECTED PLAN"
                      size="small"
                      sx={{
                        mb: 1.5,
                        fontWeight: 700,
                        fontSize: "0.7rem",
                        bgcolor: "#fff1e5",
                        color: "#d65300",
                      }}
                    />

                    <Typography variant="h5" fontWeight={800}>
                      {selectedPlan.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, lineHeight: 1.7 }}
                    >
                      {selectedPlan.description}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      p: 2.5,
                      minWidth: { sm: 175 },
                      borderRadius: 3,
                      bgcolor: "#fff7f0",
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={600}
                    >
                      Subscription price
                    </Typography>

                    <Typography
                      variant="h4"
                      color="primary.main"
                      fontWeight={800}
                      sx={{
                        mt: 0.5,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {selectedPlan.price}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  sx={{ mb: 1.5 }}
                >
                  Plan includes
                </Typography>

                <Stack spacing={1.2}>
                  {selectedPlan.features.map((feature) => (
                    <Stack
                      key={feature}
                      direction="row"
                      spacing={1.2}
                      alignItems="flex-start"
                    >
                      <CheckCircleOutlineIcon
                        sx={{
                          fontSize: 19,
                          color: "primary.main",
                          mt: "2px",
                        }}
                      />

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                      >
                        {feature}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Bank transfer information */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <AccountBalanceOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 30 }}
                  />

                  <Typography variant="h6" fontWeight={800}>
                    Bank Transfer Details
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  Transfer the subscription amount to the account below. Replace
                  these sample details with your verified business bank details
                  before accepting real payments.
                </Typography>

                <Box
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 3,
                    bgcolor: "#f8fafc",
                    border: "1px solid #edf0f3",
                  }}
                >
                  {[
                    ["Bank", "ACME Bank"],
                    ["Account Name", "ACME Careers Pvt Ltd"],
                    ["Account Number", "123-456-789"],
                    ["Branch", "Colombo Main"],
                  ].map(([label, value], index, items) => (
                    <Box key={label}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        justifyContent="space-between"
                        spacing={0.5}
                        sx={{ py: 1.2 }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          {label}
                        </Typography>

                        <Typography
                          variant="body2"
                          fontWeight={700}
                          sx={{
                            textAlign: { sm: "right" },
                            overflowWrap: "anywhere",
                          }}
                        >
                          {value}
                        </Typography>
                      </Stack>

                      {index < items.length - 1 && (
                        <Divider sx={{ borderColor: "#e9edf2" }} />
                      )}
                    </Box>
                  ))}
                </Box>

                <Alert
                  severity="info"
                  sx={{
                    mt: 2.5,
                    borderRadius: 2.5,
                    alignItems: "flex-start",
                  }}
                >
                  Include your company name in the bank transfer reference.
                  After transferring the payment, upload your receipt below.
                  Your subscription will be subject to payment verification.
                </Alert>
              </CardContent>
            </Card>

            {/* Payment proof upload */}
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <ReceiptLongOutlinedIcon
                    color="primary"
                    sx={{ fontSize: 30 }}
                  />

                  <Typography variant="h6" fontWeight={800}>
                    Upload Payment Receipt
                  </Typography>
                </Stack>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.7 }}
                >
                  Upload a clear image of your payment receipt or a PDF copy.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                  <Box
                    component="label"
                    htmlFor="payslip-file-employer"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: { xs: 3, md: 4 },
                      border: "1.5px dashed",
                      borderColor: file ? "success.main" : "#cbd5e1",
                      borderRadius: 3,
                      bgcolor: file ? "#f0fdf4" : "#fafbfc",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        borderColor: loading ? "#cbd5e1" : "primary.main",
                        bgcolor: loading ? "#fafbfc" : "#fff7f0",
                      },
                    }}
                  >
                    <CloudUploadOutlinedIcon
                      sx={{
                        fontSize: 44,
                        color: file ? "success.main" : "primary.main",
                        mb: 1.5,
                      }}
                    />

                    <Typography fontWeight={700}>
                      {file ? "Receipt selected" : "Choose a receipt to upload"}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1, overflowWrap: "anywhere" }}
                    >
                      {file
                        ? file.name
                        : "Click here to select an image or PDF"}
                    </Typography>

                    {file && (
                      <Chip
                        size="small"
                        label={`${(file.size / 1024).toFixed(1)} KB`}
                        sx={{ mt: 1.5 }}
                      />
                    )}

                    <Button
                      component="span"
                      variant="outlined"
                      disabled={loading}
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 700,
                        pointerEvents: "none",
                      }}
                    >
                      {file ? "Change File" : "Browse Files"}
                    </Button>

                    <input
                      id="payslip-file-employer"
                      type="file"
                      accept="image/*,application/pdf"
                      disabled={loading}
                      onChange={(e) => {
                        handleFileChange(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                      hidden
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block", mt: 1.5 }}
                  >
                    Accepted formats: JPG, PNG, and PDF. Please ensure the
                    receipt is readable.
                  </Typography>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading || !selectedPlan}
                    startIcon={<CloudUploadOutlinedIcon />}
                    sx={{
                      mt: 3,
                      minHeight: 50,
                      borderRadius: 2.5,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 700,
                      boxShadow: "none",
                    }}
                  >
                    {loading ? "Submitting Receipt..." : "Submit Payment Proof"}
                  </Button>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    align="center"
                    sx={{ display: "block", mt: 2, lineHeight: 1.7 }}
                  >
                    Your receipt will be reviewed by the administration team.
                    Submission does not automatically activate your
                    subscription.
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Stack>
        )}
      </Box>

      <Snackbar
        open={snackOpen}
        autoHideDuration={5000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity={snackSeverity}
          variant="filled"
          sx={{ width: "100%", borderRadius: 2 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmployerSubscriptionUpload;
