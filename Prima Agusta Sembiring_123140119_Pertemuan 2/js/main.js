import { Task, loadTasks, saveTasks } from "./storage.js";
import { refreshTime } from "./time.js";

let tasks = loadTasks();

// Update total item
const updateStats = () => {
  const total = tasks.length;
  document.querySelector("#totalTasks").textContent = total;
};

//Render daftar tugas
const renderTasks = () => {
  const list = document.querySelector("#taskList");
  const empty = document.querySelector("#emptyState");

  list.innerHTML = "";

  if (tasks.length === 0) {
    empty.style.display = "block";
    updateStats();
    return;
  }

  empty.style.display = "none";

  tasks.forEach((t) => {
    const li = document.createElement("li");
    li.className = `task ${t.done ? "done" : ""}`;

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" class="toggle" ${t.done ? "checked" : ""}>
        <div class="task-info">
          <span class="task-title">${t.title}</span>
          <small class="task-date">⏰ Dibuat: ${t.createdAt}</small>
        </div>
      </div>
      <div class="actions">
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-del">Hapus</button>
      </div>
    `;

    // Checkbox toggle
    li.querySelector(".toggle").addEventListener("change", () => {
      t.done = !t.done;
      saveTasks(tasks);
      renderTasks();
    });

    // Edit tugas
    li.querySelector(".btn-edit").addEventListener("click", () => {
      const updated = prompt("Edit tugas:", t.title);
      if (updated === null) return;
      const title = updated.trim();
      if (!title) return alert("Judul tidak boleh kosong.");
      t.title = title;
      saveTasks(tasks);
      renderTasks();
    });

    // Hapus tugas
    li.querySelector(".btn-del").addEventListener("click", () => {
      tasks = tasks.filter((task) => task.id !== t.id);
      saveTasks(tasks);
      renderTasks();
    });

    list.appendChild(li);
  });

  saveTasks(tasks);
  updateStats();
};

// ➕ Tambah tugas baru
const addTask = () => {
  const input = document.querySelector("#taskInput");
  const title = input.value.trim();
  if (!title) return alert("Anda blm mengisi apa-apa");

  tasks.push(new Task(title));
  input.value = "";
  saveTasks(tasks);
  renderTasks();
};

// Event tombol tambah & enter
document.querySelector("#addBtn").addEventListener("click", addTask);
document.querySelector("#taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Inisialisasi
renderTasks();
refreshTime();
setInterval(refreshTime, 1000);
