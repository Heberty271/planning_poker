import { createContext, ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from '../services/firebase'


type RoomContextProviderProps = {
  children: ReactNode
}

type RoomParams = {
  id: string
}

type RoomContextType = {
  name: string
  code: string
  createTask(title: string): void
  deleteTask(taskId: string): void
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const params = useParams<RoomParams>()
  const roomCode = params.id ?? ''

  const [name, setName] = useState('')
  const [code, setCode] = useState('')

  useEffect(() => {

    const roomRef = database.ref(`rooms/${roomCode}`)
    roomRef.on('value', room => {
      const dataRoom = room.val()

      if (dataRoom) {
        setName(dataRoom.name)
        setCode(roomCode)
      }
    })

    return () => { }
  }, [roomCode])

  const createTask = (title: string) => {
    database.ref(`rooms/${roomCode}/tasks`).push({
      title: title,
      numberOfVotes: 0,
      sumOfVotes: 0,
      average: 0,
      votes: {}
    })
  }

  const deleteTask = (taskId: string) => {
    database.ref(`rooms/${roomCode}/tasks/${taskId}`).remove()
  }

  return (
    <RoomContext.Provider value={{
      name,
      code,
      createTask,
      deleteTask
    }
    }>
      {children}
    </RoomContext.Provider>
  )
}