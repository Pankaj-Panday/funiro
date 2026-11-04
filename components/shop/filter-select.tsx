import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Props<T> = {
  label: string;
  value: T | null;
  items: readonly { label: string; value: T | null }[];
  onChange: (value: T | null) => void;
  className?: string;
};

export default function FilterSelect<T extends string | number>({
  label,
  value,
  items,
  onChange,
  className,
}: Props<T>) {
  return (
    <Select items={items} value={value} onValueChange={onChange} modal={false}>
      <SelectTrigger
        aria-label={label}
        className={cn(
          "bg-background border-light data-placeholder:text-foreground cursor-pointer rounded-[7px] text-base data-[size=default]:h-10",
          className,
        )}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent alignItemWithTrigger={false}>
        {items.map((item) => (
          <SelectItem key={item.label} value={item.value} className="cursor-pointer text-base">
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
