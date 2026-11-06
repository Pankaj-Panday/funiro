import { z } from "zod";

import { indianStates, paymentMethods } from "@/constants/checkout/checkout.constants";

const required = (message: string) => z.string().trim().min(1, message);

// Shared by the form now and by the order endpoint in Phase 2, so both enforce the same rules.
export const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  mobile: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a 10-digit mobile number"),
  email: z.string().trim().pipe(z.email("Enter a valid email address")),
  building: required("Enter your flat or house number"),
  area: required("Enter your area or street"),
  landmark: z.string().trim(),
  pincode: z
    .string()
    .trim()
    .regex(/^[1-9]\d{5}$/, "Enter a 6-digit pincode"),
  city: required("Enter your town or city"),
  state: z.string().refine((value) => indianStates.some((state) => state === value), {
    message: "Select your state",
  }),
  paymentMethod: z.enum(paymentMethods.map((method) => method.value)),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;
