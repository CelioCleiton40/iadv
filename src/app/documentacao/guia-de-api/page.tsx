"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MdArrowBack, MdCode, MdContentCopy } from "react-icons/md";
import Link from "next/link";

export default function GuiaApiPage() {
  const endpoints = [
    {
      method: "GET",
      path: "/api/processos",
      description: "Lista todos os processos",
      example: `fetch('https://api.iadvmanager.com/processos', {
  headers: {
    'Authorization': 'Bearer seu_token'
  }
})`,
      response: `{
  "processos": [
    {
      "id": "123",
      "numero": "0001234-56.2024.8.26.0100",
      "status": "Em andamento"
    }
  ]
}`
    },
    {
      method: "POST",
      path: "/api/clientes",
      description: "Cadastra um novo cliente",
      example: `fetch('https://api.iadvmanager.com/clientes', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer seu_token',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nome: 'João Silva',
    email: 'joao@email.com'
  })
})`,
      response: `{
  "id": "456",
  "nome": "João Silva",
  "email": "joao@email.com"
}`
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/documentacao">
                <MdArrowBack className="h-6 w-6" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                Guia de API
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                Documentação completa para integração com a API
              </p>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Autenticação
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Todas as requisições devem incluir um token JWT no header Authorization.
              </p>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                <code className="text-sm text-slate-800 dark:text-slate-200">
                  Authorization: Bearer seu_token
                </code>
              </div>
            </Card>
          </motion.div>

          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={endpoint.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${endpoint.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 
                          'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-slate-800 dark:text-slate-200">{endpoint.path}</code>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400">{endpoint.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">Exemplo</h3>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(endpoint.example)}
                        >
                          <MdContentCopy className="h-4 w-4" />
                        </Button>
                      </div>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-800 dark:text-slate-200">
                          {endpoint.example}
                        </code>
                      </pre>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">Resposta</h3>
                      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                        <code className="text-sm text-slate-800 dark:text-slate-200">
                          {endpoint.response}
                        </code>
                      </pre>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-6">
            <Button variant="outline" asChild>
              <Link href="/documentacao">
                <MdArrowBack className="mr-2" />
                Voltar para Documentação
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}