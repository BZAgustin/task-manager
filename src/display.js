/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */

const taskDivFactory = (name, dueDate, taskId, editHandler) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = `task-${taskId}`;

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `task-${taskId}-checkbox`;
    const label = document.createElement('label');
    label.innerHTML = name;

    leftSection.appendChild(checkbox);
    leftSection.appendChild(label);

    const date = document.createElement('span');
    if(dueDate === '') {
      date.innerHTML = `No due date`;
    } else {
      date.innerHTML = `Due Date: ${dueDate.getUTCDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
    }
    
    const edit = document.createElement('img');
    edit.addEventListener('click', editHandler);
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.addEventListener('click', () => { 
      document.getElementById(`task-${taskId}`).remove();
    });
    remove.dataset.index = taskId;
    remove.alt = 'X';
    remove.id = `remove-task-${taskId}`;

    rightSection.appendChild(date);
    rightSection.appendChild(edit);
    rightSection.appendChild(remove);

    task.appendChild(leftSection);
    task.appendChild(rightSection);

    return task;
};

const projectDivFactory = (name, projectId) => {
  const project = document.createElement('li');
  project.id = `project-${projectId}`;
  project.dataset.index = projectId;
  const projectIcon = document.createElement('img');
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  const deleteIcon = document.createElement('img');
  deleteIcon.alt = 'X';
  deleteIcon.addEventListener('click', () => {
    document.getElementById(`project-${projectId}`).remove();
  })
  project.appendChild(projectIcon);
  project.appendChild(projectName);
  project.appendChild(deleteIcon);

  return project;
}

const DOM = () => {
  // Sidebar
  const btnInbox = document.getElementById('btn-inbox');
  const btnToday = document.getElementById('btn-today');
  const btnWeek = document.getElementById('btn-week');
  
  // Add new project
  const btnNewProject = document.getElementById('btn-new-project');
  const inputContainer = document.getElementById('input-container');
  const projectNameInput = document.getElementById('project-name-input');
  const btnConfirmProject = document.getElementById('btn-confirm-project-name');

  // Task List
  const btnNewTask = document.getElementById('btn-new-task');

  // 'Create Task' Form
  const container = document.querySelector('.create-task');
  const title = document.getElementById('title-input');
  const description = document.getElementById('description-input');
  const date = document.getElementById('date-input');
  const btnLow = document.getElementById('btn-low');
  const btnMid = document.getElementById('btn-mid');
  const btnHigh = document.getElementById('btn-high');
  const btnAddTask = document.getElementById('btn-add-task');


  // 'Edit Task' Form
  const taskOverlay = document.querySelector('.overlay-container');
  const titleEdit = document.getElementById('title-input-edit');
  const descriptionEdit = document.getElementById('description-input-edit');
  const dateEdit = document.getElementById('date-input-edit');
  const btnConfirmEdit = document.getElementById('btn-confirm-edit');

  // Parent Nodes
  const projectListParent = document.getElementById('project-list');
  const taskListParent = document.querySelector('.task-list');

  // Methods (projects)
  function getProjectName() {
    return projectNameInput.value;
  }

  // Methods (tasks)
  function getTaskName() {
    return title.value;
  }

  function setTaskName(newName) {
    title.value = newName;
  }

  function getDescription() {
    return description.value;
  }

  function setDescription(newDescription) {
    description.value = newDescription;
  }

  function getDate() {
    return date.value;
  }

  function setDate(newDate) {
    date.value = newDate;
  }

  return { btnInbox, btnToday, btnWeek, btnNewProject, container, inputContainer, projectNameInput, taskOverlay, btnConfirmProject, btnNewTask,
           btnLow, btnMid, btnHigh, btnAddTask, projectListParent, taskListParent, getTaskName, setTaskName, getProjectName, getDescription, 
           setDescription, getDate, setDate, titleEdit, taskDivFactory, projectDivFactory, descriptionEdit, dateEdit, btnConfirmEdit };
};

export default DOM;