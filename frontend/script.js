// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
  
    // Load existing tasks from the backend
    loadTasks();
  
    // Add task button click event
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText) {
        addTask(taskText);
        taskInput.value = '';
      }
    });
  
    // Function to add a new task
    function addTask(text) {
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: text }),
      })
        .then(response => response.json())
        .then(task => {
          const taskItem = document.createElement('li');
          taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
          taskItem.innerHTML = `
            ${task.description}
            <button class="btn btn-danger btn-sm">Delete</button>
          `;
  
          // Add delete button functionality
          taskItem.querySelector('button').addEventListener('click', () => {
            deleteTask(task.id);
          });
  
          taskList.appendChild(taskItem);
          location.reload();
        })
        .catch(err => console.error('Error:', err));
    }
  
    // Function to delete a task
    function deleteTask(taskId) {
      fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
        .then(() => {
          const taskItem = [...taskList.children].find(item => item.textContent.includes(taskId));
          if (taskItem) {
            taskList.removeChild(taskItem);
          }
          location.reload();
        })
        .catch(err => console.error('Error:', err));
    }
  
    // Function to load tasks from the backend
    function loadTasks() {
      fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
          tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            taskItem.innerHTML = `
              ${task.description}
              <button class="btn btn-danger btn-sm">Delete</button>
            `;
  
            // Add delete button functionality
            taskItem.querySelector('button').addEventListener('click', () => {
              deleteTask(task.id);
            });
  
            taskList.appendChild(taskItem);
          });
        })
        .catch(err => console.error('Error:', err));
    }
  });
  