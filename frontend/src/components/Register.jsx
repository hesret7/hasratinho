'use client';
import { register } from '@/api/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Register = () => {
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });
  const router = useRouter();

  async function submit(e) {
    const toastId = toast.loading('Loading...');

    e.preventDefault();
    if (registerData.username != '' && registerData.password != '' && registerData.email != '') {
      const data = await register(registerData.username, registerData.email, registerData.password);
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
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return {
                      ...prev,
                      username: e.target.value,
                    };
                  })
                }
                required
                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData((prev) => {
                    return {
                      ...prev,
                      email: e.target.value,
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
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData((prev) => {
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
              Sign up
            </button>
          </div>

          <div className="flex justify-center">
            <span className="text-base text-gray-600">Already have an account?</span>
            <Link
              href="/login"
              className="ms-2 inline text-base font-medium text-gray-900 underline hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
