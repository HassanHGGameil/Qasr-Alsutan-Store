"use client";
import Image from "next/image";
import React, { useState } from "react";
import {  ChefHat, Clock, Star } from "lucide-react";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import DialogPopUp from "@/components/common/Dialog-PopUp/PopUp";

import heroImage from "../../../../../public/images/open2.png";
import heroImage1 from "../../../../../public/products/one/02.png";

const HeroCard = () => {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const handleOrderClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900">
      <DialogPopUp isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="container relative z-10 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 text-center lg:text-start"
          >
            <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-lg text-red-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
                        >
                          {locale === "en"
                            ? "Qasr Al Sultan – Royal Grills Experience"
                            : "قصر السلطان – تجربة مشويات ملكية"}
                        </motion.p>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl  font-bold text-gray-900 dark:text-white mb-4"
            >
              {locale === "en"
                ? "Qasr Al Sultan – Royal Grills Experience"
                : "قصر السلطان – تجربة مشويات ملكية"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              {locale === "en"
                ? "Qasr Al Sultan – Royal Grills Experience"
                : "قصر السلطان – تجربة مشويات ملكية"}
            </motion.p>

            <div className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start mb-8">
              {/* Delivery Time Badge */}
              <div className="flex items-center bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600">
                <Clock className="w-5 h-5 text-red-600 dark:text-red-400 mx-2" />
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  {locale === "en" ? "30 min delivery" : "توصيل خلال ٣٠ دقيقة"}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600">
                <Star className="w-5 h-5 text-amber-500 dark:text-amber-400 mx-2" />
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  {locale === "en"
                    ? "4.9 (2k+ reviews)"
                    : "٤.٩ (أكثر من ٢ ألف تقييم)"}
                </span>
              </div>

              {/* Restaurants Badge */}
              <div className="flex items-center bg-white dark:bg-gray-700 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 dark:border-gray-600">
                <ChefHat className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-2" />
                <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
                  {locale === "en" ? "100+ restaurants" : "أكثر من ١٠٠ مطعم"}
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={handleOrderClick}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full transition-colors shadow-lg hover:shadow-orange-200 dark:hover:shadow-orange-900"
              >
                <span>{locale === "en" ? "Order Now" : "اطلب الآن"}</span>
                {/* <ArrowRight className="w-5 h-5" /> */}
              </button>
              <button className="px-8 py-3 border-2 border-red-500 text-red-800 dark:text-yellow-400 font-semibold rounded-full transition-colors hover:bg-orange-50 dark:hover:bg-gray-700">
                {locale === "en" ? "Make A Booking" : "احجز في المطعم الان"}
              </button>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative order-1 lg:order-2 w-full h-80 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden "
          >
            <Image
              src={heroImage}
              alt={locale === "en" ? "Food delivery" : "توصيل طعام"}
              fill
              priority
              placeholder="blur"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Food badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center"
            >
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src={heroImage1}
                  alt="Pizza"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-md mx-2 text-gray-800 dark:text-white">
                {locale === "en" ? "Special Offer" : "عرض خاص"}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 right-6 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md flex items-center"
            >
              <div className="relative w-8 h-8 mr-2">
                <Image
                  src={heroImage1}
                  alt="Pizza"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-md mx-2 text-gray-800 dark:text-white">
                {locale === "en" ? "Special Offer" : "عرض خاص"}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-red-200 dark:bg-orange-900 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-red-200 dark:bg-amber-800 opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
};

export default HeroCard;
