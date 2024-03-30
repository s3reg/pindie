import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { getNormalizedGamesDataByCategory } from "./api/api-utils";
import { endpoints } from "./api/config";
import { Preloader } from "./components/Preloader/Preloader";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";

export default async function Home() {
  const popularGames = await getNormalizedGamesDataByCategory(endpoints.games, "popular");
  const newGames = await getNormalizedGamesDataByCategory(endpoints.games, "new");
  return (
    <main className="main">
      <Banner />
      {popularGames ? <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} /> : <Preloader />}
      {newGames ? <CardsListSection type="slider" id="new" title="Новинки" data={newGames} /> : <Preloader />}
      <Promo />
    </main>
  );
}

