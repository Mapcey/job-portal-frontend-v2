// components/NotificationPopover.tsx

import React from "react";
import { Popover, Typography, Divider, Box } from "@mui/material";

interface NotificationPopoverProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const NotificationPopover: React.FC<NotificationPopoverProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  return (
    <Popover
      open={open}
      //   disableScrollLock={true}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          width: 300,
          padding: 2,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>
      <Divider />
      <Box mt={1}>
        <Typography variant="body2">
          🔔 New candidate applied to your job
        </Typography>
        <Typography variant="body2">📢 System maintenance on Sunday</Typography>
        {/* Map dynamic notifications here */}
      </Box>
    </Popover>
  );
};

export default NotificationPopover;
