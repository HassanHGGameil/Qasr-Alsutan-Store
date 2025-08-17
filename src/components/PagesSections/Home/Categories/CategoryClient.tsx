import React from "react";
import CategoryCard from "./CategoryCard";
import { Package, Sandwich, ShoppingCart } from "lucide-react";
import { useLocale } from "next-intl";
import { CategoryDto } from "@/types/categoroies";
import GridList from "@/components/LogicList/GridList/GridList";
import SectionTitle from "@/components/common/SeactionHeader/SectionTitle";

interface CategoryClientProps {
  categories: CategoryDto[];
}

const CategoryClinet = ({ categories }: CategoryClientProps) => {
  const categoryList = (item: CategoryDto) => (
    <CategoryCard categoryItem={item} />
  );

  const locale = useLocale();

  return (
    <section className="text-center py-8">


      <SectionTitle
          titleEn="Qasr Alsutan Food Products"
          titleAr="منتجات قصر السلطان الغذائية"
          subtitleEn="Premium Quality for Your Culinary Excellence"
          subtitleAr="جودة فائقة لتميزك في عالم الطهي"
          icon={<Sandwich className="text-3xl text-primary" />}
          iconPosition="top"
          underline
          center
          gradientText
        />{" "}
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-green-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-4 py-2 rounded-full mb-4">
        <Package className="h-5 w-5 mx-2 text-green-600 dark:text-green-400" />
        <span className="text-sm font-medium text-green-600 dark:text-green-400">
          {locale === "en" ? "Categories" : "قصر السلطان"}
        </span>
        <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
      </div>

      
      <div className="flex items-center gap-10 justify-center ">
        <GridList<CategoryDto>
          records={categories}
          renderItem={categoryList}
          emptyMessage="Loading please wait"
          className="grid grid-cols-2 lg:grid-cols-4 gap-10"
        />
      </div>

    </section>
  );
};

export default CategoryClinet;
