import { component$ } from '@builder.io/qwik';
import { AuthComponent } from '~/components/Auth';

export default component$(() => {
  return (
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
      <h1 class="text-4xl font-bold mb-8 text-white">Login to Aluben</h1>
      <AuthComponent />
    </div>
  );
});
