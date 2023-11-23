import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLcdSWR } from "@/requesters/swr/lcd/useLcdSWR";
import { accountState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { formatDecimal } from "@/functions/stringFunctions";
import { ValidatorDialog } from "@/components/validator-dialog";
import { useCosmosAccount } from "@cosmostation/use-wallets";

export const StakeCard = () => {
  const { data, mutate } = useCosmosAccount("mintstation-1");
  const { data: validators } = useLcdSWR("/cosmos/staking/v1beta1/validators");
  const account = useRecoilValue(accountState);
  const [available, setAvailable] = useState(0);
  const [validator, setValidator]: any = useState();

  const { data: balances } = useLcdSWR(
    account ? `/cosmos/bank/v1beta1/balances/${account.address}` : null
  );
  const [open, setOpen] = useState(false);
  const showValidatorDialog = () => {
    setOpen(true);
  };
  const selectValidator = (validator: any) => {
    setValidator(validator);
  };
  const formik = useFormik({
    initialValues: {
      amount: "",
      submit: null,
    },
    validationSchema: Yup.object({
      amount: Yup.number()
        .max(available / 1000000)
        .min(0)
        .required("Amount is invalid"),
    }),
    onSubmit: async (values, helpers) => {
      if (!account || !data || !validator) {
        return;
      }

      try {
        await data.methods.signAndSendTransaction({
          fee_denom: "umint",
          lcd_url: process.env.NEXT_PUBLIC_LCD_HOST,
          gas_rate: 1.3,
          messages: [
            {
              type_url: "/cosmos.staking.v1beta1.MsgDelegate",
              value: {
                validator_address: validator.operator_address,
                delegator_address: account.address,
                amount: {
                  denom: "umint",
                  amount: (Number(values.amount) * 1000000).toString(),
                },
              },
            },
          ],
        });
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (balances && balances.balances[0]) {
      setAvailable(balances.balances[0].amount);
    }

    if (
      validators &&
      validators.validators &&
      validators.validators.length > 0
    ) {
      setValidator(validators.validators[0]);
    }
  }, [validators, balances]);

  useEffect(() => {
    mutate();
  });

  return (
    <Container maxWidth="xl">
      <Card>
        <CardContent>
          <form noValidate onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Validator"
                name="validator"
                onClick={showValidatorDialog}
                value={validator?.description.moniker}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">MINT</InputAdornment>
                  ),
                }}
                error={!!(formik.touched.amount && formik.errors.amount)}
                fullWidth
                helperText={`Available: ${formatDecimal(available, 6, 2)} MINT`}
                label="Amount"
                name="amount"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
                value={formik.values.amount}
              />
            </Stack>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              Stake
            </Button>
          </form>
        </CardContent>
      </Card>
      <ValidatorDialog
        validators={validators?.validators}
        select={selectValidator}
        open={open}
        setOpen={setOpen}
      />
    </Container>
  );
};
