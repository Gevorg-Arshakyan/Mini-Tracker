import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TaskTableComponent } from './task-table.component';
import { TaskService } from './task.service';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ButtonModule, DialogModule, InputTextModule, ToolbarModule, CardModule, ConfirmDialogModule, ToastModule, TagModule, TaskTableComponent],
  templateUrl: './app.component.html',
  styles: [
    `
    .container { padding: 16px; }
    .toolbar { margin-bottom: 12px; }
    td, th { vertical-align: middle; }
    `
  ],
})
export class App {
  private readonly taskService = inject(TaskService);
  private readonly confirm = inject(ConfirmationService);
  private readonly messages = inject(MessageService);
  protected tasks = signal<Task[]>([]);
  protected addDialogVisible = false;
  protected newTitle = '';

  constructor() {
    this.loadTasks();
  }

  protected loadTasks() {
    this.taskService.getTasks().subscribe(list => this.tasks.set(list));
  }

  protected openAddDialog() { this.addDialogVisible = true; }

  protected createTask() {
    const title = this.newTitle.trim();
    if (!title) { return; }
    this.taskService.createTask({ title }).subscribe(task => {
      this.tasks.update(arr => [task, ...arr]);
      this.newTitle = '';
      this.addDialogVisible = false;
      this.messages.add({ severity: 'success', summary: 'Создано', detail: 'Задача добавлена' });
    });
  }

  protected toggleCompleted(task: Task, value: boolean) {
    const id = this.taskService.getTaskId(task);
    this.taskService.updateTask(id, { completed: value }).subscribe(updated => {
      const updatedId = this.taskService.getTaskId(updated);
      this.tasks.update(arr => arr.map(t => this.taskService.getTaskId(t) === updatedId ? updated : t));
      this.messages.add({ severity: 'success', summary: 'Обновлено', detail: value ? 'Отмечено выполненной' : 'Снята отметка' });
    });
  }

  protected deleteTask(task: Task) {
    this.confirm.confirm({
      message: `Удалить задачу "${task.title}"?`,
      header: 'Подтверждение',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Удалить',
      rejectLabel: 'Отмена',
      accept: () => {
        const id = this.taskService.getTaskId(task);
        this.taskService.deleteTask(id).subscribe(() => {
          this.tasks.update(arr => arr.filter(t => this.taskService.getTaskId(t) !== id));
          this.messages.add({ severity: 'success', summary: 'Удалено', detail: 'Задача удалена' });
        });
      }
    });
  }
}
