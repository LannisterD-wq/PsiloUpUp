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
import { Checkbox } from "@/components/ui/checkbox";
import { register, setCurrentUser } from "@/lib/data/auth";

export default function SignUp() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [terms, setTerms] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("As senhas não coincidem")
            return
        }

        if (!terms) {
            setError("Você precisa concordar com os termos")
            return
        }

        setLoading(true)
        
        try {
            const response = await register({
                name,
                email,
                password,
                phone: phone || undefined,
            })
            setCurrentUser(response.user)
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || "Erro ao cadastrar")
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
                        href: "/sign-up",
                        label: "Inscrever-se",
                        active: true,
                    },
                ]}
            />

            <section className="h-screen md:h-auto flex items-center justify-center px-[5.625%] md:px-[0%] py-[100px]">
                <Card className="max-w-[624px] w-full border-[1px] border-neutral-300 rounded-[4px] shadow-none">
                    <CardHeader>
                        <CardTitle>Faça o cadastro da sua conta</CardTitle>
                        <CardDescription>
                            Digite seus dados abaixo para criar sua conta
                        </CardDescription>
                        <CardAction>
                            <Link
                                href="/sign-in"
                                className="ml-auto inline-block text-b-sm leading-b-sm underline-offset-4 hover:underline"
                            >
                                Login
                            </Link>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
                                    {error}
                                </div>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="username">
                                        Nome do Usuário
                                    </Label>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="username"
                                        type="text"
                                        placeholder="Digite nome..."
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
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
                                    <Label htmlFor="phone">
                                        Telefone (opcional)
                                    </Label>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="phone"
                                        type="tel"
                                        placeholder="(11) 99999-9999"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Senha</Label>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="password"
                                        type="password"
                                        placeholder="Digite senha..."
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2 sm:col-span-2">
                                    <Label htmlFor="confirm-password">
                                        Confirmar Senha
                                    </Label>
                                    <Input
                                        className="h-[44px] rounded-[4px]"
                                        id="confirm-password"
                                        type="password"
                                        placeholder="Digite senha novamente..."
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-start gap-2">
                                <Checkbox
                                    id="terms"
                                    className="rounded-[0px]"
                                    checked={terms}
                                    onCheckedChange={(checked) => setTerms(checked === true)}
                                />
                                <Label
                                    htmlFor="terms"
                                    className="text-b-sm leading-b-sm"
                                >
                                    Você concorda com os Termos de Condições e a
                                    Política de Privacidade
                                </Label>
                            </div>
                            <CardFooter className="flex-col gap-[24px] p-0">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-[48px] rounded-[4px] cursor-pointer"
                                >
                                    {loading ? "Cadastrando..." : "Cadastrar"}
                                </Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </section>
        </main>
    );
}
