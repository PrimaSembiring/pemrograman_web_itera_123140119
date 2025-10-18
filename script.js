let arrayTasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(arrayTasks));
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const title = document.getElementById("title");
const course = document.getElementById("course");
const deadline = document.getElementById("deadline");
const idEl = document.getElementById("taskId");
const btnSubmit = document.getElementById("btnSubmit");
const btnCancel = document.getElementById("btnCancel");
const emptyState = document.getElementById("emptyState");
const pendingCount = document.getElementById("pendingCount");

// Elemen untuk pencarian & filter status
const searchInput = document.getElementById("searchTask");
const statusFilter = document.getElementById("status");

// Tombol Bersihkan Selesai
const clearCompletedBtn = document.getElementById("clearCompleted");

// === Fungsi Render Tugas ===
function render() {
  const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const statusValue = statusFilter ? statusFilter.value : "all";

  // Filter berdasarkan pencarian dan status
  const filteredTasks = arrayTasks.filter((t) => {
    const matchKeyword = t.title.toLowerCase().includes(keyword);
    const matchStatus =
      statusValue === "all"
        ? true
        : statusValue === "active"
        ? !t.done
        : t.done;
    return matchKeyword && matchStatus;
  });

  list.innerHTML = "";

  // Jika tidak ada data
  if (filteredTasks.length === 0) {
    emptyState.hidden = false;
    pendingCount.textContent = 0;
    return;
  }

  emptyState.hidden = true;
  const tpl = document.getElementById("taskItemTemplate");

  filteredTasks.forEach((t) => {
    const node = tpl.content.cloneNode(true);
    const el = node.querySelector(".task");
    el.dataset.id = t.id;
    el.querySelector(".task-title").textContent = t.title;
    el.querySelector(".badge").textContent = t.course;
    el.querySelector(".deadline").textContent = "Deadline: " + t.deadline;

    if (t.done) el.classList.add("done");

    const checkbox = el.querySelector("input");
    checkbox.checked = t.done;
    checkbox.addEventListener("change", (e) => {
      t.done = e.target.checked;
      saveToLocalStorage();
      render();
    });

    el.querySelector(".edit").addEventListener("click", () => editTask(t.id));
    el.querySelector(".remove").addEventListener("click", () => {
      if (confirm("Hapus tugas ini?")) {
        arrayTasks = arrayTasks.filter((x) => x.id !== t.id);
        saveToLocalStorage();
        render();
      }
    });

    list.appendChild(el);
  });

  // Hitung jumlah tugas belum selesai
  pendingCount.textContent = arrayTasks.filter((t) => !t.done).length;
}

// === Fungsi Edit Tugas ===
function editTask(id) {
  const t = arrayTasks.find((x) => x.id === id);
  if (!t) return;

  idEl.value = t.id;
  title.value = t.title;
  course.value = t.course;
  deadline.value = t.deadline;

  btnSubmit.textContent = "Simpan";
  btnCancel.hidden = false;
}

// === Tombol Batal Edit ===
btnCancel.addEventListener("click", () => {
  form.reset();
  idEl.value = "";
  btnSubmit.textContent = "Tambah Tugas";
  btnCancel.hidden = true;
});

// === Fungsi Tambah / Simpan Tugas Baru ===
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    title: title.value.trim(),
    course: course.value.trim(),
    deadline: deadline.value,
  };

  if (!data.title) return alert("Nama tugas wajib diisi");
  if (!data.course) return alert("Mata kuliah wajib diisi");
  if (!data.deadline) return alert("Deadline wajib diisi");

  if (idEl.value) {
    const t = arrayTasks.find((x) => x.id === idEl.value);
    Object.assign(t, data);
  } else {
    arrayTasks.push({ id: uid(), ...data, done: false });
  }

  saveToLocalStorage();
  render();
  form.reset();
  idEl.value = "";
  btnSubmit.textContent = "Tambah Tugas";
  btnCancel.hidden = true;
});

// === Event Filter & Search ===
if (searchInput) searchInput.addEventListener("input", render);
if (statusFilter) statusFilter.addEventListener("change", render);

// Fungsi Bersihkan Selesai (Sudah Berfungsi Responsif)
if (clearCompletedBtn) {
  clearCompletedBtn.addEventListener("click", () => {
    const doneTasks = arrayTasks.filter((t) => t.done).length;
    if (doneTasks === 0) {
      alert("Tidak ada tugas yang sudah selesai untuk dibersihkan.");
      return;
    }

    if (confirm(`Hapus ${doneTasks} tugas yang sudah selesai?`)) {
      arrayTasks = arrayTasks.filter((t) => !t.done);
      saveToLocalStorage();
      render();
    }
  });
}

render();
