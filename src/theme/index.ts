import { createTheme as createMuiTheme } from "@mui/material";
import { createPalette } from "./create-palette";
import { createComponents } from "./create-components";
import { createTypography } from "./create-typography";

export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
    components,
    palette,
    shape: {
      borderRadius: 7,
    },
    typography: typography,
  });
}
