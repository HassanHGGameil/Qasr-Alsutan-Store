"use client";

import { useEffect, useState } from "react";

const formater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EGP",
  minimumFractionDigits: 0, // No decimal places
  maximumFractionDigits: 0, // No decimal places
});

interface CurrencyProps {
  value: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div className="font-semibold ">{formater.format(Number(value))}</div>;
};

export default Currency;
