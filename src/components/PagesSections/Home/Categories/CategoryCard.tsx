"use client";
import { CategoryDto } from "@/types/categoroies";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  categoryItem: CategoryDto;
  onClick?: () => void;
  isActive?: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  categoryItem,
  onClick,
  isActive = false,
}) => {
  const { id, nameEn, nameAr, imageUrl } = categoryItem;
  const locale = useLocale();
  const name = locale === "en" ? nameEn : nameAr;

  return (
    <div
      key={id}
      className={`flex flex-col items-center bg-yellow-100 shadow-md mx-2 my-2 p-2 rounded-lg cursor-pointer transition-all duration-300 ease-in-out 
        ${
          isActive
            ? "scale-105 opacity-100"
            : "opacity-90 hover:scale-105 hover:opacity-100"
        }
        group/category`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={`Select ${name} category`}
    >
      <div
        className={`relative h-16 w-16 lg:h-24 lg:w-24 rounded-full overflow-hidden shadow-lg mb-3 transition-all duration-300
          ${
            isActive
              ? "ring-4 ring-primary-500"
              : "ring-2 ring-gray-100 hover:ring-primary-300"
          }`}
      >
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover/category:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
          loading="lazy" // Better performance
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover/category:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="text-center">
        <h3
          className={`text-[12px] font-semibold transition-colors duration-300 line-clamp-1
            ${
              isActive
                ? "text-primary-600"
                : "text-gray-700 group-hover/category:text-primary-500"
            }`}
        >
          {name}
        </h3>
      </div>

      {isActive && (
        <div className="mt-2 w-6 h-1 bg-primary-500 rounded-full animate-pulse" />
      )}
    </div>
  );
};

export default CategoryCard;
