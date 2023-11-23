import { accountState, walletState } from "@/recoil/state";
import { useRecoilState } from "recoil";
import { copy, reduceString } from "@/functions/stringFunctions";
import {
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useCosmosAccount, useCosmosWallets } from "@cosmostation/use-wallets";
import { CosmosWallet } from "@cosmostation/wallets";
import {
  ClipboardIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";

function WalletButton(): JSX.Element {
  const [account, setAccount] = useRecoilState(accountState);
  const [wallet, setWallet] = useRecoilState(walletState);
  const { cosmosWallets, currentWallet, selectWallet } = useCosmosWallets();
  const { data, error, mutate } = useCosmosAccount("mintstation-1");
  const [connected, setConnected] = useState(false);
  const [open, setOpen] = useState(false);

  const disconnect = async () => {
    try {
      await currentWallet.methods.disconnect?.();
    } catch (e) {
      console.log(e);
    }
    localStorage.removeItem("account");
    localStorage.removeItem("wallet");
    setAccount(null);
    setWallet(null);
    setConnected(false);
  };

  const pickWallet = async (wallet: CosmosWallet) => {
    try {
      const chainIds = await wallet.methods.getSupportedChainIds();
      if (!chainIds.includes("mintstation-1")) {
        await wallet.methods.addChain?.({
          chain_id: "mintstation-1",
          chain_name: "Mintstation",
          address_prefix: "mint",
          base_denom: "umint",
          display_denom: "MINT",
          lcd_url: process.env.NEXT_PUBLIC_LCD_HOST ?? "",
        });
      }
    } catch (e) {
      console.log(e);
    }
    setConnected(true);
    selectWallet(wallet.id);
    setOpen(false);
  };

  useEffect(() => {
    if (currentWallet) {
      localStorage.setItem("wallet", JSON.stringify(currentWallet));
      setWallet(currentWallet);
    }
  }, [currentWallet, setWallet]);

  useEffect(() => {
    if (connected && data && data.account) {
      localStorage.setItem("account", JSON.stringify(data.account));
      setAccount(data.account);
    }
  }, [data, error, connected, setAccount]);

  useEffect(() => {
    window.addEventListener("cosmostation_keystorechange", async (e) => {
      if (wallet && account) {
        await mutate();
      }
    });
    if (!currentWallet && !connected && cosmosWallets.length > 0) {
      const storedAccount = localStorage.getItem("account");
      const storedWallet = localStorage.getItem("wallet");
      if (storedAccount && !account && storedWallet && !wallet) {
        setConnected(true);
        setAccount(JSON.parse(storedAccount));
        const parsedStoredWallet = JSON.parse(storedWallet);
        const findWallet = cosmosWallets.find(
          (w) => w.name === parsedStoredWallet.name
        );
        if (findWallet) {
          selectWallet(findWallet.id);
        }
      }
    }
  }, [cosmosWallets]);

  return (
    <>
      {account ? (
        <Box
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="inherit" variant="subtitle1">
              {account.name}
            </Typography>
            <Typography color="neutral.500" variant="body2">
              {reduceString(account.address, 10, 4)}
            </Typography>
          </div>
          <div>
            <SvgIcon
              fontSize="small"
              sx={{ color: "neutral.500" }}
              onClick={() => copy(account.address)}
            >
              <ClipboardIcon />
            </SvgIcon>
            <SvgIcon
              fontSize="small"
              sx={{ color: "neutral.500", ml: 2 }}
              onClick={() => disconnect()}
            >
              <ArrowRightOnRectangleIcon />
            </SvgIcon>
          </div>
        </Box>
      ) : (
        <Box
          onClick={() => setOpen(true)}
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.04)",
            borderRadius: 1,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            p: "12px",
          }}
        >
          <div>
            <Typography color="inherit" variant="subtitle1">
              Connect Wallet
            </Typography>
            <Typography color="neutral.500" variant="body2">
              Click to connect.
            </Typography>
          </div>
          <SvgIcon fontSize="small" sx={{ color: "neutral.500" }}>
            <ChevronRightIcon />
          </SvgIcon>
        </Box>
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Select Wallet</DialogTitle>
        <List>
          {cosmosWallets.length > 0 ? (
            cosmosWallets.map((wallet) => (
              <ListItem disableGutters key={wallet.name}>
                <ListItemButton onClick={() => pickWallet(wallet)}>
                  <ListItemAvatar>
                    <Avatar src={wallet.logo} />
                  </ListItemAvatar>
                  <ListItemText primary={wallet.name} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <div>Install Cosmostation</div>
          )}
        </List>
      </Dialog>
    </>
  );
}

export default WalletButton;
