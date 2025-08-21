import CategoryClinet from "@/components/PagesSections/Home/Categories/CategoryClient";
import HeroCard from "@/components/PagesSections/Home/Hero/HeroCard";
import NewSection from "@/components/PagesSections/Home/NewSection/NewSection";
import ProductClient from "@/components/PagesSections/Home/Products/Product/ProductClient";
import getCategories from "@/lib/actions/getCategories";

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

  console.log("CATEGORIES", categories);

  return (
    <main>
      <HeroCard />
      <CategoryClinet categories={categories} />
      <ProductClient />
      <NewSection />
    </main>
  );
}
