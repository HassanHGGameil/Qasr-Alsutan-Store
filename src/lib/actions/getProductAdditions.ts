import qs from "query-string";

import { STORE } from "../constains/constains";
import { IProductAddions } from "@/types/product";

const URL = `${STORE}/api/home/products/productAddtions`;

interface Query {
  id: string;
}

const getProductAdditions = async (query: Query): Promise<IProductAddions[]> => {
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      id: query.id,
    },
  });

  const res = await fetch(`${url}`, {
    cache: "no-store",
  });

  return res.json();
};

export default getProductAdditions;
