import { component$, Slot } from "@builder.io/qwik";
import { cn } from "~/lib/utils";

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const Sheet = component$<SheetProps>((props) => {
  return <Slot />;
});

interface SheetTriggerProps {
  class?: string;
}

export const SheetTrigger = component$<SheetTriggerProps>((props) => {
  return <button class={cn("", props.class)}><Slot /></button>;
});

export const SheetClose = component$<SheetTriggerProps>((props) => {
  return <button class={cn("", props.class)}><Slot /></button>;
});

interface SheetContentProps {
  side?: "top" | "bottom" | "left" | "right";
  class?: string;
}

const sheetVariants = {
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out",
  side: {
    top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
    bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom", 
    left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
    right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
  }
};

export const SheetContent = component$<SheetContentProps>(({ side = "right", class: className }) => {
  return (
    <div class="fixed inset-0">
      <div class="fixed inset-0 z-50 bg-black/80" />
      <div class={cn(sheetVariants.base, sheetVariants.side[side], className)}>
        <Slot />
        <button class="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </div>
  );
});

interface SheetHeaderProps {
  class?: string;
}

export const SheetHeader = component$<SheetHeaderProps>((props) => {
  return (
    <div class={cn("flex flex-col space-y-2 text-center sm:text-left", props.class)}>
      <Slot />
    </div>
  );
});

export const SheetFooter = component$<SheetHeaderProps>((props) => {
  return (
    <div class={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", props.class)}>
      <Slot />
    </div>
  );
});

export const SheetTitle = component$<SheetHeaderProps>((props) => {
  return (
    <h2 class={cn("text-lg font-semibold text-foreground", props.class)}>
      <Slot />
    </h2>
  );
});

export const SheetDescription = component$<SheetHeaderProps>((props) => {
  return (
    <p class={cn("text-sm text-muted-foreground", props.class)}>
      <Slot />
    </p>
  );
});
