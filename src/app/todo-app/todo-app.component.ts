import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
const ELEMENT_DATA:[] = []
@Component({
  selector: 'app-todo-app',
  templateUrl: './todo-app.component.html',
  styleUrls: ['./todo-app.component.scss']
})
export class TodoAppComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([])
  title = 'angular-todo-assignment';
  displayedColumns:any[]=['sn', 'todo','edit'];
  @ViewChild('todo_name', {static: true}) todo_name: ElementRef;
  @ViewChild('edit_todo', {static: true}) edit_todo: ElementRef;
  mytodo:string="";

  constructor(todo_name: ElementRef,
    edit_todo: ElementRef){
    this.todo_name=todo_name;
    this.edit_todo=edit_todo;
  }

  ngOnInit(){
    this.fetchTodo()
  }

  onEnterPress(event: { keyCode: any; preventDefault: () => void; }):void{
    if (event.keyCode === 13) {
			// event.preventDefault();
      this.addTodo()
      this.todo_name.nativeElement.value="";
		  }
  }

  fetchTodo(){
    if (localStorage.getItem('todos')){
      var storedTodos = JSON.parse(localStorage.getItem("todos") || '{}');
      console.log(storedTodos)
      this.dataSource = new MatTableDataSource<any>(storedTodos)
      }
  }

  deleteTodo(element:any) {
    let newList=[...this.dataSource.filteredData];
    newList = newList.filter(e =>
      e.id != element.id
    )
    this.dataSource = new MatTableDataSource<any>(newList)
    localStorage.setItem("todos", JSON.stringify(newList));
  }

  addTodo(){
    let newList=[...this.dataSource.filteredData];
    this.mytodo = this.todo_name.nativeElement.value;
    if(this.mytodo){
      newList.push({id:Math.random().toPrecision(5), todo: this.mytodo , isEditable: false})
      this.dataSource = new MatTableDataSource<any>(newList)
      localStorage.setItem("todos", JSON.stringify(newList));
    }
  }


  editTodo(element: { id: number; todo: string; isEditable:boolean}){
    this.dataSource= new MatTableDataSource<any>(this.dataSource.filteredData.map(x => {
      if (x.id == element.id){
        x.isEditable = true;
        }
        return x;
      })
    )
    localStorage.setItem("todos", JSON.stringify(this.dataSource.filteredData));
  }

  updateTodo(element: { id: any; todo: string; }){
    this.dataSource= new MatTableDataSource<any>(this.dataSource.filteredData.map(x => {
      if (x.id == element.id){
        // x.todo = element.todo
        x.isEditable = false;
      }
      return x;
      })
    )
    localStorage.setItem("todos", JSON.stringify(this.dataSource.filteredData));
  }

}
