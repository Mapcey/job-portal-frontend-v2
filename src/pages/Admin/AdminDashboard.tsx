// pages/Admin/AdminDashboard.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  CssBaseline,
  MenuItem,
  Paper,
  Snackbar,
  Tab,
  Tabs,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  alpha,
} from "@mui/material";
import {
  Report as ReportIcon,
  People,
  Work,
  WorkOutline,
  Payments,
  Logout,
  CheckCircleOutline,
  HighlightOff,
  ManageSearch,
  FilterAltOff,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import FooterSection_1 from "../../components/footer/FooterSection_1";
import axiosInstance from "../../services/axiosInstance";
import SubscriptionSection from "./SubscriptionSection";
import AdminDirectoryTab from "./AdminDirectoryTab";
import { useAuth } from "../../context/AuthContext";

/* ---------- Theme ---------- */

const BRAND = "#f36d00";

const theme = createTheme({
  palette: {
    primary: { main: BRAND, contrastText: "#fff" },
    secondary: { main: "#c25700", contrastText: "#fff" }, // deeper orange, replaces MUI's default purple/magenta
    background: { default: "#faf7f4" },
    text: { primary: "#2b2118", secondary: "#6f6258" },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: `"Inter", "Segoe UI", Roboto, Arial, sans-serif`,
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiTab: { styleOverrides: { root: { textTransform: "none", fontWeight: 600 } } },
  },
});

/* ---------- Helpers & types ---------- */

const formatEnum = (value: string) => {
  if (!value) return "";
  return value.split(".").pop()?.replace(/_/g, " ") || value;
};

const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

interface AdminDashboardStats {
  total_seekers: number;
  total_employers: number;
  active_jobs: number;
  pending_payments: number;
  open_reports: number;
}

const STATUS_COLOR: Record<string, "default" | "warning" | "info" | "success" | "error"> = {
  pending: "warning",
  "under review": "info",
  resolved: "success",
  dismissed: "default",
};

const EMPTY_STATS: AdminDashboardStats = {
  total_seekers: 0,
  total_employers: 0,
  active_jobs: 0,
  pending_payments: 0,
  open_reports: 0,
};

/* ---------- Small components ---------- */

const StatCard = ({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) => (
  <Paper
    variant="outlined"
    sx={{
      flex: "1 1 180px",
      p: 2.5,
      display: "flex",
      alignItems: "center",
      gap: 2,
      borderColor: alpha(color, 0.25),
    }}
  >
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        color,
        bgcolor: alpha(color, 0.12),
        flexShrink: 0,
      }}
    >
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h5" fontWeight={700}>
        {value}
      </Typography>
    </Box>
  </Paper>
);

