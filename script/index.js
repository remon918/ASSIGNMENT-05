let allIssues = [];
const openedCardIds = new Set();
let currentFilter = 'all';

const cards = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((json) => {
            allIssues = json.data;
            renderByFilter();
        })
        .catch((err) => console.error("Failed to load issues:", err));
};

const renderByFilter = () => {
    const openData = allIssues.filter(issue => !openedCardIds.has(issue.id.toString()));
    const closedData = allIssues.filter(issue => openedCardIds.has(issue.id.toString()));

    document.getElementById("btn-all").innerText = `All (${allIssues.length})`;
    document.getElementById("btn-open").innerText = `Open (${openData.length})`;
    document.getElementById("btn-closed").innerText = `Closed (${closedData.length})`;

    const totalCountText = document.querySelector("h2.font-semibold");
    if (totalCountText) {
        if (currentFilter === 'all') totalCountText.innerText = `${allIssues.length} Issues`;
        if (currentFilter === 'open') totalCountText.innerText = `${openData.length} Open Issues`;
        if (currentFilter === 'closed') totalCountText.innerText = `${closedData.length} Closed Issues`;
    }

    let filteredData = allIssues;
    if (currentFilter === 'open') filteredData = openData;
    if (currentFilter === 'closed') filteredData = closedData;

    displayCards(filteredData);
    updateButtonStyles();
};

document.getElementById("search-input").addEventListener("input", (e) => {
    const searchText = e.target.value.toLowerCase();

    let baseData = [];
    if (currentFilter === 'all') {
        baseData = allIssues;
    } else if (currentFilter === 'open') {
        baseData = allIssues.filter(issue => !openedCardIds.has(issue.id.toString()));
    } else if (currentFilter === 'closed') {
        baseData = allIssues.filter(issue => openedCardIds.has(issue.id.toString()));
    }

    const searchedData = baseData.filter(issue =>
        issue.title.toLowerCase().includes(searchText)
    );

    displayCards(searchedData);
});

const updateButtonStyles = () => {
    const btnAll = document.getElementById("btn-all");
    const btnOpen = document.getElementById("btn-open");
    const btnClosed = document.getElementById("btn-closed");

    [btnAll, btnOpen, btnClosed].forEach(btn => btn?.classList.remove("btn-primary"));

    if (currentFilter === 'all') btnAll?.classList.add("btn-primary");
    if (currentFilter === 'open') btnOpen?.classList.add("btn-primary");
    if (currentFilter === 'closed') btnClosed?.classList.add("btn-primary");
};

const labelMap = {
    "bug": { cls: "text-red-500 bg-red-100", icon: "fa-bug" },
    "help wanted": { cls: "text-amber-600 bg-amber-100", icon: "fa-life-ring" },
    "enhancement": { cls: "text-indigo-500 bg-indigo-100", icon: "fa-star" },
    "documentation": { cls: "text-sky-500 bg-sky-100", icon: "fa-file-lines" },
    "good first issue": { cls: "text-slate-600 bg-slate-100", icon: "fa-tag" }, 
};

const displayCards = (cardsData) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    const priorityBadgeClass = {
        high: "text-red-500 bg-red-100",
        medium: "text-amber-600 bg-amber-100",
        low: "text-green-600 bg-green-100",
    };

    cardsData.forEach(card => {
        const isClosed = openedCardIds.has(card.id.toString());
        const pClass = priorityBadgeClass[(card.priority || "").toLowerCase()] || "text-gray-500 bg-gray-100";
        const borderClass = isClosed ? "border-violet-500" : "border-green-500";
        const statusImg = isClosed ? "./assets/Closed-Status.png" : "./assets/Open-Status.png";
        const date = card.createdAt ? new Date(card.createdAt).toLocaleDateString("en-GB") : "";

        const labelsHTML = (card.labels || []).map(label => {
            const config = labelMap[label.toLowerCase()] || { cls: "text-gray-500 bg-gray-100", icon: "fa-tag" };
            return `<span class="${config.cls} px-2 py-1 rounded-full text-[10px] font-semibold capitalize whitespace-nowrap flex items-center gap-1">
                        <i class="fa-solid ${config.icon} text-[9px]"></i> ${label}
                    </span>`;
        }).join("");

        const cardDiv = document.createElement("div");
        cardDiv.className = "h-full";
        cardDiv.innerHTML = `
        <div id="card-${card.id}" onclick="loadPopupCard('${card.id}')"
             class="bg-white border-t-4 ${borderClass} rounded-lg p-4 shadow-sm hover:shadow-xl cursor-pointer flex flex-col gap-2 transition-shadow h-full">

            <div class="flex justify-between items-center">
                <img class="h-5" src="${statusImg}" alt="">
                <span class="${pClass} px-3 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    ${card.priority || ""}
                </span>
            </div>

            <h2 class="text-[14px] font-bold text-gray-800 text-left line-clamp-1">${card.title}</h2>
            <p class="text-[12px] text-slate-500 text-left line-clamp-2 min-h-[32px]">${card.description}</p>

            <div class="flex flex-row flex-wrap items-center gap-1.5 mt-1 overflow-hidden">
                ${labelsHTML}
            </div>

            <div class="mt-auto">
                <hr class="opacity-25 my-2">
                <p class="text-slate-500 text-[11px] text-left">#${card.id} by ${card.author}</p>
                <p class="text-slate-500 text-[11px] text-left">${date}</p>
            </div>
        </div>`;
        cardContainer.append(cardDiv);
    });
};

