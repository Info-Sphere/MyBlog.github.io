// --- Dark Mode Toggle ---
const themeToggleBtn = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Function to set theme
function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark');
        sunIcon?.classList.remove('hidden');
        moonIcon?.classList.add('hidden');
    } else {
        document.body.classList.remove('dark');
        sunIcon?.classList.add('hidden');
        moonIcon?.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
}

// Check for saved theme preference or default to light on load
const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

// Toggle theme on button click
themeToggleBtn?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
});

// --- Scroll to Top Button ---
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
};

scrollToTopBtn.onclick = function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
};

// --- Language Selector Logic ---
const languageSelector = document.getElementById('languageSelector');

if (languageSelector) {
    // Determine current language from URL suffix
    const pathSegments = window.location.pathname.split('/');
    const fileNameWithExt = pathSegments[pathSegments.length - 1]; // e.g., "index.html", "about-en.html", "my-post-es.html"

    const currentLangMatch = fileNameWithExt.match(/-([a-z]{2})\.html$/);
    let currentLang = 'en'; // Default to English if no suffix
    let baseFileName = fileNameWithExt;

    if (currentLangMatch && currentLangMatch[1]) {
        currentLang = currentLangMatch[1];
        baseFileName = fileNameWithExt.replace(`-${currentLang}.html`, '.html'); // e.g., "about.html", "my-post.html"
    } else if (fileNameWithExt === 'index.html') {
        // If it's just index.html, treat it as the English version
        currentLang = 'en';
        baseFileName = 'index.html';
    }

    languageSelector.value = currentLang;

    languageSelector.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        let newFileName;

        if (selectedLang === 'en') {
            // For English, use the base file name (e.g., index.html, about.html, my-post.html)
            newFileName = baseFileName;
            // Special case for index.html as it's the root default
            if (baseFileName === 'index.html') {
                newFileName = 'index.html'; // Ensure it doesn't become index-en.html
            }
        } else {
            // For other languages, append the suffix (e.g., index-es.html, about-es.html, my-post-es.html)
            const parts = baseFileName.split('.');
            // If baseFileName is like "index.html", parts[0] is "index", parts[1] is "html"
            // If baseFileName is like "my-post.html", parts[0] is "my-post", parts[1] is "html"
            parts[0] = parts[0].replace(/-[a-z]{2}$/, '') + `-${selectedLang}`; // Remove existing suffix if any, then add new
            newFileName = parts.join('.');
        }

        // Construct the new path, preserving the directory structure (e.g., "posts/new-file-name.html")
        let newPathSegments = [...pathSegments];
        newPathSegments[newPathSegments.length - 1] = newFileName;
        const newPath = newPathSegments.join('/');

        window.location.href = newPath;
    });
}
