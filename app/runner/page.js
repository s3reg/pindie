import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config"; 
import { CardsList } from "../components/CardsList/CardsList";


export default async function Runer() {
    const runnerGames = await getNormalizedGamesDataByCategory (endpoints.games, "runner");

    return (
        <main className={"main-inner"}>
            <CardsList id="runner" title="Раннеры" data={runnerGames} />
        </main>
    )
}