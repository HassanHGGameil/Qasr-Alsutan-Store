import CategoryClinet from "@/components/PagesSections/Home/Categories/CategoryClient";
import HeroCard from "@/components/PagesSections/Home/Hero/HeroCard";
import NewSection from "@/components/PagesSections/Home/NewSection/NewSection";
import ProductClient from "@/components/PagesSections/Home/Products/Product/ProductClient";
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

    const products = await getProducts({});


  console.log("CATEGORIES", categories);

  return (
    <main>
      <HeroCard />
            <ProductSlideClient products={products}  />

      <CategoryClinet categories={categories} />
      <ProductClient />
      <ProductSlideClient products={products}  />
      <NewSection />
    </main>
  );
}
