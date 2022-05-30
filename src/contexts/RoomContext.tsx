import { createContext, ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from '../services/firebase'

type UserRoom = {
  id: string
  name: string
  avatar: string
  voted?: boolean
  showResult?: boolean
}

type RoomContextProviderProps = {
  children: ReactNode
}

type RoomParams = {
  id: string
}

type NewRoomParams = {
  name: string,
  authorNick: string

}

type Vote = {
  value: number
}

type FirebaseTaskVotes = Record<string, Vote>

type Task = {
  id: string
  title: string
  votes: any
  numberOfVotes: number | undefined
  sumOfVotes: number | undefined
  average: number | undefined
}

type FirebaseTask = {
  id: string
  title: string
  votes: FirebaseTaskVotes | undefined
  numberOfVotes: number | undefined
  sumOfVotes: number | undefined
  average: number | undefined
}

type FirebaseTasks = Record<string, FirebaseTask>


type RoomContextType = {
  name: string
  code?: string
  roomCode: string
  tasks: Task[]
  taskToVote: Task | undefined
  lastVotedTask: Task | undefined
  createRoom(params: NewRoomParams): any
  createTask(title: string): void
  deleteTask(taskId: string): void
  handleCloseResultForUser(): void
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const params = useParams<RoomParams>()
  const roomCode = params.id ?? ''

  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [currentUserRoom, setCurrentUserRoom] = useState<UserRoom>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskToVote, setTaskToVote] = useState<Task | undefined>()
  const [lastVotedTask, setLastVotedTask] = useState<Task | undefined>()

  useEffect(() => {

    const roomRef = database.ref(`rooms/${roomCode}`)
    roomRef.on('value', room => {
      const dataRoom = room.val()

      if (dataRoom) {
        setName(dataRoom.name)
        setCode(roomCode)

        const firebaseTasks: FirebaseTasks = dataRoom.tasks ?? {}
        const parsedTasks = Object.entries(firebaseTasks).map((task) => {
          return handleFirebaseTask(task)
        })

        setTasks(parsedTasks)
      }
    })


    return () => { }
  }, [roomCode])

  const createRoom = async (params: NewRoomParams) => {
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      name: params.name
    });

    await database.ref(`rooms/${firebaseRoom.key}/members`).push({
      nickname: params.authorNick
    });

    return firebaseRoom.key
  }

  function handleFirebaseTask(task: [string, FirebaseTask]): Task {
    const [key, value] = task

    return {
      id: key,
      title: value.title,
      votes: value.votes,
      numberOfVotes: value.numberOfVotes,
      sumOfVotes: value.sumOfVotes,
      average: value.average,
    }
  }

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

  const handleCloseResultForUser = () => {
    database.ref(`rooms/${roomCode}/users/${currentUserRoom?.id}`).child('showResult').set(false)
  }

  return (
    <RoomContext.Provider value={{
      name,
      code,
      roomCode,
      tasks,
      taskToVote,
      lastVotedTask,
      createRoom,
      createTask,
      deleteTask,      
      handleCloseResultForUser,
    }
    }>
      {children}
    </RoomContext.Provider>
  )
}