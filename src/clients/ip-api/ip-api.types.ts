export enum Status {
  SUCCESS = "success",
  FAIL = "fail",
}

export enum CustomFailMessage {
  NO_IP = "the request has no Ip",
}

interface IpSuccess {
  status: Status.SUCCESS;
  lat: number;
  lon: number;
  country: string;
  regionName: string;
  city: string;
}

interface IpFail {
  status: Status.FAIL;
  message: string;
}

export type IpInfo = IpSuccess | IpFail;
