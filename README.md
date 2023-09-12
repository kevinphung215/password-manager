# Username and PW manager Chrome Extension
#### Video Demo:  <URL HERE>
#### Description:

# Password Manager

This is a simple password manager app that allows users to store website, username, and password credentials for safe keeping. The app is built using HTML, CSS, and JavaScript.

## Contents

The project contains the following files:

- index.html - The main HTML document that contains the basic DOM structure and links to CSS and JS files.

- style.css - Contains CSS styling rules for the visual layout and dark mode toggle.

- script.js - Contains all the JavaScript code for the app functionality like adding/editing/deleting items, caching data, and toggling dark mode.

- README.md - This documentation explaining the project (this file).

## Functionality

The core functionality includes:

- Adding new password credentials by entering website, username, password then clicking the Add button. This stores the data in the UI list and local storage.

- Editing existing credentials by clicking the edit icon, modifying the data, then clicking the checkmark icon to save changes.

- Deleting credentials by clicking the delete icon. 

- Caching credential data in localStorage to persist when the page is reloaded.

- A dark mode toggle that stores the mode preference in localStorage.

## Design Choices

Some key design decisions:

- Plain JS, HTML and CSS only for simplicity and cross-browser compatibility vs a framework.

- Local storage for persistence vs server-side database so credentials stay private.

- Minimal styling focused on usability vs aesthetics.

- List-based UI to allow easy adding/editing/deleting of credentials.

- Dark mode support for user preference and accessibility.

Overall, the focus was on optimized UX and implementing core password manager functionality vs advanced features. The simple design makes the code easy to understand for learning purposes.

## Usage

The app can be used locally by opening index.html in a browser. Enter credentials, edit/delete existing ones, and toggle dark mode to get a feel for the functionality. All data will persist thanks to localStorage integration.