import { RemoteMethod, RemoteResponse, RemoteService } from "../protocols/remote-service";
import { RemoteRequest } from "@/data/protocols"

export class RemoteServiceSpy implements RemoteService{
  ref?: string
  method?: RemoteMethod
  params?: []
  response: RemoteResponse = {}

  async execute(params: RemoteRequest): Promise<RemoteResponse> {
    return Promise.resolve(this.response)
  }
}