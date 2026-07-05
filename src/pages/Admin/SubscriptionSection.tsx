import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import axiosInstance from "../../services/axiosInstance";

// utility to clean enum strings
const formatEnum = (value: string) => {
  if (!value) return "";
  return value.split(".").pop()?.replace(/_/g, " ") || value;
};

const SubscriptionSection = ({ subscriptions }: { subscriptions: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [localSubs, setLocalSubs] = useState<any[]>(subscriptions || []);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewIsImage, setPreviewIsImage] = useState(true);
  const [loadingActionId, setLoadingActionId] = useState<number | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackSeverity, setSnackSeverity] = useState<'success'|'error'>('success');
  const [sendingEmail, setSendingEmail] = useState<number | null>(null);

  useEffect(() => {
    setLocalSubs(subscriptions || []);
  }, [subscriptions]);

  if (!subscriptions || subscriptions.length === 0) {
    return (
      <Box mt={5}>
        <Typography variant="h5" mb={2}>
          Payment Proofs Management
        </Typography>
        <Box sx={{ border: "1px solid #eee", borderRadius: "8px", p: 2 }}>
          <Typography color="text.secondary">
            No payment proofs available
          </Typography>
        </Box>
      </Box>
    );
  }

  // sort newest first (use local copy to reflect status updates)
  const sortedSubscriptions = [...localSubs].sort(
    (a, b) => new Date(b.SubmittedAt).getTime() - new Date(a.SubmittedAt).getTime()
  );

  // show either 5 latest or all
  const visibleSubscriptions = showAll
    ? sortedSubscriptions
    : sortedSubscriptions.slice(0, 5);

  const openDetails = (subscription: any) => {
    setSelectedSubscription(subscription);
    setDetailsOpen(true);
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setSelectedSubscription(null);
  };

  const openPreview = (url: string) => {
    setPreviewUrl(url);
    const lower = url.toLowerCase();
    setPreviewIsImage(/\.(jpg|jpeg|png|gif|bmp|webp)$/.test(lower));
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
    setPreviewUrl(null);
  };

  const updateLocalStatus = (id: number, status: string) => {
    setLocalSubs((prev) =>
      prev.map((s) => (s.ProofId === id ? { ...s, Status: status } : s))
    );
  };

  const sendNotificationEmail = async (userId: number, action: 'approved' | 'rejected', subscriptionDetails: any) => {
    const emailId = subscriptionDetails.ProofId;
    try {
      setSendingEmail(emailId);
      const emailData = {
        to: userId,
        subject: `Payment Proof ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        template: action === 'approved' ? 'payment_approved' : 'payment_rejected',
        data: {
          userId: userId,
          plan: subscriptionDetails.SubscriptionTier,
          amount: subscriptionDetails.Price,
          submittedAt: subscriptionDetails.SubmittedAt,
          action: action,
          proofId: subscriptionDetails.ProofId
        }
      };

      await axiosInstance.post('/admin/send-email', emailData);
      console.log(`Email sent successfully for ${action} action`);
    } catch (emailErr: any) {
      console.error('Failed to send email notification:', emailErr);
      throw new Error('Status updated but email failed to send');
    } finally {
      setSendingEmail(null);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      setLoadingActionId(id);
      setActionMessage(null);
      await axiosInstance.put(`/admin/payments/${id}/verify`, { Status: "approved", ResolutionNotes: "" });
      updateLocalStatus(id, "approved");

      const subscription = localSubs.find(s => s.ProofId === id);
      if (subscription) {
        try {
          await sendNotificationEmail(subscription.UserId, 'approved', subscription);
          setActionMessage("Payment proof approved and email sent.");
        } catch (emailErr) {
          setActionMessage("Payment proof approved but email failed to send.");
          setSnackSeverity('error');
          setSnackOpen(true);
          return;
        }
      }

      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err: any) {
      console.error(err);
      setActionMessage(err?.response?.data?.message || "Approve failed.");
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setLoadingActionId(null);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setLoadingActionId(id);
      setActionMessage(null);
      await axiosInstance.put(`/admin/payments/${id}/verify`, { Status: "rejected", ResolutionNotes: "" });
      updateLocalStatus(id, "rejected");

      const subscription = localSubs.find(s => s.ProofId === id);
      if (subscription) {
        try {
          await sendNotificationEmail(subscription.UserId, 'rejected', subscription);
          setActionMessage("Payment proof rejected and email sent.");
        } catch (emailErr) {
          setActionMessage("Payment proof rejected but email failed to send.");
          setSnackSeverity('error');
          setSnackOpen(true);
          return;
        }
      }

      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err: any) {
      console.error(err);
      setActionMessage(err?.response?.data?.message || "Reject failed.");
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setLoadingActionId(null);
    }
  };

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>
        Payment Proofs Management
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="payment proofs table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>
                <strong>Proof ID</strong>
              </TableCell>
              <TableCell>
                <strong>User ID</strong>
              </TableCell>
              <TableCell>
                <strong>User Type</strong>
              </TableCell>
              <TableCell>
                <strong>Tier</strong>
              </TableCell>
              <TableCell>
                <strong>Price</strong>
              </TableCell>
              <TableCell>
                <strong>Proof File</strong>
              </TableCell>
              <TableCell>
                <strong>Submitted At</strong>
              </TableCell>
              <TableCell>
                <strong>Status</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleSubscriptions.map((subscription) => (
              <TableRow
                key={subscription.ProofId}
                sx={{ "&:hover": { backgroundColor: "#fafafa" } }}
              >
                <TableCell>{subscription.ProofId}</TableCell>
                <TableCell>{subscription.UserId}</TableCell>
                <TableCell>{subscription.UserType || 'seeker'}</TableCell>
                <TableCell>
                  <Chip
                    label={formatEnum(subscription.SubscriptionTier)}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>${subscription.Price || 'N/A'}</TableCell>
                <TableCell>
                  {subscription.FileUrl ? (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                      {/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(String(subscription.FileUrl)) && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={subscription.FileUrl} alt="thumb" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                      )}
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => openPreview(subscription.FileUrl)}
                      >
                        Preview
                      </Button>
                    </Box>
                  ) : (
                    <Typography variant="caption" color="text.secondary">
                      Not uploaded
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  {new Date(subscription.SubmittedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={formatEnum(subscription.Status)}
                    size="small"
                    color={
                      subscription.Status === "approved" || subscription.Status === "Approved"
                        ? "success"
                        : subscription.Status === "rejected" || subscription.Status === "Rejected"
                          ? "error"
                          : "warning"
                    }
                  />
                </TableCell>
                <TableCell>
                  {subscription.Status !== "approved" && subscription.Status !== "rejected" && subscription.Status !== "Approved" && subscription.Status !== "Rejected" ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openDetails(subscription)}
                        >
                          View Details
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="success"
                          onClick={() => handleApprove(subscription.ProofId)}
                          disabled={loadingActionId === subscription.ProofId}
                        >
                          {loadingActionId === subscription.ProofId ? <CircularProgress size={16} color="inherit" /> : 'Approve'}
                        </Button>
                        <Button
                          size="small"
                          variant="contained"
                          color="error"
                          onClick={() => handleReject(subscription.ProofId)}
                          disabled={loadingActionId === subscription.ProofId}
                        >
                          {loadingActionId === subscription.ProofId ? <CircularProgress size={16} color="inherit" /> : 'Reject'}
                        </Button>
                      </Box>
                      {sendingEmail === subscription.ProofId && (
                        <Typography variant="caption" color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CircularProgress size={12} /> Sending email...
                        </Typography>
                      )}
                    </Box>
                  ) : (
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => openDetails(subscription)}
                    >
                      View Details
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details dialog */}
      <Dialog open={detailsOpen} onClose={closeDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          Payment Proof Details
          <IconButton
            aria-label="close"
            onClick={closeDetails}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedSubscription && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography><strong>Proof ID:</strong> {selectedSubscription.ProofId}</Typography>
              <Typography><strong>User ID:</strong> {selectedSubscription.UserId}</Typography>
              <Typography><strong>User Type:</strong> {selectedSubscription.UserType || 'seeker'}</Typography>
              <Typography><strong>Plan:</strong> {formatEnum(selectedSubscription.SubscriptionTier)}</Typography>
              <Typography><strong>Price:</strong> ${selectedSubscription.Price}</Typography>
              <Typography><strong>Status:</strong> {formatEnum(selectedSubscription.Status)}</Typography>
              <Typography><strong>Submitted At:</strong> {new Date(selectedSubscription.SubmittedAt).toLocaleString()}</Typography>
              {selectedSubscription.ResolutionNotes && (
                <Typography><strong>Resolution Notes:</strong> {selectedSubscription.ResolutionNotes}</Typography>
              )}
              {selectedSubscription.ResolvedBy && (
                <Typography><strong>Resolved By:</strong> {selectedSubscription.ResolvedBy}</Typography>
              )}
              {selectedSubscription.ResolvedAt && (
                <Typography><strong>Resolved At:</strong> {new Date(selectedSubscription.ResolvedAt).toLocaleString()}</Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Preview dialog */}
      <Dialog open={previewOpen} onClose={closePreview} maxWidth="md" fullWidth>
        <DialogTitle>
          Payment Proof Preview
          <IconButton
            aria-label="close"
            onClick={closePreview}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', minHeight: 300 }}>
          {previewUrl ? (
            previewIsImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={previewUrl} alt="payment proof" style={{ maxWidth: '100%', maxHeight: '70vh' }} />
            ) : (
              <iframe title="payment proof" src={previewUrl} style={{ width: '100%', height: '70vh', border: 'none' }} />
            )
          ) : (
            <Typography>No preview available</Typography>
          )}

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              startIcon={<DownloadIcon />}
              onClick={() => previewUrl && window.open(previewUrl, '_blank')}
              variant="outlined"
              size="small"
            >
              Open/Download
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity={snackSeverity} sx={{ width: '100%' }}>
          {actionMessage}
        </Alert>
      </Snackbar>

      {/* Action message */}
      {actionMessage && (
        <Box mt={2}>
          <Typography variant="body2" color="text.secondary">
            {actionMessage}
          </Typography>
        </Box>
      )}

      {/* Toggle button */}
      {subscriptions.length > 5 && (
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll
              ? "Show Less"
              : `Show All Payment Proofs (${subscriptions.length})`}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default SubscriptionSection;
