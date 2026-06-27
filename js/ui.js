// =====================================
// DOM
// =====================================

const loading = document.getElementById("loading");

const toast = document.getElementById("toast");

const modal = document.getElementById("imageModal");

const modalImage = document.getElementById("modalImage");

const closeModal = document.getElementById("closeModal");

// =====================================
// LOADING
// =====================================

export function showLoading() {

    loading.classList.remove("hidden");

}

export function hideLoading() {

    loading.classList.add("hidden");

}

// =====================================
// TOAST
// =====================================

let toastTimer = null;

export function showToast(message, duration = 3000) {

    if (!toast) return;

    clearTimeout(toastTimer);

    toast.textContent = message;

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, duration);

}

// =====================================
// DATE
// =====================================

export function renderCurrentDate() {

    const target = document.getElementById("currentDate");

    if (!target) return;

    const now = new Date();

    target.textContent = now.toLocaleDateString(
        "vi-VN",
        {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        }
    );

}

// =====================================
// STATUS
// =====================================

export function createStatus(status) {

    const value = (status || "").toLowerCase();

    let className = "wait";

    let text = status;

    switch (value) {

        case "done":

            className = "done";

            text = "Done";

            break;

        case "process":

        case "processing":

        case "doing":

            className = "process";

            text = "Processing";

            break;

        case "wait":

        case "pending":

        default:

            className = "wait";

            text = "Waiting";

    }

    return `<span class="status ${className}">${text}</span>`;

}

// =====================================
// IMAGE MODAL
// =====================================

export function openImage(url) {

    if (!modal) return;

    modalImage.src = url;

    modal.classList.add("show");

}

export function closeImage() {

    if (!modal) return;

    modal.classList.remove("show");

    modalImage.src = "";

}

if (closeModal) {

    closeModal.onclick = closeImage;

}

if (modal) {

    modal.onclick = (e) => {

        if (e.target === modal) {

            closeImage();

        }

    };

}

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeImage();

    }

});

// =====================================
// TEXT
// =====================================

export function setText(id, value = "-") {

    const el = document.getElementById(id);

    if (!el) return;

    el.textContent = value || "-";

}

// =====================================
// LINK
// =====================================

export function setLink(id, url) {

    const el = document.getElementById(id);

    if (!el) return;

    if (!url) {

        el.removeAttribute("href");

        el.textContent = "-";

        return;

    }

    el.href = url;

    el.target = "_blank";

    el.textContent = "Open";

}

// =====================================
// NUMBER
// =====================================

export function setNumber(id, value = 0) {

    const el = document.getElementById(id);

    if (!el) return;

    el.textContent = Number(value).toLocaleString("vi-VN");

}

// =====================================
// HTML
// =====================================

export function setHTML(id, html) {

    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = html;

}

// =====================================
// CLEAR
// =====================================

export function clear(id) {

    const el = document.getElementById(id);

    if (!el) return;

    el.innerHTML = "";

}

// =====================================
// CREATE ELEMENT
// =====================================

export function create(tag, className = "") {

    const el = document.createElement(tag);

    if (className) {

        el.className = className;

    }

    return el;

}

// =====================================
// FORMAT TIME
// =====================================

export function formatTime(time) {

    if (!time) return "-";

    return String(time);

}

// =====================================
// SCROLL TOP
// =====================================

export function scrollTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}