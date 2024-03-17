import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardList/CardsList";

//no usages new*
export default function Popular() {
    const popularGames = getGamesByCategory ("popular");

    return (
        <main className={"main-inner"}>
            <CardsList id="popular" title="Популярные" data={popularGames} />
        </main>
    )
}