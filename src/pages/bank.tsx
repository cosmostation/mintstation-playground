import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { SendCard } from "@/sections/bank/send-card";

const Page = () => (
  <DashboardLayout>
    <Head>
      <title>Bank</title>
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
          <Typography variant="h4">Bank</Typography>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <SendCard />
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box>
  </DashboardLayout>
);

export default Page;
