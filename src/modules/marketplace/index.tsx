import { Col, Row } from "antd";
import { BannerSection } from "./banner-section";
import { Filter } from "./filter";
import { FilterMobile } from "./filter-mobile";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { TagCategories } from "./tag-categories";
import styles from "./style.module.scss";
import { ProductList } from "./product-list";
import { ProductsProvider } from "./context";

export const MarketPlaceModule = () => {
  const { isCollapsed } = useBreakpoint();

  return (
    <ProductsProvider>
      <article>
        <BannerSection />
        <div className={styles["container-product-list"]}>
          {isCollapsed && <FilterMobile />}

          <Row gutter={16}>
            {!isCollapsed && (
              <Col xl={6}>
                <Filter />
              </Col>
            )}
            <Col xl={18} lg={24} className={styles["product-list-inner"]}>
              {!isCollapsed && <TagCategories />}
              <ProductList />
            </Col>
          </Row>
        </div>
      </article>
    </ProductsProvider>
  );
};
