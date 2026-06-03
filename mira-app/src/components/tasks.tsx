"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Task = {
  id: string;
  title: string;
  completed: boolean;
};

type Filter = "all" | "pending" | "completed";

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  function addTask() {
    if (!title.trim()) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTitle("");
  }

  function toggleTask(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function removeTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  const filteredTasks = useMemo(() => {
    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [tasks, filter]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <section className="w-full rounded-3xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
          Tarefas
        </p>

        <h2 className="text-2xl font-bold">Organize seu dia</h2>

        <p className="text-sm text-muted-foreground">
          Crie, conclua e acompanhe suas tarefas diárias.
        </p>
      </div>

      <div className="mb-6 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border bg-background p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="mt-1 text-2xl font-bold">{tasks.length}</p>
        </div>

        <div className="rounded-2xl border bg-background p-4">
          <p className="text-sm text-muted-foreground">Pendentes</p>
          <p className="mt-1 text-2xl font-bold">{pendingTasks}</p>
        </div>

        <div className="rounded-2xl border bg-background p-4">
          <p className="text-sm text-muted-foreground">Concluídas</p>
          <p className="mt-1 text-2xl font-bold">{completedTasks}</p>
        </div>
      </div>

      <div className="mb-5 flex gap-2">
        <Input
          placeholder="Digite uma nova tarefa..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") addTask();
          }}
        />

        <Button onClick={addTask}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          Todas
        </Button>

        <Button
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
        >
          Pendentes
        </Button>

        <Button
          variant={filter === "completed" ? "default" : "outline"}
          onClick={() => setFilter("completed")}
        >
          Concluídas
        </Button>
      </div>

      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="rounded-2xl border border-dashed bg-background p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Nenhuma tarefa encontrada.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between gap-3 rounded-2xl border bg-background p-4"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className="flex flex-1 items-center gap-3 text-left"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}

                <span
                  className={
                    task.completed
                      ? "text-muted-foreground line-through"
                      : "text-foreground"
                  }
                >
                  {task.title}
                </span>
              </button>

              <Button
                size="icon"
                variant="ghost"
                onClick={() => removeTask(task.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}