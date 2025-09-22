import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    customText: {
      main: string;
      light: string;
    };
  }
  interface PaletteOptions {
    customText?: {
      main?: string;
      light?: string;
    };
  }
}
