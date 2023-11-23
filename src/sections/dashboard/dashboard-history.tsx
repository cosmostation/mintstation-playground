import { format } from "date-fns";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Chip,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { accountState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { useApiSWR } from "@/requesters/swr/lcd/useApiSWR";
import {
  extractMessageName,
  formatDate,
  reduceString,
} from "@/functions/stringFunctions";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const statusMap: any = {
  success: "success",
  fail: "error",
};

export const DashboardHistory = () => {
  const account = useRecoilValue(accountState);

  const { data: transactions } = useApiSWR(
    account ? `/accounts/${account.address}/transactions?take=6` : null
  );

  return (
    <Card>
      <CardHeader title="History" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>Result</TableCell>
              <TableCell>Message</TableCell>
              <TableCell>Height</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions &&
              transactions.transactions.map((transaction: any) => {
                return (
                  <TableRow hover key={transaction.txhash}>
                    <TableCell>
                      <Link
                        target="_blank"
                        style={{ textDecoration: "none", color: "#80b6da" }}
                        href={`https://www.mintscan.io/mintstation-testnet/tx/${transaction.txhash}`}
                      >
                        {reduceString(transaction.txhash, 6, 6)}
                      </Link>
                    </TableCell>
                    <TableCell>
                      {transaction.code == 0 ? (
                        <Typography variant="caption" color="#73dc96">
                          Success
                        </Typography>
                      ) : (
                        <Typography variant="caption" color="#ef5f6d">
                          Fail
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="small"
                        label={extractMessageName(
                          transaction.tx["/cosmos-tx-v1beta1-Tx"].body
                            .messages[0]["@type"]
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        target="_blank"
                        style={{ textDecoration: "none", color: "#80b6da" }}
                        href={`https://www.mintscan.io/mintstation-testnet/block/${transaction.height}`}
                      >
                        {transaction.height}
                      </Link>
                    </TableCell>
                    <TableCell>{formatDate(transaction.timestamp)}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          target="_blank"
          href={`https://www.mintscan.io/mintstation-testnet/address/${account?.address}`}
          LinkComponent={Link}
        >
          View more
        </Button>
      </CardActions>
    </Card>
  );
};
