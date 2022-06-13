import { createContext, ReactNode, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { database } from '../services/firebase'

type UserRoom = {
  id: string
  nickname: string
  voted?: boolean
  showResult?: boolean
}

type FirebaseMembersRoom = Record<string, UserRoom>

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
  membersRoom: UserRoom[]
  currentMemberRoom?: UserRoom
  createRoom: (params: NewRoomParams) => any
  createTask: (title: string) => void
  deleteTask: (taskId: string) => void
  handleTaskToVote: (task?: Task) => void
  handleVotingIntention: (value: number) => void
  handleCloseVote(): void
  handleCloseResultForMember(): void
  setMemberRoom(nickname: string, roomCode: string): Promise<string | boolean>
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const params = useParams<RoomParams>()
  const roomCode = params.id ?? ''

  const [loadRoom, setLoadRoom] = useState(false)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [currentMemberRoom, setCurrentMemberRoom] = useState<UserRoom>()
  const [membersRoom, setMembersRoom] = useState<UserRoom[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [taskToVote, setTaskToVote] = useState<Task | undefined>()
  const [lastVotedTask, setLastVotedTask] = useState<Task | undefined>()

  useEffect(() => {
    if (roomCode) {

      setLoadRoom(true)
      const idCurrentMember = window.localStorage.getItem('member-planning')
      const roomRef = database.ref(`rooms/${roomCode}`)
      roomRef.on('value', room => {
        const dataRoom = room.val()

        if (dataRoom) {
          setName(dataRoom.name)
          setCode(roomCode)
          setMembersRoom([])
          setTaskToVote(handleFirebaseTaskVote(dataRoom.taskToVote))
          setLastVotedTask(handleFirebaseTaskVote(dataRoom.lastVotedTask))

          const firebaseMembersRoom: FirebaseMembersRoom = dataRoom.members
          Object.entries(firebaseMembersRoom).map(([key, value]) => {
            value.id = key

            if (value.id == idCurrentMember) {
              setCurrentMemberRoom(value)
            }

            setMembersRoom((membersRoom: UserRoom[]) => {
              return [
                value,
                ...membersRoom,
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
    }

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
    if (!currentMemberRoom) return

    const userRoomRef = database.ref(`rooms/${roomCode}/members/${currentMemberRoom.id}`)
    userRoomRef.child('voted').set(status)
  }

  const handleVotingIntention = (value: number) => {
    if (!currentMemberRoom || !taskToVote) return

    const taskVotesRef = database.ref(`rooms/${roomCode}/taskToVote/votes`)

    if (value) {
      taskVotesRef.child(currentMemberRoom.id).set({
        value: value,
      })
      handleMyVoterStatus(true)
    } else {
      database.ref(`rooms/${roomCode}/taskToVote/votes/${currentMemberRoom.id}`).remove()
      handleMyVoterStatus(false)
    }
  }

  const handleCloseVote = () => {
    if (!taskToVote) return
    const taskRef = database.ref(`rooms/${roomCode}/tasks/${taskToVote.id}`)
    taskRef.set(taskToVote)
    database.ref(`rooms/${roomCode}`).child('lastVotedTask').set(taskToVote)
    database.ref(`rooms/${roomCode}/taskToVote`).remove()

    membersRoom.map(user => {
      database.ref(`rooms/${roomCode}/members/${user.id}`).child('showResult').set(true)
      database.ref(`rooms/${roomCode}/members/${user.id}`).child('voted').set(false)
    })
  }

  const setMemberRoom = async (nickname: string, roomCode: string): Promise<string | boolean> => {
    let room = await database.ref(`rooms/${roomCode}`).once('value')
    if (!room.exists()) return false

    let membersRef = database.ref(`rooms/${roomCode}/members`)
    let memberRoom = membersRef.push({
      nickname
    })
    if (!memberRoom.key) return false

    window.localStorage.setItem('member-planning', memberRoom.key);

    return memberRoom.key
  }

  const handleCloseResultForMember = () => {
    database.ref(`rooms/${roomCode}/members/${currentMemberRoom?.id}`).child('showResult').set(false)
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
      currentMemberRoom,
      membersRoom,
      createRoom,
      createTask,
      deleteTask,
      handleTaskToVote,
      handleVotingIntention,
      handleCloseVote,
      handleCloseResultForMember,
      setMemberRoom,
    }
    }>
      {children}
    </RoomContext.Provider>
  )
}