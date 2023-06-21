import { books, authors, genres, BOOKS_PER_PAGE } from './data.js';
import { index } from './modules/helper.js';
import { applyTheme } from './modules/theme.js';
import { createBookElement } from './modules/bookPreview.js';
import { createGenre, createAuthor } from './modules/search.js';

let page = 1;
let matches = books;

function updateBookList(result) { //function updates book list based on provided result data.
  const listMessageElement = index.list.listMessage; //Finds and stores references to necessary DOM elements.
  const listItemsElement = index.list.listItems;
  const listButtonElement = index.list.listButton;

  if (result.length < 1) { //Checks if result array is empty and shows/hides list message accordingly.
    listMessageElement.classList.add('list__message_show');
  } else {
    listMessageElement.classList.remove('list__message_show');
  }

  listItemsElement.innerHTML = ''; //Clears existing list items in listItemsElement.
  const newItems = document.createDocumentFragment(); //Creates new document fragment to hold new list items.

  for (const book of result.slice(0, BOOKS_PER_PAGE)) { //Iterates over result array and calls 'createBookElement' for each book.
    const element = createBookElement(book);
    newItems.appendChild(element); //Appends document fragment to listItemsElement.
  }

  listItemsElement.appendChild(newItems);
  listButtonElement.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1; //Updates disabled state and content of listButtomElement based on number of remaining books.
//Updates inner HTML of listButtonElement to display remaining books. 
  listButtonElement.innerHTML = ` 
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
  `;
}

index.search.searchGenres.appendChild(createGenre())

index.search.searchAuthors.appendChild(createAuthor())

function handleSearchFormSubmit(event) { //Fuction handles submission of search form.
  event.preventDefault();
  const formData = new FormData(index.search.searchForm);
  const filters = Object.fromEntries(formData);
  const result = []; // will hold the filtered books
  let page = 1;
  for (const book of books) {
    const titleMatch =
      filters.title.trim() === "" ||
      book.title.toLowerCase().includes(filters.title.toLowerCase());
    const authorMatch =
      filters.author === "any" || book.author === filters.author;
    const genreMatch =
      filters.genre === "any" || book.genres.includes(filters.genre);

    if (authorMatch && genreMatch && titleMatch) {
      result.push(book);
    }
  }
  
  page = 1; //After filtering, resets the page counter.
  matches = result;
  updateBookList(result); //Updates book list by calling 'updateBookList' with 'result' array.

  window.scrollTo({ top: 0, behavior: 'smooth' }); //Scrolls to top of page.
  index.search.searchOverlay.open = false; //Closes search overlay.
  index.search.searchForm.reset(); //Resets search form.
}

function handleListButtonClick() { //Function handles click even on 'Show more' button in book list.
  const fragment = document.createDocumentFragment(); //Retrieves reference to listItemsElement and creates document fragment. 

  for (const book of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) { //Iterates over 'matches' array, starting from appropriate indec based on current page number.
    const element = createBookElement(book);
    fragment.appendChild(element); //Appends created book elements to document fragment.
  }

  index.list.listItems.appendChild(fragment); //Appends doucment fragment to listItemsElement and increments page counter.
  page += 1;
}

function handleListItemClick(event) { //function handles click event on book item in list.
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) { //Retrieves clicked element and finds ancestor element with 'data-preview' attribute.
      for (const singleBook of books) {
        if (singleBook.id === node?.dataset?.preview) { //Matches clicked book with corresponding book object from books array using 'dataset.preview' value.
          active = singleBook;
          break;
        }
      }
    }
  }

  if (active) { //If match is founds, it retrieves necessary DOM elements for displaying book details and updates content accordingly.
    index.list.listActive.open = true;
    index.list.listBlur.src = active.image;
    index.list.listImage.src = active.image;
    index.list.listTitle.innerText = active.title;
    index.list.listSubtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`;
    index.list.listDescription.innerText = active.description;
  }
}

// Event Listeners
index.search.searchCancel.addEventListener('click', () => {
  index.search.searchOverlay.open = false;
  index.search.searchForm.reset();
});

index.list.listClose.addEventListener('click', () => {
  index.list.listActive.open = false;
  });

index.settings.settingsCancel.addEventListener('click', () => {
  index.settings.settingsOverlay.open = false;
});

index.search.searchIcon.addEventListener('click', () => {
  index.search.searchOverlay.open = true;
  index.search.searchTitle.focus();
});

index.settings.settingsIcon.addEventListener('click', () => {
  index.settings.settingsOverlay.open = true;
});

index.settings.settingsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === 'night') {
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
  } else {
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
  }

  index.settings.settingsOverlay.open = false;
});

index.search.searchForm.addEventListener('submit', handleSearchFormSubmit);

index.list.listButton.addEventListener('click', handleListButtonClick);

index.list.listItems.addEventListener('click', handleListItemClick);

// Initial setup
applyTheme();
updateBookList(matches);