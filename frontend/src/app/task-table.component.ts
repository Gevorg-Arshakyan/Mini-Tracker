import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, CheckboxModule, ButtonModule, TagModule],
  templateUrl: './task-table.component.html'
})
export class TaskTableComponent {
  @Input({ required: true }) tasks: Task[] = [];
  @Output() onToggle = new EventEmitter<{ task: Task, value: boolean }>();
  @Output() onDelete = new EventEmitter<Task>();

  protected readonly taskService = inject(TaskService);
}


