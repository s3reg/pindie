import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardList/CardsList";

//no usages new*
export default function TDS() {
    const TDSGames = getGamesByCategory ("TDS");

    return (
        <main className={"main-inner"}>
            <CardsList id="TDS" title="Шутеры" data={TDSGames} />
        </main>
    );
}