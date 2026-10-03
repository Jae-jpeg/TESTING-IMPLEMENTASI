// ── DATA LAYER (localStorage) ──
function getData() {
    const raw = localStorage.getItem('mothernature_pesanan');
    return raw ? JSON.parse(raw) : [];
}

function saveData(data) {
    localStorage.setItem('mothernature_pesanan', JSON.stringify(data)); 
}

// ── HELPERS ──
function formatTanggal(dateStr) {
    const bulan = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const d = new Date(dateStr);
    return d.getDate() + ' ' + bulan[d.getMonth()] + ' ' + d.getFullYear();
}

// ── FORM HANDLING ──
function initForm() {
    const form = document.getElementById('formPesanan');
    if (!form) return; 

    // Batasi input Nomor Telepon agar hanya angka, maksimal 13 digit
    const teleponEl = document.getElementById('telepon');
    if (teleponEl) {
        teleponEl.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '').slice(0, 13);
        });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const editId = urlParams.get('edit');
    let editMode = false;

    if (editId) {
        const data = getData();
        const itemToEdit = data.find(function(item) { return item.id == editId; });
        if (itemToEdit) {
            editMode = true;
            document.getElementById('nama').value     = itemToEdit.nama     || '';
            document.getElementById('telepon').value  = itemToEdit.telepon  || '';
            document.getElementById('email').value    = itemToEdit.email    || '';
            document.getElementById('alamat').value   = itemToEdit.alamat   || '';
            document.getElementById('kota').value     = itemToEdit.kota     || '';

            const provinsiEl = document.getElementById('provinsi');
            if (provinsiEl && itemToEdit.provinsi) provinsiEl.value = itemToEdit.provinsi;

            const produkEl = document.getElementById('produk');
            if (produkEl && itemToEdit.produk) produkEl.value = itemToEdit.produk;

            document.getElementById('jumlah').value = itemToEdit.jumlah || '';

            const pengirimanEl = document.getElementById('pengiriman');
            if (pengirimanEl && itemToEdit.pengiriman) pengirimanEl.value = itemToEdit.pengiriman;

            const pembayaranEl = document.getElementById('pembayaran');
            if (pembayaranEl && itemToEdit.pembayaran) pembayaranEl.value = itemToEdit.pembayaran;

            document.getElementById('catatan').value = itemToEdit.catatan || '';

            const btnSubmit = form.querySelector('button[type="submit"]');
            if (btnSubmit) btnSubmit.innerHTML = '✏️ Simpan Perubahan';

            // Langsung gulirkan layar ke area Form Data Pemesanan, jangan diam di paling atas
            const formWrapper = document.getElementById('formWrapper');
            if (formWrapper) {
                setTimeout(function () {
                    formWrapper.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault(); 
        const nama       = document.getElementById('nama').value.trim();
        const telepon    = document.getElementById('telepon').value.trim();
        const email      = document.getElementById('email').value.trim();
        const alamat     = document.getElementById('alamat').value.trim();
        const kota       = document.getElementById('kota').value.trim();
        const provinsi   = document.getElementById('provinsi').value.trim();
        const produk     = document.getElementById('produk').value;
        const jumlah     = document.getElementById('jumlah').value.trim();
        const pengiriman = document.getElementById('pengiriman').value;
        const pembayaran = document.getElementById('pembayaran').value;
        const catatan    = document.getElementById('catatan').value.trim();
        const errorEl = document.getElementById('formError');
        errorEl.textContent = '';

        if (!nama || !telepon || !email || !alamat || !kota || !provinsi || provinsi === 'pilihan' ||
            !produk || produk === 'pilihan' ||
            !jumlah ||
            !pengiriman || pengiriman === 'pilihan' ||
            !pembayaran || pembayaran === 'pilihan') {
            errorEl.textContent = '❌ Semua isian wajib harus dilengkapi!';
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!/^[0-9]+$/.test(telepon) || telepon.length > 13) {
            errorEl.textContent = '❌ Nomor telepon hanya boleh angka, maksimal 13 digit!';
            errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (isNaN(jumlah) || Number(jumlah) < 1) {
            errorEl.textContent = '❌ Jumlah pesanan minimal 1 kg!';
            return;
        }

        const data = getData();

        if (editMode) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == editId) {
                    data[i].nama       = nama;
                    data[i].telepon    = telepon;
                    data[i].email      = email;
                    data[i].alamat     = alamat;
                    data[i].kota       = kota;
                    data[i].provinsi   = provinsi;
                    data[i].produk     = produk;
                    data[i].jumlah     = jumlah;
                    data[i].pengiriman = pengiriman;
                    data[i].pembayaran = pembayaran;
                    data[i].catatan    = catatan;
                    break;
                }
            }
        } else {
            const item = {
                id:         Date.now(), 
                nama:       nama,
                telepon:    telepon,
                email:      email,
                alamat:     alamat,
                kota:       kota,
                provinsi:   provinsi,
                produk:     produk,
                jumlah:     jumlah,
                pengiriman: pengiriman,
                pembayaran: pembayaran,
                catatan:    catatan,
                tanggal:    new Date().toISOString().split('T')[0] 
            };
            data.push(item);
        }

        saveData(data);

        form.reset();
        errorEl.textContent = '';
        alert(editMode ? '✅ Perubahan berhasil disimpan!' : '✅ Pesanan berhasil dikirim!');
        window.location.href = 'riwayat.html'; // Pindah Halaman ke riwayat
    });
}

