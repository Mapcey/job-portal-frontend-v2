import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";

// utility to clean enum strings
const formatEnum = (value: string) => {
  if (!value) return "";
  return value.split(".").pop()?.replace(/_/g, " ") || value;
};

const ReportsSection = ({ reports }: { reports: any[] }) => {
  const [showAll, setShowAll] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  // sort newest first
  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
  );

  // gather filter options
  const statusOptions = Array.from(
    new Set(reports.map((r) => r.Status).filter(Boolean))
  );
  const typeOptions = Array.from(
    new Set(reports.map((r) => r.ReportedType).filter(Boolean))
  );

  // apply filters
  const filteredReports = sortedReports.filter((report) => {
    // status filter
    if (statusFilter !== "All" && report.Status !== statusFilter) return false;
    // type filter (ReportedType)
    if (typeFilter !== "All" && report.ReportedType !== typeFilter) return false;
    // date filters: compare using dates only
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

  // show either 3 latest or all (after filtering)
  const visibleReports = showAll
    ? filteredReports
    : filteredReports.slice(0, 3);

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>
        Reports
      </Typography>

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
          <MenuItem value="All">All</MenuItem>
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
          <MenuItem value="All">All</MenuItem>
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
            setStatusFilter("All");
            setTypeFilter("All");
            setFromDate("");
            setToDate("");
          }}
        >
          Reset
        </Button>
      </Box>

      <Box sx={{ border: "1px solid #eee", borderRadius: "8px", p: 2 }}>
        {visibleReports.map((report) => (
          <Box key={report.ReportId} mb={2}>
            <Typography variant="subtitle1">
              Report #{report.ReportId} –{" "}
              <Chip label={formatEnum(report.ReportCategory)} size="small" />
            </Typography>
            <Typography variant="body2">
              Reported {formatEnum(report.ReportedType)} ID {report.ReportedId}{" "}
              by {formatEnum(report.ReporterType)} ID {report.ReporterId}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(report.DateTime).toLocaleString()} | Status:{" "}
              {formatEnum(report.Status)}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Toggle button */}
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
  );
};

export default ReportsSection;
