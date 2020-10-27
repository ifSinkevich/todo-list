'use strict';

let todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  headerButton = document.querySelector('.header-button'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');
  
  headerButton.addEventListener('click', function() {
    localStorage.setItem('value', headerInput.value);
  });

const todoData = [
  {
    value: localStorage.getItem('value'),
    completed: false,
  },
];

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function(item) {    
    let li = document.createElement('li');
    li.classList.add('todo-item');  
           
      li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
                  '<div class="todo-buttons">' +
                    '<button class="todo-remove"></button>' +
                    '<button class="todo-complete"></button>' +
                  '</div>';    

    if (item.value === '') return;
    
    if (item.completed) {
      todoCompleted.append(li);
    } else {    
      todoList.append(li);
     
    };  
   
    headerInput.value = '';

    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });  

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click', function() {
      li.remove();      
    }); 
   
  })
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();

  let newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);
  render();
});

render();


