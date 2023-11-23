import { formatDecimal } from "@/functions/stringFunctions";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Typography,
} from "@mui/material";

type IStakeInfoDialogProps = {
  select: (stakeInfo: any) => void;
  open: boolean;
  setOpen: any;
  stakeInfos: any;
};

export const StakeInfoDialog = ({
  select,
  open,
  setOpen,
  stakeInfos,
}: IStakeInfoDialogProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Select Validators</DialogTitle>
      <List sx={{ pt: 0 }}>
        {stakeInfos &&
          stakeInfos.map((stakeInfos: any) => (
            <ListItem
              disableGutters
              key={stakeInfos.validator.operator_address}
            >
              <ListItemButton
                onClick={() => {
                  handleClose();
                  select(stakeInfos);
                }}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  sx={{ width: 300 }}
                >
                  <Avatar>
                    {stakeInfos.validator.description.moniker.substring(0, 1)}
                  </Avatar>
                  <Typography variant="subtitle2">
                    {stakeInfos.validator.description.moniker}
                  </Typography>
                  <Typography variant="caption">
                    {formatDecimal(stakeInfos.balance.amount, 6, 2)} MINT
                  </Typography>
                </Stack>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
