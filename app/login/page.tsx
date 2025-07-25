'use client';

import { useState } from 'react';
import { loginUser } from './action';

export default function LoginPage() {
  const [error, setError] = useState('');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
        action={async (formData) => {
          try {
            await loginUser(formData);
          } catch (err: any) {
            setError(err.message);
          }
        }}
      >
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input name="email" placeholder="Email" className="border w-full p-2 rounded" />
        <input name="password" type="password" placeholder="Password" className="border w-full p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Login</button>
      </form>
    </div>
  );
}
