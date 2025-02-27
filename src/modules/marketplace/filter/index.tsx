import { ConfigProvider, Form, Input, Select, Slider } from "antd";
import styles from "./style.module.scss";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import { ProductTheme, ProductTier, SortType } from "@/enums/filter";
import { Button } from "@/components/Button";
import { formatPrice } from "@/helpers/common";
import themeFilter from "@/theme/themeFilterConfig";

export const Filter = () => {
  return (
    <ConfigProvider theme={themeFilter}>
      <Form className={styles["container-filter"]} labelCol={{ span: 24 }}>
        <Form.Item>
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item label="Price">
          <Slider
            range
            max={200}
            min={0.01}
            marks={{
              0.01: formatPrice(0.01),
              200: formatPrice(200),
            }}
          />
        </Form.Item>
        <Form.Item label="Tier">
          <Select
            options={[ProductTier.Basic, ProductTier.Premium].map((tier) => ({
              label: tier,
              value: tier,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Theme">
          <Select
            options={[ProductTheme.Dark, ProductTheme.Light].map((theme) => ({
              label: theme,
              value: theme,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Time">
          <Select
            options={[
              { label: "Latest", value: SortType.Descending },
              { label: "Earliest", value: SortType.Ascending },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item label="Price">
          <Select
            options={[
              { label: "Low to high", value: SortType.Ascending },
              { label: "High to low", value: SortType.Descending },
            ]}
            allowClear
          />
        </Form.Item>
        <div className="action-buttons">
          <Button type="text" icon={<CloseCircleFilled />} onClick={() => {}}>
            Reset filter
          </Button>
          <Button type="primary" onClick={() => {}}>
            Search
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};
