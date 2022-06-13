import { useModals } from "../../hooks/useModals";
import { useRoom } from "../../hooks/useRoom";
import { Modal } from "../BaseModal";

export function VotingResult() {
  const { setShowModal } = useModals()
  const { lastVotedTask, handleCloseResultForMember } = useRoom()

  const handleCloseResult = () => {
    handleCloseResultForMember()
    setShowModal(false)
  }

  return (
    <Modal id="voting-result" className="flex justify-center items-start pt-10 mobile:px-2 mobile:py-5">
      <div className="px-5 pt-5 pb-3 flex flex-col gap-4 bg-white rounded-lg mobile:p-5">
        <span>Resultado da Votação</span>
        <div className="px-5 py-2 flex flex-col bg-gray-100 rounded-lg mobile:p-5">
          <span>Tarefa</span>
          <span>Média</span>
          <span>N° Votos</span>
        </div>
        <div className="w-full flex items-center justify-end">
          <button onClick={handleCloseResult} className="btn btn-primary">Fechar</button>
        </div>
      </div>
    </Modal>
  );
}