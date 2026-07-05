import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Visibility, CheckCircle, Delete } from "@mui/icons-material";
import { getEmployerPostedJobs, updateJobPost, deleteJob } from "../../services/APIs/APIs";
import { useAuth } from "../../context/AuthContext"; // your auth hook
import { useNotification } from "../../context/NotificationsProvider";

const PendingApprovalsTab = () => {
  const { userInfo } = useAuth();
  const [pendingJobs, setPendingJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { notify } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingJobs = async () => {
      if (!userInfo || !("EmployerId" in userInfo)) return;

      setLoading(true);
      try {
        const response = await getEmployerPostedJobs(userInfo.EmployerId);
        const pending = response
          .filter((job: any) => job.Status === "Pending")
          .map((job: any) => ({
            id: job.JobId,
            title: job.JobTitle,
            editor: job.SubmittedBy || "Unknown",
            submittedAt: new Date(job.CreatedDate).toLocaleDateString(),
          }))
          .sort(
            (a, b) =>
              new Date(b.submittedAt).getTime() -
              new Date(a.submittedAt).getTime()
          );

        setPendingJobs(pending);
      } catch (err) {
        console.error("Failed to fetch pending jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingJobs();
  }, [userInfo]);

  const handleView = (id: number) => {
    navigate(`/jobs/details/${id}`);
  };

  const handleApprove = async (id: number, title: string) => {
    try {
      await updateJobPost(id, { Status: "Active" });
      
      setPendingJobs((jobs) => jobs.filter((job) => job.id !== id)); // ✅ Remove from UI
      notify(`${title} approved successfully ✅`, "success");
    } catch (error) {
      console.error("Failed to approve job:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteJob(id.toString());
      
      setPendingJobs((jobs) => jobs.filter((job) => job.id !== id)); // ✅ Remove from UI
      notify("Job deleted successfully 🗑", "success");
    } catch (err) {
      console.error("Failed to delete job:", err);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Pending Job Approvals
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : pendingJobs.length === 0 ? (
        <Typography>No pending jobs ✅</Typography>
      ) : (
        <List>
          {pendingJobs.map((job) => (
            <ListItem
              key={job.id}
              sx={{
                mt: 1,
                borderRadius: 2,
                p: 2,
                boxShadow: 2,
                bgcolor: "background.paper",
              }}
            >
              <ListItemText
                primary={<Typography fontWeight={600}>{job.title}</Typography>}
                secondary={
                  <>
                    <Typography variant="body2">
                      Submitted by: {job.editor}
                    </Typography>
                    <Typography variant="caption">
                      Submitted at: {job.submittedAt}
                    </Typography>
                  </>
                }
              />

              <ListItemSecondaryAction>
                <Stack
                  direction={isMobile ? "column" : "row"}
                  spacing={isMobile ? 0.5 : 1}
                  alignItems="flex-end"
                >
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<Visibility />}
                    onClick={() => handleView(job.id)}
                  >
                    {!isMobile && "View"}
                  </Button>

                  <Button
                    size="small"
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircle />}
                    onClick={() => handleApprove(job.id, job.title)}
                  >
                    {!isMobile && "Approve"}
                  </Button>

                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => handleDelete(job.id)}
                  >
                    {!isMobile && "Remove"}
                  </Button>
                </Stack>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default PendingApprovalsTab;
