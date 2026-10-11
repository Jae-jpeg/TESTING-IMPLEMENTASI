```javascript
// ==========================================
// PENDAFTARAN AKUN CUSTOMER MOTHER NATURE
// ==========================================

const REGISTER_STORAGE_KEY = "mothernature_customers";

document.addEventListener("DOMContentLoaded", function () {
    // Mengambil form pendaftaran dari register.html
    const registerForm = document.getElementById("formRegister");

    // Jika halaman tidak memiliki form pendaftaran, hentikan proses.
    if (!registerForm) return;

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Mengambil data dari formulir
        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const telepon = document.getElementById("telepon").value.trim();
        const alamat = document.getElementById("alamat").value.trim();
        const password = document.getElementById("password").value;
        const konfirmasiPassword =
            document.getElementById("konfirmasiPassword").value;

        const message = document.getElementById("pesan");

        // Menampilkan pesan kepada pengguna
        function showMessage(text, success) {
            if (!message) return;

            message.textContent = text;
            message.style.color = success ? "#28743a" : "#c62828";
        }

        // Memastikan semua kolom telah diisi
        if (!nama || !email || !telepon || !alamat ||
            !password || !konfirmasiPassword) {
            showMessage("Semua kolom wajib diisi.", false);
            return;
        }

        // Memeriksa kecocokan password
        if (password !== konfirmasiPassword) {
            showMessage("Konfirmasi password tidak cocok.", false);
            return;
        }

        // Memeriksa panjang password
        if (password.length < 6) {
            showMessage("Password minimal 6 karakter.", false);
            return;
        }

        // Membaca data akun yang sudah tersimpan
        let customers = [];

        try {
            const savedCustomers =
                localStorage.getItem(REGISTER_STORAGE_KEY);

            customers = savedCustomers ? JSON.parse(savedCustomers) : [];

            if (!Array.isArray(customers)) {
                showMessage("Format data akun tidak valid.", false);
                return;
            }
        } catch (error) {
            showMessage("Data akun gagal dibaca. Silakan coba lagi.", false);
            console.error("Kesalahan membaca data akun:", error);
            return;
        }

        // Memeriksa apakah email sudah terdaftar
        const emailSudahAda = customers.some(function (customer) {
            return customer.email &&
                customer.email.toLowerCase() === email;
        });

        if (emailSudahAda) {
            showMessage(
                "Email sudah terdaftar. Silakan gunakan email lain.",
                false
            );
            return;
        }

        // Membuat akun customer baru
        const customerBaru = {
            id: "CUST-" + Date.now(),
            nama: nama,
            email: email,
            telepon: telepon,
            alamat: alamat,
            password: password,
            tanggalDaftar: new Date().toISOString()
        };

        // Menyimpan akun ke browser
        try {
            customers.push(customerBaru);

            localStorage.setItem(
                REGISTER_STORAGE_KEY,
                JSON.stringify(customers)
            );

            showMessage(
                "Pendaftaran berhasil! Akun kamu sudah tersimpan. Silakan login.",
                true
            );

            registerForm.reset();
        } catch (error) {
            showMessage(
                "Akun gagal disimpan. Silakan coba lagi.",
                false
            );
            console.error("Kesalahan menyimpan akun:", error);
        }
    });
});
```
