import { TaskModel } from "./task"

export type RoomModel = {
  id: string
  name: string
  tasks?: TaskModel[]
}