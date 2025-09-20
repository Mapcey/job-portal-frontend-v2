import { Settings } from "@mui/icons-material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f36d00", // customize
      light: "#fff1e5",
      dark: "#d53c00",
    },

    secondary: {
      main: "#555555",
      light: "#c9c9c9",
      dark: "#151515",
    },

    error: {
      main: "#f44336",
    },

    warning: {
      main: "#ff9800",
    },

    info: {
      main: "#2196f3",
    },

    success: {
      main: "#4caf50",
    },

    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },

    text: {
      primary: "#000000ff",
      secondary: "#ffffff",
      disabled: "#999999",
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
