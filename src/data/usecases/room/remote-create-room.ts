import { NewRoomParams } from "@/domain/usecases/remote-create-room";
import { RemoteMethod, RemoteResponse, RemoteService } from "@/data/protocols";

export class RemoteCreateRoom {
  
  constructor (
    private readonly ref: string,
    private readonly method: RemoteMethod,
    private readonly RemoteService: RemoteService
  ) {}

  async create (params: NewRoomParams): Promise<RemoteResponse> {
    return this.RemoteService.execute({
      ref: '',
      method: 'push',
      params: params
    })
  }
}