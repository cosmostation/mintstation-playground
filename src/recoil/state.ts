import { atom } from "recoil";
import {
  CosmosRequestAccountResponse,
  CosmosWallet,
} from "@cosmostation/wallets";

export const accountState = atom<CosmosRequestAccountResponse | null>({
  key: "#accountState",
  default: null,
});

export const walletState = atom<CosmosWallet | null>({
  key: "#walletState",
  default: null,
});
