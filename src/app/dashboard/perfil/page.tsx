"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { MdPerson, MdEdit, MdSave, MdLock } from "react-icons/md";
import { usePerfilStore } from "@/store/perfilStore";
import { toast } from "sonner"
import { useEffect } from "react";

export default function Perfil() {
  const {
    perfil,
    updateField,
    validateAndSave,
    perfilSenha,
    updatePerfilSenha,
    validateAndSaveSenha,
  } = usePerfilStore();

  // Busca os dados ao carregar
  useEffect(() => {
    const loadPerfil = async () => {
      try {
        await usePerfilStore.getState().fetchPerfil();
      } catch (error) {
        console.error("Erro ao carregar perfil");
      }
    };

    loadPerfil();
  }, []);

  const handleSaveDadosPessoais = async () => {
    const isValid = await validateAndSave();
    if (isValid) {
      toast.success("Perfil salvo com sucesso!");
    } else {
      toast.error("Verifique os campos com erro.");
    }
  };

  const handleSaveSenha = async () => {
    const isValid = await validateAndSaveSenha();
    if (isValid) {
      toast.success("Senha alterada com sucesso!");
    } else {
      toast.error("Verifique os campos com erro.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Meu Perfil
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie suas informações pessoais e profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Informações do Perfil */}
          <Card className="p-6 lg:col-span-1">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-32 w-32 ring-4 ring-offset-4 ring-slate-200 dark:ring-slate-800">
                <AvatarImage src="/avatars/user.png" alt="Foto do usuário" />
                <AvatarFallback className="bg-slate-100 dark:bg-slate-800">
                  <MdPerson className="h-16 w-16 text-slate-600 dark:text-slate-400" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                  {perfil.data.nome || "Nome não definido"}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  OAB/{perfil.data.estado} {perfil.data.oab}
                </p>
              </div>
              <Button variant="outline" className="w-full" disabled>
                <MdEdit className="mr-2 h-4 w-4" /> Alterar Foto
              </Button>
            </div>
          </Card>

          {/* Abas do Perfil */}
          <div className="lg:col-span-3">
            <Card className="p-6">
              <Tabs defaultValue="dados_pessoais" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="dados_pessoais">Dados Pessoais</TabsTrigger>
                  <TabsTrigger value="profissional">Dados Profissionais</TabsTrigger>
                  <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                </TabsList>

                {/* Dados Pessoais */}
                <TabsContent value="dados_pessoais">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveDadosPessoais();
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Nome Completo</Label>
                        <Input
                          value={perfil.data.nome}
                          onChange={(e) => updateField("nome", e.target.value)}
                          placeholder="Seu nome completo"
                        />
                        {perfil.errors.nome && (
                          <span className="text-red-500 text-sm">{perfil.errors.nome}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>CPF</Label>
                        <Input
                          value={perfil.data.cpf}
                          onChange={(e) => updateField("cpf", e.target.value)}
                          placeholder="12345678901"
                        />
                        {perfil.errors.cpf && (
                          <span className="text-red-500 text-sm">{perfil.errors.cpf}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={perfil.data.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="seu@email.com"
                        />
                        {perfil.errors.email && (
                          <span className="text-red-500 text-sm">{perfil.errors.email}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Telefone</Label>
                        <Input
                          value={perfil.data.telefone}
                          onChange={(e) => updateField("telefone", e.target.value)}
                          placeholder="84999887766"
                        />
                        {perfil.errors.telefone && (
                          <span className="text-red-500 text-sm">
                            {perfil.errors.telefone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data de Nascimento</Label>
                        <Input
                          type="date"
                          value={perfil.data.dataNascimento.split("T")[0]}
                          onChange={(e) =>
                            updateField(
                              "dataNascimento",
                              `${e.target.value}T00:00:00.000Z`
                            )
                          }
                        />
                        {perfil.errors.dataNascimento && (
                          <span className="text-red-500 text-sm">
                            {perfil.errors.dataNascimento}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Estado Civil</Label>
                        <Input
                          value={perfil.data.estadoCivil}
                          onChange={(e) => updateField("estadoCivil", e.target.value)}
                          placeholder="Solteiro/Casado/etc"
                        />
                        {perfil.errors.estadoCivil && (
                          <span className="text-red-500 text-sm">
                            {perfil.errors.estadoCivil}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6"
                      onClick={handleSaveDadosPessoais}
                      disabled={perfil.loading}
                    >
                      {perfil.loading ? (
                        "Salvando..."
                      ) : (
                        <>
                          <MdSave className="mr-2 h-4 w-4" /> Salvar Alterações
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Dados Profissionais */}
                <TabsContent value="profissional">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveDadosPessoais();
                    }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Número OAB</Label>
                        <Input
                          value={perfil.data.oab}
                          onChange={(e) => updateField("oab", e.target.value)}
                          placeholder="123456"
                        />
                        {perfil.errors.oab && (
                          <span className="text-red-500 text-sm">{perfil.errors.oab}</span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Seccional</Label>
                        <Input
                          value={perfil.data.estado}
                          onChange={(e) => updateField("estado", e.target.value.toUpperCase())}
                          placeholder="RN"
                        />
                        {perfil.errors.estado && (
                          <span className="text-red-500 text-sm">{perfil.errors.estado}</span>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Áreas de Atuação</Label>
                      <Input
                        value={perfil.data.especialidade}
                        onChange={(e) => updateField("especialidade", e.target.value)}
                        placeholder="Direito Penal, Direito Familiar"
                      />
                      {perfil.errors.especialidade && (
                        <span className="text-red-500 text-sm">
                          {perfil.errors.especialidade}
                        </span>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label>Escritório</Label>
                      <Input
                        value={perfil.data.escritorio}
                        onChange={(e) => updateField("escritorio", e.target.value)}
                        placeholder="Oliveira Advocacia"
                      />
                      {perfil.errors.escritorio && (
                        <span className="text-red-500 text-sm">
                          {perfil.errors.escritorio}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Data de Inscrição OAB</Label>
                        <Input
                          type="date"
                          value={perfil.data.dataInscricaoOAB?.split("T")[0] || ""}
                          onChange={(e) =>
                            updateField(
                              "dataInscricaoOAB",
                              `${e.target.value}T00:00:00.000Z`
                            )
                          }
                        />
                        {perfil.errors.dataInscricaoOAB && (
                          <span className="text-red-500 text-sm">
                            {perfil.errors.dataInscricaoOAB}
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Situação</Label>
                        <Input
                          value={perfil.data.situacao}
                          onChange={(e) => updateField("situacao", e.target.value)}
                          placeholder="Ativa"
                        />
                        {perfil.errors.situacao && (
                          <span className="text-red-500 text-sm">
                            {perfil.errors.situacao}
                          </span>
                        )}
                      </div>
                    </div>

                    <Button
                      className="w-full mt-6"
                      onClick={handleSaveDadosPessoais}
                      disabled={perfil.loading}
                    >
                      {perfil.loading ? (
                        "Salvando..."
                      ) : (
                        <>
                          <MdSave className="mr-2 h-4 w-4" /> Salvar Alterações
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                {/* Segurança */}
                <TabsContent value="seguranca">
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveSenha();
                    }}
                  >
                    <div className="space-y-2">
                      <Label>Senha Atual</Label>
                      <Input
                        type="password"
                        value={perfilSenha.data.senhaAtual}
                        onChange={(e) => updatePerfilSenha("senhaAtual", e.target.value)}
                        placeholder="••••••••"
                      />
                      {perfilSenha.errors.senhaAtual && (
                        <span className="text-red-500 text-sm">
                          {perfilSenha.errors.senhaAtual}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Nova Senha</Label>
                      <Input
                        type="password"
                        value={perfilSenha.data.novaSenha}
                        onChange={(e) => updatePerfilSenha("novaSenha", e.target.value)}
                        placeholder="••••••••"
                      />
                      {perfilSenha.errors.novaSenha && (
                        <span className="text-red-500 text-sm">
                          {perfilSenha.errors.novaSenha}
                        </span>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Confirmar Nova Senha</Label>
                      <Input
                        type="password"
                        value={perfilSenha.data.confirmarSenha}
                        onChange={(e) => updatePerfilSenha("confirmarSenha", e.target.value)
                        }
                        placeholder="••••••••"
                      />
                      {perfilSenha.errors.confirmarSenha && (
                        <span className="text-red-500 text-sm">
                          {perfilSenha.errors.confirmarSenha}
                        </span>
                      )}
                    </div>

                    <Button
                      className="w-full mt-6"
                      onClick={handleSaveSenha}
                      disabled={perfilSenha.loading}
                    >
                      {perfilSenha.loading ? (
                        "Alterando..."
                      ) : (
                        <>
                          <MdLock className="mr-2 h-4 w-4" /> Alterar Senha
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}