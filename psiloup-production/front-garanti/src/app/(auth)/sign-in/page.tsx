"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Breadcrumb } from "@/components/breadcrumb";
import { HomeIcon } from "lucide-react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { login, isAuthenticated, setCurrentUser } from "@/lib/data/auth";

export default function SignIn() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Se já estiver autenticado, redireciona
    if (typeof window !== 'undefined' && isAuthenticated()) {
        router.push('/dashboard')
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        
        try {
            const response = await login(email, password)
            setCurrentUser(response.user)
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || "Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="w-screen">
            <Breadcrumb
                breadcrumbs={[
                    {
                        href: "/",
                        icon: HomeIcon,
                        label: "Home",
                    },
                    {
                        href: "/dashboard",
                        label: "Conta do Usuário",
                    },
                    {
                        href: "/sign-in",
                        label: "Entrar",
                        active: true,
                    },
                ]}
            />

            <section className="h-screen md:h-auto flex items-center justify-center px-[5.625%] md:px-[0%] py-[100px]">
                <Card className="max-w-[424px] w-full border-[1px] border-neutral-300 rounded-[4px] shadow-none">
                    <CardHeader>
                        <CardTitle>Faça Login com sua conta</CardTitle>
                        <CardDescription>
                            Digite seu e-mail abaixo para acessar sua conta
                        </CardDescription>
                        <CardAction>
                            <Link
                                href="/sign-up"
                                className="ml-auto inline-block text-b-sm leading-b-sm underline-offset-4 hover:underline"
                            >
                                Inscrever-se
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-6">
                                {error && (
                                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                                        {error}
                                    </div>
                                )}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Endereço de Email
                                    </Label>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="email"
                                        type="email"
                                        placeholder="email@exemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Senha</Label>
                                        <Link
                                            href="/recover-password"
                                            className="ml-auto inline-block text-b-sm leading-b-sm underline-offset-4 hover:underline"
                                        >
                                            Esqueceu sua senha?
                                        </Link>
                                    </div>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <CardFooter className="flex-col gap-[24px] p-0 pt-6">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-[48px] rounded-[4px] cursor-pointer"
                                >
                                    {loading ? "Entrando..." : "Entrar"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
