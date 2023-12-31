'use client';

import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from "next/navigation";
import { signIn } from 'next-auth/react';
import { registerValidation } from '@/lib/validations/user-validation';
import { register } from '@/lib/actions/admin.actions';
import { useState } from 'react';


const SignUpForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  // state error handler
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof registerValidation>>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof registerValidation>) => {
    try {
      const response = await register({
        email: values.email,
        username: values.username,
        password: values.password,
        pathname: pathname
      });

      // Cek jika response memiliki properti 'error'
      if (response?.error) {
        // Menampilkan pesan kesalahan kepada pengguna atau melakukan tindakan lain yang sesuai
        console.error("Error from server:", response.message);
        // simpan ke state error
        setError(response.message);

        // Contoh: Menampilkan pesan kesalahan ke pengguna
        // Di sini Anda dapat menggunakan state atau mekanisme lain untuk menampilkan pesan kesalahan di UI.
        // Misalnya, Anda bisa mengatur state yang berisi pesan kesalahan dan menampilkannya di komponen Anda.
        // Jika menggunakan React, Anda dapat menggunakan state atau context untuk ini.

        // Contoh dengan state (asumsi Anda menggunakan React):
        // setError(response.message);

      } else {
        // Handle successful registration here

        if (pathname === "/sign-up") {
          // router ke sign in
          router.push("/sign-in");
        } else {
          // router.push("/");
          router.back();
        }
      }
    } catch (error: any) {
      console.error("Error from client:", error.message);
      setError(error.message);
    }
  };

  const loginWithGoogle = () => signIn('google', {
    callbackUrl: 'http://localhost:3000/admin'
  })

  return (
    <Card>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl ">Sign Up</CardTitle>
        <CardDescription className=''>
          Welcome! Please fill in the information below to create an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
            Github
          </Button>
          <Button variant="outline" onClick={loginWithGoogle}>
            {/* <Icons.google className="mr-2 h-4 w-4" /> */}
            Google
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <div className='space-y-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder='johndoe' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='mail@example.com' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Re-Enter your password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Re-Enter your password'
                        type='password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="text-2xl">
              {error}
            </div>
            <Button variant={'default'} className='w-full mt-6' type='submit'>
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className='text-center text-sm text-gray-600 '>
          If you already have an account, please&nbsp;
          <Link className='text-blue-500 hover:underline' href='/sign-in'>
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;


// const response = await fetch('api/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: values.username,
//     email: values.email,
//     password: values.password
//   })
// })

// if (response.ok) {
//   router.push('./sign-in')
// } else {
//   console.log("babbi")
// }