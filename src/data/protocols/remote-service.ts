export type RemoteRequest = {
  ref: string
  method: RemoteMethod
  params?: any
}

export type RemoteMethod = 'push' | 'set' | 'remove'

export type RemoteResponse = object

export interface RemoteService {
  execute: (data: RemoteRequest) => Promise<RemoteResponse>
}