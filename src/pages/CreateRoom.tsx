
export function CreateRoom() {
    return (
        <>
            <nav>
                <div className="logo">
                    <img></img>
                    <h2>Criar Sala</h2>
                </div>
                <div></div>
            </nav>
            <main className="flex-center" style={{height:"70%"}}>
                <div style={{width:"60%",height:"100%"}} className="flex-center">
                        <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" width="700px"></img>
                </div>
                <div id="form"style={{width:"40%",height:"100%"}} className="flex-center">
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
                            <div className="buttons-form">
                                <button className="btn-primary">Criar Sala</button>
                                <br/>
                                <a href="">Acessar sala existente</a>
                            </div>
                        </form>
                        
                    </div>
                </div>
            </main>

        </>
    )
}