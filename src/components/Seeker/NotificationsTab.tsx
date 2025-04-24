import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const dummyNotifications = [
  {
    id: 1,
    message: "Your application for Frontend Developer has been viewed.",
    date: "2025-04-18",
  },
  {
    id: 2,
    message: "New job matching your profile: GIS Analyst",
    date: "2025-04-17",
  },
  {
    id: 3,
    message: "Reminder: Complete your profile to get better job matches.",
    date: "2025-04-15",
  },
  {
    id: 4,
    message: "Your application for Frontend Developer has been viewed.",
    date: "2025-04-18",
  },
  {
    id: 5,
    message: "New job matching your profile: GIS Analyst",
    date: "2025-04-17",
  },
  {
    id: 6,
    message: "Reminder: Complete your profile to get better job matches.",
    date: "2025-04-15",
  },
];

const NotificationsTab = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);

  const handleRemove = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleClick = (message: string) => {
    alert(`You clicked: "${message}"`);
  };

  return (
    <Box className="notification-tab-container" sx={{ p: 2 }}>
      <Typography variant="h6" mb={2}>
        Notifications
      </Typography>

      <List
        sx={{
          maxHeight: "400px",
          overflowY: "auto",
          bgcolor: "white",
          borderRadius: 1,
          boxShadow: 1,
        }}
      >
        {notifications.map((note) => (
          <React.Fragment key={note.id}>
            <ListItem
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(note.id);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                onClick={() => handleClick(note.message)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <ListItemText
                  primary={note.message}
                  secondary={
                    <Typography variant="body2" sx={{ color: "secondary" }}>
                      {new Date(note.date).toDateString()}
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
    </Box>
  );
};

export default NotificationsTab;
