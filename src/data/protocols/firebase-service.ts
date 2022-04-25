export type FirebaseRequest = {
  ref: string
  method: FirebaseMethod
  params?: any
}

export type FirebaseMethod = 'push' | 'set' | 'remove'

export type FirebaseResponse<ExpectedData = any> = {
  data: ExpectedData
}

export interface FirebaseService<ExpectedData = any> {
  execute: (data: FirebaseRequest) => Promise<FirebaseResponse<ExpectedData>>
}