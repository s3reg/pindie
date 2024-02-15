import { Banner } from './components/Banner/Banner' 
import { Promo } from './components/Promo/Promo'
import { PopularCardsList } from './components/CardList/PopularCardsList'
import { NewCardList } from './components/CardList/NewCardList'

export default function Home() {
  return (
    <main>
      <Banner/>
      <PopularCardsList/>
      <NewCardList/>
      <Promo/>
    </main>
  )
}