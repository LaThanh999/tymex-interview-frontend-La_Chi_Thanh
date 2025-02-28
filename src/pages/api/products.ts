import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { MAX_PRICE } from "@/constants/common";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const { method, body } = req;
  const {
    offset = "0",
    limit = "10",
    tier,
    theme,
    keyword,
    sortTime = "desc",
    sortPrice = "asc",
    categories,
    minPrice = 0,
    maxPrice = MAX_PRICE,
  } = body;
  
  console.log('bodybody', body);

  const filePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "mock",
    "products.json"
  );

  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);

  const repeatedData = Array.from({ length: 5 }).flatMap(() => data); // Giả lập nhiều dữ liệu

  switch (method) {
    case "POST":
      try {
        const offsetNum = Math.max(parseInt(offset as string, 10), 0);
        const limitNum = Math.max(parseInt(limit as string, 10), 1);

        let filteredData = repeatedData;

        // Filter theo tier
        if (tier) {
          filteredData = filteredData.filter(
            (item) =>
              String(item.tier).toUpperCase() === String(tier).toUpperCase()
          );
        }

        // Filter theo theme
        if (theme) {
          filteredData = filteredData.filter(
            (item) =>
              String(item.theme).toUpperCase() === String(theme).toUpperCase()
          );
        }

        // Filter theo keyword (search theo tên item hoặc tên creator)
        if (keyword) {
          const lowerCaseKeyword = (keyword as string).toLowerCase();
          filteredData = filteredData.filter(
            (item) =>
              item.nameItem.toLowerCase().includes(lowerCaseKeyword) ||
              item.nameCreator.toLowerCase().includes(lowerCaseKeyword)
          );
        }

        // Filter theo categories (mảng categories)
        console.log("categories", categories);
        if (!!categories && categories?.length > 0 && categories[0] !== "") {
          filteredData = filteredData.filter((item) =>
            categories.includes(item.category)
          );
        }

        // Filter theo minPrice và maxPrice
        if (minPrice) {
          const minPriceNum = parseFloat(minPrice as string);
          filteredData = filteredData.filter(
            (item) => item.price >= minPriceNum
          );
        }

        if (maxPrice) {
          const maxPriceNum = parseFloat(maxPrice as string);
          filteredData = filteredData.filter(
            (item) => item.price <= maxPriceNum
          );
        }

        // Sắp xếp theo thời gian và giá
        filteredData.sort((a, b) => {
          let comparison = 0;

          // Sắp xếp theo thời gian
          const dateA = new Date(a.created).getTime();
          const dateB = new Date(b.created).getTime();

          if (sortTime === "asc") {
            comparison = dateA - dateB;
          } else if (sortTime === "desc") {
            comparison = dateB - dateA;
          }

          const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);

            if (sortPrice === "asc") {
              comparison = priceA - priceB;
            } else if (sortPrice === "desc") {
              comparison = priceB - priceA;
            }

          return comparison;
        });

        // Paginate data
        const paginatedData = filteredData.slice(
          offsetNum,
          offsetNum + limitNum
        );

        // Return result
        res.status(200).json({
          data: paginatedData,
          nextOffset: offsetNum + limitNum,
          hasMore: offsetNum + limitNum < filteredData.length,
        });
      } catch (error) {
        res.status(500).json({
          message: "Error response",
          error: error instanceof Error ? error.message : JSON.stringify(error),
        });
      }
      break;

    default:
      res.status(405).end(`Method ${method || ""} Not Allowed`);
      break;
  }
}
