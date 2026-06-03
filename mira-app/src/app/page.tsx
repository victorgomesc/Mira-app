import { AppSidebar } from "@/components/app-sidebar";
import { MiraDashboard } from "@/components/mira-dashboard";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h2 className="text-lg font-semibold">Dashboard</h2>
          </div>

          <ThemeToggle />
        </header>

        <main className="p-6">
          <section className="rounded-xl border bg-card p-6 shadow-sm">
            <h1 className="text-2xl font-bold">
              Bem-vindo ao Mira
            </h1>

            <p className="mt-2 text-muted-foreground">
              Organize tarefas, metas, agenda e produtividade em um só lugar.
            </p>
          </section>
          <MiraDashboard />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}