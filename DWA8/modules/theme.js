import { books, authors, genres, BOOKS_PER_PAGE } from '../data.js';
import { index } from './helper.js';

export function applyTheme() { //Function applies appropriate theme based on user's preference. 
    const settingsThemeElement = index.settings.settingsTheme; //Finds and stores reference to settingsThemeElement DOM element.
  
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) { //Checks if user's system prefers dark colour theme.
      settingsThemeElement.value = 'night'; //If dark is prefered, sets value of settingsThemeElement to night and updates CSS variables '--color-dark' and '--color-light' to appropriate values for a dark theme.
      document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
      document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else { //Otherwise it sets value of settingsThemeElement to day and updates CSS variable for light theme.
      settingsThemeElement.value = 'day';
      document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
      document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
  }