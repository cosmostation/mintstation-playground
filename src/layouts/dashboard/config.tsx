import {
  CurrencyDollarIcon,
  ChartBarIcon,
  WalletIcon,
  ShieldExclamationIcon,
  InformationCircleIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/solid";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Dashboard",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Faucet",
    path: "/faucet",
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Bank",
    path: "/bank",
    icon: (
      <SvgIcon fontSize="small">
        <WalletIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Validators",
    path: "/validators",
    icon: (
      <SvgIcon fontSize="small">
        <ShieldExclamationIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Staking",
    path: "/staking",
    icon: (
      <SvgIcon fontSize="small">
        <Square3Stack3DIcon />
      </SvgIcon>
    ),
  },
];
