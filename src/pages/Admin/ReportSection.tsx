import { useState } from "react";
import { Box, Typography, Chip, Button } from "@mui/material";

// utility to clean enum strings
const formatEnum = (value: string) => {
  if (!value) return "";
  return value.split(".").pop()?.replace(/_/g, " ") || value;
};

const ReportsSection = ({ reports }: { reports: any[] }) => {
  const [showAll, setShowAll] = useState(false);

  // sort newest first
  const sortedReports = [...reports].sort(
    (a, b) => new Date(b.DateTime).getTime() - new Date(a.DateTime).getTime()
  );

  // show either 3 latest or all
  const visibleReports = showAll ? sortedReports : sortedReports.slice(0, 3);

  return (
    <Box mt={5}>
      <Typography variant="h5" mb={2}>
        Reports
      </Typography>

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
