import { DEFAULT_IMAGE } from "./config.js";
import { openImage } from "./ui.js";

// =====================================
// DOM
// =====================================

const gallery = document.getElementById("gallery");

// =====================================
// CLEAR
// =====================================

export function clearGallery() {

    if (!gallery) return;

    gallery.innerHTML = "";

}

// =====================================
// IMAGE
// =====================================

function createImage(item) {

    const wrapper = document.createElement("div");

    wrapper.className = "gallery-item";

    const img = document.createElement("img");

    img.loading = "lazy";

    img.src = item.image || DEFAULT_IMAGE;

    img.alt = item.name || "Background";

    img.onerror = () => {

        img.src = DEFAULT_IMAGE;

    };

    wrapper.appendChild(img);

    wrapper.addEventListener("click", () => {

        openImage(img.src);

    });

    return wrapper;

}

// =====================================
// EMPTY
// =====================================

function renderEmpty() {

    gallery.innerHTML = `
        <div class="gallery-empty">
            Không có Background
        </div>
    `;

}

// =====================================
// RENDER
// =====================================

export function renderGallery(data = []) {

    if (!gallery) return;

    clearGallery();

    if (!Array.isArray(data) || data.length === 0) {

        renderEmpty();

        return;

    }

    const fragment = document.createDocumentFragment();

    data.forEach(item => {

        fragment.appendChild(createImage(item));

    });

    gallery.appendChild(fragment);

}

// =====================================
// APPEND
// =====================================

export function appendGallery(item) {

    if (!gallery) return;

    gallery.appendChild(createImage(item));

}

// =====================================
// COUNT
// =====================================

export function galleryCount() {

    if (!gallery) return 0;

    return gallery.children.length;

}