function initRiwayat() {
    const tbody         = document.getElementById('tableBody');
    const emptyState    = document.getElementById('emptyState');
    const dataCount     = document.getElementById('dataCount');
    const btnHapusSemua = document.getElementById('btnHapusSemua');
    const tableWrapper  = document.getElementById('tableWrapper');

    if (!tbody) return;

    renderTable(); 

    if (btnHapusSemua) {
        btnHapusSemua.addEventListener('click', function () {
            if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?')) {
                saveData([]);
                renderTable(); 
            }
        });
    }

    function renderTable() {
        const data = getData();

        if (dataCount) {
            dataCount.textContent = data.length + ' pesanan';
        }

        if (data.length === 0) {
            tbody.innerHTML = ''; // Kosongkan jikalau ada sisa rendernya
            if (emptyState)    emptyState.style.display    = 'block';
            if (tableWrapper)  tableWrapper.style.display  = 'none';
            if (btnHapusSemua) btnHapusSemua.style.display = 'none';
            return; // hentikan langkah dan keluar
        }

        if (emptyState)    emptyState.style.display    = 'none';
        if (tableWrapper)  tableWrapper.style.display  = 'block';
        if (btnHapusSemua) btnHapusSemua.style.display = 'inline-block';

        tbody.innerHTML = '';
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const tr = document.createElement('tr'); 
            tr.innerHTML =
                '<td>' + (i + 1) + '</td>' +
                '<td>' + item.nama + '<br><span style="font-size:0.75rem;color:#5a7a45;">' + item.telepon + '</span></td>' +
                '<td>' + item.produk + '</td>' +
                '<td style="text-align:center;">' + item.jumlah + ' kg</td>' +
                '<td>' + item.pengiriman + '</td>' +
                '<td>' + item.pembayaran + '</td>' +
                '<td>' + formatTanggal(item.tanggal) + '</td>' +
                '<td>' +
                    '<button class="btn-edit" data-id="' + item.id + '">✏️ Edit</button> ' +
                    '<button class="btn-hapus" data-id="' + item.id + '">🗑️ Hapus</button>' +
                '</td>';

            tbody.appendChild(tr); 
        }

        const btnEdit = document.querySelectorAll('.btn-edit');
        btnEdit.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                window.location.href = 'pesan.html?edit=' + id; 
            });
        });

        const btnHapus = document.querySelectorAll('.btn-hapus');
        btnHapus.forEach(function (btn) {
            btn.addEventListener('click', function () {
                const id = Number(this.getAttribute('data-id'));
                if (confirm('Hapus pesanan ini selamanya?')) {
                    let data = getData();
                    data = data.filter(function (item) {
                        return item.id !== id;
                    });
                    saveData(data);
                    renderTable();
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    initForm();
    initRiwayat();
});
