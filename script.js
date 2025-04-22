document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("survey-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const hobbyField = document.getElementsByName("hobby");
    const moviesField = document.getElementsByName("movies");
    const moodField = document.getElementById("mood");
    const usernameField = document.getElementById("username");
    const dateField = document.getElementById("date");

    // Function to check if the field is not empty
    function isNotEmpty(field) {
        return field.value.trim() !== "";
    }

    // Function to validate email format using regex
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.value.trim());
    }

    // Function to check if at least one radio button is checked
    function hasCheckedOption(radioButtons) {
        for (let i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Function to check if a dropdown option is selected
    function isSelected(selectField) {
        return selectField.value !== "";
    }

    // Function to validate alphanumeric username with length 4-10 characters
    function isValidUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9]{4,10}$/;
        return usernameRegex.test(username.value.trim());
    }

    // Function to validate date format (DD-MM-YYYY)
    function isValidDate(date) {
        const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
        return dateRegex.test(date.value.trim());
    }

    // Function to display error messages
    function showError(field, message) {
        const errorElement = field.nextElementSibling;
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    // Function to clear error messages
    function clearError(field) {
        const errorElement = field.nextElementSibling;
        errorElement.textContent = "";
        errorElement.style.display = "none";
    }

    // Function to validate form inputs
    function validateForm(event) {
        let isValid = true;

        // Name field validation
        if (!isNotEmpty(nameField)) {
            showError(nameField, "Name is required.");
            isValid = false;
        } else {
            clearError(nameField);
        }

        // Email field validation
        if (!isNotEmpty(emailField) || !isValidEmail(emailField)) {
            showError(emailField, "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError(emailField);
        }

        // Hobby (radio buttons) validation
        if (!hasCheckedOption(hobbyField)) {
            showError(hobbyField[0], "Please select a hobby.");
            isValid = false;
        } else {
            clearError(hobbyField[0]);
        }

        // Movie genre (checkboxes) validation - at least one should be selection
        const moviesSelected = Array.from(moviesField).some(movie => movie.checked);
        if (!moviesSelected) {
            showError(moviesField[0], "Please select at least one movie genre.");
            isValid = false;
        } else {
            clearError(moviesField[0]);
        }

        // Mood (dropdown) validation
        if (!isSelected(moodField)) {
            showError(moodField, "Please select your mood.");
            isValid = false;
        } else {
            clearError(moodField);
        }

        // Username validation
        if (!isNotEmpty(usernameField) || !isValidUsername(usernameField)) {
            showError(usernameField, "Username must be alphanumeric and 4-10 characters long.");
            isValid = false;
        } else {
            clearError(usernameField);
        }

        // Date validation
        if (!isNotEmpty(dateField) || !isValidDate(dateField)) {
            showError(dateField, "Date must be in the format DD-MM-YYYY.");
            isValid = false;
        } else {
            clearError(dateField);
        }

        // Prevent form submission if validation fails
        if (!isValid) {
            event.preventDefault();
        }
    }

    // Attach the validateForm function to the form submit event
    form.addEventListener("submit", validateForm);
});
