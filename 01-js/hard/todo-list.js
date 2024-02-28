/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todoList = [];
  }
  add(todo){
    this.todoList.push(todo)
    return this.todoList;
  }
  remove(indexOfTodo){
    this.todoList.splice(indexOfTodo,1);
    return this.todoList;
  }
  update(index,updatedTodo){
    if (index < 0 || index >= this.todoList.length) {
      return this.todoList;
    }
    this.todoList.splice(index, 1, updatedTodo);
    return this.todoList;
  }
  getAll(){
    return this.todoList;
  }
  get(indexOfTodo){
    if(this.todoList[indexOfTodo] == undefined){
      return null;
    }
    return this.todoList[indexOfTodo];
  }
  clear(){
    this.todoList = [];
    return this.todoList;
  }
}

module.exports = Todo;
