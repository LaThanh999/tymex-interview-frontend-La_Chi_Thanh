import { ConfigProvider, Form, Input, Select, Slider } from "antd";
import styles from "./style.module.scss";
import { CloseCircleFilled, SearchOutlined } from "@ant-design/icons";
import {
  ProductCategory,
  ProductTheme,
  ProductTier,
  SortType,
} from "@/enums/filter";
import { Button } from "@/components/Button";
import { formatPrice } from "@/helpers/common";
import themeFilter from "@/theme/themeFilterConfig";
import { TFilterProduct } from "@/types/product";
import { useProductsContext } from "../context";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useQueryParams } from "@/hooks/useQueryParams";
import { useEffect } from "react";

const optionsCategory = Object.values(ProductCategory).map((item) => ({
  label: item === "" ? "All" : item,
  value: item,
}));

export const Filter = () => {
  const [form] = Form.useForm<TFilterProduct>();

  const { getParams, setParams } = useQueryParams();

  const params = getParams([
    "keyword",
    "priceRange",
    "tier",
    "theme",
    "sortTime",
    "sortPrice",
    "categories",
  ]);

  const { isCollapsed } = useBreakpoint();

  const { setFilter } = useProductsContext();

  const onSubmit = (value: TFilterProduct) => {
    setFilter(value);
    setParams(
      {
        ...params,
        keyword: value.keyword,
        priceRange: value.priceRange as unknown as string[],
        tier: value.tier,
        theme: value.theme,
        sortTime: value.sortTime,
        sortPrice: value.sortPrice,
        categories: value.categories,
      },
      { replace: true }
    );
  };

  useEffect(() => {
    form.setFieldsValue(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <ConfigProvider theme={themeFilter}>
      <Form
        className={styles["container-filter"]}
        form={form}
        labelCol={{ span: 24 }}
        onFinish={onSubmit}
      >
        <Form.Item name="keyword">
          <Input placeholder="Quick search" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item name="priceRange" label="Price">
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
        <Form.Item name="tier" label="Tier">
          <Select
            options={[ProductTier.Basic, ProductTier.Premium].map((tier) => ({
              label: tier,
              value: tier,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name="theme" label="Theme">
          <Select
            options={[ProductTheme.Dark, ProductTheme.Light].map((theme) => ({
              label: theme,
              value: theme,
            }))}
            allowClear
          />
        </Form.Item>
        <Form.Item name="sortTime" label="Time">
          <Select
            options={[
              { label: "Latest", value: SortType.Descending },
              { label: "Earliest", value: SortType.Ascending },
            ]}
            allowClear
          />
        </Form.Item>
        <Form.Item name="sortPrice" label="Price">
          <Select
            options={[
              { label: "Low to high", value: SortType.Ascending },
              { label: "High to low", value: SortType.Descending },
            ]}
            allowClear
          />
        </Form.Item>
        {isCollapsed && (
          <Form.Item name="categories" label="Categoris">
            <Select
              mode="multiple"
              options={optionsCategory.map(({ label, value }) => ({
                label,
                value,
              }))}
              allowClear
            />
          </Form.Item>
        )}

        <div className="action-buttons">
          <Button type="text" icon={<CloseCircleFilled />} onClick={() => {}}>
            Reset filter
          </Button>
          <Button htmlType="submit" type="primary">
            Search
          </Button>
        </div>
      </Form>
    </ConfigProvider>
  );
};
