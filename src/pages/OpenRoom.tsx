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
        <>
            <nav>
                <div className="logo">
                    <img></img>
                    <h2>Entrar em uma Sala</h2>
                </div>
                <div></div>
            </nav>
            <main className="flex-center" style={{height:"70%"}}>
                <div style={{width:"60%",height:"100%"}} className="flex-center">
                        <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px"></img>
                </div>
                <div id="form"style={{width:"40%",height:"100%"}} className="flex-center">
                    <div className="flex-down">
                        <form onSubmit={(e) => handleEnterRoom(e)}>
                            <div className="title-form">
                                <h2>Abrir Sala Existente</h2>
                            </div>
                            <label htmlFor="key">Insira um nome de sala existente</label>
                            <br />
                            <input onChange={(e) => {setKey(e.target.value); }} type="text" id="key" value={key} placeholder="Digite a chave da sala" />
                            <br />
                            <div className="buttons-form">
                                <button type="submit" className="btn-primary">Abrir Sala</button>
                                <br/>
                                <a href={'/rooms/new'}>Criar nova sala</a>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </main>

        </>
    )
}