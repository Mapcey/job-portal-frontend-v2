import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AccessTime } from "@mui/icons-material";
import MailIcon from "@mui/icons-material/Mail";
import DraftsIcon from "@mui/icons-material/Drafts";
import { notification } from "../../types/notification";
import { useAuth } from "../../context/AuthContext";
import {
  getAllEmployerNotifications,
  updateEmployerNotification,
} from "../../services/APIs/APIs";

const NotificationsTab = () => {
  const { userInfo } = useAuth();
  const [employerID, setEmployerID] = useState<number>(0);
  const [notifications, setNotifications] = useState<notification[]>([]);
  const [selectedNote, setSelectedNote] = useState<notification | null>(null);
  const [loading, setLoading] = useState(true);

  // Get employer ID from context
  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setEmployerID(userInfo.EmployerId);
    }
  }, [userInfo]);

  // Fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      if (employerID !== 0) {
        try {
          setLoading(true);

          const data = await getAllEmployerNotifications(employerID.toString());

          // Unread notifications first
          // Read notifications after
          // Newest first within each group
          const sorted = [...data].sort((a, b) => {
            // Unread first
            if (a.Status === "Unread" && b.Status !== "Unread") {
              return -1;
            }

            if (a.Status !== "Unread" && b.Status === "Unread") {
              return 1;
            }

            // Same status -> newest first
            return (
              new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
            );
          });

          setNotifications(sorted);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [employerID]);

  // Open notification + mark as read
  const handleClick = async (note: notification) => {
    setSelectedNote(note);

    if (note.Status === "Unread") {
      try {
        if (userInfo && "EmployerId" in userInfo) {
          await updateEmployerNotification(
            userInfo.EmployerId,
            note.NotificationId,
            {
              DateTime: note.DateTime,
              Message: note.Message,
              Status: "Read",
            },
          );

          console.log(`Notification ${note.NotificationId} marked as read`);

          // Update status only.
          // We intentionally DON'T reorder the list here.
          setNotifications((prev) =>
            prev.map((n) =>
              n.NotificationId === note.NotificationId
                ? { ...n, Status: "Read" }
                : n,
            ),
          );
        }
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Notifications
      </Typography>

      {loading ? (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            border: "1px dashed",
            borderColor: "grey.400",
            borderRadius: 2,
          }}
        >
          <Typography variant="body1" color="text.secondary">
            No notifications yet.
          </Typography>
        </Box>
      ) : (
        <List
          sx={{
            maxHeight: "600px",
            overflowY: "auto",
            bgcolor: "white",
            borderRadius: 1,
          }}
        >
          {notifications.map((note) => (
            <React.Fragment key={note.NotificationId}>
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => handleClick(note)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                    },
                  }}
                >
                  {note.Status === "Unread" ? (
                    <MailIcon color="primary" sx={{ mr: 2 }} />
                  ) : (
                    <DraftsIcon
                      sx={{
                        color: "gray",
                        mr: 2,
                      }}
                    />
                  )}

                  <ListItemText
                    primary={note.Message}
                    secondary={
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {new Date(note.DateTime).toLocaleString()}
                      </Typography>
                    }
                    primaryTypographyProps={{
                      fontWeight: note.Status === "Unread" ? 600 : 400,
                    }}
                  />
                </ListItemButton>
              </ListItem>

              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      )}

      {/* Notification Details */}
      <Dialog
        open={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "primary.light",
            }}
          >
            <MailIcon sx={{ color: "primary.main" }} />
          </Box>

          <Box>
            <Typography variant="h6" fontWeight={600}>
              Notification Details
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Notification information
            </Typography>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ bgcolor: "#fafafa", py: 3 }}>
          {selectedNote && (
            <>
              <Box
                sx={{
                  bgcolor: "white",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                  p: 2.5,
                  mb: 2.5,
                }}
              >
                <Typography lineHeight={1.7}>{selectedNote.Message}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AccessTime sx={{ fontSize: 18 }} />
                <Typography variant="body2" color="text.secondary">
                  {new Date(selectedNote.DateTime).toLocaleString()}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid",
            borderColor: "divider",
          }}
        >
          <Button
            onClick={() => setSelectedNote(null)}
            variant="contained"
            sx={{
              borderRadius: 2,
              textTransform: "none",
              boxShadow: "none",
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationsTab;
