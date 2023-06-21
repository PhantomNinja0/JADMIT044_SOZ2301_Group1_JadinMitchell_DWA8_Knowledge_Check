import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';

export function createBookElement({ author, id, image, title }) { //function takes a book object as input and creates an HTML element representing the book.
    const element = document.createElement('button');
    element.classList = 'preview'; //Creates button element with class 'preview' and sets data-preview attribute to book's ID. 
    element.setAttribute('data-preview', id);
  //Creates an image and div element inside button for displaying book's title and author. 
    element.innerHTML = ` 
      <img
        class="preview__image"
        src="${image}"
      />
      
      <div class="preview__info">
        <h3 class="preview__title">${title}</h3>
        <div class="preview__author">${authors[author]}</div>
      </div>
    `;
  
    return element; //Function returns created element.
  }

  