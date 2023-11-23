import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useLcdSWR } from "@/requesters/swr/lcd/useLcdSWR";
import { accountState } from "@/recoil/state";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { formatDecimal } from "@/functions/stringFunctions";
import { useCosmosAccount, useCosmosWallets } from "@cosmostation/use-wallets";

export const SendCard = () => {
  const account = useRecoilValue(accountState);
  const [available, setAvailable] = useState(0);
  const { data, mutate } = useCosmosAccount("mintstation-1");

  const { data: balances } = useLcdSWR(
    account ? `/cosmos/bank/v1beta1/balances/${account.address}` : null
  );

  useEffect(() => {
    mutate();
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      amount: "",
      submit: null,
    },
    validationSchema: Yup.object({
      address: Yup.string().max(100).required("Address is required"),
      amount: Yup.number()
        .max(available / 1000000)
        .min(0)
        .required("Amount is invalid"),
    }),
    onSubmit: async (values, helpers) => {
      if (!account || !data) {
        return;
      }

      try {
        await data.methods.signAndSendTransaction({
          fee_denom: "umint",
          lcd_url: process.env.NEXT_PUBLIC_LCD_HOST,
          gas_rate: 1.3,
          messages: [
            {
              type_url: "/cosmos.bank.v1beta1.MsgSend",
              value: {
                from_address: account.address,
                to_address: values.address,
                amount: [
                  {
                    denom: "umint",
                    amount: (Number(values.amount) * 1000000).toString(),
                  },
                ],
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
  }, [balances]);
  return (
    <Card>
      <CardContent>
        <form noValidate onSubmit={formik.handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Denom"
              name="denom"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value="MINT"
            />
            <TextField
              error={!!(formik.touched.address && formik.errors.address)}
              fullWidth
              helperText={formik.touched.address && formik.errors.address}
              label="Receipient"
              name="address"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="text"
              value={formik.values.address}
            />
            <TextField
              error={!!(formik.touched.amount && formik.errors.amount)}
              fullWidth
              label="Amount"
              helperText={`Available: ${formatDecimal(available, 6, 2)} MINT`}
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
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
