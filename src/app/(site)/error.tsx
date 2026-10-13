"use client";

import Link from "next/link";
import { useEffect } from "react";

import { Container } from "@/components/ui/container";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-white py-(--spacing-section)">
      <Container>
        <p className="font-mono text-label text-danger-600 uppercase">Erro</p>
        <h1 className="mt-4 text-h2 text-navy-900">Ocorreu um erro inesperado.</h1>
        <p className="mt-4 max-w-xl text-lead text-steel-600">
          Pedimos desculpa pelo incómodo. Tente novamente ou regresse à página inicial.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center rounded-sm bg-navy-800 px-6 font-medium text-white hover:bg-blue-600"
          >
            Tentar novamente
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center rounded-sm border border-steel-300 px-6 font-medium text-navy-900"
          >
            Página inicial
          </Link>
        </div>
      </Container>
    </section>
  );
}
