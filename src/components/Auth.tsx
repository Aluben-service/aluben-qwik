
import { component$, useStore, $ } from '@builder.io/qwik';
import { login, signUp, logout } from '~/services/auth';
import { auth } from '~/services/firebase'; // Import Firebase auth instance
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

export const Auth = component$(() => {
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

  const handleGoogleLogin = $(async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      state.user = result.user as any; // Type assertion to fix type error
      console.log('Google login success:', result.user);
    } catch (error) {
      console.error('Google login error:', error);
    }
  });

  const handleGithubLogin = $(async () => {
    const provider = new GithubAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      state.user = result.user as any;
      console.log('GitHub login success:', result.user);
    } catch (error) {
      console.error('GitHub login error:', error);
    }
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
      <div class="flex flex-col gap-2 w-full">
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
      <div class="flex flex-col gap-2 w-full mt-4">
        <button 
          onClick$={handleGoogleLogin}
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Login with Google
        </button>
        <button 
          onClick$={handleGithubLogin}
          class="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
        >
          Login with GitHub
        </button>
      </div>
    </div>
  );
});
