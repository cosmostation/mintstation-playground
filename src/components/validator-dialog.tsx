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

type IValidatorDialogProps = {
  validators: any;
  select: (validator: any) => void;
  open: boolean;
  setOpen: any;
};

export const ValidatorDialog = ({
  validators,
  select,
  open,
  setOpen,
}: IValidatorDialogProps) => {
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
        {validators &&
          validators.map((validator: any) => (
            <ListItem disableGutters key={validator.operator_address}>
              <ListItemButton
                onClick={() => {
                  handleClose();
                  select(validator);
                }}
              >
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={2}
                  sx={{ width: 300 }}
                >
                  <Avatar>
                    {validator.description.moniker.substring(0, 1)}
                  </Avatar>
                  <Typography variant="subtitle2">
                    {validator.description.moniker}
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
