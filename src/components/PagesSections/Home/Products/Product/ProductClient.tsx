import GridList from "@/components/LogicList/GridList/GridList";
import ProductCard from "./ProductCard";

import getProducts from "@/lib/actions/getProducts";
import TProduct from "@/types/product";

const ProductClient = async () => {
  const products = await getProducts({});
  console.log("products", products);

  const renderProductItem = (item: TProduct) => (
    <ProductCard key={item.id} productItem={item} />
  );

  return (
    <section className=" dark:bg-slate-800 my-8 py-10 rounded-md shadow-sm">
      <div className="container">
        {/*  */}
        <GridList<TProduct>
          records={products}
          renderItem={renderProductItem}
          emptyMessage="No products available"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 lg:gap-6"
        />
      </div>
    </section>
  );
};

export default ProductClient;
