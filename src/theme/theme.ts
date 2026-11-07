import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f36d00", // customize
      light: "#fff1e5",
      dark: "#d53c00",
      contrastText:"#FFFFFF"
    },

    secondary: {
      main: "#555555",
      light: "#f8f8f8ff",
      dark: "#151515",
    },

    background: {
      default: "#F8F9FB",
      paper: "#FFFFFF",
    },

    text: {
      primary: "#141414ff",
      secondary: "#666666",
      disabled: "#999999",
    },

    error: {
      main: "#f44336",
      dark: "#e63b2fff",
    },

    warning: {
      main: "#ff9800",
    },

    info: {
      main: "#2196f3",
    },

    success: {
      main: "#4caf50",
      dark: "#46a74aff",
    },

    action: {
      active: "#555555",
      hover: "#f36d00",
      selected: "#f36d00",
      disabled: "#999999",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export default theme;
