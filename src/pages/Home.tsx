
import { useNavigate } from "react-router";
import { Page } from "../components/Page";

export function Home() {
    const navigate = useNavigate();

    navigate('/')


    return (
        <div className="h-full flex flex-col">
            <Page className="h-11/12">
                <div className="px-16 w-1/2 h-full flex-col-center">
                    <div className="h-5/10 flex-col-center gap-2">
                        <h1 className="font-bold mt-24">Planning Poker para desenvolvimento agil de sua equipe.</h1>
                        <p>Divirta-se enquanto enquanto planeja suas atividade com essa incrível ferramenta.</p>
                    </div>
                    <div className="h-5/12 flex-col-center">
                        <button className="w-full btn btn-primary" ><a href={'/rooms/new'}>Inicie um novo jogo</a></button>
                    </div>
                </div>
                <div className="pr-12 w-1/2 h-full flex-center ">
                    <img src="https://miro.medium.com/max/1400/1*UzlFgnkt2jCe9LbF7-DBTg.gif" className="w-full" />
                </div>



            </Page>
            <footer className="h-1/12 flex-col-center">
                <p>Criado pelo time.</p>
                <div className="flex flex-row">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="23px" height="20px" />
                    <a href="https://github.com/Heberty271">Heberty Silva</a>
               
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" width="23px" height="20px" />
                    <a href="https://github.com/eliezer-alves">Eliezer Alves</a>
                </div>

            </footer>
        </div>
    )
}