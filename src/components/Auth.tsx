import { component$, useStore, $ } from '@builder.io/qwik';
import { login, signUp, logout } from '~/services/auth';

export const AuthComponent = component$(() => {
  const state = useStore({ email: '', password: '', user: null });

  
  const handleSignUp = $(async () => {
    await signUp(state.email, state.password);
  });

  const handleLogin = $(async () => {
    await login(state.email, state.password);
  });

  const handleLogout = $(async () => {
    await logout();
  });

  return (
    <div class="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto mt-8">
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onInput$={(e) => (state.email = (e.target as HTMLInputElement).value)}
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onInput$={(e) => (state.password = (e.target as HTMLInputElement).value)}
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div class="flex gap-2">
        <button 
          onClick$={handleSignUp}
          class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Sign Up
        </button>
        <button 
          onClick$={handleLogin}
          class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
        >
          Login
        </button>
        <button 
          onClick$={handleLogout}
          class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
});
