"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { XCircleIcon } from "lucide-react";
import { getCartTotals, removeFromCart, updateQuantity, CartTotals } from "@/lib/data/cart";
import { formatCurrency } from "@/lib/utils";

export default function ShoppingCart() {
    const [totals, setTotals] = useState<CartTotals | null>(null);
    const [loading, setLoading] = useState(true);

    const loadCart = async () => {
        setLoading(true);
        try {
            const cartTotals = await getCartTotals();
            setTotals(cartTotals);
        } catch (error) {
            console.error("Erro ao carregar carrinho:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
        const handleUpdate = () => {
            loadCart();
        };
        window.addEventListener("psiloup-cart-updated", handleUpdate);
        return () => window.removeEventListener("psiloup-cart-updated", handleUpdate);
    }, []);

    const handleRemove = (sku: string) => {
        removeFromCart(sku);
        loadCart();
    };

    const handleQuantityChange = (sku: string, qty: number) => {
        updateQuantity(sku, qty);
        loadCart();
    };

    const getProductImage = (sku: string) => {
        if (sku === "UP-MIND") return "/images/MIND-removebg-preview.png";
        if (sku === "UP-BURN") return "/images/BURN-removebg-preview.png";
        if (sku === "STACK-DUPLO") return "/images/Stack_Duplo-removebg-preview.png";
        return "/images/placeholder.png";
    };

    if (loading) {
        return (
            <Card className="w-full border-[1px] border-neutral-300 rounded-[4px] p-[0px] shadow-none">
                <CardHeader>
                    <CardTitle>Carrinho de Compras</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Carregando...</p>
                </CardContent>
            </Card>
        );
    }

    if (!totals || totals.items.length === 0) {
        return (
            <Card className="w-full border-[1px] border-neutral-300 rounded-[4px] p-[0px] shadow-none">
                <CardHeader>
                    <CardTitle>Carrinho de Compras</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                        <p className="text-b-md">Seu carrinho está vazio.</p>
                        <Link href="/shop">
                            <Button>Continuar comprando</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <Card className="w-full border-[1px] border-neutral-300 rounded-[4px] p-[0px] shadow-none">
                <CardHeader className="h-[64px] flex items-center justify-start">
                    <CardTitle>Carrinho de Compras</CardTitle>
                </CardHeader>
                <CardContent className="h-[450px] overflow-y-scroll">
                    <Table className="w-full relative">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[380px]">
                                    Produtos
                                </TableHead>
                                <TableHead className="w-[180px]">Preço</TableHead>
                                <TableHead className="w-[180px]">
                                    Quantidade
                                </TableHead>
                                <TableHead className="w-[180px]">
                                    Subtotal
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {totals.items.map((item) => (
                                <TableRow key={item.sku}>
                                    <TableCell>
                                        <div className="flex items-center justify-start gap-[24px]">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="cursor-pointer rounded-full"
                                                onClick={() => handleRemove(item.sku)}
                                            >
                                                <XCircleIcon className="size-[24px] text-neutral-400" />
                                            </Button>

                                            <div className="size-[72px] relative">
                                                <Image
                                                    src={getProductImage(item.sku)}
                                                    alt={`Foto do produto ${item.product.name}`}
                                                    fill={true}
                                                    className="object-contain"
                                                />
                                            </div>

                                            <p className="w-[260px] text-wrap text-b-sm leading-b-sm font-normal">
                                                {item.product.name}
                                            </p>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(item.product.priceCents)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.sku, item.qty - 1)}
                                            >
                                                -
                                            </Button>
                                            <span className="text-b-sm leading-b-sm font-normal w-12 text-center">
                                                {item.qty}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleQuantityChange(item.sku, item.qty + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {formatCurrency(item.subtotalCents)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card className="w-full border-[1px] border-neutral-300 rounded-[4px] shadow-none">
                <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <strong>{formatCurrency(totals.subtotalCents)}</strong>
                    </div>
                    {totals.discountCents > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Desconto:</span>
                            <strong>- {formatCurrency(totals.discountCents)}</strong>
                        </div>
                    )}
                    <div className="flex justify-between text-lg font-bold pt-4 border-t">
                        <span>Total:</span>
                        <strong>{formatCurrency(totals.subtotalCents - totals.discountCents)}</strong>
                    </div>
                    <Link href="/payment" className="w-full">
                        <Button className="w-full h-[48px]">Finalizar Compra</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
