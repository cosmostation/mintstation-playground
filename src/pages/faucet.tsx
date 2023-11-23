import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { FaucetCard } from "@/sections/faucet/faucet-card";

const Page = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Faucet</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Faucet</Typography>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <FaucetCard />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Page;
