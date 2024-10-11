import {
  type IpApiClient,
  ipApiClient,
} from "../clients/ip-api/ip-api.client.ts";
import { Request } from "npm:@types/express";
import { config, ENVIRONMENT } from "../config.ts";
import { addLogMetadata } from "../logger.ts";

export class LocationService {
  static ipApiClient: IpApiClient = ipApiClient;

  async getLocation(req: Request) {
    let ip: string | undefined;
    if (config.environment === ENVIRONMENT.TEST) {
      ip = "181.91.200.72";
    } else {
      ip = req.socket.remoteAddress;
    }
    const location = await LocationService.ipApiClient.getIpInfo(ip);
    addLogMetadata(req, { location });
    return location;
  }
}

export const locationService: LocationService = new LocationService();
