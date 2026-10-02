import { cn } from "@/lib/utils";

export function VisualSwitch({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-[18px] w-[30px] shrink-0 items-center rounded-full p-[2px] transition-colors duration-250",
        checked ? "bg-foreground" : "bg-border",
      )}
    >
      <span
        className={cn(
          "block h-[14px] w-[14px] rounded-full bg-card shadow-sm transition-transform duration-250",
          checked ? "translate-x-[12px]" : "translate-x-0",
        )}
      />
    </span>
  );
}
