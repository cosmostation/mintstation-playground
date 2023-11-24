import { accountState } from "@/recoil/state";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

export const FaucetCard = () => {
  const account = useRecoilValue(accountState);
  function faucet(): void {
    if (!account) {
      toast.error("Please connect wallet.");
      return;
    }

    const url = process.env.NEXT_PUBLIC_FAUCET_URL ?? "";
    const header = { "Content-Type": `application/json` };
    axios
      .post(
        url,
        {
          address: account.address,
        },
        {
          headers: header,
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("Faucet Success !");
        } else {
          toast.error(JSON.stringify(response.data));
        }
      })
      .catch(function (error) {
        toast.error(JSON.stringify(error));
      })
      .finally(() => {});
  }

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={"/assets/images/token.svg"}
            sx={{
              height: 80,
              mb: 2,
              width: 80,
            }}
          />
          <Typography gutterBottom variant="h5">
            MINT Token
          </Typography>
          <Typography color="text.secondary" variant="body2">
            Take Faucet and use the functions in Playground. The token can only
            use send function and is used as tx fee.
          </Typography>
        </Box>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          onClick={faucet}
          variant="contained"
        >
          Send
        </Button>
      </CardContent>
    </Card>
  );
};
