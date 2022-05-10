import { RoomModel } from "../models"
import faker from '@faker-js/faker'

export const mockRoomModel = (): RoomModel => ({
  id: faker.random.alphaNumeric(),
  name: faker.fake.name
})