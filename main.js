let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    loginForm.classList.remove('active')
}

menu.addEventListener('click', ()=> {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

formBtn.addEventListener('click', ()=>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click', ()=>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn => {
    btn.addEventListener('click', ()=>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src =src;
    });
});

// Harga berdasarkan tipe kamar
const hargaKamar = {
    standard: 500000,
    deluxe: 800000,
    family: 1200000,
};

// Ambil elemen-elemen form
const bookingForm = document.getElementById("bookingForm");
const kamarSelect = document.getElementById("kamar");
const durasiInput = document.getElementById("durasi-menginap");
const breakfastCheckbox = document.getElementById("breakfast");
const hargaInput = document.getElementById("harga");
const totalBayarInput = document.getElementById("total-bayar");
const genderCheckboxes = document.querySelectorAll('input[name="gender"]');

// Fungsi untuk memperbarui harga kamar
function updateHargaKamar() {
    const tipeKamar = kamarSelect.value;
    if (tipeKamar) {
        hargaInput.value = hargaKamar[tipeKamar];  // Update harga input berdasarkan tipe kamar
        updateTotalBayar();  // Update total bayar setelah harga berubah
    } else {
        hargaInput.value = "";
        totalBayarInput.value = "";
    }
}

// Fungsi untuk menghitung total bayar
function updateTotalBayar() {
    const harga = parseInt(hargaInput.value) || 0;
    const durasi = parseInt(durasiInput.value) || 0;
    const breakfast = breakfastCheckbox.checked ? 80000 : 0;

    let total = harga * durasi;

    // Tambahkan diskon jika lama menginap lebih dari 3 hari
    if (durasi > 3) {
        total *= 0.9; // Diskon 10%
    }

    // Tambahkan biaya sarapan
    total += breakfast * durasi;

    totalBayarInput.value = total; // Update total bayar
}

// Event listener untuk perubahan pada tipe kamar
kamarSelect.addEventListener("change", updateHargaKamar);

// Event listener untuk perubahan pada durasi menginap dan sarapan
durasiInput.addEventListener("input", updateTotalBayar);
breakfastCheckbox.addEventListener("change", updateTotalBayar);

// Menangani klik tombol "Booking Sekarang"
document.getElementById("book-now").addEventListener("click", function () {
    // Ambil data dari inputan
    const namaPemesan = document.getElementById("nama-pemesan").value;
    const kamar = kamarSelect.value;
    const durasiMenginap = durasiInput.value;
    const breakfast = breakfastCheckbox.checked ? "Ya" : "Tidak";
    const totalBayar = totalBayarInput.value;

    // Validasi input
    if (!namaPemesan || !kamar || !durasiMenginap || !totalBayar) {
        alert("Harap lengkapi semua data.");
        return;
    }

    // Menentukan jenis kelamin yang dipilih
    let selectedGender = [];
    genderCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedGender.push(checkbox.value);
        }
    });

    // Tampilkan Resume Pemesanan
    document.getElementById("resume").style.display = "block";
    document.getElementById("resume-name").textContent = namaPemesan;
    document.getElementById("resume-room").textContent = kamar;
    document.getElementById("resume-stay-duration").textContent = `${durasiMenginap} malam`;
    document.getElementById("resume-breakfast").textContent = breakfast;
    document.getElementById("resume-total").textContent = `Rp${parseInt(totalBayar).toLocaleString()}`;

    // Tampilkan harga di resume
    document.getElementById("resume-price").textContent = `Rp${parseInt(hargaInput.value).toLocaleString()}`;

    document.getElementById("resume-gender").textContent = selectedGender.join(", ") || "Belum dipilih";
});

// Event listener untuk tombol "Tutup Resume"
document.getElementById("close-resume").addEventListener("click", function () {
    // Sembunyikan resume
    document.getElementById("resume").style.display = "none";

    // Reset form setelah resume ditutup
    bookingForm.reset();

    // Reset nilai harga dan total bayar di form
    hargaInput.value = "";
    totalBayarInput.value = "";
});

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        640:{
            slidesPerView: 1,
        },
        768:{
            slidesPerView: 2,
        },
        1024:{
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 40,
    loop: true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        450:{
            slidesPerView: 2,
        },
        768:{
            slidesPerView: 3,
        },
        991:{
            slidesPerView: 4,
        },
        1200:{
            slidesPerView: 5,
        },
    },
});

// Memastikan semua dropdown dapat ditutup saat klik di luar
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

// Fungsi untuk menangani klik pada toggle dropdown
function handleDropdownClick(e) {
    e.preventDefault();

    // Ambil menu dropdown terkait
    const dropdownMenu = this.nextElementSibling;

    // Tutup semua dropdown kecuali yang saat ini
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
        if (menu !== dropdownMenu) {
            menu.style.display = 'none';
        }
    });

    // Tampilkan atau sembunyikan dropdown terkait
    dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
}

// Menambahkan event listener pada semua dropdown toggle
dropdownToggles.forEach((toggle) => {
    toggle.addEventListener('click', handleDropdownClick);
});

// Event listener untuk menutup dropdown saat klik di luar
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach((menu) => {
            menu.style.display = 'none';
        });
    }
});

// Menangani scroll behavior untuk header transparan
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.7)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.3)';
    }
});

// Menambahkan fungsionalitas tombol booking
const bookNowButton = document.getElementById('book-now');
bookNowButton.addEventListener('click', () => {
    alert('Terima kasih telah melakukan pemesanan! Kami akan segera menghubungi Anda.');
});

document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', event => {
        const dropdownMenu = item.nextElementSibling;
        dropdownMenu.classList.toggle('active'); // Toggle active class for visibility
    });
});


