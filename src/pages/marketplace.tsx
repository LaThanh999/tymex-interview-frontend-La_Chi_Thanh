import withPageLoading from "@/hoc/withPageLoading";
import { MarketPlaceModule } from "@/modules/marketplace";

function MarketplacePage() {
  return <MarketPlaceModule />;
}

export default withPageLoading(MarketplacePage);

export async function getStaticProps() {
  return {
    props: {},
  };
}
