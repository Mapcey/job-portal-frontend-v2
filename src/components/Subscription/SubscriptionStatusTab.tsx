import { useEffect, useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import {
  Box,
  Typography,
  Chip,
  Skeleton,
  Alert,
  Button,
  Divider,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";

interface Subscription {
  id: number;
  planName: string;
  startDate: string;
  endDate: string;
  status: string;
  price?: number;
  createdDateTime?: string;
}

const normalizeSubscription = (sub: any): Subscription => ({
  id: sub?.SubId ?? sub?.id ?? sub?.Id ?? 0,
  planName: sub?.SubscriptionTier ?? sub?.planName ?? sub?.Plan ?? "Free",
  startDate: sub?.StartDate ?? sub?.startDate ?? "",
  endDate: sub?.EndDate ?? sub?.endDate ?? "",
  status: sub?.Status ?? sub?.status ?? "",
  price: sub?.Price ?? sub?.price,
  createdDateTime: sub?.CreatedDateTime ?? sub?.createdDateTime ?? "",
});

const getLatestSubscription = (subs: Subscription[]): Subscription | null => {
  if (!subs.length) return null;
  return subs
    .slice()
    .sort((a, b) => {
      const aDate = new Date(a.createdDateTime || "").getTime();
      const bDate = new Date(b.createdDateTime || "").getTime();
      // Fall back to 0 if date is invalid so invalid entries sort last
      const aTime = Number.isNaN(aDate) ? 0 : aDate;
      const bTime = Number.isNaN(bDate) ? 0 : bDate;
      return bTime - aTime;
    })[0];
};

const formatDate = (value: string) => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatPrice = (value?: number) => {
  if (value == null || value === 0) return "Free";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
};

/** Returns days remaining until endDate. Negative = expired. */
const daysRemaining = (endDate: string): number | null => {
  if (!endDate) return null;
  const end = new Date(endDate).getTime();
  if (Number.isNaN(end)) return null;
  return Math.ceil((end - Date.now()) / (1000 * 60 * 60 * 24));
};

/** 0–100 progress through the subscription period */
const planProgress = (startDate: string, endDate: string): number => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 100;
  const pct = ((Date.now() - start) / (end - start)) * 100;
  return Math.min(100, Math.max(0, pct));
};

const StatusChip = ({ status }: { status: string }) => {
  const s = status?.toLowerCase() ?? "";
  if (s.includes("active")) {
    return (
      <Chip
        label="Active"
        size="small"
        sx={{
          bgcolor: "#dcfce7",
          color: "#15803d",
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.02em",
        }}
      />
    );
  }
  if (s.includes("expired") || s.includes("inactive")) {
    return (
      <Chip
        label={status}
        size="small"
        sx={{
          bgcolor: "#fef3c7",
          color: "#b45309",
          fontWeight: 600,
          fontSize: "0.75rem",
        }}
      />
    );
  }
  return (
    <Chip
      label={status || "Unknown"}
      size="small"
      sx={{
        bgcolor: "#f1f5f9",
        color: "#64748b",
        fontWeight: 600,
        fontSize: "0.75rem",
      }}
    />
  );
};

const SubscriptionCard = ({ sub }: { sub: Subscription }) => {
  const days = daysRemaining(sub.endDate);
  const progress = planProgress(sub.startDate, sub.endDate);
  const isActive = sub.status?.toLowerCase().includes("active");
  const isExpiringSoon = days !== null && days >= 0 && days <= 7;

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: isActive ? "#bfdbfe" : "#e2e8f0",
        borderRadius: 3,
        p: 3,
        bgcolor: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.10)" },
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {/* Header row */}
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              bgcolor: "#eff6ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <WorkspacePremiumIcon sx={{ color: "#2563eb", fontSize: 22 }} />
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: "#64748b", letterSpacing: "0.08em", textTransform: "uppercase", fontSize: "0.7rem" }}>
              Plan
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a", lineHeight: 1.2 }}>
              {sub.planName}
            </Typography>
          </Box>
        </Box>
        <StatusChip status={sub.status} />
      </Box>

      {/* Expiry warning */}
      {isExpiringSoon && (
        <Alert severity="warning" sx={{ py: 0.5, borderRadius: 2, fontSize: "0.8rem" }}>
          {days === 0
            ? "Your plan expires today."
            : `Your plan expires in ${days} day${days === 1 ? "" : "s"}.`}
        </Alert>
      )}
      {days !== null && days < 0 && (
        <Alert severity="error" sx={{ py: 0.5, borderRadius: 2, fontSize: "0.8rem" }}>
          This plan expired {Math.abs(days)} day{Math.abs(days) === 1 ? "" : "s"} ago.
        </Alert>
      )}

      <Divider />

      {/* Date row */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ flex: 1, minWidth: 120 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <CalendarTodayIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", fontSize: "0.68rem" }}>
              Started
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {formatDate(sub.startDate)}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, minWidth: 120 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 0.5 }}>
            <EventAvailableIcon sx={{ fontSize: 13, color: "#94a3b8" }} />
            <Typography variant="caption" sx={{ color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.07em", fontSize: "0.68rem" }}>
              Renews
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: "#1e293b" }}>
            {formatDate(sub.endDate)}
          </Typography>
        </Box>
      </Box>

      {/* Progress bar */}
      {sub.startDate && sub.endDate && (
        <Tooltip title={`${Math.round(progress)}% of plan period used`} placement="top">
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", fontSize: "0.7rem" }}>
                Plan period
              </Typography>
              {days !== null && days >= 0 && (
                <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.7rem", fontWeight: 600 }}>
                  {days} day{days === 1 ? "" : "s"} left
                </Typography>
              )}
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "#f1f5f9",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 3,
                  bgcolor: isActive
                    ? progress > 85
                      ? "#f59e0b"
                      : "#2563eb"
                    : "#94a3b8",
                },
              }}
            />
          </Box>
        </Tooltip>
      )}

      <Divider />

      {/* Price row */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <AttachMoneyIcon sx={{ fontSize: 16, color: "#94a3b8" }} />
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.8rem" }}>
            Amount
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ fontWeight: 700, color: "#0f172a" }}>
          {formatPrice(sub.price)}
        </Typography>
      </Box>
    </Box>
  );
};

