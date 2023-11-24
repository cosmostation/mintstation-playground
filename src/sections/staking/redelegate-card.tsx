import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardContent,
  Container,
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
import { StakeInfoDialog } from "@/components/stake-dialog";
import { useCosmosAccount } from "@cosmostation/use-wallets";

export const RedelegateCard = () => {
  const { data, mutate } = useCosmosAccount("mintstation-1");
  const { data: validators } = useLcdSWR("/cosmos/staking/v1beta1/validators");
  const account = useRecoilValue(accountState);
  const [available, setAvailable] = useState(0);
  const [validator, setValidator]: any = useState();
  const [stakeInfo, setStakeInfo]: any = useState();
  const [stakeInfos, setStakeInfos] = useState([]);

  const { data: delegations } = useLcdSWR(
    account ? `/cosmos/staking/v1beta1/delegations/${account.address}` : null
  );
  const { data: balances } = useLcdSWR(
    account ? `/cosmos/bank/v1beta1/balances/${account.address}` : null
  );
  const [openValidatorDialog, setOpenValidatorDialog] = useState(false);
  const [openStakeInfoDialog, setOpenStakeInfoDialog] = useState(false);
  const showValidatorDialog = () => {
    setOpenValidatorDialog(true);
  };
  const showStakeInfoDialog = () => {
    setOpenStakeInfoDialog(true);
  };
  const selectValidator = (validator: any) => {
    setValidator(validator);
  };
  const selectStakeInfo = (stakeInfo: any) => {
    setStakeInfo(stakeInfo);
    setAvailable(stakeInfo.balance.amount);
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
      try {
        if (!account || !stakeInfo || !validator || !data) {
          return;
        }

        await data.methods.signAndSendTransaction({
          fee_denom: "umint",
          lcd_url: process.env.NEXT_PUBLIC_LCD_HOST,
          gas_rate: 1.3,
          messages: [
            {
              type_url: "/cosmos.staking.v1beta1.MsgBeginRedelegate",
              value: {
                validator_src_address: stakeInfo.validator.operator_address,
                validator_dst_address: validator.operator_address,
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
    if (delegations && validators) {
      const infos = delegations.delegation_responses.map((delegation: any) => {
        const validator = validators.validators.find((validator: any) => {
          return (
            validator.operator_address ==
            delegation.delegation.validator_address
          );
        });
        return { ...delegation, validator };
      });
      setStakeInfos(infos);
    }
  }, [validators, delegations]);

  useEffect(() => {
    if (
      validators &&
      validators.validators &&
      validators.validators.length > 0
    ) {
      setValidator(validators.validators[0]);
    }
  }, [validators, balances]);

  useEffect(() => {
    if (stakeInfos && stakeInfos.length > 0) {
      selectStakeInfo(stakeInfos[0]);
    }
  }, [stakeInfos]);

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
                label="From Validator"
                name="from"
                onClick={showStakeInfoDialog}
                value={stakeInfo?.validator.description.moniker}
              />
              <TextField
                fullWidth
                label="To Validator"
                name="to"
                onClick={showValidatorDialog}
                value={validator?.description.moniker}
              />
              <TextField
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
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
      <StakeInfoDialog
        stakeInfos={stakeInfos}
        select={selectStakeInfo}
        open={openStakeInfoDialog}
        setOpen={setOpenStakeInfoDialog}
      />
      <ValidatorDialog
        validators={validators?.validators}
        select={selectValidator}
        open={openValidatorDialog}
        setOpen={setOpenValidatorDialog}
      />
    </Container>
  );
};
