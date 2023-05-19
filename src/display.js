/* eslint-disable no-restricted-syntax */

const taskDivFactory = (name, dueDate, taskId) => {
    const task = document.createElement('div');
    task.classList.add('task');

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'task-checkbox';
    const label = document.createElement('label');
    label.id = `task-${taskId}`;
    label.innerHTML = name;

    leftSection.appendChild(checkbox);
    leftSection.appendChild(label);

    const date = document.createElement('span');
    date.innerHTML = `Due Date: ${dueDate}`;

    const edit = document.createElement('img');
    edit.alt = 'X';

    rightSection.appendChild(date);
    rightSection.appendChild(edit);

    task.appendChild(leftSection);
    task.appendChild(rightSection);

    return task;
};

const projectDivFactory = (name, id) => {
  const project = document.createElement('li');
  project.id = `project-${id}`;
  const projectIcon = document.createElement('img');
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  project.appendChild(projectIcon);
  project.appendChild(projectName);

  return project;
}

const DOM = () => {
  // Sidebar
  const btnInbox = document.getElementById('btn-inbox');
  const btnToday = document.getElementById('btn-today');
  const btnWeek = document.getElementById('btn-week');
  const btnNewProject = document.getElementById('btn-new-project');

  // Task List
  const btnNewTask = document.getElementById('btn-new-task');

  // Create Task Form
  const title = document.getElementById('title-input');
  const description = document.getElementById('description-input');
  const date = document.getElementById('date-input');
  const btnLow = document.getElementById('btn-low');
  const btnMid = document.getElementById('btn-mid');
  const btnHigh = document.getElementById('btn-high');
  const btnAddTask = document.getElementById('btn-add-task');

  // Parent Nodes
  const projectListParent = document.getElementById('project-list');
  const taskListParent = document.querySelector('.task-list');

  // Methods
  function getTitle() {
    return title.value;
  }

  function getDescription() {
    return description.value;
  }

  function getDate() {
    return date.value;
  }

  function taskListAdd(task) {
    taskListParent.appendChild(task);
  }

  function projectListAdd(project) {
    projectListParent.appendChild(project);
  }

  function showTasks(list) {
    while(taskListParent.firstChild) {
      taskListParent.removeChild(taskListParent.firstChild);
    }

    for(const task of list) {
      taskListAdd(taskDivFactory(task.name, task.dueDate, list.indexOf(task)+1));
    }
  }

  function showProjects(list) {
    while(projectListParent.firstChild) {
      projectListParent.removeChild(projectListParent.firstChild);
    }

    for(const project of list) {
      projectListAdd(projectDivFactory(project.name, list.indexOf(project)+1));
    }
  }

  return { btnInbox, btnToday, btnWeek, btnNewProject, btnNewTask, btnLow, 
           btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, getTitle,  
           getDescription, getDate, taskListAdd, projectListAdd, showTasks, showProjects }
};


export default DOM;