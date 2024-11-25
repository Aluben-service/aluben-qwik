import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Auth } from '~/components/Auth';

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 class="text-4xl font-bold mb-8 text-white">Login to Aluben</h1>
      <Auth />
    </div>
  );
});

export const head: DocumentHead = {
    title: 'Login - Aluben',
    meta: [
      {
        name: 'description',
        content: 'Aluben\'s useless login',
      },
      {
        name: 'keywords',
        content: 'qwik, aluben, proxy, browser, leaderboard, work in progress',
      },
    ],
  };