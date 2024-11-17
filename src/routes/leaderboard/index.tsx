import { component$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { InvisibleNav } from "~/components/InvisibleNav";

export default component$(() => {
  return (
    <>
      <InvisibleNav />
      <div class="min-h-screen flex items-center justify-center bg-gray-900">
        <div class="text-center">
          <div class="mb-8">
            <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          </div>
          <h1 class="text-6xl font-bold text-white mb-4">Work in Progress</h1>
          <p class="text-xl text-gray-400 mb-8">
            The leaderboard feature is currently under development. Check back soon!
          </p>
          <div class="flex justify-center space-x-4">
            <a
              href="/"
              class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return Home
            </a>
            <a
              href="https://github.com/Aluben-Services/aluben-qwik"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Leaderboard (WIP) - Aluben',
  meta: [
    {
      name: 'description',
      content: 'Leaderboard feature coming soon to Aluben proxy browser.',
    },
    {
      name: 'keywords',
      content: 'qwik, aluben, proxy, browser, leaderboard, work in progress',
    },
  ],
};
