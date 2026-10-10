// Select elements
const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");

// App state: an array of note objects { id, text, category, createdAt }
let notes = [];

// Build the list of notes from the array
function render() {
  notesList.textContent = "";

  notes.forEach(function (note) {
    const li = document.createElement("li");
    li.classList.add("note-card", "category-" + note.category.toLowerCase());

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const info = document.createElement("span");

    const label = document.createElement("span");
    label.classList.add("note-label");
    label.textContent = note.category;

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    info.appendChild(label);
    info.appendChild(date);

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";
    deleteBtn.dataset.id = note.id;

    meta.appendChild(info);
    meta.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(meta);
    notesList.appendChild(li);
  });
}

// Add a new note when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const note = {
    id: Date.now(),
    text: noteInput.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  render();

  noteInput.value = "";
  noteInput.focus();
});

render();
