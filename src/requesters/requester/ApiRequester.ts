import { Requester } from "./Requester";

export class ApiRequester extends Requester {
  constructor() {
    super({
      host: process.env.NEXT_PUBLIC_API_HOST ?? "",
    });
  }
}
