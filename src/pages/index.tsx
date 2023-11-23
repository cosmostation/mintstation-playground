import Head from "next/head";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "@/layouts/dashboard/layout";
import { DashboardCard } from "@/sections/dashboard/dashboard-card";
import { DashboardGraph } from "@/sections/dashboard/dashboard-graph";
import { DashboardHistory } from "@/sections/dashboard/dashboard-history";
import { useLcdSWR } from "@/requesters/swr/lcd/useLcdSWR";
import { useRecoilValue } from "recoil";
import { accountState } from "@/recoil/state";
import { useEffect, useState } from "react";

const now = new Date();

export default function Home() {
  const account = useRecoilValue(accountState);
  const [balanceValues, setBalanceValues] = useState({
    totalBalance: 0,
    delegateBalance: 0,
    rewardBalance: 0,
    unbondingBalance: 0,
  });
  const { totalBalance, delegateBalance, unbondingBalance, rewardBalance } =
    balanceValues;

  const { data: balances } = useLcdSWR(
    account ? `/cosmos/bank/v1beta1/balances/${account.address}` : null
  );
  const { data: delegations } = useLcdSWR(
    account ? `/cosmos/staking/v1beta1/delegations/${account.address}` : null
  );
  const { data: rewards } = useLcdSWR(
    account
      ? `/cosmos/distribution/v1beta1/delegators/${account.address}/rewards`
      : null
  );
  const { data: unbonding } = useLcdSWR(
    account
      ? `/cosmos/staking/v1beta1/delegators/${account.address}/unbonding_delegations`
      : null
  );
  useEffect(() => {
    setBalanceValues({
      totalBalance:
        balances?.balances?.reduce(
          (total: number, balance: any) => total + parseInt(balance.amount),
          0
        ) ?? 0,
      delegateBalance:
        delegations?.delegation_responses?.reduce(
          (total: number, delegation: any) => {
            return total + parseInt(delegation.balance.amount);
          },
          0
        ) ?? 0,
      rewardBalance:
        rewards?.total?.reduce((total: number, balance: any) => {
          return total + parseInt(balance.amount);
        }, 0) ?? 0,
      unbondingBalance:
        unbonding?.unbonding_responses?.reduce(
          (total: number, delegation: any) => {
            const entryTotal = delegation.entries.reduce(
              (total: number, entry: any) => {
                return total + parseInt(entry.balance);
              },
              0
            );
            return total + entryTotal;
          },
          0
        ) ?? 0,
    });
  }, [balances, delegations, rewards, unbonding]);

  return (
    <DashboardLayout>
      <Head>
        <title>Dashboard</title>
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
            <Typography variant="h4">Dashboard</Typography>
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <DashboardCard title="Available" value={totalBalance} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <DashboardCard title="Staking" value={delegateBalance} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <DashboardCard title="Reward" value={rewardBalance} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <DashboardCard title="Unbonding" value={unbondingBalance} />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <DashboardGraph
                  chartSeries={[
                    totalBalance,
                    delegateBalance,
                    rewardBalance,
                    unbondingBalance,
                  ]}
                  labels={["Available", "Staking", "Reward", "Unbonding"]}
                />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <DashboardHistory />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </DashboardLayout>
  );
}
