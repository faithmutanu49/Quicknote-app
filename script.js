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

const MAX_LENGTH = 200;

// Show the correct count message for zero, one and many notes
function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

// Build the list of notes from the array
function render() {
  notesList.textContent = "";
  updateCount();

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

  const text = noteInput.value.trim();

  // Validation
  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";

  const note = {
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString()
  };

  notes.push(note);
  render();

  noteInput.value = "";
  noteInput.focus();
});

// Delete a note (one listener handles every Delete button)
notesList.addEventListener("click", function (event) {
  if (!event.target.classList.contains("delete-btn")) {
    return;
  }
  const id = Number(event.target.dataset.id);
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  render();
});

render();
