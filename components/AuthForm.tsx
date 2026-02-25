"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormLabel,
    FormMessage,
    FormItem,
    FormField,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import FormFields from "@/components/FormField";
import {useRouter} from "next/navigation";


const authForSchema = (type: FormType)=> {
    return z.object({
        name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authForSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === 'sign-up') {
                toast.success('Account created successfully. Please sign in.');
                router.push("/sign-in")
            } else {
                toast.success('Sign in successfully.');
                router.push("/")
            }
        }catch (error) {
            console.log(error)
            toast.error(`There was an error ${error}`)
        }
    }

    const isSignIn = type === "sign-in"

    return (
        <div className="card-border lg:min-w-130">
            <div className="flex flex-col gap-6 card py-14 px-20">
                <div className="flex flex-row gap-2 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38}/>
                    <h2 className="text-primary-100">PrepWise</h2>
                </div>
                <h3 className="flex justify-center">Practice job interview with AI </h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormFields
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                            />
                        )}
                        <FormFields
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Your email address"
                            type="email"
                        />
                        <FormFields
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button className="btn" type="submit">{isSignIn ? 'Sign in' : 'Create an account'}</Button>

                        <p className="text-center">
                            {isSignIn ? 'No Account yet?' : 'Have an account already?'}
                            <Link href={!isSignIn ? '/sign-in' : 'sign-up'} className="font-bold text-user-primary ml-1">
                                {!isSignIn ? 'Sign-in' : 'Sign-up'}
                            </Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default AuthForm