import { Page } from "../components/Page";
import { FormEvent, useState } from "react"
import { useNavigate, useParams } from "react-router";
import { useRoom } from "../hooks/useRoom";

type OpenRoom = {
    name: string;
}

type RoomParams = {
    sign_in_code?: string
  }

export function SignIn() {
    const params = useParams<RoomParams>()
    const roomCode = params.sign_in_code ?? ''
    const { setMemberRoom } = useRoom()
    const navigate = useNavigate();
    const [key, setKey] = useState(roomCode);
    const [nick, setNick] = useState('');


    const handleEnterRoom = async (e: FormEvent) => {
        e.preventDefault()
        let enter = await setMemberRoom(nick, key)
        if (enter) {
            return navigate(`/rooms/${key}`)
        }

        alert('Houve algum problema ao entrar na sala! Verifique o código inserido.')
        return
    }

    return (
        <Page>
            <div className="w-3/5 h-full flex-center">
                <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px" />
            </div>
            <div id="form" className="w-2/5 h-full flex-center">
                <div className="flex flex-col gap-6">
                    <div className="flex-col-center gap-2">
                        <h2>Entrar Numa Sala Existente</h2>
                        <span>Insira o código da sala existente</span>
                    </div>
                    <form onSubmit={(e) => handleEnterRoom(e)} className="flex-col-center">
                        <input
                            onChange={(e) => { setKey(e.target.value); }}
                            type="text"
                            id="key"
                            value={key}
                            placeholder="Digite a chave da sala"
                            required
                            className="w-full"
                        />
                        <input
                            onChange={(e) => { setNick(e.target.value); }}
                            type="text"
                            id="key"
                            value={nick}
                            placeholder="Digite seu Nick"
                            required
                            className="w-full"
                        />
                        <button type="submit" className="w-full btn btn-primary">Entrar</button>
                        <div className="separator">ou</div>
                        <a href={'/rooms/new'} className="link-span">Criar nova sala</a>
                    </form>
                </div>
            </div>
        </Page>
    )
}