/* ---------- Page ---------- */

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState<AdminDashboardStats>(EMPTY_STATS);
  const [reports, setReports] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [activeTab, setActiveTab] = useState(0);

  const [resolvingId, setResolvingId] = useState<number | null>(null);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [toast, setToast] = useState<{ message: string; severity: "success" | "error" | "warning" } | null>(null);

  // Fetch dashboard statistics, reports, and subscriptions.
  const fetchAdminData = async () => {
    try {
      const res = await axiosInstance.get<AdminDashboardStats>("/admin/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch admin dashboard statistics:", error);
    }

    try {
      const res = await axiosInstance.get("/reports");
      setReports(res.data || []);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    }

    try {
      const res = await axiosInstance.get("/admin/payments");
      setSubscriptions(res.data || []);
    } catch (error) {
      console.warn("Failed to fetch payments.", error);
    }
  };

  useEffect(() => {
    fetchAdminData().finally(() => setInitialLoading(false));
  }, []);

  // Handle status update
  const handleResolve = async (reportId: number, status: string) => {
    const note = notes[reportId]?.trim();
    if (!note) {
      setToast({ message: "Add resolution notes before continuing.", severity: "warning" });
      return;
    }

    try {
      setResolvingId(reportId);
      await axiosInstance.put(`/reports/${reportId}`, {
        Status: status,
        ResolutionNotes: note,
        ResolvedBy: 1, // TODO: Replace with actual admin ID
      });
      setNotes((prev) => ({ ...prev, [reportId]: "" }));
      await fetchAdminData(); // refresh without hiding the page
      setToast({ message: `Report #${reportId} updated.`, severity: "success" });
    } catch (err) {
      console.error("Failed to update report:", err);
      setToast({ message: "Couldn't update the report. Try again.", severity: "error" });
    } finally {
      setResolvingId(null);
    }
  };

  /* ----- Derived data ----- */

  const statusOptions = useMemo(
    () => Array.from(new Set(reports.map((r) => r.Status).filter(Boolean))) as string[],
    [reports]
  );
  const typeOptions = useMemo(
    () => Array.from(new Set(reports.map((r) => r.ReportedType).filter(Boolean))) as string[],
    [reports]
  );

  const filteredReports = useMemo(() => {
    const from = fromDate ? new Date(fromDate + "T00:00:00") : null;
    const to = toDate ? new Date(toDate + "T23:59:59") : null;

    return [...reports]
      .sort((a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime())
      .filter((r) => {
        if (statusFilter !== "all" && r.Status !== statusFilter) return false;
        if (typeFilter !== "all" && r.ReportedType !== typeFilter) return false;
        const d = new Date(r.DateTime);
        if (from && d < from) return false;
        if (to && d > to) return false;
        return true;
      });
  }, [reports, statusFilter, typeFilter, fromDate, toDate]);

  const visibleReports = showAll ? filteredReports : filteredReports.slice(0, 3);
  const hasActiveFilters = statusFilter !== "all" || typeFilter !== "all" || !!fromDate || !!toDate;

  const resetFilters = () => {
    setStatusFilter("all");
    setTypeFilter("all");
    setFromDate("");
    setToDate("");
  };

  /* ----- Render helpers ----- */

  const renderActionButtons = (report: any) => {
    const status = formatEnum(report.Status);
    if (status === "resolved" || status === "dismissed") return null;

    const busy = resolvingId === report.ReportId;

    return (
      <Box mt={2} display="flex" gap={1} flexWrap="wrap" alignItems="center">
        <TextField
          size="small"
          placeholder="Write resolution notes"
          value={notes[report.ReportId] || ""}
          onChange={(e) => setNotes((prev) => ({ ...prev, [report.ReportId]: e.target.value }))}
          sx={{ flex: "1 1 240px", bgcolor: "background.paper" }}
          disabled={busy}
        />

        {status === "pending" && (
          <Button
            variant="outlined"
            color="info"
            startIcon={<ManageSearch />}
            onClick={() => handleResolve(report.ReportId, "under_review")}
            disabled={busy}
          >
            Mark under review
          </Button>
        )}

        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleOutline />}
          onClick={() => handleResolve(report.ReportId, "resolved")}
          disabled={busy}
        >
          {busy ? "Saving…" : "Resolve"}
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<HighlightOff />}
          onClick={() => handleResolve(report.ReportId, "dismissed")}
          disabled={busy}
        >
          Dismiss
        </Button>
      </Box>
    );
  };

  const renderReportsTab = () => (
    <Box>
      {/* Filters */}
      <Paper variant="outlined" sx={{ p: 2, mb: 2.5, display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}>
        <TextField
          select
          label="Status"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="all">All statuses</MenuItem>
          {statusOptions.map((s) => (
            <MenuItem key={s} value={s}>
              {capitalize(formatEnum(s))}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Reported type"
          size="small"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="all">All types</MenuItem>
          {typeOptions.map((t) => (
            <MenuItem key={t} value={t}>
              {capitalize(formatEnum(t))}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="From"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <TextField
          label="To"
          type="date"
          size="small"
          InputLabelProps={{ shrink: true }}
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <Button startIcon={<FilterAltOff />} onClick={resetFilters} disabled={!hasActiveFilters}>
          Clear filters
        </Button>
      </Paper>

      {/* Report list */}
      {visibleReports.length > 0 ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {visibleReports.map((report) => {
            const status = formatEnum(report.Status);
            return (
              <Paper
                key={report.ReportId}
                variant="outlined"
                sx={{
                  p: 2.5,
                  borderLeft: `4px solid ${BRAND}`,
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
                  <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography variant="subtitle1" fontWeight={700}>
                      Report #{report.ReportId}
                    </Typography>
                    <Chip label={capitalize(formatEnum(report.ReportCategory))} size="small" variant="outlined" />
                  </Box>
                  <Chip
                    label={capitalize(status)}
                    size="small"
                    color={STATUS_COLOR[status] || "default"}
                  />
                </Box>

                <Typography variant="body2" mt={1}>
                  {capitalize(formatEnum(report.ReporterType))} #{report.ReporterId} reported{" "}
                  {formatEnum(report.ReportedType)} #{report.ReportedId}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(report.DateTime).toLocaleString()}
                </Typography>

                {report.ResolutionNotes && (
                  <Box mt={1.5} p={1.5} borderRadius={1.5} bgcolor={alpha(BRAND, 0.07)}>
                    <Typography variant="body2" color="text.secondary">
                      <b>Resolution notes:</b> {report.ResolutionNotes}
                    </Typography>
                  </Box>
                )}

                {renderActionButtons(report)}
              </Paper>
            );
          })}
        </Box>
      ) : (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
          <Typography fontWeight={600}>
            {hasActiveFilters ? "No reports match these filters." : "No reports yet."}
          </Typography>
          {hasActiveFilters && (
            <Button sx={{ mt: 1 }} onClick={resetFilters}>
              Clear filters
            </Button>
          )}
        </Paper>
      )}

      {filteredReports.length > 3 && (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={() => setShowAll((v) => !v)}>
            {showAll ? "Show fewer" : `Show all ${filteredReports.length} reports`}
          </Button>
        </Box>
      )}
    </Box>
  );

  /* ----- Page ----- */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
            mb={3}
          >
            <Box>
              <Typography variant="h4">Admin dashboard</Typography>
              <Typography color="text.secondary">
                Review reports, payments, and users in one place.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Logout />}
              onClick={() => {
                logout();
                navigate("/admin/login", { replace: true });
              }}
            >
              Log out
            </Button>
          </Box>

          {initialLoading ? (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              {/* Overview */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                <StatCard icon={<People />} label="Seekers" value={stats.total_seekers} color={BRAND} />
                <StatCard icon={<Work />} label="Employers" value={stats.total_employers} color="#7b5ea7" />
                <StatCard icon={<WorkOutline />} label="Active jobs" value={stats.active_jobs} color="#2e8b57" />
                <StatCard icon={<Payments />} label="Pending payments" value={stats.pending_payments} color="#c98a00" />
                <StatCard icon={<ReportIcon />} label="Open reports" value={stats.open_reports} color="#d32f2f" />
              </Box>

              {/* Tabs */}
              <Paper variant="outlined" sx={{ mt: 4, overflow: "hidden" }}>
                <Tabs
                  value={activeTab}
                  onChange={(_e, v) => setActiveTab(v)}
                  aria-label="management tabs"
                  variant="scrollable"
                  scrollButtons="auto"
                  sx={{ borderBottom: 1, borderColor: "divider", px: 1 }}
                >
                  <Tab label={`Reports${stats.open_reports ? ` (${stats.open_reports})` : ""}`} id="tab-0" aria-controls="tabpanel-0" />
                  <Tab label="Subscriptions" id="tab-1" aria-controls="tabpanel-1" />
                  <Tab label="Seekers" id="tab-2" aria-controls="tabpanel-2" />
                  <Tab label="Employers" id="tab-3" aria-controls="tabpanel-3" />
                </Tabs>

                {[
                  renderReportsTab,
                  () => <SubscriptionSection subscriptions={subscriptions} />,
                  () => <AdminDirectoryTab type="seekers" />,
                  () => <AdminDirectoryTab type="employers" />,
                ].map((render, i) => (
                  <Box
                    key={i}
                    role="tabpanel"
                    hidden={activeTab !== i}
                    id={`tabpanel-${i}`}
                    aria-labelledby={`tab-${i}`}
                    sx={{ p: { xs: 2, sm: 3 } }}
                  >
                    {activeTab === i && render()}
                  </Box>
                ))}
              </Paper>
            </>
          )}
        </Container>

        <FooterSection_1 />
      </Box>

      <Snackbar
        open={!!toast}
        autoHideDuration={4000}
        onClose={() => setToast(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        {toast ? (
          <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>
            {toast.message}
          </Alert>
        ) : undefined}
      </Snackbar>
    </ThemeProvider>
  );
};

export default AdminDashboard;