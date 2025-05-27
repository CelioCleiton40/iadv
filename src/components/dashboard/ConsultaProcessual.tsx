'use client';

import { useProcessoStore } from '@/store/processoStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MdSearch, MdClear } from 'react-icons/md';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ConsultaProcessual() {
  const { consulta, updateSearchTerm, updateSearchType, realizarConsulta, limparResultados } = useProcessoStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    realizarConsulta();
  };

  return (
    <div className="w-full space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Consulta Processual</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Select
              value={consulta.data.tipo}
              onValueChange={(value: 'cpf' | 'nome' | 'numero') => updateSearchType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo de busca" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="numero">Número do Processo</SelectItem>
                <SelectItem value="cpf">CPF</SelectItem>
                <SelectItem value="nome">Nome</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Pesquisar por ${consulta.data.tipo}...`}
                value={consulta.data.termo}
                onChange={(e) => updateSearchTerm(e.target.value)}
              />
            </div>

            <Button type="submit" disabled={consulta.loading}>
              {consulta.loading ? (
                'Consultando...'
              ) : (
                <>
                  <MdSearch className="mr-2" /> Consultar
                </>
              )}
            </Button>

            {consulta.resultados.length > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={limparResultados}
                className="px-3"
              >
                <MdClear />
              </Button>
            )}
          </form>

          {consulta.error && (
            <p className="mt-2 text-sm text-red-500">{consulta.error}</p>
          )}
        </CardContent>
      </Card>

      {consulta.resultados.length > 0 && (
        <div className="space-y-4">
          {consulta.resultados.map((processo) => (
            <Card key={processo.numero}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Processo nº {processo.numero}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {processo.vara} - {processo.comarca}/{processo.uf}
                    </p>
                  </div>
                  <Badge
                    variant={processo.status === 'Em andamento' ? 'default' : 'secondary'}
                  >
                    {processo.status}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Partes do Processo</p>
                    <p className="text-sm mt-1">
                      <span className="text-gray-600 dark:text-gray-400">Autor:</span>{' '}
                      {processo.partes.autor}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Réu:</span>{' '}
                      {processo.partes.reu}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Datas</p>
                    <p className="text-sm mt-1">
                      <span className="text-gray-600 dark:text-gray-400">
                        Distribuição:
                      </span>{' '}
                      {format(new Date(processo.dataDistribuicao), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Último movimento:
                      </span>{' '}
                      {format(new Date(processo.ultimoMovimento.data), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium">Última Movimentação</p>
                  <p className="text-sm mt-1 text-gray-600 dark:text-gray-400">
                    {processo.ultimoMovimento.descricao}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}