// ===============================
// CONFIG
// ===============================

// Thay bằng URL Web App sau khi deploy Apps Script
export const API_BASE =
    "https://script.google.com/macros/s/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/exec";

// ===============================
// API
// ===============================

export const ENDPOINT = {

    dashboard: "dashboard",

    gallery: "gallery",

    timeline: "timeline",

    stats: "stats"

};

// ===============================
// APP
// ===============================

export const APP = {

    title: "RE:BAU MASTER",

    version: "1.0.0",

    debug: true

};

// ===============================
// CACHE
// ===============================

export const CACHE = {

    enabled: true,

    // 5 phút
    ttl: 1000 * 60 * 5

};

// ===============================
// REQUEST
// ===============================

export const REQUEST = {

    timeout: 15000

};

// ===============================
// DATE FORMAT
// ===============================

export const DATE_OPTION = {

    weekday: "long",

    day: "2-digit",

    month: "2-digit",

    year: "numeric"

};

// ===============================
// STATUS COLOR
// ===============================

export const STATUS = {

    done: "done",

    process: "process",

    wait: "wait"

};

// ===============================
// DEFAULT IMAGE
// ===============================

export const DEFAULT_IMAGE =
    "assets/no-image.png";

// ===============================
// LOCAL STORAGE KEY
// ===============================

export const STORAGE_KEY = {

    dashboard: "rebau_dashboard",

    gallery: "rebau_gallery",

    timeline: "rebau_timeline",

    stats: "rebau_stats"

};