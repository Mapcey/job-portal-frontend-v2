import React from "react";
import {
  Popover,
  Typography,
  Divider,
  Box,
  IconButton,
  Stack,
  Avatar,
  Button,
  CircularProgress,
} from "@mui/material";

import {
  NotificationsNone,
  Close,
  DoneAll,
  FiberManualRecord,
} from "@mui/icons-material";

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
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime(),
  );

  const unreadCount = notifications.filter((n) => n.Status === "Unread").length;

  const formatDate = (date: string) => {
    const notificationDate = new Date(date);
    const now = new Date();

    const diff = now.getTime() - notificationDate.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 7) return `${days} days ago`;

    return notificationDate.toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Popover
      open={open}
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
          width: { xs: "calc(100vw - 24px)", sm: 400 },
          maxWidth: 400,
          mt: 1.5,
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0px 12px 40px rgba(0,0,0,0.12)",
          border: "1px solid",
          borderColor: "divider",
        },
      }}
    >
      {/* Header */}
      <Box sx={{ px: 2.5, py: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: "primary.main",
                color: "#fff",
              }}
            >
              <NotificationsNone />
            </Avatar>

            <Box>
              <Typography variant="h6" fontWeight={700}>
                Notifications
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Stay updated with your latest activity
              </Typography>
            </Box>
          </Stack>

          <IconButton
            onClick={onClose}
            size="small"
            aria-label="Close notifications"
            sx={{ color: "text.secondary" }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Stack>
      </Box>

      <Divider />

      {/* Notification summary */}
      <Box
        sx={{
          px: 2.5,
          py: 1.5,
          bgcolor: "background.default",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body2" fontWeight={600}>
            Recent activity
          </Typography>

          <Typography
            variant="caption"
            fontWeight={600}
            sx={{
              color: unreadCount > 0 ? "primary.main" : "text.secondary",
            }}
          >
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </Typography>
        </Stack>
      </Box>

      {/* Notification list */}
      <Box
        sx={{
          maxHeight: 420,
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "divider",
            borderRadius: 5,
          },
        }}
      >
        {loading ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
            sx={{ py: 6 }}
          >
            <CircularProgress size={28} />
            <Typography variant="body2" color="text.secondary">
              Loading notifications...
            </Typography>
          </Stack>
        ) : sortedNotifications.length === 0 ? (
          <Stack
            alignItems="center"
            justifyContent="center"
            spacing={1.5}
            sx={{ py: 6, px: 3 }}
          >
            <Avatar
              sx={{
                width: 58,
                height: 58,
                bgcolor: "#fafafa",
                color: "text.secondary",
              }}
            >
              <NotificationsNone fontSize="large" />
            </Avatar>

            <Typography fontWeight={600}>You're all caught up!</Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
            >
              You don't have any notifications at the moment.
            </Typography>
          </Stack>
        ) : (
          sortedNotifications.map((notification, index) => {
            const isUnread = notification.Status === "Unread";

            return (
              <React.Fragment key={notification.NotificationId ?? index}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    px: 2.5,
                    py: 2,
                    bgcolor: isUnread ? "#f7f7f7" : "#ffffff",
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: "#f0f0f0",
                    },
                  }}
                >
                  {/* Icon */}
                  <Box sx={{ position: "relative", flexShrink: 0 }}>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: isUnread ? "primary.light" : "#f7f7f7",
                        color: isUnread ? "primary.dark" : "text.secondary",
                      }}
                    >
                      <NotificationsNone fontSize="small" />
                    </Avatar>

                    {isUnread && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: -2,
                          right: -2,
                          width: 11,
                          height: 11,
                          borderRadius: "50%",
                          bgcolor: "primary.main",
                          border: "2px solid",
                          borderColor: "background.paper",
                        }}
                      />
                    )}
                  </Box>

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      variant="body2"
                      fontWeight={isUnread ? 700 : 500}
                      color="text.primary"
                      sx={{
                        lineHeight: 1.6,
                        overflowWrap: "anywhere",
                      }}
                    >
                      {notification.Message}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "block",
                        mt: 0.75,
                      }}
                    >
                      {formatDate(notification.DateTime)}
                    </Typography>
                  </Box>

                  {/* Unread indicator */}
                  {isUnread && (
                    <Box sx={{ pt: 0.75 }}>
                      <FiberManualRecord
                        sx={{
                          fontSize: 9,
                          color: "primary.main",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {index !== sortedNotifications.length - 1 && (
                  <Divider sx={{ mx: 2.5 }} />
                )}
              </React.Fragment>
            );
          })
        )}
      </Box>

      {/* Footer */}
      {!loading && notifications.length > 0 && (
        <>
          <Divider />

          <Box sx={{ px: 2.5, py: 1.5 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              textAlign="center"
              display="block"
            >
              Showing your latest {notifications.length} notifications
            </Typography>
          </Box>
        </>
      )}
    </Popover>
  );
};

export default NotificationPopover;
