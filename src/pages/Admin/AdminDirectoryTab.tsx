import { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Checkbox,
  CircularProgress,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import Search from "@mui/icons-material/Search";
import axiosInstance from "../../services/axiosInstance";

type DirectoryType = "seekers" | "employers";
type DirectoryItem = Record<string, unknown>;

interface DirectoryResponse {
  items?: DirectoryItem[];
  total?: number;
  pages?: number;
  current_page?: number;
  per_page?: number;
}

interface AdminDirectoryTabProps {
  type: DirectoryType;
}

const displayValue = (value: unknown): string => {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const displayLabel = (key: string) =>
  key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (letter) => letter.toUpperCase());

const getPrimaryDetails = (item: DirectoryItem, type: DirectoryType) => {
  if (type === "seekers") {
    return {
      name: [item.FirstName, item.LastName].filter(Boolean).join(" ") || "Unnamed seeker",
      email: displayValue(item.Email),
      location: [item.City, item.Country].filter(Boolean).join(", ") || "—",
      plan: displayValue(item.Subscription),
    };
  }

  return {
    name: displayValue(item.CompanyName) === "—" ? "Unnamed employer" : displayValue(item.CompanyName),
    email: displayValue(item.Email),
    location: displayValue(item.Location),
    plan: displayValue(item.Subscription),
  };
};

const DetailValue = ({ value }: { value: unknown }) => {
  if (Array.isArray(value)) {
    if (value.length === 0) return <Typography color="text.secondary">None</Typography>;
    return (
      <Stack spacing={1}>
        {value.map((entry, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 1.5 }}>
            {entry && typeof entry === "object" && !Array.isArray(entry) ? (
              <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 1 }}>
                {Object.entries(entry as Record<string, unknown>).map(([key, nestedValue]) => (
                  <Box key={key}>
                    <Typography variant="caption" color="text.secondary">{displayLabel(key)}</Typography>
                    <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>{displayValue(nestedValue)}</Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body2">{displayValue(entry)}</Typography>
            )}
          </Paper>
        ))}
      </Stack>
    );
  }

  if (value && typeof value === "object") {
    return <DetailValue value={Object.entries(value as Record<string, unknown>).map(([key, item]) => `${displayLabel(key)}: ${displayValue(item)}`)} />;
  }

  return <Typography variant="body2" sx={{ overflowWrap: "anywhere" }}>{displayValue(value)}</Typography>;
};

