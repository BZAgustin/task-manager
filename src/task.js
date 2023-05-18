class Task {
  constructor(name, description, dueDate, priority, completed) {
    this.taskName = name;
    this.taskDescription = description;
    this.taskDueDate = dueDate;
    this.taskPriority = priority;
    this.taskCompleted = completed;
  }

  static myTasks = [];

  get name() {
    return this.taskName;
  }
  
  set name(newName) {
    this.taskName = newName;
  }

  get description() {
    return this.taskDescription;
  }

  set description(newDescription) {
    this.taskDescription = newDescription;
  }

  get dueDate() {
    return this.taskDueDate;
  }

  set dueDate(date) {
    this.taskDueDate = date;
  }

  get priority() {
    return this.taskPriority;
  }

  set priority(newPriority) {
    this.taskPriority = newPriority;
  }

  get completed() {
    return this.taskCompleted;
  }

  set completed(complete) {
    this.taskCompleted = complete;
  }
}

export default Task;