import { Page } from "../components/Page";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router";
import { useRoom } from "../hooks/useRoom";

type OpenRoom = {
    name: string;
}

export function OpenRoom() {
    const navigate = useNavigate();
    const [key, setKey] = useState('');


    const handleEnterRoom = async (e: FormEvent) => {
        e.preventDefault()
        navigate(`/rooms/${key}`)
    }

    return (
        <Page>
            <div className="w-3/5 h-full flex-center">
                <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px" />
            </div>
            <div id="form" className="w-2/5 h-full flex-center">
                <div className="flex flex-col gap-6">
                    <div className="flex-col-center gap-2">
                        <h2>Abrir Sala Existente</h2>
                        <span>Insira um nome de sala existente</span>
                    </div>
                    <form onSubmit={(e) => handleEnterRoom(e)} className="flex-col-center">
                        <input onChange={(e) => { setKey(e.target.value); }} type="text" id="key" value={key} placeholder="Digite a chave da sala" required className="w-full" />
                        <button type="submit" className="w-full btn btn-primary">Abrir Sala</button>
                        <div className="separator">ou</div>
                        <a href={'/rooms/new'} className="link-span">Criar nova sala</a>
                    </form>
                </div>
            </div>
        </Page>
    )
}