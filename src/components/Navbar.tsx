import { component$ } from "@builder.io/qwik";
import { LocLink } from "../i18n/loc-link";
export const Navbar = component$(() => {
  
  return (
    <nav class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 p-6 rounded-lg shadow-lg z-50">
      <div class="flex flex-col items-center space-y-4">
        <div class="text-2xl font-bold mb-4">Aluben</div>
        <div class="flex flex-col space-y-3">
          <LocLink href="/" class="hover:text-gray-300 text-center">
            Home
          </LocLink>
          <LocLink href="/settings/" class="hover:text-gray-300 text-center">
            Settings
          </LocLink>
          {/*
          <Link href="/leaderboard/" class="hover:text-gray-300 text-center">
            Leaderboard(WIP)
          </Link>
          */}
        </div>
      </div>
    </nav>
  );
});
