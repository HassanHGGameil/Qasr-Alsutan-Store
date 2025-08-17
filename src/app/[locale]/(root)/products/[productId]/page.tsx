import React from "react";
import getSingleProduct from "@/lib/actions/getSingleProduct";
import ProductDetailsCard from "@/components/PagesSections/Home/Products/Product/ProductDetails";

type PageProps = {
  params: Promise<{ productId: string; locale?: string }>;
};

export default async function SingleProductPage({ params }: PageProps) {
  const {productId} = await params;

 


  const product = await getSingleProduct(productId);



  return (
    <main>
      <ProductDetailsCard productDetails={product} />
    </main>
  );
}





