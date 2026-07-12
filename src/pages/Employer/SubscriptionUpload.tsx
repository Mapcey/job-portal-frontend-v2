import { useEffect, useState } from "react";
import { Box, Typography, Button, Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import { submitPaymentProof } from "../../services/APIs/APIs";

const EmployerSubscriptionUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const priceMap: Record<string, string> = {
    Basic: "$20/month",
    Standard: "$45/month",
    Premium: "$70/month",
  };
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { search } = useLocation();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<"success" | "error">("success");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const p = params.get("plan");
    const qp = params.get("price");
    if (p) setPlan(p);
    if (qp) {
      // price param available; we derive the displayed price when rendering
    }
  }, [search]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a payslip file to upload.");
      return;
    }
    if (!plan) {
      setMessage("No plan selected.");
      return;
    }

    try {
      setLoading(true);
      setMessage(null);

      // Get price as number
      const priceParam = new URLSearchParams(search).get('price');
      let price = 0;
      if (priceParam) {
        const match = priceParam.match(/\$(\d+)/);
        if (match) price = parseInt(match[1]);
      } else {
        // fallback to priceMap
        const p = priceMap[plan];
        const match = p?.match(/\$(\d+)/);
        if (match) price = parseInt(match[1]);
      }

      const res = await submitPaymentProof({
        SubscriptionTier: plan,
        Price: price,
        file: file,
      });

      const okMsg = res.data?.message || "Payment proof submitted successfully.";
      setMessage(okMsg);
      setSnackSeverity("success");
      setSnackOpen(true);
    } catch (err: any) {
      console.error(err);
      const errMsg = err?.response?.data?.message || "Submission failed.";
      setMessage(errMsg);
      setSnackSeverity("error");
      setSnackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ maxWidth: 640, width: '100%', textAlign: 'center' }}>
        <Typography variant="h5" mb={2}>
          Upload Subscription Payslip (Employer)
        </Typography>

        <Box sx={{ mb: 2, textAlign: 'left', bgcolor: '#fafafa', p: 2, borderRadius: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Bank Details (Dummy)</Typography>
          <Typography variant="body2">Bank: ACME Bank</Typography>
          <Typography variant="body2">Account Name: ACME Careers Pvt Ltd</Typography>
          <Typography variant="body2">Account Number: 123-456-789</Typography>
          <Typography variant="body2">Branch: Colombo Main</Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            Instructions: Transfer the subscription amount to the account above and upload the payslip proof here. Include your company name in the transfer reference. The admin will verify and respond within 24-48 hours.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 520, mx: 'auto', alignItems: 'center' }}>
        {plan && (
          <Typography variant="subtitle1">Selected Plan: <strong>{plan}</strong>{' '}- Price: <strong>{(new URLSearchParams(search).get('price')) || priceMap[plan] || '—'}</strong></Typography>
        )}

          <input
            accept="image/*,application/pdf"
            id="payslip-file-employer"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{ marginTop: 8 }}
          />

        {file && (
          <Typography variant="body2">Selected file: {file.name} ({Math.round((file.size || 0)/1024)} KB)</Typography>
        )}

        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Uploading..." : "Upload Payslip"}
        </Button>

        {message && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
        </Box>
      </Box>
  );
};

export default EmployerSubscriptionUpload;
