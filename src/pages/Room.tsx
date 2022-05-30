import { TaskSideBar } from "../components/TaskSideBar"
import { Page } from "../components/Page"
import { Table } from "../components/Table"
import { Deck } from "../components/Deck"
import { VotingResult } from "../components/VotingResult"
import { Spinner } from "../components/Spinner"
import { UserRoom } from "../components/UserRoom"
import { useRoom } from "../hooks/useRoom"

import cx from 'classnames';

export function Room() {
  // const { setShowModal } = useModals()
  const { loadRoom, name, currentUserRoom } = useRoom()
  const taskToVote = undefined

  console.log(currentUserRoom)
  if (loadRoom) {
    return (
      <Spinner />
    )
  }

  return (
    <>

      {name && currentUserRoom ? (
        <>
        <TaskSideBar />
        <VotingResult />
        <Page>          
          <div className="w-full h-full flex flex-col">
            <div className="w-full h-full flex flex-col items-center justify-between">
              <div className="w-full flex-center gap-8">
                <h2>Usuários que participantes da sala</h2>
              </div>
              <Table>
                <div className="w-full flex-center mb-5">
                    <span className="text-center">Nenhuma tarefa sendo votada no momento</span>
                </div>
                <button
                  type="submit"
                  className={cx(
                    { 'btn btn-primary': taskToVote },
                    { 'btn btn-secondary border-3 text-gray-500 hover:cursor-no-drop': !taskToVote },
                  )}
                >Encerrar a rodada</button>
              </Table>
              <UserRoom key={currentUserRoom?.id} user={currentUserRoom} />
              <Deck />
            </div>
          </div>
        </Page>
        </>
      )
        : (
          <div className="w-full h-full px-10 flex-center">
            <h2>404 - Sala não encontrada 🤔</h2>
          </div>
        )
      }
    </>
  )
}