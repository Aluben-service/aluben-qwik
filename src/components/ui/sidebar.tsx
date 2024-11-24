// Previous components remain the same...
// Continuing with remaining components:

import { component$, Slot } from "@builder.io/qwik"
import { ClassArray, ClassDictionary } from "clsx"
import { cn } from "~/lib/utils"
import { Skeleton } from "./skeleton"
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip"
import { cva, VariantProps } from "class-variance-authority"

export const SidebarGroup = component$<{ class?: string }>((props: { class?: string | number | boolean | ClassArray | ClassDictionary | null | undefined }) => (
  <div
    data-sidebar="group"
    class={cn("relative flex w-full min-w-0 flex-col p-2", props.class)}
  >
    <Slot />
  </div>
))

export const SidebarGroupLabel = component$<{
  class?: string
  asChild?: boolean
}>((props: { class?: string | number | boolean | ClassArray | ClassDictionary | null | undefined; asChild?: boolean }) => {
  const Comp = props.asChild ? Slot : 'div'

  return (
    <Comp
      data-sidebar="group-label"
      class={cn(
        "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        props.class
      )}
    >
      <Slot />
    </Comp>
  )
})

export const SidebarGroupAction = component$<{
  class?: string
  asChild?: boolean
}>((props: { class?: string; asChild?: boolean }) => {
  const Comp = props.asChild ? Slot : 'button'

  return (
    <Comp
      data-sidebar="group-action"
      class={cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        props.class
      )}
    >
      <Slot />
    </Comp>
  )
})

export const SidebarGroupContent = component$<{ class?: string }>((props) => (
  <div
    data-sidebar="group-content"
    class={cn("w-full text-sm", props.class)}
  >
    <Slot />
  </div>
))

export const SidebarMenu = component$<{ class?: string }>((props) => (
  <ul
    data-sidebar="menu"
    class={cn("flex w-full min-w-0 flex-col gap-1", props.class)}
  >
    <Slot />
  </ul>
))

export const SidebarMenuItem = component$<{ class?: string }>((props) => (
  <li
    data-sidebar="menu-item"
    class={cn("group/menu-item relative", props.class)}
  >
    <Slot />
  </li>
))

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export const SidebarMenuButton = component$<{
  class?: string
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | any
  variant?: VariantProps<typeof sidebarMenuButtonVariants>['variant']
  size?: VariantProps<typeof sidebarMenuButtonVariants>['size']
}>((props: { 
  class?: string | number | boolean | ClassArray | ClassDictionary | null | undefined
  asChild?: boolean
  isActive?: boolean
  tooltip?: any
  variant?: VariantProps<typeof sidebarMenuButtonVariants>['variant']
  size?: VariantProps<typeof sidebarMenuButtonVariants>['size']
}) => {
  const Comp = props.asChild ? Slot : 'button'
  const { isMobile, state } = useSidebar()

  const button = (
    <Comp
      data-sidebar="menu-button"
      data-size={props.size}
      data-active={props.isActive}
      class={cn(
        sidebarMenuButtonVariants({ 
          variant: props.variant, 
          size: props.size 
        }), 
        props.class
      )}
    >
      <Slot />
    </Comp>
  )

  if (!props.tooltip) {
    return button
  }

  const tooltipContent = typeof props.tooltip === 'string' 
    ? { children: props.tooltip }
    : props.tooltip

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state.value !== "collapsed" || isMobile.value}
        {...tooltipContent}
      />
    </Tooltip>
  )
})

export const SidebarMenuAction = component$<{
  class?: string
  asChild?: boolean
  showOnHover?: boolean
}>((props: { class?: string; asChild?: boolean; showOnHover?: boolean }) => {
  const Comp = props.asChild ? Slot : 'button'

  return (
    <Comp
      data-sidebar="menu-action"
      class={cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        props.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        props.class
      )}
    >
      <Slot />
    </Comp>
  )
})

export const SidebarMenuBadge = component$<{ class?: string }>((props) => (
  <div
    data-sidebar="menu-badge"
    class={cn(
      "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", 
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      props.class
    )}
  >
    <Slot />
  </div>
))

export const SidebarMenuSkeleton = component$<{
  class?: string
  showIcon?: boolean
}>((props) => {
  const width = signal(`${Math.floor(Math.random() * 40) + 50}%`)

  return (
    <div
      data-sidebar="menu-skeleton"
      class={cn("rounded-md h-8 flex gap-2 px-2 items-center", props.class)}
    >
      {props.showIcon && (
        <Skeleton
          class="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        class="h-4 flex-1 max-w-[--skeleton-width]"
        data-sidebar="menu-skeleton-text"
        style={{
          '--skeleton-width': `${width}`
        }}
      />
    </div>
  )
})

export const SidebarMenuSub = component$<{ class?: string }>((props) => (
  <ul
    data-sidebar="menu-sub"
    class={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      props.class
    )}
  >
    <Slot />
  </ul>
))

export const SidebarMenuSubItem = component$<{ class?: string }>((props) => (
  <li>
    <Slot />
  </li>
))

export const SidebarMenuSubButton = component$<{
  class?: string
  asChild?: boolean
  size?: 'sm' | 'md'
  isActive?: boolean
}>((props: { class?: string; asChild?: boolean; size?: 'sm' | 'md'; isActive?: boolean }) => {
  const Comp = props.asChild ? Slot : 'a'

  return (
    <Comp
      data-sidebar="menu-sub-button"
      data-size={props.size}
      data-active={props.isActive}
      class={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        props.size === "sm" && "text-xs",
        props.size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        props.class
      )}
    >
      <Slot />
    </Comp>
  )
})

function signal(arg0: string) {
  throw new Error("Function not implemented.")
}
function useSidebar(): { isMobile: any; state: any } {
  throw new Error("Function not implemented.")
}

