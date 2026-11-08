"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useTasks } from '@/hooks/use-tasks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Target, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskListProps {
  isFocusMode: boolean;
}

export function TaskList({ isFocusMode }: TaskListProps) {
  const { tasks, selectedTaskId, addTask, toggleTask, deleteTask, selectTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const activeTask = tasks.find(t => t.id === selectedTaskId);

  if (isFocusMode) {
    return (
      <Card className="w-full max-w-md border-none shadow-none bg-transparent animate-in fade-in slide-in-from-right-4 duration-1000">
        <CardContent className="p-0 flex flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-primary/10 border-2 border-primary/20 text-primary shadow-sm">
            <Target className="h-4 w-4" />
            <span className="text-[12px] font-black uppercase tracking-[0.2em]">Current Focus</span>
          </div>
          {activeTask ? (
            <div className="flex flex-col items-center gap-6">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">{activeTask.title}</h3>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => toggleTask(activeTask.id)}
                className="h-14 px-8 rounded-full border-2 font-black text-[12px] tracking-[0.2em] uppercase hover:bg-primary/5 shadow-lg active:scale-95 transition-all"
              >
                <CheckCircle2 className="mr-3 h-5 w-5" /> COMPLETE TASK
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground text-[12px] font-black uppercase tracking-[0.3em] text-center opacity-60 bg-muted/20 px-8 py-4 rounded-3xl border-2 border-dashed">
              No active task selected
            </p>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full border-2 shadow-xl bg-card rounded-[2.5rem] overflow-hidden flex flex-col animate-in fade-in slide-in-from-right-4 duration-700 max-w-[560px]">
      <CardHeader className="p-8 pb-4">
        <CardTitle className="font-headline text-xl font-black flex items-center gap-3">
          TASK MANAGER
          <span className="text-[11px] bg-primary/10 text-primary px-3 py-1 rounded-full border border-primary/20 shadow-inner">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8 pt-0 flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center gap-3 w-full group">
          <div className="relative flex-1 flex">
            <Input
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="What's Next Goal?"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              className="h-12 w-full text-sm rounded-xl font-bold border-2 bg-muted/30 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary transition-all duration-300 shadow-sm px-4 pr-10 hover:bg-muted/40 flex items-center pt-[5px]"
            />
          </div>
          <Button 
            onClick={handleAddTask} 
            className="h-12 w-12 shrink-0 rounded-xl shadow-lg border-2 border-primary/50 bg-primary hover:scale-105 transition-transform" 
            size="icon"
            disabled={!newTaskTitle.trim()}
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <ul className="space-y-3 pb-4">
            {tasks.length === 0 ? (
              <div className="h-48 flex flex-col items-center justify-center text-center opacity-40 border-2 border-dashed rounded-[2rem] p-6">
                <Target className="h-10 w-10 mb-3" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Your task list is empty</p>
              </div>
            ) : (
              tasks.map((task) => (
                <li 
                  key={task.id} 
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300",
                    selectedTaskId === task.id ? "bg-primary/5 border-primary/40 shadow-sm" : "bg-muted/20 border-transparent hover:border-muted-foreground/20"
                  )}
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="h-5 w-5 rounded-lg border-2"
                  />
                  <div 
                    className="flex-1 cursor-pointer overflow-hidden"
                    onClick={() => selectTask(task.id)}
                  >
                    <p className={cn(
                      "text-sm font-bold transition-all truncate",
                      task.completed ? "line-through text-muted-foreground/60" : "text-foreground",
                      selectedTaskId === task.id && !task.completed ? "text-primary" : ""
                    )}>
                      {task.title}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))
            )}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}