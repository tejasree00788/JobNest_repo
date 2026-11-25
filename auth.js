
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const authForm = document.getElementById("authForm");

const nameField = document.getElementById("nameField");
const roleField = document.getElementById("roleField");

const formTitle = document.getElementById("formTitle");
const formSubtitle = document.getElementById("formSubtitle");
const submitBtn = document.getElementById("submitBtn");

const switchText = document.getElementById("switchText");
const switchButton = document.getElementById("switchButton");
const message = document.getElementById("message");

let isRegister = false;

function showForm(registerMode) {
    isRegister = registerMode;

    loginTab.classList.toggle("active", !isRegister);
    registerTab.classList.toggle("active", isRegister);

    nameField.hidden = !isRegister;
    roleField.hidden = !isRegister;

    document.getElementById("name").required = isRegister;

    formTitle.textContent = isRegister
        ? "Create Your Account"
        : "Welcome Back!";

    formSubtitle.textContent = isRegister
        ? "Join the JobNest community"
        : "Login to continue to JobNest";

    submitBtn.textContent = isRegister
        ? "Create Account"
        : "Login";

    switchText.firstChild.textContent = isRegister
        ? "Already have an account? "
        : "Don't have an account? ";

    switchButton.textContent = isRegister
        ? "Login"
        : "Register";

    message.textContent = "";
}

loginTab.addEventListener("click", () => showForm(false));
registerTab.addEventListener("click", () => showForm(true));

switchButton.addEventListener("click", () => {
    showForm(!isRegister);
});

authForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    // Demo only: localStorage is not secure authentication.
    let users = JSON.parse(localStorage.getItem("jobnestUsers")) || [];

    if (isRegister) {
        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            message.style.color = "red";
            message.textContent = "This email is already registered.";
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            role: role
        };

        users.push(newUser);
        localStorage.setItem("jobnestUsers", JSON.stringify(users));

        message.style.color = "green";
        message.textContent = "Registration successful! Please login.";

        authForm.reset();
        showForm(false);

    } else {
        const user = users.find(user =>
            user.email === email && user.password === password
        );

        if (user) {
            localStorage.setItem("jobnestCurrentUser",
                JSON.stringify({
                    name: user.name,
                    email: user.email,
                    role: user.role
                })
            );

            message.style.color = "green";
            message.textContent =
                "Login successful! Welcome, " + user.name + ".";

            authForm.reset();
        } else {
            message.style.color = "red";
            message.textContent =
                "Invalid email or password. Please try again.";
        }
    }
});

showForm(false);
