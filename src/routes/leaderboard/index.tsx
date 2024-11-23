import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { DocumentHead } from "@builder.io/qwik-city";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { Protected } from "~/components/Protected";
import { db } from "~/services/firebase";

export default component$(() => {
  const leaderboard = useSignal<{ game: string; score: number }[]>([]);

  // Fetch leaderboard data
  useTask$(async () => {
    const q = query(collection(db, 'leaderboard'), orderBy('score', 'desc'));
    const querySnapshot = await getDocs(q);
    const scores: { game: string; score: number }[] = [];
    querySnapshot.forEach((doc) => {
      scores.push(doc.data() as { game: string; score: number });
    });
    leaderboard.value = scores;
  });

  return (
    <>
        
            <div class="min-h-screen bg-gray-900 py-12 px-4">
      <h1 class="text-4xl font-bold text-white text-center mb-8">Game Leaderboard</h1>
      <div class="max-w-4xl mx-auto">
        <table class="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr class="bg-gray-700">
              <th class="px-6 py-4 text-left text-white font-semibold">Game</th>
              <th class="px-6 py-4 text-left text-white font-semibold">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.value.map((entry, index) => (
              <tr key={index} class="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                <td class="px-6 py-4 text-gray-300">{entry.game}</td>
                <td class="px-6 py-4 text-gray-300">{entry.score}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'Leaderboard - Aluben',
  meta: [
    {
      name: 'description',
      content: 'Leaderboard for Aluben proxy browser.',
    },
    {
      name: 'keywords',
      content: 'qwik, aluben, proxy, browser, leaderboard, work in progress',
    },
  ],
};
