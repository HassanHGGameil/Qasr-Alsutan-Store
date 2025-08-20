"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "./useCart";
import {
  Loader2,
  MessageSquareText,
  Truck,
  Home,
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { STORE } from "@/lib/constains/constains";
import { useLocale } from "next-intl";
import { Locale, useRouter } from "@/i18n/routing";
import axios from "axios";
import { toast } from "react-hot-toast";
import axiosErrorHandler from "@/lib/axiosErrorHandler";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const translations = {
  en: {
    checkout: "Checkout",
    personalInfo: "Personal Information",
    contactInfo: "Contact Information",
    shippingAddress: "Shipping Address",
    paymentMethod: "Payment Method",
    orderSummary: "Order Summary",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    address: "Address",
    subtotal: "Subtotal",
    shipping: "Shipping",
    total: "Total",
    placeOrder: "Place Order",
    clearCart: "Clear Cart",
    processing: "Processing...",
    whatsapp: "WhatsApp",
    cash_on_delivery: "CashOnDelivery",
    codDescription: "You'll pay in cash when your order is delivered",
    free: "Free",
    nameError: "Name must be at least 2 characters",
    phoneError: "Invalid phone number",
    addressError: "Address must be at least 5 characters",
    paymentError: "Please select a payment method",
    orderSubmitted: "Order submitted successfully",
    orderError: "Failed to create order",
    paymentUrlError: "Payment URL not received",
    checkoutFailed: "Checkout failed",
    receiveFromBranch: "Receive from branch",
    selectBranch: "Select branch",
    branch: "Branch",
    delivery: "Delivery",
    branchError: "Please select a branch",
  },
  ar: {
    checkout: "الدفع",
    personalInfo: "المعلومات الشخصية",
    contactInfo: "معلومات الاتصال",
    shippingAddress: "عنوان الشحن",
    paymentMethod: "طريقة الدفع",
    orderSummary: "ملخص الطلب",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    address: "العنوان",
    subtotal: "المجموع الجزئي",
    shipping: "الشحن",
    total: "المجموع الكلي",
    placeOrder: "تأكيد الطلب",
    clearCart: "تفريغ السلة",
    processing: "جاري المعالجة...",
    whatsapp: "واتساب",
    cash_on_delivery: "الدفع عند الاستلام",
    codDescription: "سوف تدفع نقداً عند استلام طلبك",
    free: "مجاني",
    nameError: "يجب أن يكون الاسم مكون من حرفين على الأقل",
    phoneError: "رقم هاتف غير صالح",
    addressError: "يجب أن يكون العنوان مكون من 5 أحرف على الأقل",
    paymentError: "الرجاء اختيار طريقة الدفع",
    orderSubmitted: "تم تقديم الطلب بنجاح",
    orderError: "فشل إنشاء الطلب",
    paymentUrlError: "لم يتم استلام رابط الدفع",
    checkoutFailed: "فشل عملية الدفع",
    receiveFromBranch: "استلام من الفرع",
    selectBranch: "اختر الفرع",
    branch: "الفرع",
    delivery: "توصيل",
    branchError: "الرجاء اختيار فرع",
  },
};

const paymentMethods = [
  "CASH_ON_DELIVERY",
  "WHATSAPP",
] as const;
type PaymentMethod = (typeof paymentMethods)[number];

const branches = [
  { id: "main", name: { en: "Main Branch", ar: "الفرع الرئيسي" } },
  { id: "north", name: { en: "North Branch", ar: "فرع الشمال" } },
  { id: "south", name: { en: "South Branch", ar: "فرع الجنوب" } },
];

export default function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const { cartItems, cartTotal, clearCartItems: removeAll } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [receiveOption, setReceiveOption] = useState<"delivery" | "branch">("delivery");

  const locale = useLocale() as Locale;
  const t = translations[locale];
  const isRTL = locale === "ar";

  const formSchema = z.object({
    name: z.string().min(2, t.nameError),
    phone: z
      .string()
      .min(6, t.phoneError)
      .regex(/^[0-9+\-() ]+$/, t.phoneError),
    address: z.string().min(5, t.addressError).optional(),
    paymentMethod: z.enum(paymentMethods, {
      required_error: t.paymentError,
    }),
    receiveOption: z.enum(["delivery", "branch"]),
    branchId: z.string().optional(),
  }).superRefine((data, ctx) => {
    if (data.receiveOption === "delivery" && !data.address) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t.addressError,
        path: ["address"],
      });
    }
    if (data.receiveOption === "branch" && !data.branchId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: t.branchError,
        path: ["branchId"],
      });
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      receiveOption: "delivery",
    },
  });

  useEffect(() => {
    if (showSuccess) return;

    if (searchParamsStr.includes("success")) {
      setShowSuccess(true);
      toast.success("✅ Payment Completed.");
      removeAll();
    }

    if (searchParamsStr.includes("canceled")) {
      toast.error("❌ Payment Canceled.");
    }
  }, [searchParamsStr, showSuccess, removeAll]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      try {
        const itemPrice = parseFloat(String(item.price)) || 0;
        return total + itemPrice;
      } catch (error) {
        console.error("Error calculating price for item:", item.id, error);
        return total;
      }
    }, 0);
  }, [cartItems]);

  const handlePaymentSelect = (method: PaymentMethod) => {
    setSelectedPayment(method);
    form.setValue("paymentMethod", method);
  };

  const handleCheckout = async (
    paymentMethod: PaymentMethod,
    formData: z.infer<typeof formSchema>
  ) => {
    try {
      setIsSubmitting(true);
      
      const orderData = {
        items: cartItems,
        customer: {
          name: formData.name,
          phone: formData.phone,
          ...(formData.receiveOption === "delivery" 
            ? { address: formData.address }
            : { branchId: formData.branchId }
          ),
        },
        paymentMethod,
        totalPrice,
        receiveOption: formData.receiveOption,
      };

      const response = await axios.post(
        `${STORE}/api/orders`,
        orderData,
        { headers: { "Content-Type": "application/json" } }
      );

      switch (paymentMethod) {
        case "WHATSAPP":
          window.open("https://wa.me/+201204999930", "_blank");
          toast.success(t.orderSubmitted);
          removeAll();
          router.push("/order/orderSuccess");
          break;
        case "CASH_ON_DELIVERY":
          toast.success(t.orderSubmitted);
          removeAll();
          router.push("/order/orderSuccess");
          break;
        default:
          throw new Error("Unsupported payment method");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setErrorMessage(t.checkoutFailed);
      toast.error(t.checkoutFailed);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedPayment) {
      form.setError("paymentMethod", { message: t.paymentError });
      return;
    }

    try {
      await handleCheckout(selectedPayment, values);
    } catch (error) {
      axiosErrorHandler(error);
    }
  };

  if (cartItems.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl" dir={isRTL ? "rtl" : "ltr"}>
      <CardHeader>
        <CardTitle>{t.checkout}</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent className="grid gap-6">
            {errorMessage && (
              <div className="p-4 text-sm text-destructive bg-destructive/15 rounded-md">
                {errorMessage}
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-medium">{t.personalInfo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.fullName}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.fullName}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.phoneNumber}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.phoneNumber}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="space-y-4">
              <h3 className="font-medium">{t.shippingAddress}</h3>
              
              <div className="flex gap-4 mb-4">
                <Button
                  type="button"
                  variant={receiveOption === "delivery" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => {
                    setReceiveOption("delivery");
                    form.setValue("receiveOption", "delivery");
                  }}
                >
                  <Truck className="mr-2 h-4 w-4" />
                  {t.delivery}
                </Button>
                <Button
                  type="button"
                  variant={receiveOption === "branch" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => {
                    setReceiveOption("branch");
                    form.setValue("receiveOption", "branch");
                  }}
                >
                  <Home className="mr-2 h-4 w-4" />
                  {t.receiveFromBranch}
                </Button>
              </div>

              {receiveOption === "delivery" ? (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.address}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t.address}
                          {...field}
                          disabled={isSubmitting}
                          className={isRTL ? "text-right" : "text-left"}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t.branch}</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t.selectBranch} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {branches.map((branch) => (
                            <SelectItem key={branch.id} value={branch.id}>
                              {branch.name[locale]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Payment Method Section */}
            <div className="space-y-4">
              <h3 className="font-medium">{t.paymentMethod}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Button
                    key={method}
                    type="button"
                    variant={selectedPayment === method ? "default" : "outline"}
                    className="flex flex-col items-center justify-center h-24 gap-2"
                    onClick={() => handlePaymentSelect(method)}
                    disabled={isSubmitting}
                    aria-pressed={selectedPayment === method}
                    aria-label={
                      t[method.toLowerCase() as keyof typeof translations.en]
                    }
                  >
                    {method === "WHATSAPP" && (
                      <MessageSquareText className="h-6 w-6" />
                    )}
                    {method === "CASH_ON_DELIVERY" && (
                      <Truck className="h-6 w-6" />
                    )}

                    <span>
                      {method === "CASH_ON_DELIVERY"
                        ? t.cash_on_delivery
                        : t[
                            method.toLowerCase() as keyof typeof translations.en
                          ]}
                    </span>
                  </Button>
                ))}
              </div>

              {selectedPayment === "CASH_ON_DELIVERY" && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {t.codDescription}
                </div>
              )}

              {form.formState.errors.paymentMethod && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.paymentMethod.message}
                </p>
              )}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 mt-4">
              <h3 className="font-medium mb-2">{t.orderSummary}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t.subtotal}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t">
                  <span>{t.total}</span>
                  <span className="text-lg">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => removeAll()}
              disabled={isSubmitting}
            >
              {t.clearCart}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !selectedPayment}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.processing}
                </>
              ) : (
                t.placeOrder
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}