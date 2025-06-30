import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Task({ tasks, setTasks }) {
  const removeTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return tasks.map((task) => (
    <Dialog key={task.id}>
      <DialogTrigger asChild>
        <TableRow className="cursor-pointer">
          <TableCell>
            <Checkbox
              className="size-6"
              checked={task.completed}
              onCheckedChange={(checked) => {
                setTasks((prev) =>
                  prev.map((t) =>
                    t.id === task.id ? { ...t, completed: checked } : t
                  )
                );
              }}
              onClick={(e) => e.stopPropagation()} // prevent dialog from opening on checkbox click
            />
          </TableCell>

          <TableCell
            className={`font-medium ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {task.name}
          </TableCell>

          <TableCell
            className={`whitespace-normal break-words ${
              task.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <p className=""> {task.description}</p>
          </TableCell>

          <TableCell className="text-right">
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation(); // prevent dialog from opening
                removeTask(task.id);
              }}
            >
              <X />
            </Button>
          </TableCell>
        </TableRow>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task.name}</DialogTitle>
          <DialogDescription>
            <ul className="my-4 ml-6 list-disc [&>li]:mt-2">
              <li>{task.description}</li>
            </ul>
          </DialogDescription>
          <p className="text-muted-foreground mt-4">
            <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
              Completion status = {task.completed.toString()}
            </code>
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ));
}

function AddTask({ tasks, setTasks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addTask = () => {
    let maxId = tasks.length + 1;
    console.log(maxId);

    const newTask = {
      id: maxId,
      name,
      description,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    console.log(tasks);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="size-12">
          <Plus className="size-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            What do you wish to accomplish today?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="text"
              required
              placeholder="Your Task"
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
            />
            <Input
              type="text"
              required
              placeholder="Description"
              onChange={(e) => {
                setDescription(e.target.value);
                console.log(description);
              }}
            />
          </div>
        </div>
        <DialogFooter className="p-0">
          <div className="flex w-full justify-between items-center">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setName("");
                  setDescription("");
                }}
              >
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => {
                  addTask();
                  setName("");
                  setDescription("");
                }}
              >
                Save
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Home({ tasks, setTasks }) {
  return (
    <>
      <div className="flex flex-col gap-8 items-center p-4 min-h-screen w-full overflow-x-hidden bg-white">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          The Todo List
        </h2>

        <Table className="table-auto w-full max-w-7xl mx-auto px-4">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Completed</TableHead>
              <TableHead className="w-[150px]">Name</TableHead>
              <TableHead className="w-[50ch]">Description</TableHead>
              <TableHead className="w-[80px] text-right">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Task tasks={tasks} setTasks={setTasks} />
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function TodoList({ tasks, setTasks }) {
  return (
    <>
      <Home tasks={tasks} setTasks={setTasks} />
      <div className="fixed bottom-6 right-6 z-50">
        <AddTask tasks={tasks} setTasks={setTasks} />
      </div>
    </>
  );
}

function Pomodoro() {
  return <h2>Landing Page</h2>;
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: "Make add button fields work",
      description:
        "After inputting fields in add task button, make it add a task with those fields as information",
      completed: false,
    },
    {
      id: 2,
      name: "Make delete button work",
      description: "self explanatory",
      completed: false,
    },
    {
      id: 3,
      name: "Add stroke outline for when toggling",
      description:
        "add tailwind stroke and gray out to a task when toggling said task",
      completed: false,
    },
    {
      id: 4,
      name: "Click to see more",
      description:
        "When a task's body is clicked, reveals '''more''' about the task",
      completed: false,
    },
  ]);
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Todolist</Link> | <Link to="/Pomodoro">Pomodoro</Link>
      </nav>
      <Routes>
        <Route
          path="/"
          element={<TodoList tasks={tasks} setTasks={setTasks} />}
        />
        <Route path="/Pomodoro" element={<Pomodoro />} />
        <Route path="*" element={<h2>404 Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
