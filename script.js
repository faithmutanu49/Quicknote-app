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
const STORAGE_KEY = "quicknotes-notes";

// Save notes to localStorage
function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Could not save notes:", error);
  }
}

// Load notes from localStorage
function loadNotes() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    notes = Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Could not load notes:", error);
    notes = [];
  }
}

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

  // Only show notes that match the search words (not case-sensitive)
  const searchTerm = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter(function (note) {
    return note.text.toLowerCase().includes(searchTerm);
  });

  if (notes.length > 0 && visibleNotes.length === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
    return;
  }

  visibleNotes.forEach(function (note) {
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
  saveNotes();
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
  saveNotes();
  render();
});

// Search as the user types
searchInput.addEventListener("input", render);

// Load saved notes when the page opens
loadNotes();
render();
