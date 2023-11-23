import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "../theme";
import { CosmosProvider } from "@cosmostation/use-wallets";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CosmosProvider>
        <RecoilRoot>
          <ToastContainer
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="light"
          />
          <CssBaseline />
          <Component {...pageProps} />
        </RecoilRoot>
      </CosmosProvider>
    </ThemeProvider>
  );
}
