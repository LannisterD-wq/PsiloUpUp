"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product-card";
import { listProducts, Product } from "@/lib/data/products";
import { addToCart } from "@/lib/data/cart";

const features = [
    {
        icon: "📦",
        title: "ENTREGA RÁPIDA",
        description: "Entrega em até 7 dias",
    },
    {
        icon: "🏆",
        title: "24H DE RETORNO",
        description: "Garantia de 100% de devolução do dinheiro",
    },
    {
        icon: "💳",
        title: "PAGAMENTO SEGURO",
        description: "Seu dinheiro está seguro",
    },
    {
        icon: "🎧",
        title: "SUPORTE 24/7",
        description: "Suporte 24 por dia, por 7 dias na semana",
    },
];

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const prods = await listProducts();
                setProducts(prods);
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            } finally {
                setLoading(false);
            }
        };
        loadProducts();
    }, []);

    const handleAddToCart = (sku: string) => {
        addToCart(sku, 1);
        if (typeof window !== "undefined") {
            window.dispatchEvent(new CustomEvent("psiloup-toast", {
                detail: { message: "Produto adicionado ao carrinho!", type: "success" }
            }));
        }
    };

    const getProductImage = (sku: string) => {
        if (sku === "UP-MIND") return "/images/MIND-removebg-preview.png";
        if (sku === "UP-BURN") return "/images/BURN-removebg-preview.png";
        if (sku === "STACK-DUPLO") return "/images/Stack_Duplo-removebg-preview.png";
        return "/images/placeholder.png";
    };

    return (
        <main className="w-screen flex flex-col items-center justify-center">
            <section className="w-full h-full flex items-center justify-between gap-x-[24px] mt-[60px] md:mt-[0px] py-[24px] px-[5.625%] xl:px-[15.625%]">
                <div className="2xl:w-[872px] 2xl:h-[520px] w-full h-full flex flex-col-reverse md:flex-row items-center justify-center gap-[36px] bg-neutral-300 rounded-[4px] p-[20px] md:p-[50px]">
                    <div className="flex flex-col items-center sm:items-start gap-y-[24px]">
                        <div className="flex flex-col items-center sm:items-start gap-y-[16px]">
                            <div className="flex flex-col items-center sm:items-start">
                                <div className="text-b-sm leading-b-sm font-semibold text-primary">
                                    - NEURO PERFORMANCE NATURAL
                                </div>

                                <h3 className="text-d-05 leading-d-05 md:text-d-04 md:leading-d-04 xl:text-d-03 xl:leading-d-03 font-semibold">
                                    PsiloUp
                                </h3>
                            </div>

                            <p className="text-b-sm leading-b-sm md:text-b-md md:leading-b-md xl:text-b-lg xl:leading-b-lg font-normal text-neutral-700">
                                Suplementos premium inspirados em creators e líderes que precisam de foco limpo, energia inteligente e metabolismo equilibrado todos os dias.
                            </p>
                        </div>

                        <Link
                            href="/shop"
                            className="bg-primary text-white text-b-md leading-b-md font-medium text-nowrap cursor-pointer w-[190px] h-[56px] rounded-[4px] flex items-center justify-center gap-[8px] px-[24px]"
                        >
                            Ver produtos
                        </Link>
                    </div>

                    <div className="max-w-[368px] max-h-[408px] w-full h-full relative">
                        <Image
                            src="/images/PsiloUp_logo_sem_fundo.png"
                            width={368}
                            height={408}
                            alt="Logo PsiloUp"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </div>
                </div>
            </section>

            <section className="w-full flex flex-col items-center justify-center px-[5.625%] xl:px-[15.625%]">
                <div className="w-full grid 2xl:grid-cols-[repeat(4,1fr)] sm:grid-cols-[repeat(2,1fr)]  grid-cols-[repeat(1,1fr)] gap-x-[28px] p-[16px] bg-white border-[1px] border-neutral-300 rounded-[6px]">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="2xl:max-w-[280px] 2xl:w-full flex items-start justify-start p-[16px] gap-x-[16px]"
                        >
                            <span className="text-4xl">{feature.icon}</span>

                            <div className="w-full flex flex-col items-start justify-start gap-y-[4px]">
                                <span className="text-l-03 leading-l-03 font-medium text-neutral-900">
                                    {feature.title}
                                </span>
                                <p className="text-b-ty leading-b-ty lg:text-b-sm lg:leading-b-sm font-normal text-neutral-600">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="w-full flex flex-col items-center justify-center gap-y-[24px] px-[5.625%] xl:px-[15.625%] py-[72px]">
                <div className="w-full flex flex-col md:flex-row items-center justify-between">
                    <h3 className="text-h-03 leading-h-03 font-semibold">
                        Nossos Produtos
                    </h3>
                    <Link
                        href="/shop"
                        className="text-nowrap text-b-sm leading-b-sm font-semibold flex items-center justify-start gap-x-[8px] text-primary"
                    >
                        Ver todos os produtos
                    </Link>
                </div>

                {loading ? (
                    <p>Carregando produtos...</p>
                ) : (
                    <div className="w-full grid grid-cols-[repeat(1,1fr)] sm:grid-cols-[repeat(2,1fr)] md:grid-cols-[repeat(3,1fr)] lg:grid-cols-[repeat(4,1fr)] items-center justify-center gap-6">
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="md:max-w-[248px] w-full h-full border rounded-lg p-4 flex flex-col gap-4"
                            >
                                <div className="relative w-full h-48">
                                    <Image
                                        src={getProductImage(product.sku)}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-semibold">{product.name}</h4>
                                    <p className="text-sm text-neutral-600 line-clamp-2">{product.description}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-primary">
                                        R$ {(product.priceCents / 100).toFixed(2).replace('.', ',')}
                                    </span>
                                    <button
                                        onClick={() => handleAddToCart(product.sku)}
                                        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
                                    >
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
