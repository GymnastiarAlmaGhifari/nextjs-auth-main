"use client"

import Link from "next/link"
// import { Icons } from "..ui/icons"
import { Button } from "../../ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../ui/card"
import { useForm } from 'react-hook-form';
import { Input } from "../../ui/input"
import { Label } from "../../ui/label"

const SignUp = () => {
    return (
        <Card>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Sign In</CardTitle>
                <CardDescription>
                    Welcome back! Please enter your email to sign in.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline">
                        {/* <Icons.gitHub className="mr-2 h-4 w-4" /> */}
                        Github
                    </Button>
                    <Button variant="outline">
                        {/* <Icons.google className="mr-2 h-4 w-4" /> */}
                        Google
                    </Button>
                </div>
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
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
                <Button className="w-full">Sign In</Button>
                <p className='text-center text-sm text-gray-600 mt-2'>
                    If you don&apos;t have an account, please&nbsp;
                    <Link className='text-blue-500 hover:underline' href='/sign-up'>
                        Sign up
                    </Link>
                </p>
            </CardFooter>
        </Card>
    )
}

export default SignUp