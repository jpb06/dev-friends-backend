import fs from "fs-extra";

import Database from "@backtypes/database.interface";
import { Dev } from "@owntypes/core/dev.interface";
import { Squad } from "@owntypes/core/squad.interface";

import { getDbPath } from "./db.path";

export const getSquads = async (): Promise<Array<Squad>> => {
  const db = await fs.readJson(getDbPath());
  const squads = (<Database>db).squads as Array<Squad>;

  return squads;
};

export const getDevs = async (): Promise<Array<Dev>> => {
  const db = await fs.readJson(getDbPath());
  const devs = (<Database>db).devs as Array<Dev>;

  return devs;
};
