// =====================================
// DOM
// =====================================

const statTimeline = document.getElementById("statTimeline");

const statAssets = document.getElementById("statAssets");

const statVideos = document.getElementById("statVideos");

const statBackground = document.getElementById("statBackground");

// =====================================
// ANIMATION
// =====================================

function animateNumber(element, value) {

    if (!element) return;

    const end = Number(value) || 0;

    const duration = 800;

    const startTime = performance.now();

    function update(now) {

        const progress = Math.min((now - startTime) / duration, 1);

        const current = Math.floor(progress * end);

        element.textContent = current.toLocaleString("vi-VN");

        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }

    requestAnimationFrame(update);

}

// =====================================
// RENDER
// =====================================

export function renderStats(stats = {}) {

    animateNumber(

        statTimeline,

        stats.timeline || 0

    );

    animateNumber(

        statAssets,

        stats.assets || 0

    );

    animateNumber(

        statVideos,

        stats.videos || 0

    );

    animateNumber(

        statBackground,

        stats.background || 0

    );

}

// =====================================
// UPDATE
// =====================================

export function updateStat(name, value) {

    switch (name) {

        case "timeline":

            animateNumber(statTimeline, value);

            break;

        case "assets":

            animateNumber(statAssets, value);

            break;

        case "videos":

            animateNumber(statVideos, value);

            break;

        case "background":

            animateNumber(statBackground, value);

            break;

    }

}

// =====================================
// RESET
// =====================================

export function resetStats() {

    renderStats({

        timeline: 0,

        assets: 0,

        videos: 0,

        background: 0

    });

}

// =====================================
// FROM TIMELINE
// =====================================

export function calculateStats(timeline = [], gallery = []) {

    const stats = {

        timeline: timeline.length,

        assets: 0,

        videos: 0,

        background: gallery.length

    };

    timeline.forEach(item => {

        const type = String(item.type || "").toLowerCase();

        if (type === "video") {

            stats.videos++;

        }

        if (
            type === "image" ||
            type === "video" ||
            type === "html" ||
            type === "gif"
        ) {

            stats.assets++;

        }

    });

    return stats;

}