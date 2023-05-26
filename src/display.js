const taskDivFactory = (name, description, dueDate, priority, completed, taskId, editHandler) => {
    const task = document.createElement('div');
    task.classList.add('task');
    task.id = `task-${taskId}`;
    task.dataset.index = taskId;

    const leftSection = document.createElement('div');
    const rightSection = document.createElement('div');
    leftSection.classList.add('left-section');
    rightSection.classList.add('right-section');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.id = `task-${taskId}-checkbox`;
    const labelName = document.createElement('h3');
    labelName.innerHTML = name;
    labelName.id = `task-${taskId}-name`;
    const labelDesc = document.createElement('span');
    labelDesc.className = 'task-span';
    labelDesc.innerHTML = description;

    if(completed) {
      labelName.style.textDecoration = 'line-through';
      labelName.style.color = 'gray';
    }

    leftSection.appendChild(checkbox);
    leftSection.appendChild(labelName);
    leftSection.appendChild(labelDesc);

    const priorityLib = {
      0: "LOW",
      1: "MID",
      2: "HIGH"
    };

    const labelPriority = document.createElement('span');
    labelPriority.className = 'task-span';
    labelPriority.classList.add(`priority-${priority}`);
    labelPriority.innerHTML = `${priorityLib[priority]} PRIORITY`;

    const divisor = document.createElement('div');
    divisor.className = 'divisor';

    const date = document.createElement('span');
    if(dueDate === '') {
      date.innerHTML = `No due date`;
    } else {
      date.innerHTML = `Due Date: ${dueDate.getUTCDate()}/${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`;
    }
    
    const edit = document.createElement('img');
    edit.addEventListener('click', editHandler);
    edit.classList.add('small');
    edit.src = './assets/edit.png';
    edit.alt = 'Edit';
    edit.id = `edit-task-${taskId}`;

    const remove = document.createElement('img');
    remove.classList.add('small');
    remove.src = './assets/remove.png';
    remove.dataset.index = taskId;
    remove.alt = 'X';
    remove.id = `remove-task-${taskId}`;

    rightSection.appendChild(labelPriority);
    rightSection.appendChild(divisor);
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
  const leftContainer = document.createElement('div');
  leftContainer.dataset.index = projectId;
  const projectIcon = document.createElement('img');
  projectIcon.src = './assets/project.png';
  projectIcon.alt = 'O';
  const projectName = document.createElement('span');
  projectName.innerHTML = name;
  const deleteIcon = document.createElement('img');
  deleteIcon.classList.add('small');
  deleteIcon.src = './assets/remove.png';
  deleteIcon.alt = 'X';
 
  leftContainer.appendChild(projectIcon);
  leftContainer.appendChild(projectName);
  project.appendChild(leftContainer);
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
  const btnCancelProject = document.getElementById('cancel-project');

  // Task List
  const listTitle = document.getElementById('task-list-title');
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
  const btnCancelTask = document.getElementById('btn-cancel-task');


  // 'Edit Task' Form
  const taskOverlay = document.querySelector('.overlay-container');
  const titleEdit = document.getElementById('title-input-edit');
  const descriptionEdit = document.getElementById('description-input-edit');
  const dateEdit = document.getElementById('date-input-edit');
  const btnLowEdit = document.getElementById('btn-low-edit');
  const btnMidEdit = document.getElementById('btn-mid-edit');
  const btnHighEdit = document.getElementById('btn-high-edit');
  const btnConfirmEdit = document.getElementById('btn-confirm-edit');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');

  // Parent Nodes
  const projectListParent = document.getElementById('project-list');
  const taskListParent = document.querySelector('.task-list');

  // Methods (projects)
  function getProjectName() {
    return projectNameInput.value;
  }

  // Methods (tasks)
  function taskListAdd(task) {
    taskListParent.appendChild(task);
  }
  
  function projectListAdd(project) {
    projectListParent.appendChild(project);
  }

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

  function setListTitle(newTitle) {
    listTitle.innerHTML = newTitle;
  }

  function updatePriority(low, mid, high, priority) {
    if(priority === 0) {
      low.classList.add('priority-low-on');
      mid.classList.remove('priority-mid-on');
      high.classList.remove('priority-high-on');
    } else if(priority === 1) {
      mid.classList.add('priority-mid-on');
      low.classList.remove('priority-low-on');
      high.classList.remove('priority-high-on');
    } else if(priority === 2) {
      high.classList.add('priority-high-on');
      low.classList.remove('priority-low-on');
      mid.classList.remove('priority-mid-on');
    } else {
      high.classList.remove('priority-high-on');
      low.classList.remove('priority-low-on');
      mid.classList.remove('priority-mid-on');
    }
  }

  
  function clearFields() {
    setTaskName('');
    setDescription('');
    setDate('');
    updatePriority(btnLow, btnMid, btnHigh, '');
    updatePriority(btnLowEdit, btnMidEdit, btnHighEdit, '');
  }
  
  function showTaskListPlaceholder() {
    const text = document.createElement('h2');
    text.innerHTML = 'Nothing here...';
    text.style.color = 'gray';
    taskListParent.appendChild(text);
  }

  function showProjectListPlaceholder() {
    const text = document.createElement('h2');
    text.innerHTML = 'Nothing here...';
    projectListParent.appendChild(text);
  }

  return { taskDivFactory, projectDivFactory, btnInbox, btnToday, btnWeek, btnNewProject, container, 
           inputContainer, projectNameInput, btnConfirmProject, btnCancelProject, btnNewTask, btnLow, btnMid,  
           btnHigh, btnAddTask, btnCancelTask, projectListParent, taskListParent, taskOverlay, 
           taskListAdd, projectListAdd, getTaskName, setTaskName, getProjectName, getDescription,  
           setDescription, getDate, setDate, titleEdit, descriptionEdit, dateEdit, btnLowEdit, btnMidEdit, 
           btnHighEdit, btnConfirmEdit, btnCancelEdit, setListTitle, updatePriority, clearFields, 
           showTaskListPlaceholder, showProjectListPlaceholder };
};

export default DOM;