import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';

export const createGenre = () => {
    const optionGenres = document.createDocumentFragment();
    const genreElement = document.createElement("option");
    genreElement.value = "any";
    genreElement.innerText = "All Genres";
    optionGenres.appendChild(genreElement);
  
    for (const [id, name] of Object.entries(genres)) {
      const options = document.createElement("option");
  
      options.value = id;
      options.innerText = name;
  
      optionGenres.appendChild(options);
    }
    return optionGenres;
  };

export const createAuthor = () => {
    const optionAuthors = document.createDocumentFragment();
    const AuthorElement = document.createElement("option");
    AuthorElement.value = "any";
    AuthorElement.innerText = "All Authors";
    optionAuthors.appendChild(AuthorElement);
  
    for (const [id, name] of Object.entries(authors)) {
      const options = document.createElement("option");
  
      options.value = id;
      options.innerText = name;
  
      optionAuthors.appendChild(options);
    }
    return optionAuthors;
  };
  
