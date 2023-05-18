const DOM = () => {
  // Sidebar
  const btnInbox = document.getElementById('btn-inbox');
  const btnToday = document.getElementById('btn-today');
  const btnWeek = document.getElementById('btn-week');
  const btnAddProject = document.getElementById('btn-add-project');

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
  const taskListParent = document.querySelector('task-list');

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

  return { btnInbox, btnToday, btnWeek, btnAddProject, 
           btnNewTask, btnLow, btnMid, btnHigh, btnAddTask, 
           getTitle, getDescription, getDate, taskListAdd, projectListAdd }
}

export default DOM;