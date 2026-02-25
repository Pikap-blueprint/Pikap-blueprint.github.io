/* ─────────────────────────────────────────
   PIKAPWEB - Final Clean SPA JS
   ───────────────────────────────────────── */

// 1. Definisikan fungsi navigasi di luar agar bisa dipanggil kapan saja
function navigateTo(targetId) {
    const id = targetId.replace('#', '');
    const targetSection = document.getElementById(id);
    const allSections = document.querySelectorAll('.page-section');

    if (targetSection) {
        // Sembunyikan semua section
        allSections.forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none'; 
        });
        
        // Tampilkan yang diklik
        targetSection.classList.add('active');
        targetSection.style.display = 'block';

        // Scroll ke atas otomatis
        window.scrollTo(0, 0);

        // Update URL di browser tanpa reload
        history.pushState(null, null, `#${id}`);

        // Jalankan ulang animasi reveal
        const reveals = targetSection.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        reveals.forEach(el => el.classList.add('visible'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('navToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const allLinks = document.querySelectorAll('a[href^="#"]');

    // 2. Logika Klik Link (Desktop & Mobile)
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault(); 
            navigateTo(href);

            // Tutup menu mobile otomatis setelah klik link
            if (mobileMenu) {
                mobileMenu.classList.remove('show');
                mobileMenu.style.display = 'none'; // Tambahan untuk memastikan
            }
        });
    });

    // 3. Logika Hamburger Button (Buka/Tutup)
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            // Toggle class 'show' dan handle manual display
            const isShowing = mobileMenu.classList.toggle('show');
            mobileMenu.style.display = isShowing ? 'block' : 'none';
        });
    }

    // 4. Tutup menu jika klik di mana saja (di luar menu)
    document.addEventListener('click', (e) => {
        if (mobileMenu && !mobileMenu.contains(e.target) && !navToggle.contains(e.target)) {
            mobileMenu.classList.remove('show');
            mobileMenu.style.display = 'none';
        }
    });

    // 5. Cek Hash URL saat pertama kali load (misal: domain.com/#about)
    if (window.location.hash) {
        navigateTo(window.location.hash);
    } else {
        // Default ke home jika tidak ada hash
        navigateTo('#home');
    }
});