import { useEffect, useState } from "react";
import { useNotification } from "../../context/NotificationsProvider";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  CircularProgress,
  Stack,
} from "@mui/material";
import { DoneAll } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import {
  getAllCandidates,
  getSeekerFiles,
  applicationStatusUpdate,
} from "../../services/APIs/APIs";

import { useAuth } from "../../context/AuthContext";
// import type { Candidate } from "../../types/applicationsSeeker";

interface Candidate {
  ApplicationId: number;
  SeekerId: number;
  ApplicantName: string;
  JobId: number;
  JobTitle: string;
  JobCategory?: string;
  AppliedDateTime?: string;
  Status: string;
}

const ManageCandidatesTab = () => {
  const { userInfo } = useAuth();
  const { notify } = useNotification();

  const [appliedCandidates, setAppliedCandidates] = useState<Candidate[]>([]);
  const [profileImages, setProfileImages] = useState<Record<string, string>>(
    {},
  );
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<number | null>(null);

  // Fetch selected candidates and their profile images
  useEffect(() => {
    const fetchApplications = async () => {
      if (!userInfo || !("EmployerId" in userInfo)) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getAllCandidates(userInfo.EmployerId.toString());

        const selected: Candidate[] = data.filter(
          (candidate: Candidate) => candidate.Status === "Selected",
        );

        setAppliedCandidates(selected);

        // Get unique seeker IDs
        const seekerIds = Array.from(
          new Set<number>(selected.map((c) => Number(c.SeekerId))),
        );

        // Fetch profile images
        const images: Record<string, string> = {};

        await Promise.all(
          seekerIds.map(async (id) => {
            try {
              const files = await getSeekerFiles(id.toString());
              const fileList = Array.isArray(files) ? files : [files];

              const imageFile = fileList.find(
                (file) => file.file_type === "FileType.image",
              );

              if (imageFile?.file_url) {
                images[id.toString()] = imageFile.file_url;
              }
            } catch (error) {
              console.error(`Failed to load image for seeker ${id}:`, error);
            }
          }),
        );

        setProfileImages(images);
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userInfo]);

  // Mark candidate as completed
  const handleComplete = async (applicationId: number) => {
    try {
      setUpdating(applicationId);

      await applicationStatusUpdate(applicationId, {
        Status: "Completed",
      });

      setAppliedCandidates((prev) =>
        prev.filter((candidate) => candidate.ApplicationId !== applicationId),
      );

      notify("Candidate marked as completed", "success");
    } catch (error) {
      console.error("Failed to update candidate status:", error);
      notify("Failed to update candidate status", "error");
    } finally {
      setUpdating(null);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Selected Candidates ({appliedCandidates.length})
      </Typography>

      {loading ? (
        <Box textAlign="center" py={4}>
          <CircularProgress />
        </Box>
      ) : appliedCandidates.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            border: "1px dashed",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography color="text.secondary">
            No selected candidates yet.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={2}>
          {appliedCandidates.map((job) => (
            <Card
              key={job.ApplicationId}
              variant="outlined"
              sx={{ borderRadius: 2 }}
            >
              <CardContent>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "stretch", sm: "center" }}
                  spacing={2}
                >
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Avatar
                      src={profileImages[job.SeekerId?.toString()]}
                      alt={job.ApplicantName}
                      sx={{ width: 50, height: 50 }}
                    />

                    <Box minWidth={0}>
                      <Typography
                        component={Link}
                        to={`/seeker_account/${job.SeekerId}`}
                        fontWeight={700}
                        color="text.primary"
                        sx={{
                          textDecoration: "none",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        {job.ApplicantName}
                      </Typography>

                      <Typography
                        component={Link}
                        to={`/jobs/details/${job.JobId}`}
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          "&:hover": {
                            color: "primary.main",
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {job.JobTitle}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Applied:{" "}
                        {job.AppliedDateTime
                          ? format(new Date(job.AppliedDateTime), "dd MMM yyyy")
                          : "N/A"}
                      </Typography>
                    </Box>
                  </Stack>

                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<DoneAll />}
                    disabled={updating === job.ApplicationId}
                    onClick={() => handleComplete(job.ApplicationId)}
                    sx={{
                      textTransform: "none",
                      alignSelf: { xs: "flex-start", sm: "center" },
                    }}
                  >
                    {updating === job.ApplicationId
                      ? "Updating..."
                      : "Mark as Completed"}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default ManageCandidatesTab;