const LoadingSkeleton = () => (
  <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
    {[0, 1].map((i) => (
      <Box key={i} sx={{ border: "1px solid #e2e8f0", borderRadius: 3, p: 3 }}>
        <Box sx={{ display: "flex", gap: 1.5, mb: 2 }}>
          <Skeleton variant="rounded" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="40%" height={14} />
            <Skeleton width="60%" height={22} sx={{ mt: 0.5 }} />
          </Box>
          <Skeleton variant="rounded" width={60} height={24} />
        </Box>
        <Skeleton height={1} sx={{ mb: 2 }} />
        <Box sx={{ display: "flex", gap: 2 }}>
          <Skeleton width="45%" height={40} />
          <Skeleton width="45%" height={40} />
        </Box>
        <Skeleton height={6} sx={{ mt: 2, borderRadius: 3 }} />
        <Skeleton height={1} sx={{ mt: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Skeleton width={60} />
          <Skeleton width={50} />
        </Box>
      </Box>
    ))}
  </Box>
);

const SubscriptionStatusTab = () => {
  const { userInfo, firebaseUser } = useAuth();
  const [seekerID, setSeekerID] = useState<number | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resolveSeekerId = (info: any): number | null => {
    if (!info) return null;
    const id = info.UserId ?? info.SeekerId ?? info.userId ?? info.id ?? info.seekerId ?? null;
    if (id == null) return null;
    if (typeof id === "number") return id;
    const parsed = parseInt(id as string, 10);
    return Number.isNaN(parsed) ? null : parsed;
  };

  useEffect(() => {
    const resolvedId = resolveSeekerId(userInfo);
    if (resolvedId) setSeekerID(resolvedId);
  }, [userInfo, firebaseUser]);

  const fetchSubscriptions = async () => {
    if (!seekerID) return;
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(`/seekers/${seekerID}/subscriptions`);
      const payload = response.data;
      const list = Array.isArray(payload) ? payload : payload ? [payload] : [];
      const normalized = list.map(normalizeSubscription);
      const latest = getLatestSubscription(normalized);
      setSubscriptions(latest ? [latest] : []);
    } catch (err: any) {
      setError("We couldn't load your subscriptions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [seekerID]);

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <Alert
        severity="error"
        sx={{ borderRadius: 2 }}
        action={
          <Button color="inherit" size="small" onClick={fetchSubscriptions}>
            Retry
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  if (!subscriptions.length) {
    return (
      <Box
        sx={{
          border: "1px dashed #cbd5e1",
          borderRadius: 3,
          bgcolor: "#f8fafc",
          p: { xs: 4, md: 6 },
          textAlign: "center",
        }}
      >
        <StarBorderRoundedIcon sx={{ fontSize: 40, color: "#94a3b8", mb: 1.5 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#475569", mb: 0.5 }}>
          No active plan
        </Typography>
        <Typography variant="body2" sx={{ color: "#94a3b8", maxWidth: 320, mx: "auto" }}>
          You don't have a subscription yet. Subscribe to unlock features and get discovered by employers faster.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: "#0f172a" }}>
          Current plan
        </Typography>
        <Typography variant="body2" sx={{ color: "#64748b", mt: 0.5 }}>
          Showing your most recent subscription
        </Typography>
      </Box>
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "1fr", maxWidth: 480 }}>
        {subscriptions.map((sub) => (
          <SubscriptionCard key={sub.id} sub={sub} />
        ))}
      </Box>
    </Box>
  );
};

export default SubscriptionStatusTab;
