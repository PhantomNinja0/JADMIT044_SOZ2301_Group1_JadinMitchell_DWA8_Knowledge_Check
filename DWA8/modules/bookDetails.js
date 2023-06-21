import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';
import { index } from './helper.js';

export function handleListItemClick(event) { //function handles click event on book item in list.
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