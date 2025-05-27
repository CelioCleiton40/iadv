import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MdPerson, MdEdit } from "react-icons/md";
import { usePerfilStore } from "@/store/perfilStore";

export function PerfilSidebar() {
  const { perfil } = usePerfilStore();

  return (
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
  );
}