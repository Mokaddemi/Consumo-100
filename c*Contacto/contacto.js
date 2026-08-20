
/* Menú móvil */
(function () {
    const navEl = document.querySelector('nav');
    const burger = navEl.querySelector('.nav-hamburger, .nav-burger');
    if (!burger) return;
    burger.addEventListener('click', () => navEl.classList.toggle('mobile-open'));
    navEl.querySelectorAll('.nav-links a').forEach(link =>
        link.addEventListener('click', () => navEl.classList.remove('mobile-open'))
    );
})();

/* Ripple */
const btn = document.getElementById("btnSend");
btn.addEventListener("pointerdown", e => {
    const r = document.createElement("span");
    r.classList.add("ripple");
    const rect = btn.getBoundingClientRect();
    const s = Math.max(btn.offsetWidth, btn.offsetHeight);
    Object.assign(r.style, {
        width: s + "px", height: s + "px",
        left: (e.clientX - rect.left - s / 2) + "px",
        top: (e.clientY - rect.top - s / 2) + "px"
    });
    btn.appendChild(r);
    setTimeout(() => r.remove(), 600);
});

/* Form validation */
const form = document.getElementById("contactForm");
const success = document.getElementById("formSuccess");
form.addEventListener("submit", e => {
    e.preventDefault();
    let ok = true;
    ["nombre", "telefono", "email"].forEach(id => {
        const el = document.getElementById(id);
        if (!el.value.trim()) {
            el.classList.add("err");
            ok = false;
            el.addEventListener("input", () => el.classList.remove("err"), { once: true });
        }
    });
    const priv = document.getElementById("privacy");
    if (!priv.checked) {
        priv.classList.add("err"); ok = false;
        priv.addEventListener("change", () => priv.classList.remove("err"), { once: true });
    }
    if (!ok) return;
    btn.disabled = true;
    btn.querySelector(".btn-send-text").textContent = "enviando…";
    setTimeout(() => {
        btn.style.display = "none";
        success.classList.add("show");
        form.reset();
    }, 1300);
});