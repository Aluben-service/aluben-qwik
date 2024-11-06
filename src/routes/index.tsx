import { component$ } from "@builder.io/qwik"
import { Link } from "@builder.io/qwik-city"

export default component$(() => {
  return (
    <div class="min-h-screen bg-gray-900 text-white">
      <nav class="bg-gray-800 p-4">
        <div class="container mx-auto flex justify-between items-center">
          <div class="text-xl font-bold">Aluben</div>
          <div class="space-x-6">
            <Link href="/home" class="hover:text-gray-300">Home</Link>
            <Link href="/games" class="hover:text-gray-300">Search</Link>
            <Link href="/leaderboard" class="hover:text-gray-300">Leaderboard(nonexistent)</Link>
            <Link href="/settings" class="hover:text-gray-300">Settings(nonexisttent)</Link>
          </div>
        </div>
      </nav>
      
      <main class="container mx-auto py-12">
        <div class="text-center">
          <h1 class="text-5xl font-bold mb-6">Welcome to Aluben</h1>
          <p class="text-xl mb-8">Your ultimate gaming/watching/browsing destination</p>
          <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-xl transition-colors">
            Play Now
          </button>
        </div>
      </main>
    </div>
  )
})
