import { getGamesByCategory } from "../data/data-utils";
import { CardsList } from "../components/CardList/CardsList";

//no usages new*
export default function Shooter() {
    const shooterGames = getGamesByCategory ("shooter");

    return (
        <main className={"main-inner"}>
            <CardsList id="shooter" title="Шутеры" data={shooterGames} />
        </main>
    );
}