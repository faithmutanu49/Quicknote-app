# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes (up to 200 characters), file each one under Personal, Work or Study, search through them as you type, and delete the ones you no longer need. Everything is saved in your browser with `localStorage`, so your notes are still there after you refresh the page. No frameworks, build tools or server are needed.

## Features

- Add a note with a category (Personal, Work or Study)
- Each note shows its text, a coloured category label, the date and time it was created, and a Delete button
- Validation: empty notes and notes over 200 characters show an error message
- Delete any single note
- Live search that ignores upper and lower case, with a "No notes match your search." message
- Note counter: "You have no notes yet.", "You have 1 note." or "You have N notes."
- Notes are saved to `localStorage` and loaded again when the page opens
- Responsive layout: the form stacks vertically on screens 600px wide or narrower
- Bonus: "Clear all" button that asks for confirmation before deleting every note

## How to run locally

1. Clone the repository:
   ```
   git clone https://github.com/your-username/quicknotes-app.git
   ```
2. Open the `quicknotes-app` folder.
3. Double-click `index.html` to open it in your browser (or right-click and choose "Open with" your browser).

There is nothing to install. Optionally, you can serve the folder with a local server such as the VS Code "Live Server" extension.

## What I learned

- How to structure a page with semantic HTML (`header`, `main`, `section`, `footer`) and link a `label` to its `input` using `for` and `id`.
- How to lay out a form with Flexbox and use a `@media (max-width: 600px)` rule to change the layout on small screens.
- How to keep app data in an array of objects and write a `render()` function that rebuilds the page from that array using `createElement` and `textContent`, which keeps user text safe from HTML injection.
- How to save and load data with `localStorage`, using `JSON.stringify` and `JSON.parse`.
- How to use event delegation so one click listener can handle every Delete button, and how to use `filter()` for both deleting and searching.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure |
| `style.css` | Layout, note cards and category styles |
| `script.js` | App logic: add, delete, search, validation, storage |
| `README.md` | Project documentation |
