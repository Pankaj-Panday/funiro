import { type Control, Controller } from "react-hook-form";

import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { indianStates } from "@/constants/checkout/checkout.constants";
import type { CheckoutValues } from "@/lib/checkout/checkout-schema";

type TextFieldName = Exclude<keyof CheckoutValues, "state" | "paymentMethod">;

const textFields: {
  name: TextFieldName;
  label: string;
  autoComplete: string;
  type?: string;
  inputMode?: "numeric" | "email" | "tel";
  maxLength?: number;
  placeholder?: string;
}[] = [
  { name: "fullName", label: "Full Name", autoComplete: "name" },
  {
    name: "mobile",
    label: "Mobile Number",
    autoComplete: "tel-national",
    type: "tel",
    inputMode: "numeric",
    maxLength: 10,
  },
  {
    name: "email",
    label: "Email Address",
    autoComplete: "email",
    type: "email",
    inputMode: "email",
  },
  { name: "building", label: "Flat, House no., Apartment", autoComplete: "address-line1" },
  { name: "area", label: "Area, Street, Sector, Village", autoComplete: "address-line2" },
  {
    name: "landmark",
    label: "Landmark (optional)",
    autoComplete: "off",
    placeholder: "E.g. near Apollo Hospital",
  },
  {
    name: "pincode",
    label: "Pincode",
    autoComplete: "postal-code",
    inputMode: "numeric",
    maxLength: 6,
    placeholder: "6 digits",
  },
  { name: "city", label: "Town/City", autoComplete: "address-level2" },
];

const stateItems = indianStates.map((state) => ({ label: state, value: state }));

const inputClass =
  "border-light placeholder:text-light focus-visible:border-primary focus-visible:ring-primary h-auto rounded-[10px] p-4 text-base focus-visible:ring-1";
const labelClass = "text-dark text-base font-medium";
const fieldClass = "gap-5 sm:w-4/5";

type Props = {
  control: Control<CheckoutValues>;
};

export default function BillingFields({ control }: Props) {
  return (
    <FieldGroup className="gap-9">
      {textFields.map(({ name, label, ...inputProps }) => (
        <Controller
          key={name}
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className={fieldClass}>
              <FieldLabel htmlFor={name} className={labelClass}>
                {label}
              </FieldLabel>
              <Input
                {...field}
                {...inputProps}
                id={name}
                aria-invalid={fieldState.invalid}
                className={inputClass}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      ))}

      <Controller
        name="state"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className={fieldClass}>
            <FieldLabel htmlFor="state" className={labelClass}>
              State
            </FieldLabel>
            <Select
              items={stateItems}
              name={field.name}
              value={field.value || null}
              onValueChange={(value) => field.onChange(value ?? "")}
              onOpenChange={(open) => !open && field.onBlur()}
              modal={false}
            >
              <SelectTrigger
                id="state"
                aria-invalid={fieldState.invalid}
                className={`${inputClass} data-placeholder:text-light w-full cursor-pointer data-[size=default]:h-auto`}
              >
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false} className="max-h-72">
                {stateItems.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                    className="cursor-pointer text-base"
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </FieldGroup>
  );
}
