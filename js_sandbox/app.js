// Set local storage item
// local storage persists until cookies cleared
// localStorage.setItem('name', 'Sawyer');
// localStorage.setItem('age', '25');

// Set session storage item
// session storage is cleared when window closes or leave website
// sessionStorage.setItem('name', 'Emma');

// Remove from storage
// localStorage.removeItem('name');

// Get from storage
// const name = localStorage.getItem('name');
// const age = localStorage.getItem('age');

// // Clear local storage
// localStorage.clear();
// console.log(name + '\nAge: ' + age);

document.querySelector('form').addEventListener('submit', function(e) {
  const task = document.querySelector('#task').value;

  let tasks;

  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
  alert('Task Saved');

  e.preventDefault();
});

const tasks = JSON.parse(localStorage.getItem('tasks'));

tasks.forEach(function(task) {
  console.log(task);
});
