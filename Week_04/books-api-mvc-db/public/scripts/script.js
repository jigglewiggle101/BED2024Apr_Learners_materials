//optional challenge week 5 part 4
document.addEventListener("DOMContentLoaded", () => {
  fetchBooks();

  document.getElementById("add-book-form").addEventListener("submit", addBook);
  document.getElementById("edit-book-form").addEventListener("submit", updateBook);
});

async function fetchBooks() {
  const response = await fetch("/books");
  const data = await response.json();

  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  data.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book");

    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = `By: ${book.author}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => showUpdateForm(book);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteBook(book.id);

    bookItem.appendChild(titleElement);
    bookItem.appendChild(authorElement);
    bookItem.appendChild(editButton);
    bookItem.appendChild(deleteButton);

    bookList.appendChild(bookItem);
  });
}

async function addBook(event) {
  event.preventDefault();
  const title = document.getElementById("new-title").value;
  const author = document.getElementById("new-author").value;

  const response = await fetch("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  if (response.ok) {
    fetchBooks();
    document.getElementById("add-book-form").reset();
  } else {
    console.error("Failed to add book");
  }
}

function showUpdateForm(book) {
  document.getElementById("edit-id").value = book.id;
  document.getElementById("edit-title").value = book.title;
  document.getElementById("edit-author").value = book.author;

  document.getElementById("update-book-form").style.display = "block";
}

async function updateBook(event) {
  event.preventDefault();
  const id = document.getElementById("edit-id").value;
  const title = document.getElementById("edit-title").value;
  const author = document.getElementById("edit-author").value;

  const response = await fetch(`/books/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, author }),
  });

  if (response.ok) {
    fetchBooks();
    document.getElementById("update-book-form").style.display = "none";
  } else {
    console.error("Failed to update book");
  }
}

async function deleteBook(id) {
  const response = await fetch(`/books/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    fetchBooks();
  } else {
    console.error("Failed to delete book");
  }
}
                                                                                                                                                                                                                                          