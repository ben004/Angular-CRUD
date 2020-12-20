import { isEmptyExpression } from '@angular/compiler';
import { Component } from '@angular/core';
import { student } from './interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  value: string = '';
  idsToDelete: number[] = [];
  id: number = 1;
  students: Array<student> = [];
  onKey(event: any) { // without type info
    this.value = event.target.value;
  }

  addStudent() {
    if (this.value !== '') {
      this.students.push({
        id: this.id,
        name: this.value,
        nameLength: this.value.length
      });
      this.id +=1;
      this.value = '';
    }
  }
  editStuent(id) {
    if (this.value !== '') {
      this.students.map((s: student) => {
        if (s.id === id) {
          s.name = this.value;
          s.nameLength = this.value.length;
        }
      });
      this.value = '';
    }
  }

  getStatus(event: any, id: number) {
    if (event.target.checked) {
      if (!this.idsToDelete.includes(id)) {
        this.idsToDelete.push(id);
      }
    } else {
      console.log("in")
      this.idsToDelete = this.idsToDelete.filter((selectedId: number) => selectedId !== id );
    }
    console.log(this.idsToDelete)
  }

  deleteStudent(id: number) {
    this.students = this.students.filter((s) => s.id !== id);
  }

  batchDelete() {
    this.idsToDelete.map((id) => {
      this.students = this.students.filter((s) => s.id !== id);
    });
    this.idsToDelete = [];
  }
}