const loadPopupCard = (id) => {
    const issue = allIssues.find(i => i.id.toString() === id.toString());
    if (!issue) return;
    openedCardIds.add(id.toString());
    displayPopupCard(issue);
    renderByFilter();
};

const displayPopupCard = (popup) => {
    const modal = document.getElementById("popup-modal");
    const container = document.getElementById("popup-card-container");
    const isClosed = openedCardIds.has(popup.id.toString());

    const priorityClass = {
        high: "bg-red-500 text-white",
        medium: "bg-amber-500 text-white",
        low: "bg-green-500 text-white",
    }[(popup.priority || "").toLowerCase()] || "bg-gray-300 text-gray-700";

    const date = popup.createdAt ? new Date(popup.createdAt).toLocaleDateString("en-GB") : "";

    const labelsHTML = (popup.labels || []).map(label => {
        const config = labelMap[label.toLowerCase()] || { cls: "text-gray-500 bg-gray-100", icon: "fa-tag" };
        return `<span class="${config.cls} px-2 py-1 rounded-full text-[12px] font-semibold capitalize">
                    <i class="fa-solid ${config.icon}"></i> ${label}
                </span>`;
    }).join("");

    container.innerHTML = `
        <div class="p-8 flex flex-col gap-5 text-left">
            <h2 class="text-2xl font-bold text-gray-800">${popup.title}</h2>
            
            <div class="flex flex-wrap items-center gap-2">
                <span class="${isClosed ? 'bg-purple-500' : 'bg-green-500'} text-white px-3 py-1 rounded-full text-[12px] font-medium capitalize">
                    ${isClosed ? 'Closed' : 'Opened'}
                </span>
                <span class="text-slate-400">•</span>
                <p class="text-[13px] text-slate-500">Opened by <strong class="text-gray-700">${popup.author}</strong></p>
                <span class="text-slate-400">•</span>
                <p class="text-[13px] text-slate-500">${date}</p>
            </div>

            <div class="flex flex-wrap gap-2">${labelsHTML}</div>

            <p class="text-[14px] text-slate-600 leading-relaxed border-t pt-4">${popup.description}</p>

            <div class="grid grid-cols-2 bg-slate-50 rounded-xl p-5 gap-4 border border-slate-100">
                <div>
                    <p class="text-[11px] text-slate-400 font-bold uppercase mb-1">Assignee</p>
                    <p class="text-[14px] font-semibold text-gray-800">${popup.assignee || "Unassigned"}</p>
                </div>
                <div>
                    <p class="text-[11px] text-slate-400 font-bold uppercase mb-1">Priority</p>
                    <span class="${priorityClass} px-3 py-1 rounded text-[11px] font-bold uppercase">
                        ${popup.priority || "N/A"}
                    </span>
                </div>
            </div>

            <div class="flex justify-end pt-2">
                <button onclick="closePopup()" 
                    class="bg-[#4A00FF] hover:bg-[#3a00cc] text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-indigo-200">
                    Close
                </button>
            </div>
        </div>`;

    modal.style.display = "flex";
};

const closePopup = () => { document.getElementById("popup-modal").style.display = "none"; };

document.getElementById("btn-all").onclick = () => { currentFilter = 'all'; renderByFilter(); };
document.getElementById("btn-open").onclick = () => { currentFilter = 'open'; renderByFilter(); };
document.getElementById("btn-closed").onclick = () => { currentFilter = 'closed'; renderByFilter(); };

cards();