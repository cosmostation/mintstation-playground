import { Requester } from "./Requester";

export class LcdRequester extends Requester {
  constructor() {
    super({
      host: process.env.NEXT_PUBLIC_LCD_HOST ?? "",
    });
  }
}
