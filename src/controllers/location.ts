import { NextFunction, Request, Response } from "npm:@types/express";
import { Status } from "../clients/ip-api/ip-api.types.ts";
import { unknownLocation } from "../errors/location.ts";
import { type LocationService, locationService } from "../services/location.ts";

export class LocationController {
  static locationService: LocationService = locationService;

  async getLocation(
    req: Request,
    res: Response,
    _: NextFunction,
  ): Promise<void> {
    const location = await LocationController.locationService.getLocation(
      req,
    );
    if (location.status === Status.FAIL) {
      throw unknownLocation(location);
    }
    res.send({ location });
  }
}

export const locationController: LocationController = new LocationController();