const AdminDirectoryTab = ({ type }: AdminDirectoryTabProps) => {
  const [items, setItems] = useState<DirectoryItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTarget, setStatusTarget] = useState<{
    id: string | number;
    active: boolean;
  } | null>(null);
  const [statusReason, setStatusReason] = useState("");
  const [closeActiveJobs, setCloseActiveJobs] = useState(false);
  const [updatingStatusId, setUpdatingStatusId] = useState<string | number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchDirectory = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.get<DirectoryResponse>(`/admin/${type}`);
        if (!mounted) return;
        const responseItems = Array.isArray(response.data.items) ? response.data.items : [];
        setItems(responseItems);
        setTotal(response.data.total ?? responseItems.length);
      } catch (requestError) {
        console.error(`Failed to fetch admin ${type}:`, requestError);
        if (mounted) setError(`Unable to load ${type}. Please try again.`);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void fetchDirectory();
    return () => {
      mounted = false;
    };
  }, [type, refreshKey]);

  const title = type === "seekers" ? "Seekers" : "Employers";
  const filteredItems = items.filter((item) =>
    getPrimaryDetails(item, type).name
      .toLocaleLowerCase()
      .includes(searchTerm.trim().toLocaleLowerCase()),
  );

  const closeStatusDialog = () => {
    setStatusTarget(null);
    setStatusReason("");
    setCloseActiveJobs(false);
  };

  const handleStatusUpdate = async () => {
    if (!statusTarget) return;
    const { id, active } = statusTarget;

    try {
      setUpdatingStatusId(id);
      const payload = type === "employers"
        ? {
            Active: !active,
            CloseActiveJobs: !active ? closeActiveJobs : false,
            Reason: statusReason.trim(),
          }
        : {
            FreezeDiscovery: active,
            Reason: statusReason.trim(),
          };

      await axiosInstance.put(`/admin/${type}/${id}/status`, payload);
      setItems((currentItems) => currentItems.map((item) => {
        const itemId = type === "seekers" ? item.UserId : item.EmployerId;
        if (itemId !== id) return item;
        return type === "employers"
          ? { ...item, Active: !active }
          : { ...item, FreezeDiscovery: active };
      }));
      setStatusError(false);
      setStatusMessage(`${title.slice(0, -1)} ${!active ? "activated" : "deactivated"} successfully.`);
      closeStatusDialog();
    } catch (requestError) {
      console.error(`Failed to update ${type} status:`, requestError);
      setStatusError(true);
      setStatusMessage(`Unable to update ${type.slice(0, -1)} status. Please try again.`);
    } finally {
      setUpdatingStatusId(null);
    }
  };

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}><CircularProgress /></Box>;
  }

  return (
    <Stack spacing={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
        <Typography color="text.secondary">
          {searchTerm ? `${filteredItems.length} shown · ${total} total` : `${total} ${title.toLowerCase()} total`}
        </Typography>
        <TextField
          size="small"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder={`Search ${type === "seekers" ? "seekers" : "employers"} by name`}
          aria-label={`Search ${type} by name`}
          sx={{ width: { xs: "100%", sm: 320 } }}
          InputProps={{
            startAdornment: <Search fontSize="small" sx={{ color: "text.secondary", mr: 1 }} />,
          }}
        />
        <Button size="small" onClick={() => setRefreshKey((current) => current + 1)}>Refresh</Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}
      {statusMessage && (
        <Alert severity={statusError ? "error" : "success"} onClose={() => setStatusMessage("")}>
          {statusMessage}
        </Alert>
      )}

      {!error && filteredItems.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            {items.length === 0
              ? `No ${title.toLowerCase()} found.`
              : `No ${title.toLowerCase()} match “${searchTerm}”.`}
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small" aria-label={`${title} directory`}>
            <TableHead>
              <TableRow>
                <TableCell>{type === "seekers" ? "Seeker" : "Company"}</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item, index) => {
                const id = (type === "seekers" ? item.UserId : item.EmployerId) as string | number | undefined;
                const rowId = id ?? index;
                const primary = getPrimaryDetails(item, type);
                const isExpanded = expandedId === rowId;
                const isActive = type === "employers"
                  ? item.Active !== false
                  : item.FreezeDiscovery !== true;
                const isUpdating = updatingStatusId === rowId;

                return (
                  <Fragment key={rowId}>
                    <TableRow
                      hover
                      onClick={() => setExpandedId(isExpanded ? null : rowId)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography fontWeight={600}>{primary.name}</Typography>
                          {type === "employers" && item.Active !== undefined && (
                            <Chip size="small" label={item.Active ? "Active" : "Inactive"} color={item.Active ? "success" : "default"} />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>{primary.email}</TableCell>
                      <TableCell>{primary.location}</TableCell>
                      <TableCell><Chip size="small" variant="outlined" label={primary.plan} /></TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={isActive ? "Active" : type === "seekers" ? "Discovery Frozen" : "Inactive"}
                          color={isActive ? "success" : "default"}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Stack direction="row" justifyContent="flex-end" spacing={1}>
                        <Button
                          size="small"
                          endIcon={isExpanded ? <ExpandLess /> : <ExpandMore />}
                          onClick={(event) => {
                            event.stopPropagation();
                            setExpandedId(isExpanded ? null : rowId);
                          }}
                        >
                          {isExpanded ? "Hide" : "View"}
                        </Button>
                        <Button
                          size="small"
                          color={isActive ? "error" : "success"}
                          disabled={isUpdating}
                          onClick={(event) => {
                            event.stopPropagation();
                            setStatusTarget({ id: rowId, active: isActive });
                          }}
                        >
                          {isUpdating ? <CircularProgress size={16} /> : isActive ? "Deactivate" : "Activate"}
                        </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6} sx={{ py: 0, borderBottom: isExpanded ? undefined : 0 }}>
                        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                          <Box sx={{ py: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                            {Object.entries(item).map(([key, value]) => (
                              <Box key={key} sx={{ minWidth: 0 }}>
                                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                                  {displayLabel(key)}
                                </Typography>
                                <DetailValue value={value} />
                              </Box>
                            ))}
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Dialog open={Boolean(statusTarget)} onClose={closeStatusDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          {statusTarget?.active ? "Deactivate" : "Activate"} {type === "seekers" ? "seeker" : "employer"}
        </DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {type === "seekers"
              ? statusTarget?.active
                ? "This will freeze this seeker's discovery visibility."
                : "This will unfreeze this seeker's discovery visibility."
              : statusTarget?.active
                ? "This will deactivate the employer account."
                : "This will activate the employer account."}
          </Typography>
          {type === "employers" && statusTarget?.active && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={closeActiveJobs}
                  onChange={(event) => setCloseActiveJobs(event.target.checked)}
                />
              }
              label="Close the employer's active jobs"
            />
          )}
          <TextField
            label="Reason (optional)"
            value={statusReason}
            onChange={(event) => setStatusReason(event.target.value)}
            fullWidth
            multiline
            minRows={2}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeStatusDialog} disabled={updatingStatusId !== null}>Cancel</Button>
          <Button
            variant="contained"
            color={statusTarget?.active ? "error" : "success"}
            onClick={handleStatusUpdate}
            disabled={updatingStatusId !== null}
          >
            {updatingStatusId !== null ? <CircularProgress size={18} color="inherit" /> : statusTarget?.active ? "Deactivate" : "Activate"}
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};

export default AdminDirectoryTab;
