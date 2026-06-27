import {
    getDashboard,
    getGallery,
    getTimeline,
    getStats
} from "./api.js";

import {
    renderGallery
} from "./gallery.js";

import {
    renderStats,
    calculateStats
} from "./stats.js";

import {
    showLoading,
    hideLoading,
    showToast,
    renderCurrentDate,
    setText,
    setLink,
    createStatus
} from "./ui.js";

// =====================================
// INIT
// =====================================

document.addEventListener("DOMContentLoaded", init);

async function init() {

    showLoading();

    renderCurrentDate();

    try {

        await loadDashboard();

    }

    catch (error) {

        console.error(error);

        showToast("Không thể tải dữ liệu.");

    }

    finally {

        hideLoading();

    }

}

// =====================================
// LOAD
// =====================================

async function loadDashboard() {

    const [

        dashboard,

        gallery,

        timeline,

        stats

    ] = await Promise.all([

        getDashboard(),

        getGallery(),

        getTimeline(),

        getStats()

    ]);

    renderHeader(dashboard);

    renderInformation(dashboard);

    renderGallery(gallery);

    renderTimeline(timeline);

    if (stats) {

        renderStats(stats);

    }

    else {

        renderStats(

            calculateStats(

                timeline,

                gallery

            )

        );

    }

}

// =====================================
// HEADER
// =====================================

function renderHeader(data) {

    setText(

        "projectName",

        data.project || "-"

    );

    setText(

        "roomName",

        data.room || "-"

    );

}

// =====================================
// INFO
// =====================================

function renderInformation(data) {

    setText(

        "brand",

        data.brand

    );

    setText(

        "campaign",

        data.campaign

    );

    setText(

        "room",

        data.room

    );

    setText(

        "agency",

        data.agency

    );

    setText(

        "producer",

        data.producer

    );

    setText(

        "status",

        data.status

    );

    setLink(

        "driveLink",

        data.drive

    );

}

// =====================================
// TIMELINE
// =====================================

function renderTimeline(list = []) {

    const tbody = document.getElementById("timelineBody");

    tbody.innerHTML = "";

    if (!Array.isArray(list) || list.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align:center">
                    Không có dữ liệu
                </td>
            </tr>
        `;

        return;

    }

    const fragment = document.createDocumentFragment();

    list.forEach(item => {

        const tr = document.createElement("tr");

        tr.innerHTML = `

            <td>${item.time || "-"}</td>

            <td>${item.content || "-"}</td>

            <td>${item.duration || "-"}</td>

            <td>${item.type || "-"}</td>

            <td>${createStatus(item.status)}</td>

        `;

        fragment.appendChild(tr);

    });

    tbody.appendChild(fragment);

}

// =====================================
// REFRESH
// =====================================

export async function refresh() {

    showLoading();

    try {

        await loadDashboard();

        showToast("Đã cập nhật dữ liệu.");

    }

    catch (error) {

        console.error(error);

        showToast("Cập nhật thất bại.");

    }

    finally {

        hideLoading();

    }

}

// =====================================
// AUTO REFRESH
// =====================================

setInterval(() => {

    refresh();

}, 1000 * 60 * 5);

// =====================================
// DEBUG
// =====================================

window.refreshDashboard = refresh;