import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Protected } from "~/components/Protected";
import { createClient } from '@supabase/supabase-js';
import type { Database } from '~/supabase'

const supabase = createClient<Database>(
  "https://bmmqguzszszvfjaguihm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbXFndXpzenN6dmZqYWd1aWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTE0NjMsImV4cCI6MjA0ODA2NzQ2M30.GKzClLiYGs5ax6zfgQxb-hehpqvFaI4u5rMixCmCWxk"
);

export default component$(() => {
  const leaderboard = useSignal<{ game: string; player: string; score: number }[]>([
    { game: "Snake", player: "Player1", score: 150 },
    { game: "Snake", player: "Player2", score: 120 },
    { game: "Tetris", player: "Player3", score: 2000 },
    { game: "Tetris", player: "Player4", score: 1800 },
    { game: "Pac-Man", player: "Player5", score: 10000 },
    { game: "Pac-Man", player: "Player6", score: 9500 }
  ]);

  // Fetch leaderboard data
  useTask$(async () => {
    try {
      const { data, error } = await supabase
        .from('Game Leaderboard')
        .select('*')
        .order('score', { ascending: false });

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      // Only update with database data if we actually got some results
      if (data.length > 0) {
        leaderboard.value = data.map(entry => ({
          game: entry.Game,
          player: entry.player,
          score: entry.score
        }));
      }
      // Otherwise keep the default sample data
      
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err);
    }
  });

  return (
    <>
      <Protected iframe={false}>
      <div class="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
        <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white text-center mb-6 sm:mb-8 lg:mb-10">Game Leaderboard</h1>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="overflow-x-auto">
            <table class="w-full bg-gray-800 rounded-lg overflow-hidden">
              <thead>
                <tr class="bg-gray-700">
                  <th class="whitespace-nowrap py-3 px-4 sm:px-6 text-left text-sm sm:text-base text-white font-semibold">Game</th>
                  <th class="whitespace-nowrap py-3 px-4 sm:px-6 text-left text-sm sm:text-base text-white font-semibold">Player</th>
                  <th class="whitespace-nowrap py-3 px-4 sm:px-6 text-left text-sm sm:text-base text-white font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.value.map((entry) => (
                  <tr key={`${entry.game}-${entry.player}-${entry.score}`} class="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                    <td class="py-3 px-4 sm:px-6 text-sm sm:text-base text-gray-300">{entry.game}</td>
                    <td class="py-3 px-4 sm:px-6 text-sm sm:text-base text-gray-300">{entry.player}</td>
                    <td class="py-3 px-4 sm:px-6 text-sm sm:text-base text-gray-300">{entry.score}</td>
                  </tr> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </Protected>
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
