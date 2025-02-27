import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  const { method, query } = req;
  const {
    offset = "0",
    limit = "10",
    tier,
    theme,
    keyword,
    primarySortField = "created",
    primarySortOrder = "desc",
    secondarySortField = "price",
    secondarySortOrder = "asc",
    minPrice = 0,
    maxPrice = 1000,
  } = query;

  const filePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "mock",
    "products.json"
  );

  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);

  const repeatedData = Array.from({ length: 5 }).flatMap(() => data);

  switch (method) {
    case "GET":
      try {
        const offsetNum = Math.max(parseInt(offset as string, 10), 0);
        const limitNum = Math.max(parseInt(limit as string, 10), 1);

        let filteredData = repeatedData;

        if (tier) {
          filteredData = filteredData.filter((item) => item.tier === tier);
        }

        if (theme) {
          filteredData = filteredData.filter((item) => item.theme === theme);
        }

        if (keyword) {
          const lowerCaseKeyword = (keyword as string).toLowerCase();
          filteredData = filteredData.filter(
            (item) =>
              item.nameItem.toLowerCase().includes(lowerCaseKeyword) ||
              item.nameCreator.toLowerCase().includes(lowerCaseKeyword)
          );
        }

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

        filteredData.sort((a, b) => {
          let primaryComparison = 0;
          if (primarySortField === "price") {
            primaryComparison =
              primarySortOrder === "asc"
                ? a.price - b.price
                : b.price - a.price;
          } else if (primarySortField === "created") {
            const dateA = new Date(a.created).getTime();
            const dateB = new Date(b.created).getTime();
            primaryComparison =
              primarySortOrder === "asc" ? dateA - dateB : dateB - dateA;
          }

          if (primaryComparison !== 0) return primaryComparison;

          if (secondarySortField === "price") {
            return secondarySortOrder === "asc"
              ? a.price - b.price
              : b.price - a.price;
          } else if (secondarySortField === "created") {
            const dateA = new Date(a.created).getTime();
            const dateB = new Date(b.created).getTime();
            return secondarySortOrder === "asc" ? dateA - dateB : dateB - dateA;
          }

          return 0;
        });

        const paginatedData = filteredData.slice(
          offsetNum,
          offsetNum + limitNum
        );

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
