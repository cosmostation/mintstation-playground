import { LcdRequester } from "../../requester/LcdRequester";
import useSWR from "swr";
import { ISwr } from "../../../types/swr";

export const useLcdSWR = (url: string | null): ISwr<any> => {
  const requester = new LcdRequester();

  const fetcher = (fetchUrl: string): Promise<any> =>
    requester.fetcher(requester.host + fetchUrl, "GET");

  const { data, error } = useSWR(url, fetcher);

  return {
    data: data,
    error,
  };
};
