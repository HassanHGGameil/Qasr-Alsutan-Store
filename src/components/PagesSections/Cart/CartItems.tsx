"use client";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "./useCart";
import { CartItem } from "@/redux/features/cart/cartSlice";

export default function CartItems() {
  const { cartItems, removeFromCart, updateCartQuantity } = useCart();

  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRemove = async (id: string) => {
    setIsRemoving(id);
    await new Promise((resolve) => setTimeout(resolve, 300));
    removeFromCart(id);
    setIsRemoving(null);
  };

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    setIsUpdating(id);
    await new Promise((resolve) => setTimeout(resolve, 200));
    updateCartQuantity(id, Math.max(1, quantity));
    setIsUpdating(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center pb-2">
        <h2 className="text-xl font-semibold">Your Items</h2>
        <Badge variant="outline">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </Badge>
      </CardHeader>

      <CardContent className="p-0">
        <AnimatePresence>
          {cartItems.map((item: CartItem) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ type: "spring", stiffness: 500 }}
              className="flex items-start gap-4 p-4 border-b last:border-b-0"
            >
              {/* Product Image */}
              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.images?.[0]?.url || "/placeholder-product.jpg"}
                  alt={item.titleEn}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <h3 className="font-medium line-clamp-2">{item.titleEn}</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                    disabled={isRemoving === item.id}
                    className="h-8 w-8"
                  >
                    {isRemoving === item.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <X className="h-3 w-3" />
                    )}
                  </Button>
                </div>

                <p className="text-sm font-semibold text-red-800 mt-1">
                  ${item.price.toFixed(2)}
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1 || isUpdating === item.id}
                    className="h-7 w-7 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>

                  <div className="relative">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdateQuantity(
                          item.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-12 h-7 text-center text-sm"
                      disabled={isUpdating === item.id}
                    />
                    {isUpdating === item.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                        <Loader2 className="h-3 w-3 animate-spin" />
                      </div>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    disabled={isUpdating === item.id}
                    className="h-7 w-7 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Line Total */}
              <div className="font-medium text-red-800 text-sm">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
