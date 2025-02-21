"use client";

import { Header } from "@/components/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { MdAdd, MdEvent, MdAccessTime, MdPerson, MdDescription } from "react-icons/md";

const tiposCompromisso = [
  { id: "audiencia", label: "Audiência" },
  { id: "reuniao", label: "Reunião" },
  { id: "prazo", label: "Prazo Processual" },
  { id: "despacho", label: "Despacho" },
  { id: "julgamento", label: "Julgamento" },
  { id: "pericia", label: "Perícia" }
];

export default function Agenda() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            Agenda
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie seus compromissos e prazos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <Card className="p-6">
            <div className="space-y-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              <Button className="w-full flex items-center gap-2">
                <MdAdd size={18} />
                Novo Compromisso
              </Button>
            </div>
          </Card>

          {/* Events List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Compromissos do Dia</h2>
                <div className="flex gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposCompromisso.map((tipo) => (
                        <SelectItem key={tipo.id} value={tipo.id}>
                          {tipo.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                {/* Sample Events */}
                <Card className="p-4 border-l-4 border-l-blue-500">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MdEvent className="text-blue-500" />
                        <h3 className="font-medium">Audiência Trabalhista</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdAccessTime />
                        <span>09:00 - 10:30</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdPerson />
                        <span>Cliente: João Silva</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdDescription />
                        <span>Processo nº 1234-56.2024.5.15.0001</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>

                <Card className="p-4 border-l-4 border-l-yellow-500">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <MdEvent className="text-yellow-500" />
                        <h3 className="font-medium">Prazo - Recurso</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdAccessTime />
                        <span>Vence hoje</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdPerson />
                        <span>Cliente: Maria Santos</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <MdDescription />
                        <span>Processo nº 5678-90.2024.8.26.0000</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Upcoming Events */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Próximos Compromissos</h2>
              <div className="space-y-4">
                {/* Add upcoming events list */}
                <div className="flex items-center justify-between p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-purple-500 rounded-lg">
                      <MdEvent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Reunião com Cliente</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Amanhã às 14:00
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}