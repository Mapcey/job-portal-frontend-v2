import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  // IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
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
  const [selectedNote, setSelectedNote] = useState<notification | null>(null); // For dialog

  // Get seeker ID from context
  useEffect(() => {
    if (userInfo && "EmployerId" in userInfo) {
      setEmployerID(userInfo.EmployerId);
      console.log(userInfo.EmployerId);
    }
  }, [userInfo]);

  // Fetch notifications
  useEffect(() => {
    const fetchData = async () => {
      if (employerID !== 0) {
        try {
          const data = await getAllEmployerNotifications(employerID.toString());

          // 🔹 Sort newest first
          const sorted = [...data].sort(
            (a, b) =>
              new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
          );

          setNotifications(sorted);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        }
      }
    };
    fetchData();
  }, [employerID]);

  // 🔹 Mark as read + open dialog
  const handleClick = async (note: notification) => {
    setSelectedNote(note);

    if (note.Status === "Unread") {
      // Optimistically update UI
      setNotifications((prev) =>
        prev.map((n) =>
          n.NotificationId === note.NotificationId
            ? { ...n, Status: "Read" }
            : n
        )
      );

      try {
        // Call API to mark as read
        if (userInfo && "EmployerId" in userInfo) {
          await updateEmployerNotification(
            userInfo.EmployerId,
            note.NotificationId
          );
          console.log(`Notification ${note.NotificationId} marked as read`);
        }
      } catch (err) {
        console.error("Failed to mark notification as read:", err);
        // Optionally, revert UI change if API fails
        setNotifications((prev) =>
          prev.map((n) =>
            n.NotificationId === note.NotificationId
              ? { ...n, Status: "Unread" }
              : n
          )
        );
      }
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Notifications
      </Typography>

      <List
        sx={{
          maxHeight: "600px",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {notifications.map((note) => (
          <React.Fragment key={note.NotificationId}>
            <ListItem
              // secondaryAction={
              //   <IconButton
              //     edge="end"
              //     aria-label="delete"
              //     onClick={(e) => {
              //       e.stopPropagation();
              //       // handleRemove(note.NotificationId);
              //     }}
              //   >
              //     <DeleteIcon color="error" />
              //   </IconButton>
              // }
              disablePadding
            >
              <ListItemButton
                onClick={() => handleClick(note)}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                {note.Status === "Unread" ? (
                  <MailIcon color="primary" sx={{ mr: 2 }} />
                ) : (
                  <DraftsIcon sx={{ color: "gray", mr: 2 }} />
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
                />
              </ListItemButton>
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}

        {notifications.length === 0 && (
          <Typography p={2} color="secondary">
            No notifications.
          </Typography>
        )}
      </List>

      {/* 🔹 Dialog to show full message */}
      <Dialog
        open={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Notification Details</DialogTitle>
        <DialogContent dividers>
          {selectedNote && (
            <>
              <Typography variant="subtitle1" gutterBottom>
                {selectedNote.Message}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(selectedNote.DateTime).toLocaleString()}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedNote(null)} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationsTab;
