let currentlyEditing = null;

// Function to add a new item to the list
function addItem() {
    const website = document.getElementById("websiteInput").value;
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;

    if (website.trim() === "" || username.trim() === "" || password.trim() === "") {
        alert("All fields are required.");
        return;
    }

    if (currentlyEditing) {
        const confirmEdit = confirm("Are you done editing this item?");
        if (confirmEdit) {
            currentlyEditing.querySelector("span:nth-child(1)").textContent = website;
            currentlyEditing.querySelector("span:nth-child(2)").textContent = username;
            currentlyEditing.querySelector("span:nth-child(3)").textContent = password;

            // Reset the editing state
            currentlyEditing.classList.remove('edit-mode');
            currentlyEditing = null;

            // Clear the input fields
            document.getElementById("websiteInput").value = "";
            document.getElementById("usernameInput").value = "";
            document.getElementById("passwordInput").value = "";
        }
    } else {
        // Create a new list item
        const listItem = document.createElement("li");
        listItem.className = "list-item";
        listItem.innerHTML = `
            <div class="listContainer">
                <div class="listInfo">
                    <span>${website}</span>
                    <span>${username}</span>
                    <span>${password}</span>
                </div>
                <div class="addDeleteContainer">
                    <button class="edit-button"><i class="fas fa-edit"></i></button>
                    <button class="remove-button"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;

        // Add event listeners for edit and remove buttons
        const editButton = listItem.querySelector(".edit-button");
        const removeButton = listItem.querySelector(".remove-button");

        editButton.addEventListener("click", () => editItem(listItem, editButton));
        removeButton.addEventListener("click", () => removeItem(listItem));

        document.getElementById("list").appendChild(listItem);

        // Clear the input fields
        document.getElementById("websiteInput").value = "";
        document.getElementById("usernameInput").value = "";
        document.getElementById("passwordInput").value = "";

        // Cache the data
        cacheData();
    }
}

// Function to edit an item in the list
function editItem(listItem, editButton) {
    if (currentlyEditing === listItem) {
        return;
    }

    if (currentlyEditing) {
        const confirmEdit = confirm("Are you done editing the current item?");
        if (!confirmEdit) {
            return;
        }
        currentlyEditing.classList.remove('edit-mode');
    }

    currentlyEditing = listItem;
    listItem.classList.add('edit-mode');

    const websiteSpan = listItem.querySelector("span:nth-child(1)");
    const usernameSpan = listItem.querySelector("span:nth-child(2)");
    const passwordSpan = listItem.querySelector("span:nth-child(3)");

    const websiteInput = document.createElement("input");
    websiteInput.type = "text";
    websiteInput.value = websiteSpan.textContent;
    const usernameInput = document.createElement("input");
    usernameInput.type = "text";
    usernameInput.value = usernameSpan.textContent;
    const passwordInput = document.createElement("input");
    passwordInput.type = "text";
    passwordInput.value = passwordSpan.textContent;

    websiteSpan.innerHTML = '';
    usernameSpan.innerHTML = '';
    passwordSpan.innerHTML = '';

    websiteSpan.appendChild(websiteInput);
    usernameSpan.appendChild(usernameInput);
    passwordSpan.appendChild(passwordInput);

    websiteInput.focus();

    editButton.innerHTML = '<i class="fas fa-check"></i>';
    editButton.addEventListener("click", () => saveEdit(listItem, websiteInput, usernameInput, passwordInput));
}

// Function to save an edit in the list
function saveEdit(listItem, websiteInput, usernameInput, passwordInput) {
    const website = websiteInput.value;
    const username = usernameInput.value;
    const password = passwordInput.value;

    listItem.querySelector("span:nth-child(1)").textContent = website;
    listItem.querySelector("span:nth-child(2)").textContent = username;
    listItem.querySelector("span:nth-child(3)").textContent = password;

    listItem.classList.remove('edit-mode');
    currentlyEditing = null;

    const editButton = listItem.querySelector(".edit-button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.removeEventListener("click", () => saveEdit(listItem, websiteInput, usernameInput, passwordInput));
    editButton.addEventListener("click", () => editItem(listItem, editButton));

    // Cache the data
    cacheData();
}

// Function to remove an item from the list
function removeItem(listItem) {
    if (currentlyEditing === listItem) {
        currentlyEditing = null;
    }
    listItem.remove();

    // Cache the data
    cacheData();
}

// Function to cache the website, username, and password data
function cacheData() {
    const listItems = document.querySelectorAll(".list-item");
    const cachedData = [];

    listItems.forEach((item) => {
        const website = item.querySelector("span:nth-child(1)").textContent;
        const username = item.querySelector("span:nth-child(2)").textContent;
        const password = item.querySelector("span:nth-child(3)").textContent;
        cachedData.push({ website, username, password });
    });

    // Store the data in localStorage
    localStorage.setItem("websitePasswordData", JSON.stringify(cachedData));
}

// Function to load cached data when the page loads
function loadCachedData() {
    const cachedData = localStorage.getItem("websitePasswordData");
    if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        parsedData.forEach((data) => {
            const { website, username, password } = data;
            const listItem = document.createElement("li");
            listItem.className = "list-item";
            listItem.innerHTML = `
                <div class="listContainer">
                    <div class="listInfo">
                        <span>${website}</span>
                        <span>${username}</span>
                        <span>${password}</span>
                    </div>
                    <div class="addDeleteContainer">
                        <button class="edit-button"><i class="fas fa-edit"></i></button>
                        <button class="remove-button"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </div>
            `;

            const editButton = listItem.querySelector(".edit-button");
            const removeButton = listItem.querySelector(".remove-button");
            editButton.addEventListener("click", () => editItem(listItem, editButton));
            removeButton.addEventListener("click", () => removeItem(listItem));
            document.getElementById("list").appendChild(listItem);
        });
    }
}

// Add click event listener for the "Add" button
document.getElementById("addButton").addEventListener("click", addItem);

// Load cached data when the page loads
loadCachedData();

// Get elements from the DOM
const container = document.getElementById("container");
const modeSwitch = document.getElementById("modeSwitch");
const modeIcon = document.getElementById("modeIcon");
const modeIconMoon = document.getElementById("modeIconMoon");
const list = document.getElementById("list");
const websiteInput = document.getElementById("websiteInput");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");

// Add input event listener for the mode switch
modeSwitch.addEventListener("change", toggleDarkMode);

// Function to toggle dark mode
function toggleDarkMode() {
if (modeSwitch.checked) {
    // Dark mode
    container.classList.add("dark-mode");
    modeIcon.style.opacity = "0";
    modeIconMoon.style.opacity = "1";
} else {
    // Light mode
    container.classList.remove("dark-mode");
    modeIcon.style.opacity = "1";
    modeIconMoon.style.opacity = "0";
}

// Save the current mode to local storage
localStorage.setItem("darkModeEnabled", modeSwitch.checked);
}

// Load the mode setting from local storage
const darkModeEnabled = localStorage.getItem("darkModeEnabled");
if (darkModeEnabled === "true") {
modeSwitch.checked = true;
toggleDarkMode();
}