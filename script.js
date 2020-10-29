'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  headerButton = document.querySelector('.header-button'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
  
// let todoData;
// localStorage.clear();
let todoData = JSON.parse(localStorage.getItem('todoData')) || [];

// if(localStorage.length > 0) {
//   todoData = JSON.parse(localStorage.getItem('todoData'));
// } else {
//   todoData = [];
// }  

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';  

  todoData.forEach(function(item, index) {           
    let li = document.createElement('li');
    li.classList.add('todo-item');  
           
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                  '<div class="todo-buttons">' +
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                  '</div>';    

    
    headerInput.value = '';
    if (item.completed) {
      todoCompleted.append(li);
    } else {    
      todoList.append(li);     
    };      

    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });  

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() {
      li.remove(); 
      todoData.splice(index, 1);
      render();     
    }); 
   
  })
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  if (headerInput.value === '') return;

  let newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  render();
});

window.addEventListener('unload', function () {
  localStorage.setItem('todoData',JSON.stringify(todoData));
});

render();