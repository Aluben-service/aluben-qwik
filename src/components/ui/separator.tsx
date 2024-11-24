import { component$ } from '@builder.io/qwik';
import { cn } from '~/lib/utils';

export const Separator = component$((props: { orientation?: 'horizontal' | 'vertical', decorative?: boolean, className?: string }) => {
  const orientation = props.orientation || 'horizontal';
  const decorative = props.decorative || true;
      
  return (
    <div
      aria-orientation={orientation}
      role="separator"
      data-orientation={orientation}
      aria-hidden={decorative}
      class={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        props.className
      )}
      {...props}
    />
  );
});