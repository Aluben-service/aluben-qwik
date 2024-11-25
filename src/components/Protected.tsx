/*
import { component$, useVisibleTask$, useSignal } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { auth } from '~/services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ProtectedProps {
  children: any;
  iframe?: boolean;
}

export const Protected = component$<ProtectedProps>(({ children, iframe = false }) => {
  const nav = useNavigate();
  const isLoading = useSignal(true);
  const isAuthenticated = useSignal(false);

  useVisibleTask$(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        if (iframe) {
          isAuthenticated.value = false;
        } else {
          nav('/login');
        }
      } else {
        isAuthenticated.value = true;
      }
      isLoading.value = false;
    });

    return () => unsubscribe();
  });

  return (
    <>
      {isLoading.value ? (
        <div class="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
          <div class="text-white">Loading...</div>
        </div>
      ) : !isAuthenticated.value && iframe ? (
        <div class="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
          <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl text-white mb-4">Please Log In</h2>
            <button 
              onClick$={() => nav('/login')}
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div class="min-h-screen bg-gray-900 p-8">
          <div class="max-w-4xl mx-auto">
            {children}
          </div>
        </div>
      )}
    </>
  );
});
*/
import { component$, Slot } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "https://bmmqguzszszvfjaguihm.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJtbXFndXpzenN6dmZqYWd1aWhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0OTE0NjMsImV4cCI6MjA0ODA2NzQ2M30.GKzClLiYGs5ax6zfgQxb-hehpqvFaI4u5rMixCmCWxk"

//  import.meta.env.SUPABASE_URL,
//  import.meta.env.SUPABASE_API_KEY
);

interface ProtectedProps {
  iframe?: boolean;
}

export const Protected = component$<ProtectedProps>(({ iframe }) => {
  const nav = useNavigate();
  const isLoading = useSignal(true);
  const isAuthenticated = useSignal(false);

  useVisibleTask$(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        if (iframe) {
          isAuthenticated.value = false;
        } else {
          nav('/login');
        }
      } else {
        isAuthenticated.value = true;
      }
      isLoading.value = false;
    });

    return () => subscription.unsubscribe();
  });

  return (
    <>
      {isLoading.value ? (
        <div class="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
          <div class="text-white">Loading...</div>
        </div>
      ) : !isAuthenticated.value && iframe ? (
        <div class="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
          <div class="bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 class="text-2xl text-white mb-4">Please Log In</h2>
            <button 
              type="button"
              onClick$={() => nav('/login')}
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Go to Login
            </button>
          </div>
        </div>
      ) : (
        <div class="min-h-screen bg-gray-900 p-8">
          <div class="max-w-4xl mx-auto">
            <Slot />
          </div>
        </div>
      )}
    </>
  );
});
