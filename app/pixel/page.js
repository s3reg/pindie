import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardList/CardsList";

//no usages new*
export default function Pixel() {
    const pixelGames = getGamesByCategory ("pixel");

    return (
        <main className={"main-inner"}>
            <CardsList id="pixel" title="Пиксельный игры" data={pixelGames} />
        </main>
    )
}