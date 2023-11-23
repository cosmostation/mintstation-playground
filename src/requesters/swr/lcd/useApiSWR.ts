import useSWR from "swr";
import { ISwr } from "../../../types/swr";
import { ApiRequester } from "@/requesters/requester/ApiRequester";

export const useApiSWR = (url: string | null): ISwr<any> => {
  const requester = new ApiRequester();

  const fetcher = (fetchUrl: string): Promise<any> =>
    requester.fetcher(requester.host + fetchUrl, "GET");

  const { data, error } = useSWR(url, fetcher);

  return {
    data: data,
    error,
  };
};
