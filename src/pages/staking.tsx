import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "../layouts/dashboard/layout";
import { useCallback, useState } from "react";
import { StakeCard } from "@/sections/staking/stake-card";
import { UnstakeCard } from "@/sections/staking/unstake-card";
import { RedelegateCard } from "@/sections/staking/redelegate-card";

const Page = () => {
  const [method, setMethod] = useState("stake");
  const handleMethodChange = useCallback((event: any, value: string) => {
    setMethod(value);
  }, []);

  return (
    <DashboardLayout>
      <Head>
        <title>Staking</title>
      </Head>
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4">Staking</Typography>
            <Grid container xs={12} md={6} lg={4}>
              <Tabs onChange={handleMethodChange} sx={{ mb: 3 }} value={method}>
                <Tab label="Stake" value="stake" />
                <Tab label="Unstake" value="unstake" />
                <Tab label="Redelegate" value="redelegate" />
              </Tabs>
              {method == "stake" && <StakeCard />}
              {method == "unstake" && <UnstakeCard />}
              {method == "redelegate" && <RedelegateCard />}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
};

export default Page;
