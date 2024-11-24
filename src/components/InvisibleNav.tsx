import { component$, useVisibleTask$, useStore } from '@builder.io/qwik';
import { Navbar } from './Navbar';

export const InvisibleNav = component$(() => {
    const state = useStore({ showNavbar: false });


  // Add keyboard event listener
  useVisibleTask$(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Check both e.altKey and e.key.toLowerCase() includes 'alt' for better compatibility
        const isAltPressed = e.ctrlKey || e.key.toLowerCase().includes('ctrl');
        
        // Check if 'a' key is pressed (case insensitive)
        const isPressed = e.key.toLowerCase() == '/';
  
        if (isAltPressed && isPressed) {
          state.showNavbar = !state.showNavbar;
          e.preventDefault(); // Prevent default browser behavior
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (<>
    {state.showNavbar && <Navbar />}
    </>
  );
});