import FilterCategoryProduct from "@/components/PagesSections/Home/FilterCategoryProduct/FilterCategoryProduct";
import HeroCard from "@/components/PagesSections/Home/Hero/HeroCard";
import NewSection from "@/components/PagesSections/Home/NewSection/NewSection";
import ProductSlideClient from "@/components/PagesSections/Home/Products/ProductSlides/ProductSlideClient";
import getCategories from "@/lib/actions/getCategories";
import getProducts from "@/lib/actions/getProducts";

type PageProps = {
  params: Promise<{ slug: string; isFeatured: string }>;
};

export default async function Home({ params }: PageProps) {
  const { slug } = await params;
  const { isFeatured } = await params;

  const categories = await getCategories({
    slug: slug,
    isFeatured: isFeatured,
  });

  const sortedCategories = categories.sort((a, b) => a.position - b.position);

  const products = await getProducts({});

    const sortedProducts = products.sort((a, b) => a.position - b.position);


  console.log("CATEGORIES", categories);

  return (
    <main className="">
      <HeroCard />
      <ProductSlideClient products={products} />

      <FilterCategoryProduct
        categories={sortedCategories.reverse()}
        products={sortedProducts}
      />
      <NewSection />
    </main>
  );
}
