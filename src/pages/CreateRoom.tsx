
export function CreateRoom() {
    return (
        <>
            <nav>
                <img></img>
                <b>Logo</b>
            </nav>
            <br />
            <main className="flex-center" style={{height:"100%"}}>
                <div style={{width:"60%",height:"100%"}} className="flex-center">
                        <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="600px"></img>
                </div>
                <div style={{width:"40%",height:"100%"}} className="flex-center">
                    <div className="flex-down">
                        <form action="">
                            <div className="title-form">
                                <h2>Criar Nova Sala</h2>
                            </div>
                            <label htmlFor="">Insira um nome para a Sala</label>
                            <br />
                            <input type="text" placeholder="Digite o nome da sala" />
                            <br />
                            <label htmlFor="">Insira um apelido</label>
                            <br />
                            <input type="text" placeholder="Digite seu apelido" />
                            <br />
                            <button className="btn-primary">Criar Sala</button>
                            <br/>
                        </form>
                        <a href="">Acessar sala existente</a>
                    </div>
                </div>
            </main>

        </>
    )
}