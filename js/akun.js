// PENDAFTARAN AKUN CUSTOMER MOTHER NATURE
const REGISTER_STORAGE_KEY = "mothernature_customers";

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    // Jika halaman ini tidak memiliki form pendaftaran, hentikan proses.
    if (!registerForm) return;

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const telepon = document.getElementById("telepon").value.trim();
        const password = document.getElementById("password").value;
        const konfirmasiPassword =
            document.getElementById("konfirmasiPassword").value;
        const message = document.getElementById("registerMessage");

        // Fungsi untuk menampilkan pesan kepada pengguna.
        function showMessage(text, success) {
            message.textContent = text;
            message.style.color = success ? "#28743a" : "#c62828";
        }

        // Memeriksa apakah kedua kata sandi sama.
        if (password !== konfirmasiPassword) {
            showMessage("Konfirmasi kata sandi tidak cocok.", false);
            return;
        }

        if (password.length < 6) {
            showMessage("Kata sandi harus minimal 6 karakter.", false);
            return;
        }

        let customers = [];

        // Membaca akun yang pernah didaftarkan di browser ini.
        try {
            const savedCustomers = localStorage.getItem(REGISTER_STORAGE_KEY);
            customers = savedCustomers ? JSON.parse(savedCustomers) : [];

            if (!Array.isArray(customers)) {
                customers = [];
            }
        } catch (error) {
            showMessage("Data akun tidak dapat dibaca. Coba lagi.", false);
            return;
        }

        // Memeriksa apakah email sudah terdaftar.
        const emailSudahAda = customers.some(function (customer) {
            return customer.email &&
                customer.email.toLowerCase() === email;
        });

        if (emailSudahAda) {
            showMessage(
                "Email ini sudah terdaftar. Silakan gunakan email lain.",
                false
            );
            return;
        }

        // Membuat data akun baru untuk keperluan demo.
        const customerBaru = {
            id: "CUST-" + Date.now(),
            nama: nama,
            email: email,
            telepon: telepon,
            password: password,
            tanggalDaftar: new Date().toISOString()
        };

        customers.push(customerBaru);

        // Menyimpan akun ke browser.
        try {
            localStorage.setItem(
                REGISTER_STORAGE_KEY,
                JSON.stringify(customers)
            );

            showMessage(
                "Pendaftaran berhasil! Akun kamu sudah tersimpan di browser ini.",
                true
            );

            registerForm.reset();
        } catch (error) {
            showMessage(
                "Akun gagal disimpan. Penyimpanan browser mungkin penuh atau tidak tersedia.",
                false
            );
        }
    });
});
