
document.addEventListener("DOMContentLoaded", function () {
    const trigger = document.getElementById("accountTrigger");
    const dropdown = document.getElementById("accountDropdown");

    if (!trigger || !dropdown) return;

    const avatar = document.getElementById("accountAvatar");
    const name = document.getElementById("accountName");
    const greeting = document.getElementById("accountGreeting");
    const loginLink = document.getElementById("accountLogin");
    const registerLink = document.getElementById("accountRegister");
    const historyLink = document.getElementById("accountHistory");
    const logoutButton = document.getElementById("accountLogout");

    function getLogin() {
        try {
            return JSON.parse(
                sessionStorage.getItem("mothernature_customer_login")
            );
        } catch (error) {
            return null;
        }
    }

    function renderProfile() {
        const customer = getLogin();

        if (customer && customer.nama && customer.email) {
            const nama = customer.nama.trim();

            const initials = nama
                .split(/\s+/)
                .filter(Boolean)
                .slice(0, 2)
                .map(function (kata) {
                    return kata.charAt(0);
                })
                .join("")
                .toUpperCase();

            avatar.textContent = initials || "?";
            name.textContent = nama;
            greeting.textContent = "Halo, " + nama + "!";

            loginLink.hidden = true;
            registerLink.hidden = true;
            historyLink.hidden = false;
            logoutButton.hidden = false;
        } else {
            avatar.textContent = "♙";
            name.textContent = "Masuk";
            greeting.textContent = "Selamat datang!";

            loginLink.hidden = false;
            registerLink.hidden = false;
            historyLink.hidden = true;
            logoutButton.hidden = true;
        }
    }

    trigger.addEventListener("click", function () {
        dropdown.hidden = !dropdown.hidden;

        trigger.setAttribute(
            "aria-expanded",
            String(!dropdown.hidden)
        );
    });

    document.addEventListener("click", function (event) {
        if (!event.target.closest("#navAccount")) {
            dropdown.hidden = true;
            trigger.setAttribute("aria-expanded", "false");
        }
    });

    logoutButton.addEventListener("click", function () {
        sessionStorage.removeItem("mothernature_customer_login");
        window.location.href = "index.html";
    });

    renderProfile();
});

