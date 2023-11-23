import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatDecimal, reduceString } from "@/functions/stringFunctions";
import { useLcdSWR } from "@/requesters/swr/lcd/useLcdSWR";
import Link from "next/link";

export const ValidatorTable = () => {
  const { data: validators } = useLcdSWR("/cosmos/staking/v1beta1/validators");

  return (
    <Card>
      <Box sx={{ minHeight: 400 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Validator</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {validators &&
              validators.validators &&
              validators.validators.map((validator: any) => {
                return (
                  <TableRow hover key={validator.operator_address}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar sx={{ backgroundColor: "neutral.700" }}>
                          {validator.description.moniker.substring(0, 1)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          <Link
                            target="_blank"
                            style={{ textDecoration: "none", color: "#80b6da" }}
                            href={`https://www.mintscan.io/mintstation-testnet/validators/${validator.operator_address}`}
                          >
                            {validator.description.moniker}
                          </Link>
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        style={{ textDecoration: "none", color: "#80b6da" }}
                        href={`https://www.mintscan.io/mintstation-testnet/validators/${validator.operator_address}`}
                      >
                        {reduceString(validator.operator_address, 14, 6)}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {formatDecimal(validator.delegator_shares, 6, 2)} MINT
                    </TableCell>
                    <TableCell>
                      {validator.commission.commission_rates.rate * 100}%
                    </TableCell>
                    <TableCell>
                      {validator.status == "BOND_STATUS_BONDED"
                        ? "Active"
                        : "Jail"}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
};
