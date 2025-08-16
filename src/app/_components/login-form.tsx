"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { GoogleLogo } from "@phosphor-icons/react";
import {authClient} from "@/lib/auth-client"


const loginSchema = z.object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string().min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(formData: LoginFormValues) {

        await authClient.signIn.email({
            email: formData.email,
            password: formData.password,
            callbackURL: "/dashboard",
        }, {
            onRequest: () => {
                setIsLoading(true)
            },
            onSuccess: () => {
                console.log("Login realizado com sucesso")
                router.replace("/dashboard")
            },
            onError: (error) => {
                setIsLoading(false)
                console.error("Erro ao realizar login:", error)
            }
        })

    }

    async function signInWithGoogle() {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard",
        }, {
            onRequest: () => {
                setIsLoading(true)
                console.log("Iniciando login com Google...")

            },
            onSuccess: () => {
                console.log("Login com Google realizado com sucesso")
                router.replace("/dashboard")
            },
            onError: (error) => {
                setIsLoading(false)
                console.error("Erro ao realizar login com Google:", error)
            }
        })
    }

    return (
        <Form {...form}>
            <div className="relative">
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                )}
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="seu@email.com" type="email" {...field} disabled={isLoading} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input
                                        placeholder="••••••••"
                                        type={showPassword ? "text" : "password"}
                                        {...field}
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-muted-foreground" />
                                        )}
                                        <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Entrando...
                        </>
                    ) : (
                        "Entrar"
                    )}
                </Button>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white-200 hover:bg-zinc-700 hover:text-white"
                    onClick={signInWithGoogle}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                        />
                    </svg>
                    <span className="sr-only text-black">Entrar com Google</span>
                </Button>
                </form>
            </div>
        </Form>
    )
}