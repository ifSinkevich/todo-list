'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  headerButton = document.querySelector('.header-button'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
  
  // headerButton.addEventListener('click', function() {
  //   localStorage.setItem('value', headerInput.value);
  // });
  
let todoData = [];
  // todoData.forEach(function(item, index) {     
  //   item[index] = localStorage.getItem('value');  
  // });    

  // });
  // {
  //   value: localStorage.getItem('value'),
  //   completed: false,
  // },

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

render();