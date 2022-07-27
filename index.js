const vm = new Vue({
  el: '#todo-app',
  data: {
    inputTask: '',
    tasks: [],
    isEditable: false,
  },
  mounted() {
    const items = JSON.parse(localStorage.getItem('tasks'));
    if (items) {
      this.tasks = items;
    }
  },
  methods: {
    clearValues() {
      this.inputTask = '';
    },
    addTask() {
      if (this.inputTask.length === 0) {
        alert('タスクを入力してください');
        return false;
      }

      const id = this.generateTaskId();
      this.tasks.push({
        id,
        content: this.inputTask,
      });
      this.saveTasks();
      this.clearValues();
    },
    generateTaskId() {
      return this.tasks.length + 1;
    },
    deleteTask(id) {
      const removedTaskIdx = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(removedTaskIdx, 1);
      this.saveTasks();
    },
    switchEditable() {
      this.isEditable = !this.isEditable;
    },
    saveTasks() {
      this.saveToLocalStorage('tasks', this.tasks);
    },
    saveToLocalStorage(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  },
});
