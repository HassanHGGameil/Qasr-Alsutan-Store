import { useLocale } from "next-intl";
import { ReactNode } from "react";

interface SectionTitleProps {
  titleEn: string;
  titleAr: string;
  subtitleEn?: string;
  subtitleAr?: string;
  width?: string;
  center?: boolean;
  mb?: string;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "top";
  underline?: boolean;
  gradientText?: boolean;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  animate?: boolean;
  titleClassName?: string;
  subtitleClassName?: string;
}

const SectionTitle = ({
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  width = "570px",
  center,
  mb = "mb-14",
  className = "",
  icon,
  iconPosition = "left",
  underline = false,
  gradientText = false,
  headingLevel = "h2",
  animate = false,
  titleClassName = "",
  subtitleClassName = "",
}: SectionTitleProps) => {
  const language = useLocale();
  const isRTL = language === "ar";

  // Text content
  const title = isRTL ? titleAr : titleEn;
  const subtitle = isRTL ? subtitleAr : subtitleEn;
  
  // Layout classes
  const alignmentClass = center ? "mx-auto text-center" : isRTL ? "text-right" : "text-left";
  const flexDirection = iconPosition === "top" ? "flex-col" : "flex-row";
  const iconOrder = iconPosition === "right" ? "order-last" : "order-first";
  const iconSpacing = iconPosition === "top" ? "mb-4" : isRTL ? "ml-4" : "mr-4";

  // Text styling
  const titleSizeClass = "text-3xl sm:text-4xl md:text-[45px]";
  const underlineClass = underline ? "pb-2 border-b-2 border-primary" : "";
const gradientClass = gradientText 
  ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500   dark:bg-clip-text dark:text-transparent dark:bg-gradient-to-r dark:from-purple-500 dark:via-pink-500 dark:to-red-500" 
  : "";
    const animationClass = animate ? "animate-fade-in-up" : "";

  // Create the appropriate heading element
  const HeadingTag = headingLevel;

  return (
    <div
      className={`w-full ${alignmentClass} ${mb} ${className} ${animationClass}`}
      style={{ maxWidth: width }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className={`flex ${flexDirection} items-center ${center ? "justify-center" : ""}`}>
        {icon && (
          <div 
            className={`${iconOrder} ${iconSpacing} ${
              iconPosition === "top" ? "self-center" : ""
            } transition-transform hover:scale-110`}
          >
            {icon}
          </div>
        )}
        
        <div className={underlineClass}>
          <HeadingTag 
            className={`${titleSizeClass} font-bold !leading-tight text-black dark:text-white ${gradientClass}  ${titleClassName}`}
            data-testid="section-title"
          >
            {title}
          </HeadingTag>
          {subtitle && (
            <p 
              className={`text-base !leading-relaxed text-gray-600 dark:text-gray-300 md:text-lg mt-2 ${subtitleClassName}`}
              data-testid="section-subtitle"
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;