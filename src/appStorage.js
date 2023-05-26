function saveDefaultProject(project) {
  localStorage.setItem('defaultProject', JSON.stringify(project));
}

function loadDefaultProject() {
  return JSON.parse(localStorage.defaultProject);
}

function saveProjects(projectList, defaultProject) {
  localStorage.setItem('projects', JSON.stringify(projectList));
  saveDefaultProject(defaultProject);
};

function loadProjects() {
  return JSON.parse(localStorage.getItem('projects'));
}

export { loadDefaultProject, saveProjects, loadProjects }

