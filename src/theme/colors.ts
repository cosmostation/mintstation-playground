import { alpha } from "@mui/material/styles";

const withAlphas = (color: any) => {
  return {
    ...color,
    alpha4: alpha(color.main, 0.04),
    alpha8: alpha(color.main, 0.08),
    alpha12: alpha(color.main, 0.12),
    alpha30: alpha(color.main, 0.3),
    alpha50: alpha(color.main, 0.5),
  };
};

export const neutral = {
  900: "#F8F9FA",
  800: "#F3F4F6",
  700: "#e5e7e9",
  600: "#D2D6DB",
  500: "#818b97",
  400: "#6C737F",
  300: "#2b2c31",
  200: "#181a20",
  100: "#14151b",
  50: "#111111",
};

export const indigo = withAlphas({
  lightest: "#F1F1FF",
  light: "#E4E4FF",
  main: "#0A4FD9",
  dark: "#5936B2",
  darkest: "#461C75",
  contrastText: "#FFFFFF",
});

export const success = withAlphas({
  lightest: "#F0FDF9",
  light: "#3FC79A",
  main: "#10B981",
  dark: "#0B815A",
  darkest: "#134E48",
  contrastText: "#FFFFFF",
});

export const info = withAlphas({
  lightest: "#E5F8FA",
  light: "#B3F1F7",
  main: "#05d2dd",
  dark: "#09AAB5",
  darkest: "#0D7D8B",
  contrastText: "#FFFFFF",
});

export const warning = withAlphas({
  lightest: "#FFF7E0",
  light: "#FFEAC0",
  main: "#ffcb47",
  dark: "#D2A336",
  darkest: "#A6802C",
  contrastText: "#FFFFFF",
});

export const error = withAlphas({
  lightest: "#FEE7E6",
  light: "#FECAC8",
  main: "#f94e5f",
  dark: "#D43646",
  darkest: "#A82C3A",
  contrastText: "#FFFFFF",
});
