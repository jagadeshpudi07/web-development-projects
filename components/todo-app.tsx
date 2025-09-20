"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2, Plus, Edit2, Check, X } from "lucide-react"

interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("portfolio-todos")
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }))
        setTodos(parsedTodos)
      } catch (error) {
        console.error("Error loading todos from localStorage:", error)
      }
    }
  }, [])

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem("portfolio-todos", JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date(),
      }
      setTodos([todo, ...todos])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEditing = (id: string, text: string) => {
    setEditingId(id)
    setEditText(text)
  }

  const saveEdit = () => {
    if (editText.trim() && editingId) {
      setTodos(todos.map((todo) => (todo.id === editingId ? { ...todo, text: editText.trim() } : todo)))
      setEditingId(null)
      setEditText("")
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText("")
  }

  const completedCount = todos.filter((todo) => todo.completed).length
  const totalCount = todos.length

  return (
    <section id="todo-app" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Interactive Todo App</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A fully functional todo application with local storage persistence. Add, edit, complete, and delete tasks -
            all data is saved locally.
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>My Tasks</span>
              <span className="text-sm font-normal text-muted-foreground">
                {completedCount} of {totalCount} completed
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add new todo */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-1"
              />
              <Button onClick={addTodo} className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>

            {/* Progress bar */}
            {totalCount > 0 && (
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>
            )}

            {/* Todo list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {todos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No tasks yet. Add one above to get started!</p>
                </div>
              ) : (
                todos.map((todo) => (
                  <div
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 ${
                      todo.completed ? "bg-muted/50 border-muted" : "bg-card border-border hover:shadow-sm"
                    }`}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => toggleTodo(todo.id)}
                      className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    />

                    {editingId === todo.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") saveEdit()
                            if (e.key === "Escape") cancelEdit()
                          }}
                          className="flex-1"
                          autoFocus
                        />
                        <Button size="sm" onClick={saveEdit} variant="outline">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" onClick={cancelEdit} variant="outline">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`flex-1 ${
                            todo.completed ? "line-through text-muted-foreground" : "text-foreground"
                          }`}
                        >
                          {todo.text}
                        </span>

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="h-8 w-8 p-0 hover:bg-muted"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteTodo(todo.id)}
                            className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Stats */}
            {totalCount > 0 && (
              <div className="flex justify-between text-sm text-muted-foreground pt-4 border-t">
                <span>{totalCount} total tasks</span>
                <span>{todos.filter((t) => !t.completed).length} remaining</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
