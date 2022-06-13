import { createContext, ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from '../services/firebase'

type UserRoom = {
  id: string
  nickname: string
  voted?: boolean
  showResult?: boolean
}

type FirebaseUsersRoom = Record<string, UserRoom>

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
  loadRoom: boolean
  name: string
  code?: string
  roomCode: string
  tasks: Task[]
  taskToVote?: Task
  lastVotedTask?: Task
  usersRoom: UserRoom[]
  currentUserRoom?: UserRoom
  createRoom: (params: NewRoomParams) => any
  createTask: (title: string) => void
  deleteTask: (taskId: string) => void
  handleTaskToVote: (task?: Task) => void
  handleVotingIntention: (value: number) => void
  handleCloseVote(): void
  handleCloseResultForUser(): void
  setMemberRoom(nickname:string, roomCode:string): Promise<string|boolean>
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const params = useParams<RoomParams>()
  const roomCode = params.id ?? ''

  const [loadRoom, setLoadRoom] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [currentUserRoom, setCurrentUserRoom] = useState<UserRoom>()
  const [usersRoom, setUsersRoom] = useState<UserRoom[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskToVote, setTaskToVote] = useState<Task | undefined>()
  const [lastVotedTask, setLastVotedTask] = useState<Task | undefined>()

  useEffect(() => {
    setLoadRoom(true)
    const idCurrentUser = window.localStorage.getItem('user-planning')
    const roomRef = database.ref(`rooms/${roomCode}`)
    roomRef.on('value', room => {
      const dataRoom = room.val()

      if (dataRoom) {
        setName(dataRoom.name)
        setCode(roomCode)
        setUsersRoom([])
        setTaskToVote(handleFirebaseTaskVote(dataRoom.taskToVote))
        setLastVotedTask(handleFirebaseTaskVote(dataRoom.lastVotedTask))

        const firebaseUsersRoom: FirebaseUsersRoom = dataRoom.members
        Object.entries(firebaseUsersRoom).map(([key, value]) => {
          value.id = key
          
          if (value.id == idCurrentUser) {
            setCurrentUserRoom(value)
          }

          setUsersRoom((usersRoom: UserRoom[]) => {
            return [
              value,
              ...usersRoom,
            ]
          })

        })

        const firebaseTasks: FirebaseTasks = dataRoom.tasks ?? {}
        const parsedTasks = Object.entries(firebaseTasks).map((task) => {
          return handleFirebaseTask(task)
        })

        setTasks(parsedTasks)
      }
      setLoadRoom(false)
    })

 
    // database.ref(`rooms/${roomCode}/members/${idCurrentUser}`).once('value').then((user) => {
    //   if (user.val()) {
    //     let currentUser = {
    //       id: idCurrentUser ?? '',
    //       nickname: user.val().nickname
    //     }
    //     setCurrentUserRoom(currentUser);
    //   } else {
    //     setCurrentUserRoom(undefined);
    //   }
    //   setLoadRoom(false)
    // })
    


    return () => { }
  }, [roomCode])

  const createRoom = async (params: NewRoomParams) => {
    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      name: params.name
    });

    if (firebaseRoom.key) {
      await setMemberRoom(params.authorNick, firebaseRoom.key)
      return firebaseRoom.key
    }

    return false
  }

  function handleFirebaseTaskVote(task: FirebaseTask | undefined): Task | undefined {
    if (!task) {
      return undefined;
    }

    var sumOfVotes = 0
    var numberOfVotes = 0
    var average = 0

    if (task.votes) {
      const firebaseTaskVotes: FirebaseTaskVotes = task.votes ?? {}
      const parsedVotes = Object.entries(firebaseTaskVotes).map(([key, value]) => {
        sumOfVotes += value.value
      })

      numberOfVotes = parsedVotes.length
      average = Math.round(sumOfVotes / numberOfVotes)
    }

    return {
      id: task.id,
      title: task.title,
      votes: task.votes,
      numberOfVotes: numberOfVotes,
      sumOfVotes: sumOfVotes,
      average: average,
    }
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

  const handleTaskToVote = (task: Task | undefined) => {
    if (!task) {
      database.ref(`rooms/${roomCode}/taskToVote`).remove()
      return
    }

    task.votes = 0

    database.ref(`rooms/${roomCode}`).child('taskToVote').set(task ?? {})

  }

  const handleMyVoterStatus = (status: boolean) => {
    if (!currentUserRoom) return

    const userRoomRef = database.ref(`rooms/${roomCode}/users/${currentUserRoom.id}`)
    userRoomRef.child('voted').set(status)
  }

  const handleVotingIntention = (value: number) => {
    if (!currentUserRoom || !taskToVote) return

    const taskVotesRef = database.ref(`rooms/${roomCode}/taskToVote/votes`)

    if (value) {
      taskVotesRef.child(currentUserRoom.id).set({
        value: value,
      })
      handleMyVoterStatus(true)
    } else {
      database.ref(`rooms/${roomCode}/taskToVote/votes/${currentUserRoom.id}`).remove()
      handleMyVoterStatus(false)
    }
  }

  const handleCloseVote = () => {
    if (!taskToVote) return
    const taskRef = database.ref(`rooms/${roomCode}/tasks/${taskToVote.id}`)
    taskRef.set(taskToVote)
    database.ref(`rooms/${roomCode}`).child('lastVotedTask').set(taskToVote)
    database.ref(`rooms/${roomCode}/taskToVote`).remove()

    usersRoom.map(user => {
      database.ref(`rooms/${roomCode}/users/${user.id}`).child('showResult').set(true)
    })
  }

  const setMemberRoom = async (nickname:string, roomCode:string): Promise<string|boolean> => {
    let room = await database.ref(`rooms/${roomCode}`).once('value')
    if (!room.exists()) return false

    let membersRef = database.ref(`rooms/${roomCode}/members`)    
    let memberRoom = membersRef.push({
      nickname
    })    
    if (!memberRoom.key) return false
    
    window.localStorage.setItem('user-planning', memberRoom.key);

    return memberRoom.key
  }

  const handleCloseResultForUser = () => {
    database.ref(`rooms/${roomCode}/users/${currentUserRoom?.id}`).child('showResult').set(false)
  }

  return (
    <RoomContext.Provider value={{
      loadRoom,
      name,
      code,
      roomCode,
      tasks,
      taskToVote,
      lastVotedTask,
      currentUserRoom,
      usersRoom,
      createRoom,
      createTask,
      deleteTask,
      handleTaskToVote,
      handleVotingIntention,
      handleCloseVote,
      handleCloseResultForUser,
      setMemberRoom,
    }
    }>
      {children}
    </RoomContext.Provider>
  )
}