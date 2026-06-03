"use client"

import { useState } from "react"
import { Plus, Trash2, ListTodo, Calendar, Settings } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"

type Task = {
  id: number
  title: string
  done: boolean
}

const menuItems = [
  {
    title: "Início",
    icon: Home,
  },
  {
    title: "Tarefas",
    icon: ListTodo,
  },
  {
    title: "Calendário",
    icon: Calendar,
  },
  {
    title: "Configurações",
    icon: Settings,
  },
]

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("")
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Estudar Next.js", done: false },
    { id: 2, title: "Criar tela inicial", done: true },
  ])

  function addTask() {
    if (!taskTitle.trim()) return

    const newTask: Task = {
      id: Date.now(),
      title: taskTitle,
      done: false,
    }

    setTasks([...tasks, newTask])
    setTaskTitle("")
  }

  function toggleTask(id: number) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    )
  }

  function removeTask(id: number) {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task) => task.done).length
  const pendingTasks = totalTasks - completedTasks

  return (
    <SidebarProvider>
      <main className="flex min-h-screen bg-background text-foreground">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Mira</SidebarGroupLabel>

              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="mx-auto max-w-4xl flex-1 space-y-8 p-6">
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Nuvio</h1>
              <p className="text-muted-foreground">
                Seu assistente pessoal de produtividade
              </p>
            </div>

            <ModeToggle />
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{totalTasks}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pendentes</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{pendingTasks}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Concluídas</CardTitle>
              </CardHeader>
              <CardContent className="text-3xl font-bold">{completedTasks}</CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Nova tarefa</CardTitle>
            </CardHeader>

            <CardContent className="flex gap-2">
              <Input
                placeholder="Digite uma tarefa..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
              />

              <Button onClick={addTask}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Minhas tarefas</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={task.done}
                      onCheckedChange={() => toggleTask(task.id)}
                    />

                    <span className={task.done ? "line-through text-muted-foreground" : ""}>
                      {task.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={task.done ? "default" : "secondary"}>
                      {task.done ? "Concluída" : "Pendente"}
                    </Badge>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </SidebarProvider>
  )
}