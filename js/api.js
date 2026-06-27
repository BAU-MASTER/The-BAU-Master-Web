import {
    API_BASE,
    ENDPOINT,
    REQUEST,
    CACHE,
    STORAGE_KEY
} from "./config.js";

// ========================================
// TIMEOUT FETCH
// ========================================

async function fetchWithTimeout(url, options = {}) {

    const controller = new AbortController();

    const timeout = setTimeout(() => {

        controller.abort();

    }, REQUEST.timeout);

    try {

        const response = await fetch(url, {

            ...options,

            signal: controller.signal

        });

        clearTimeout(timeout);

        return response;

    }

    catch (error) {

        clearTimeout(timeout);

        throw error;

    }

}

// ========================================
// URL
// ========================================

function buildUrl(action) {

    return `${API_BASE}?action=${action}`;

}

// ========================================
// CACHE
// ========================================

function saveCache(key, data) {

    if (!CACHE.enabled) return;

    const payload = {

        time: Date.now(),

        data

    };

    localStorage.setItem(key, JSON.stringify(payload));

}

function loadCache(key) {

    if (!CACHE.enabled) return null;

    const raw = localStorage.getItem(key);

    if (!raw) return null;

    try {

        const cache = JSON.parse(raw);

        const expired = Date.now() - cache.time > CACHE.ttl;

        if (expired) {

            localStorage.removeItem(key);

            return null;

        }

        return cache.data;

    }

    catch {

        localStorage.removeItem(key);

        return null;

    }

}

function clearCache(key) {

    localStorage.removeItem(key);

}

// ========================================
// BASE REQUEST
// ========================================

async function request(action, storageKey) {

    const cache = loadCache(storageKey);

    if (cache) {

        if (window.APP_DEBUG)

            console.log("Load cache:", action);

        return cache;

    }

    const url = buildUrl(action);

    const response = await fetchWithTimeout(url);

    if (!response.ok) {

        throw new Error("HTTP " + response.status);

    }

    const json = await response.json();

    if (!json.success) {

        throw new Error(json.message || "Unknown error");

    }

    saveCache(storageKey, json.data);

    return json.data;

}

// ========================================
// DASHBOARD
// ========================================

export async function getDashboard() {

    return await request(

        ENDPOINT.dashboard,

        STORAGE_KEY.dashboard

    );

}

// ========================================
// GALLERY
// ========================================

export async function getGallery() {

    return await request(

        ENDPOINT.gallery,

        STORAGE_KEY.gallery

    );

}

// ========================================
// TIMELINE
// ========================================

export async function getTimeline() {

    return await request(

        ENDPOINT.timeline,

        STORAGE_KEY.timeline

    );

}

// ========================================
// STATS
// ========================================

export async function getStats() {

    return await request(

        ENDPOINT.stats,

        STORAGE_KEY.stats

    );

}

// ========================================
// REFRESH
// ========================================

export function refreshAllCache() {

    clearCache(STORAGE_KEY.dashboard);

    clearCache(STORAGE_KEY.gallery);

    clearCache(STORAGE_KEY.timeline);

    clearCache(STORAGE_KEY.stats);

}

// ========================================
// CLEAR
// ========================================

export function clearAllCache() {

    Object.values(STORAGE_KEY).forEach(key => {

        localStorage.removeItem(key);

    });

}