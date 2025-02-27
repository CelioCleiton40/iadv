import { Card } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          Termos de Serviço
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Ao acessar e usar o iAdv, você concorda em cumprir estes Termos de Serviço. 
              Se você não concordar com qualquer parte destes termos, não poderá usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">2. Descrição do Serviço</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              O iAdv é uma plataforma de gestão para advogados e escritórios de advocacia, 
              oferecendo ferramentas para gerenciamento de processos, clientes e rotinas diárias.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">3. Conta do Usuário</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>Você é responsável por manter a confidencialidade de sua conta</li>
              <li>As informações fornecidas devem ser precisas e atualizadas</li>
              <li>O acesso é pessoal e intransferível</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">4. Privacidade e Segurança</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Protegemos suas informações de acordo com nossa Política de Privacidade 
              e as leis de proteção de dados aplicáveis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">5. Uso do Serviço</h2>
            <ul className="list-disc pl-6 text-slate-600 dark:text-slate-400 space-y-2">
              <li>O serviço deve ser usado apenas para fins legais</li>
              <li>É proibido usar o serviço para atividades fraudulentas</li>
              <li>O usuário deve respeitar os direitos de propriedade intelectual</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">6. Pagamentos e Reembolsos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Os termos de pagamento, cancelamento e reembolso estão sujeitos ao 
              plano contratado e às políticas vigentes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              O iAdv não se responsabiliza por perdas ou danos indiretos decorrentes 
              do uso ou impossibilidade de uso do serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">8. Modificações dos Termos</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer momento, 
              notificando os usuários sobre alterações significativas.
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Última atualização: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}