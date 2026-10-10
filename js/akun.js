```javascript
// ======================================
// AKUN CUSTOMER - MOTHER NATURE
// ======================================

// Mengambil data akun yang tersimpan
function getCustomers() {
    try {
        const data = localStorage.getItem("mothernature_customers");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Gagal membaca data akun:", error);
        return [];
    }
}

// Menyimpan data akun
function saveCustomers(customers) {
    localStorage.setItem(
        "mothernature_customers",
        JSON.stringify(customers)
    );
}

// Memproses pendaftaran customer
function initRegister() {
    const form = document.getElementById("formRegister");

    // Berhenti jika halaman tidak memiliki form pendaftaran
    if (!form) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value
            .trim()
            .toLowerCase();
        const telepon = document.getElementById("telepon").value.trim();
        const alamat = document.getElementById("alamat").value.trim();
        const password = document.getElementById("password").value;
        const konfirmasiPassword =
            document.getElementById("konfirmasiPassword").value;
        const pesan = document.getElementById("pesan");

        // Memeriksa apakah semua data sudah diisi
        if (!nama || !email || !telepon || !alamat ||
            !password || !konfirmasiPassword) {
            pesan.textContent = "Semua kolom wajib diisi.";
            return;
        }

        // Memeriksa kesesuaian password
        if (password !== konfirmasiPassword) {
            pesan.textContent =
                "Password dan konfirmasi password tidak cocok.";
            return;
        }

        // Memeriksa panjang password
        if (password.length < 6) {
            pesan.textContent =
                "Password minimal terdiri dari 6 karakter.";
            return;
        }

        let customers;

        try {
            customers = getCustomers();
        } catch (error) {
            pesan.textContent = "Data akun gagal dibaca.";
            return;
        }

        // Memeriksa email yang sudah terdaftar
        const emailTerdaftar = customers.some(function (customer) {
            return customer.email === email;
        });

        if (emailTerdaftar) {
            pesan.textContent =
                "Email sudah terdaftar. Silakan gunakan email lain.";
            return;
        }

        // Membuat data customer baru
        const customerBaru = {
            id: "CUS-" + Date.now(),
            nama: nama,
            email: email,
            telepon: telepon,
            alamat: alamat,
            password: password,
            tanggalDaftar: new Date().toISOString()
        };

        // Menyimpan akun baru
        try {
            customers.push(customerBaru);
            saveCustomers(customers);

            pesan.textContent =
                "Pendaftaran berhasil! Silakan login menggunakan akun kamu.";

            form.reset();
        } catch (error) {
            pesan.textContent =
                "Pendaftaran gagal. Silakan coba lagi.";
            console.error("Gagal menyimpan akun:", error);
        }
    });
}

// Menjalankan kode setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", function () {
    initRegister();
});
```
