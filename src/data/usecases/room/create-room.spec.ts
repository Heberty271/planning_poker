import { RemoteServiceSpy } from "@/data/test/mock-remote-service"
import { RemoteCreateRoom } from "./remote-create-room"


describe('CreateRoom', () => {
  test('Valida retorno de sucesso de RemoteService', async () => {
    const remoteService = new RemoteServiceSpy()
    const refRooms = 'rooms/'
    const sut = new RemoteCreateRoom(refRooms, 'push', remoteService)
    const params = {
      name: 'sala 1'
    }
    const room = await sut.create(params)

    expect(room).toEqual({})
  })
})