// pages/Admin/AdminDashboard.tsx
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Chip,
  Button,
  Divider,
  TextField,
  Tabs,
  Tab,
  MenuItem,
} from "@mui/material";
import { Report, People, Work, School } from "@mui/icons-material";

import FooterSection_1 from "../../components/footer/FooterSection_1";
import axiosInstance from "../../services/axiosInstance";
import SubscriptionSection from "./SubscriptionSection";

const formatEnum = (value: string) => {
  if (!value) return "";
  return value.split(".").pop()?.replace(/_/g, " ") || value;
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalSeekers: 0,
    totalEmployers: 0,
    totalReports: 0,
    totalJobs: 0,
  });
  const [reports, setReports] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState(0);
  const [resolvingId, setResolvingId] = useState<number | null>(null);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});

  // Fetch stats and reports
  const fetchAdminData = async () => {
    try {
      setLoading(true);

      // TODO: Replace with actual stats API
      await new Promise((r) => setTimeout(r, 500));
      setStats({
        totalSeekers: 120,
        totalEmployers: 45,
        totalReports: 8,
        totalJobs: 32,
      });

      // Fetch reports
      const res = await axiosInstance.get("/reports");
    console.log("Reports fetched:", res.data);
      setReports(res.data || []);

      // Fetch subscriptions
      try {
        const subRes = await axiosInstance.get("/admin/payments");
        console.log("Payments fetched:", subRes.data);
        setSubscriptions(subRes.data || []);
      } catch (e) {
        console.warn("Failed to fetch payments.", e);
        setSubscriptions([]);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // Handle status update
  const handleResolve = async (reportId: number, status: string) => {
    const note = notes[reportId]?.trim();
    if (!note) {
      alert("Please enter resolution notes before proceeding.");
      return;
    }

    try {
      setResolvingId(reportId);

      const payload = {
        Status: status,
        ResolutionNotes: note,
        ResolvedBy: 1, // TODO: Replace with actual admin ID
      };

      await axiosInstance.put(`/reports/${reportId}`, payload);

      // Clear notes input
      setNotes((prev) => ({ ...prev, [reportId]: "" }));

      // Re-fetch reports to refresh the dashboard
      await fetchAdminData();
    } catch (err) {
      console.error("Failed to update report:", err);
    } finally {
      setResolvingId(null);
    }
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
  );

  const statusOptions = Array.from(
    new Set(reports.map((r) => r.Status).filter(Boolean))
  );
  const typeOptions = Array.from(
    new Set(reports.map((r) => r.ReportedType).filter(Boolean))
  );

  const filteredReports = sortedReports.filter((report) => {
    if (statusFilter !== "all" && report.Status !== statusFilter) return false;
    if (typeFilter !== "all" && report.ReportedType !== typeFilter) return false;
    const reportDate = new Date(report.DateTime);
    if (fromDate) {
      const from = new Date(fromDate + "T00:00:00");
      if (reportDate < from) return false;
    }
    if (toDate) {
      const to = new Date(toDate + "T23:59:59");
      if (reportDate > to) return false;
    }
    return true;
  });

  const visibleReports = showAll ? filteredReports : filteredReports.slice(0, 3);

  const renderActionButtons = (report: any) => {
    const status = formatEnum(report.Status); // pending, under_review, resolved, dismissed
    if (status === "resolved" || status === "dismissed") return null;

    return (
      <Box mt={1.5} display="flex" gap={1} flexWrap="wrap">
        <TextField
          size="small"
          placeholder="Enter resolution notes"
          value={notes[report.ReportId] || ""}
          onChange={(e) =>
            setNotes({ ...notes, [report.ReportId]: e.target.value })
          }
          sx={{ flex: 1 }}
        />

        {status === "pending" && (
          <Button
            variant="contained"
            color="info"
            onClick={() => handleResolve(report.ReportId, "under_review")}
            disabled={resolvingId === report.ReportId}
          >
            {resolvingId === report.ReportId ? "Updating..." : "Mark Under Review"}
          </Button>
        )}

        <Button
          variant="contained"
          color="success"
          onClick={() => handleResolve(report.ReportId, "resolved")}
          disabled={resolvingId === report.ReportId}
        >
          {resolvingId === report.ReportId ? "Resolving..." : "Resolve"}
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleResolve(report.ReportId, "dismissed")}
          disabled={resolvingId === report.ReportId}
        >
          {resolvingId === report.ReportId ? "Rejecting..." : "Reject"}
        </Button>
      </Box>
    );
  };

  return (
    <div>
      <Box
        sx={{
          padding: 5,
          backgroundColor: "white",
          borderRadius: "10px",
          minHeight: "500px",
        }}
      >
        <Typography variant="h4" mb={2}>
          Admin Dashboard
        </Typography>
        <Divider />

        {/* Overview */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mt: 3 }}>
          <Box sx={{ flex: 1, minWidth: "220px", p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
            <People sx={{ fontSize: 40, color: "primary.main" }} />
            <Typography variant="h6">Seekers</Typography>
            <Typography variant="h4">{stats.totalSeekers}</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: "220px", p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
            <Work sx={{ fontSize: 40, color: "secondary.main" }} />
            <Typography variant="h6">Employers</Typography>
            <Typography variant="h4">{stats.totalEmployers}</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: "220px", p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
            <Report sx={{ fontSize: 40, color: "error.main" }} />
            <Typography variant="h6">Reports</Typography>
            <Typography variant="h4">{stats.totalReports}</Typography>
          </Box>

          <Box sx={{ flex: 1, minWidth: "220px", p: 3, border: "1px solid #ddd", borderRadius: "8px" }}>
            <School sx={{ fontSize: 40, color: "success.main" }} />
            <Typography variant="h6">Jobs</Typography>
            <Typography variant="h4">{stats.totalJobs}</Typography>
          </Box>
        </Box>

        {/* Tabs for Reports and Subscriptions */}
        <Box mt={5}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={(_event, newValue) => setActiveTab(newValue)}
              aria-label="management tabs"
            >
              <Tab label="Reports" id="tab-0" aria-controls="tabpanel-0" />
              <Tab label="Subscriptions" id="tab-1" aria-controls="tabpanel-1" />
            </Tabs>
          </Box>

          {/* Reports Tab Panel */}
          <Box
            role="tabpanel"
            hidden={activeTab !== 0}
            id="tabpanel-0"
            aria-labelledby="tab-0"
            sx={{ pt: 3 }}
          >
            {activeTab === 0 && (
              <Box>
                {/* Filters */}
                <Box mb={2} display="flex" gap={2} flexWrap="wrap">
                  <TextField
                    select
                    label="Status"
                    size="small"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {statusOptions.map((s) => (
                      <MenuItem key={s} value={s}>
                        {formatEnum(s)}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Type"
                    size="small"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    sx={{ minWidth: 160 }}
                  >
                    <MenuItem value="all">All</MenuItem>
                    {typeOptions.map((t) => (
                      <MenuItem key={t} value={t}>
                        {formatEnum(t)}
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

                  <Button
                    variant="outlined"
                    onClick={() => {
                      setStatusFilter("all");
                      setTypeFilter("all");
                      setFromDate("");
                      setToDate("");
                    }}
                  >
                    Reset
                  </Button>
                </Box>

                <Box sx={{ border: "1px solid #eee", borderRadius: "8px", p: 2 }}>
                  {visibleReports.length > 0 ? (
                    visibleReports.map((report) => (
                      <Box key={report.ReportId} mb={3} sx={{ borderBottom: "1px solid #f0f0f0", pb: 2 }}>
                        <Typography variant="subtitle1">
                          Report #{report.ReportId} –{" "}
                          <Chip label={formatEnum(report.ReportCategory)} size="small" color="warning" />
                        </Typography>
                        <Typography variant="body2" mt={0.5}>
                          Reported {formatEnum(report.ReportedType)} ID {report.ReportedId} by {formatEnum(report.ReporterType)} ID {report.ReporterId}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(report.DateTime).toLocaleString()} | Status: <b>{formatEnum(report.Status)}</b>
                        </Typography>

                        {/* Action buttons */}
                        {renderActionButtons(report)}

                        {/* Existing resolution notes */}
                        {report.ResolutionNotes && (
                          <Typography variant="body2" mt={1} color="text.secondary">
                            Notes: {report.ResolutionNotes}
                          </Typography>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography>No reports available.</Typography>
                  )}
                </Box>

                {reports.length > 3 && (
                  <Box mt={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => setShowAll(!showAll)}
                    >
                      {showAll ? "Show Less" : "Show All Reports"}
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>

          {/* Subscriptions Tab Panel */}
          <Box
            role="tabpanel"
            hidden={activeTab !== 1}
            id="tabpanel-1"
            aria-labelledby="tab-1"
            sx={{ pt: 3 }}
          >
            {activeTab === 1 && <SubscriptionSection subscriptions={subscriptions} />}
          </Box>
        </Box>
      </Box>

      <FooterSection_1 />
    </div>
  );
};

export default AdminDashboard;
