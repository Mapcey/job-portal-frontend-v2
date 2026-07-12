// components/NotificationPopover.tsx

import React from "react";
import { Popover, Typography, Divider, Box } from "@mui/material";

interface NotificationPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  notifications: any[];
  loading: boolean;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  open,
  onClose,
  notifications,
  loading,
}) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{ sx: { width: 360, p: 2 } }} // ✅ wider
    >
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <Divider />

      <Box mt={1} sx={{ maxHeight: "60vh", overflowY: "auto" }}>
        {loading ? (
          <Typography variant="body2">Loading...</Typography>
        ) : notifications.length === 0 ? (
          <Typography variant="body2">No notifications available</Typography>
        ) : (
          [...notifications]
            .sort(
              (a, b) =>
                new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
            )
            .map((n, i) => (
              <React.Fragment key={i}>
                <Box
                  sx={{
                    p: 1,
                    backgroundColor:
                      n.Status === "Unread" ? "primary.light" : "transparent",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight={600}
                    sx={{ mb: 0.25 }}
                  >
                    🔔 {n.Message}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "text.secondary", display: "block" }}
                  >
                    {new Date(n.DateTime).toLocaleString()}
                  </Typography>
                </Box>

                {i !== notifications.length - 1 && <Divider />}
              </React.Fragment>
            ))
        )}
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
