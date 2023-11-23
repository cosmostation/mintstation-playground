import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { ValidatorTable } from "@/sections/validators/validator-table";

const Page = () => {
  return (
    <DashboardLayout>
      <Head>
        <title>Validators</title>
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
            <Typography variant="h4">Validators</Typography>
            <Container maxWidth="xl">
              <ValidatorTable />
            </Container>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Page;
