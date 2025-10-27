export class Task {
  constructor(title) {
    this.id = Date.now();
    this.title = title;
    this.done = false;

    // simpan tanggal & jam saat dibuat
    const now = new Date();
    this.createdAt = now.toLocaleString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }
}

export const loadTasks = () =>
  JSON.parse(localStorage.getItem("tasks")) || [];

export const saveTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));
