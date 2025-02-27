import { Col, Row } from "antd";
import { BannerSection } from "./banner-section";
import { Filter } from "./filter";
import styles from "./style.module.scss";

export const MarketPlaceModule = () => {
  return (
    <article>
      <BannerSection />
      <div className={styles["container-product-list"]}>
        <Row gutter={16}>
          <Col xl={6}>
            <Filter />
          </Col>
          <Col xl={18} lg={24}></Col>
        </Row>
      </div>
    </article>
  );
};
