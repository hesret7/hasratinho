'use client';
import { login } from '@/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Login = () => {
  const [loginData, setLoginData] = useState({ identifier: '', password: '' });
  const router = useRouter();

  async function submit(e) {
    const toastId = toast.loading('Loading...');

    e.preventDefault();
    if (loginData.identifier != '' && loginData.password != '') {
      const data = await login(loginData.identifier, loginData.password);
      if (data.hasError) {
        toast.error(data.error, {
          duation: 4000,
          id: toastId,
        });
      } else {
        toast.success('Success.', {
          duation: 4000,
          id: toastId,
        });
        router.push('/');
      }
    } else {
      toast.error('Please fill out fields', {
        duation: 4000,
        id: toastId,
      });
    }
  }
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={(e) => submit(e)}
          className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="identifier"
                type="email"
                value={loginData.identifier}
                onChange={(e) =>
                  setLoginData((prev) => {
                    return {
                      ...prev,
                      identifier: e.target.value,
                    };
                  })
                }
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => {
                    return {
                      ...prev,
                      password: e.target.value,
                    };
                  })
                }
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign in
            </button>
          </div>

          <div className="flex justify-center">
            <span className="text-base text-gray-600">Don't have an account?</span>
            <Link
              href="/register"
              className="ms-2 inline text-base font-medium text-gray-900 underline hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
