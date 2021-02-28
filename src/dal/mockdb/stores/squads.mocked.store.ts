import { ObjectId } from "bson";

import { Squad } from "@owntypes/core/squad.interface";
import { RouteLogsService } from "@services/route.logs.service";

import { getSquads } from "../logic";
import { log } from "../logic/logging";

export const getAll = async (context: ObjectId): Promise<Array<Squad>> => {
  const squads = await getSquads();

  RouteLogsService.add(context, log("squads", "Getting", squads.length));

  return squads;
};
