// App should have DOM manipulation modules separated from the app logic itself

// --------------- DOM MANIPULATION --------------- //


// --------------- APP LOGIC --------------- //

class Task {
  constructor(taskName, taskDescription, taskDueDate, taskPriority) {
    this.name = taskName;
    this.description = taskDescription;
    this.dueDate = taskDueDate;
    this.priority = taskPriority;
  }

  get name() {
    return this.name;
  }
  
  set name(name) {
    this.name = name;
  }

  get description() {
    return this.description;
  }

  set description(description) {
    this.description = description;
  }

  get dueDate() {
    return this.dueDate;
  }

  set dueDate(date) {
    this.dueDate = date;
  }

  get priority() {
    return this.priority;
  }

  set priority(priority) {
    this.priority = priority;
  }
}
