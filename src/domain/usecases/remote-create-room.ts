import { RoomModel } from "../models";

export type NewRoomParams = {
  name: string;
}

export interface CreateRoom {
  create(params: NewRoomParams): Promise<RoomModel>;
}