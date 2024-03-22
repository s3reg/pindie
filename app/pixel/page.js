import { getNormalizedGamesDataByCategory } from "../api/api-utils";
import { endpoints } from "../api/config"; 
import { CardsList } from "../components/CardsList/CardsList";


export default async function Pixel() {
    const pixelGames = await getNormalizedGamesDataByCategory (endpoints.games, "pixel");

    return (
        <main className={"main-inner"}>
            <CardsList id="pixel" title="Пиксельные" data={pixelGames} />
        </main>
    )
}