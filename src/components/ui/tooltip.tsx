import { component$, Slot, type PropFunction, type QRL } from "@builder.io/qwik"
import { cn } from "~/lib/utils"

export interface TooltipProps {
  class?: string
  hidden?: boolean
  onOpenChange$?: PropFunction<(open: boolean) => void>
}

export const Tooltip = component$<TooltipProps>((props) => {
  return (
    <div class={cn("relative inline-block", props.class)}>
      <Slot />
    </div>
  )
})

export interface TooltipTriggerProps {
  class?: string
  asChild?: boolean
}

export const TooltipTrigger = component$<TooltipTriggerProps>((props) => {
  const Comp = props.asChild ? Slot : 'button'
  
  return (
    <Comp class={cn("inline-flex items-center justify-center", props.class)}>
      <Slot />
    </Comp>
  )
})

export interface TooltipContentProps {
  class?: string
  side?: "top" | "right" | "bottom" | "left"
  align?: "start" | "center" | "end"
  sideOffset?: number
  hidden?: boolean
}

export const TooltipContent = component$<TooltipContentProps>((props) => {
  if (props.hidden) return null

  return (
    <div
      class={cn(
        "z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        "animate-in fade-in-0 zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2",
        "data-[side=left]:slide-in-from-right-2", 
        "data-[side=right]:slide-in-from-left-2",
        "data-[side=top]:slide-in-from-bottom-2",
        props.class
      )}
      style={{
        position: 'absolute',
        [props.side || 'top']: `${props.sideOffset || 4}px`
      }}
    >
      <Slot />
    </div>
  )
})
