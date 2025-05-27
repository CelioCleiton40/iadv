"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MdSave, MdArrowBack, MdVisibility, MdPrint } from "react-icons/md";
import Link from "next/link";
import { useClienteStore } from "@/store/useClienteStore"; // Importando a loja
import { toast } from "sonner";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; // Importando o Dialog

export default function NovoCliente() {
  const { clienteData, setClienteData } = useClienteStore();
  const [isModalVisible, setModalVisible] = useState(false);

  const salvarCliente = () => {
    try {
      const clientesExistentes = JSON.parse(localStorage.getItem('clientes') || '[]');
      const novoCliente = {
        id: Date.now().toString(),
        ...clienteData,
      };
      localStorage.setItem('clientes', JSON.stringify([...clientesExistentes, novoCliente]));
      toast.success("Cliente salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar cliente:", error);
      toast.error("Erro ao salvar o cliente. Tente novamente.");
    }
  };

  const imprimirFicha = () => {
    const ficha = document.getElementById('ficha-cliente');
    if (ficha) {
      const janela = window.open('', '_blank');
      janela?.document.write(`
        <html>
          <head>
            <title>Ficha do Cliente</title>
            <style>
              body { font-family: Arial, sans-serif; }
              h1, h2, h3 { color: #333; }
              p { margin: 0; padding: 5px 0; }
            </style>
          </head>
          <body>
            ${ficha?.innerHTML}
          </body>
        </html>
      `);
      janela?.document.close();
      janela?.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Novo Cliente
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Cadastre um novo cliente
            </p>
          </div>
          <Link href="/dashboard/clientes">
            <Button variant="outline" className="flex items-center gap-2">
              <MdArrowBack size={18} />
              Voltar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs defaultValue="dados_pessoais" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="dados_pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="contato">Contato</TabsTrigger>
                  <TabsTrigger value="processos">Processos</TabsTrigger>
                </TabsList>

                <TabsContent value="dados_pessoais">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Tipo de Cliente</Label>
                      <Select onValueChange={(value) => setClienteData({ tipo: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pf">Pessoa Física</SelectItem>
                          <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Nome Completo / Razão Social</Label>
                      <Input
                        placeholder="Digite o nome completo ou razão social"
                        value={clienteData.nome}
                        onChange={(e) => setClienteData({ nome: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>CPF/CNPJ</Label>
                        <Input
                          placeholder="Digite o CPF ou CNPJ"
                          value={clienteData.cpfCnpj}
                          onChange={(e) => setClienteData({ cpfCnpj: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>RG/IE</Label>
                        <Input
                          placeholder="Digite o RG ou Inscrição Estadual"
                          value={clienteData.rgIe}
                          onChange={(e) => setClienteData({ rgIe: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Data de Nascimento / Fundação</Label>
                      <Input
                        type="date"
                        value={clienteData.dataNascimento}
                        onChange={(e) => setClienteData({ dataNascimento: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Estado Civil</Label>
                      <Select onValueChange={(value) => setClienteData({ estadoCivil: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o estado civil" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                          <SelectItem value="casado">Casado(a)</SelectItem>
                          <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                          <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="contato">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Endereço</Label>
                      <Input
                        placeholder="Logradouro"
                        value={clienteData.endereco}
                        onChange={(e) => setClienteData({ endereco: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Número</Label>
                        <Input
                          placeholder="Número"
                          value={clienteData.numero}
                          onChange={(e) => setClienteData({ numero: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Complemento</Label>
                        <Input
                          placeholder="Complemento"
                          value={clienteData.complemento}
                          onChange={(e) => setClienteData({ complemento: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Bairro</Label>
                        <Input
                          placeholder="Bairro"
                          value={clienteData.bairro}
                          onChange={(e) => setClienteData({ bairro: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>CEP</Label>
                        <Input
                          placeholder="CEP"
                          value={clienteData.cep}
                          onChange={(e) => setClienteData({ cep: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Cidade</Label>
                        <Input
                          placeholder="Cidade"
                          value={clienteData.cidade}
                          onChange={(e) => setClienteData({ cidade: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Estado</Label>
                        <Input
                          placeholder="Estado"
                          value={clienteData.estado}
                          onChange={(e) => setClienteData({ estado: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input
                          placeholder="Telefone"
                          value={clienteData.telefone}
                          onChange={(e) => setClienteData({ telefone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Celular</Label>
                        <Input
                          placeholder="Celular"
                          value={clienteData.celular}
                          onChange={(e) => setClienteData({ celular: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        value={clienteData.email}
                        onChange={(e) => setClienteData({ email: e.target.value })}
                      />
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="processos">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label>Área do Direito</Label>
                      <Select onValueChange={(value) => setClienteData({ areaDireito: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trabalhista">Trabalhista</SelectItem>
                          <SelectItem value="civil">Civil</SelectItem>
                          <SelectItem value="previdenciario">Previdenciário</SelectItem>
                          <SelectItem value="tributario">Tributário</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Observações</Label>
                      <Textarea
                        placeholder="Informações adicionais sobre o cliente ou processo"
                        className="min-h-[150px]"
                        value={clienteData.observacoes}
                        onChange={(e) => setClienteData({ observacoes: e.target.value })}
                      />
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Ações</h3>
              <div className="space-y-4">
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={salvarCliente}
                >
                  <MdSave size={18} />
                  Salvar Cliente
                </Button>
                <Button
                  className="w-full flex items-center gap-2"
                  onClick={() => setModalVisible(true)}
                >
                  <MdVisibility size={18} />
                  Ver Detalhes
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialog de Detalhes do Cliente */}
      <Dialog open={isModalVisible} onOpenChange={setModalVisible}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ficha do Cliente</DialogTitle>
          </DialogHeader>
          <div id="ficha-cliente">
            <p><strong>Tipo:</strong> {clienteData.tipo}</p>
            <p><strong>Nome:</strong> {clienteData.nome}</p>
            <p><strong>CPF/CNPJ:</strong> {clienteData.cpfCnpj}</p>
            <p><strong>RG/IE:</strong> {clienteData.rgIe}</p>
            <p><strong>Data de Nascimento/Fundação:</strong> {clienteData.dataNascimento}</p>
            <p><strong>Estado Civil:</strong> {clienteData.estadoCivil}</p>
            <p><strong>Endereço:</strong> {clienteData.endereco}, {clienteData.numero}, {clienteData.complemento}</p>
            <p><strong>Bairro:</strong> {clienteData.bairro}</p>
            <p><strong>CEP:</strong> {clienteData.cep}</p>
            <p><strong>Cidade:</strong> {clienteData.cidade}</p>
            <p><strong>Estado:</strong> {clienteData.estado}</p>
            <p><strong>Telefone:</strong> {clienteData.telefone}</p>
            <p><strong>Celular:</strong> {clienteData.celular}</p>
            <p><strong>Email:</strong> {clienteData.email}</p>
            <p><strong>Área do Direito:</strong> {clienteData.areaDireito}</p>
            <p><strong>Observações:</strong> {clienteData.observacoes}</p>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setModalVisible(false)}>
              Fechar
            </Button>
            <Button onClick={imprimirFicha}>
              <MdPrint size={18} />
              Imprimir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}