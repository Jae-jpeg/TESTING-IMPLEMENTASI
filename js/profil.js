
(function () {
    function initProfil() {
        const trigger = document.getElementById("accountTrigger");
        const dropdown = document.getElementById("accountDropdown");
        const navAccount = document.getElementById("navAccount");

        if (!trigger || !dropdown || !navAccount) {
            return;
        }

        const avatar = document.getElementById("accountAvatar");
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

                avatar.textContent = initials || "♙";
                greeting.textContent = "Halo, " + nama + "!";

                loginLink.hidden = true;
                registerLink.hidden = true;
                historyLink.hidden = false;
                logoutButton.hidden = false;
            } else {
                avatar.textContent = "♙";
                greeting.textContent = "Selamat datang!";

                loginLink.hidden = false;
                registerLink.hidden = false;
                historyLink.hidden = true;
                logoutButton.hidden = true;
            }
        }

        trigger.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const akanDibuka = dropdown.hidden;

            dropdown.hidden = !akanDibuka;
            trigger.setAttribute("aria-expanded", String(akanDibuka));
        });

        dropdown.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        document.addEventListener("click", function (event) {
            if (!navAccount.contains(event.target)) {
                dropdown.hidden = true;
                trigger.setAttribute("aria-expanded", "false");
            }
        });

        logoutButton.addEventListener("click", function () {
            sessionStorage.removeItem("mothernature_customer_login");
            window.location.href = "index.html";
        });

        renderProfile();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initProfil);
    } else {
        initProfil();
    }
})();
