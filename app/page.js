import { Banner } from './components/Banner/Banner'
import { Promo } from './components/Promo/Promo'
import { PopularCardsFragment } from './components/CardList/PopularCardsFragment'
import { NewCardsFragment } from './components/CardList/NewCardsFragment'
import { CardsList } from './components/CardList/CardsList'

export default function Home() {
  const id = {
    titlePopular: "Популярное",
    titleNew: "Новинки",
  };
  return (
    <main className='main'>
      <Banner />
      <CardsList id="popular" title="Популярные">
        <PopularCardsFragment />
      </CardsList>
      <CardsList id="new" title="Новинки">
        <NewCardsFragment />
      </CardsList>
      <Promo />
    </main>
  )
}