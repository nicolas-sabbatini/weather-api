import axios from "npm:axios";
import { CustomFailMessage, IpInfo, Status } from "./ip-api.types.ts";

const BASE_URL = "http://ip-api.com/json/";
const QUERY = "?fields=status,message,country,regionName,city,lat,lon";

export class IpApiClient {
  static ipApiAxios = axios.create({
    baseURL: BASE_URL,
  });

  async getIpInfo(ip: string | undefined): Promise<IpInfo> {
    try {
      const { data } = await IpApiClient.ipApiAxios.get(`${ip}${QUERY}}`);
      return data;
    } catch (_) {
      return {
        status: Status.FAIL,
        message: CustomFailMessage.NO_IP,
      };
    }
  }
}

export const ipApiClient: IpApiClient = new IpApiClient();
