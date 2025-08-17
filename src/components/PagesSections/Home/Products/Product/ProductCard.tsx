"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useState } from "react";
import AddToCart from "../AddToCard/AddToCard";
import type TProduct from "@/types/product";
import DialogPopUp from "@/components/common/Dialog-PopUp/PopUp";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface ProductCardProps {
  productItem: TProduct;
}

const ProductCard = ({ productItem }: ProductCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const locale = useLocale();

  const { images, titleEn, titleAr, subtitleEn, subtitleAr, price, id } =
    productItem;

  const title = locale === "en" ? titleEn : titleAr;
  const subtitle = locale === "en" ? subtitleEn : subtitleAr;
  const mainImage = images?.[0]?.url || "/placeholder-product.jpg";

  return (
    <Card
      className="w-full max-w-sm overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
      aria-labelledby={`food-title-${id}`}
    >
      <Link href={`/products/${id}`}>
        <DialogPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />

        {/* Food Image with Badge */}
        <div className="relative aspect-[4/3]">
          <Image
            src={mainImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            placeholder="blur"
            blurDataURL="/placeholder-food.jpg"
          />
        </div>

        <CardHeader className="p-5 space-y-2">
          <div className="flex justify-between items-start">
            <h3
              id={`food-title-${id}`}
              className="text-xl font-bold text-gray-900 line-clamp-1"
            >
              {title}
            </h3>
            <div
              className="flex items-center bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100"
              aria-label="Food rating"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="ml-1 text-sm font-medium text-amber-900">
                4.8
              </span>
            </div>
          </div>

          <p className="text-gray-600 line-clamp-2 text-sm">{subtitle}</p>
        </CardHeader>

        <CardContent className="px-5 pb-3">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="px-5 pb-5 pt-0">
        <div className="w-full flex items-center gap-3">
          <AddToCart product={productItem} />
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-amber-300 hover:bg-amber-50 h-12 w-12"
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5 text-amber-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
