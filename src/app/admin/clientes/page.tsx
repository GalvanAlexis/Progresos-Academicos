import { getClients } from '@/lib/actions/clients';
import ClientsTable from '@/components/admin/clientes/ClientsTable';

export const metadata = {
  title: 'Gestión de Clientes | Panel Admin',
};

export default async function ClientesPage() {
  const clients = await getClients();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Clientes</h1>
          <p className="text-white/60 mt-1">Administra tu cartera de clientes y su estado.</p>
        </div>
      </div>
      
      <ClientsTable initialClients={clients} />
    </div>
  );
}
