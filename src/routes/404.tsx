
import { component$ } from "@builder.io/qwik";
import { Navbar } from "~/components/Navbar";

export default component$(() => {
  return (
    <>
      <Navbar />
      <div class="min-h-screen flex items-center justify-center bg-gray-100">
        <div class="text-center">
          <h1 class="text-9xl font-bold text-gray-800">404</h1>
          <p class="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
          <p class="text-gray-500 mt-2">The page you're looking for doesn't exist or has been moved.</p>
          <a
            href="/"
            class="inline-block mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
});
