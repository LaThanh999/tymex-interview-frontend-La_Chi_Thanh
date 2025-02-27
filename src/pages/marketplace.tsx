import { MarketPlaceModule } from "@/modules/marketplace";

function MarketplacePage() {
  return <MarketPlaceModule />;
}

export default MarketplacePage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
