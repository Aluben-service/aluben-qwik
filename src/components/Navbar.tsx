import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Navbar = component$(() => {
  return (
    <nav class="bg-gray-800 p-4">
      <div class="container mx-auto flex items-center justify-between">
        <div class="text-xl font-bold">Aluben</div>
        <div class="space-x-6">
          <Link href="/" class="hover:text-gray-300">
            Home
          </Link>
          <Link href="/home" class="hover:text-gray-300">
            Search
          </Link>
          <Link href="/leaderboard" class="hover:text-gray-300">
            Leaderboard(WIP)
          </Link>
          <Link href="/settings" class="hover:text-gray-300">
            Settings(WIP)
          </Link>
        </div>
      </div>
    </nav>
  );
});
