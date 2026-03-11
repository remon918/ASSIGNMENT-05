const cards = () => {
    url = ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    fetch(url)
        .then((res) => res.json())
        .then((json) => {

            displayCards(json.data)
        })
}

const loadPopupCard = () => {
    url = ("https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=notifications/${id}")
    // console.log(url);
    fetch(url)
        .then((res) => res.json())
        .then((json) => {
            // console.log(popups);
            popupCard(json.data);
        })
}

const displayPopupCard = (popup) => {
    // console.log(popup)
    const popupCardContainer = document.getElementById("popup-card-container");
    popupCardContainer.innerHTML = "";
    popup.forEach((popups) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="popup-card-container bg-[#FFFFFF] w-5/10 mx-auto p-8 space-y-4">
            <h2 class="font-bold text-[24px] text-[#1F2937]">Fix broken image uploads</h2>
            <div class="flex items-center gap-2">
                <button class=" bg-green-500 py-1 px-2 font-medium text-[12px] rounded-4xl">Opened</button>
                <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
                <p class="text-[12px] text-[#64748B]"> Opened by Fahim Ahmed</p>
                <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
                <p class="font-medium text-[12px] text-[#64748B]">22/02/2026</p>
            </div>
            <div class="help-2 flex justify-start gap-1">
                <h3
                    class="text-[#EF4444] bg-[#f7aeae52] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold">
                    <i class="fa-solid fa-bug"></i>Bug
                </h3>
                <h3
                    class="text-[#D97706] bg-[#fde68a53] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold">
                    <i class="fa-solid fa-life-ring"></i>Help Wanted
                </h3>
            </div>
            <p class="font-medium text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly
                on
                mobile devices. Need to fix the responsive behavior.</p>
            <div class="grid grid-cols-3 bg-[#F8FAFC]">
                <span class="">
                    <p class="font-medium text-[12px] text-[#64748B]">Assignee:</p>
                    <p class="font-semibold text-sm">Fahim Ahmed</p>
                </span>
                <span>
                    <p class="font-medium text-[12px] text-[#64748B]">Priority:</p>
                    <p
                        class="bg-[#EF4444] text-white px-2 py-1 rounded-2xl text-center text-[12px] font-semibold h-6 w-13">
                        High
                    </p>
                </span>
                <span></span>
            </div>
            <div class="flex justify-end">
                <button class="btn bg-[#4A00FF] text-white ">Close</button>
            </div>
        </div>
        `
        displayPopupCard.append(popupCardContainer);
    });
}


const statusOpen = document.getElementById("")


const displayCards = (cards) => {
    console.log(cards);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    //     {
    //     "id": 1,
    //     "title": "Fix navigation menu on mobile devices",
    //     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
    //     "status": "open",
    //     "labels": [
    //         "bug",
    //         "help wanted"
    //     ],
    //     "priority": "high",
    //     "author": "john_doe",
    //     "assignee": "jane_smith",
    //     "createdAt": "2024-01-15T10:30:00Z",
    //     "updatedAt": "2024-01-15T10:30:00Z"
    // }

    for (let card of cards) {
        const cardDiv = document.createElement("div");

        cardDiv.innerHTML = `
        <div id="" onclick="loadPopupCard()" class="card p-4 bg-[#FFFFFF] shadow-sm space-y-2">
            <div class="flex justify-between items-center">
                <img class="h-5" src="./assets/Open-Status.png" alt="">
                <p class="text-[#EF4444] bg-[#f7aeae77] pl-4 pr-4 rounded-2xl text-[12px] text-center">${card.status}
                </p>
            </div>
            <h2 class="font-semibold text-[14px]">${card.title}</h2>
            <p class="text-[12px] text-[#64748B]">${card.description}</p>
            <div class="help-2 flex justify-start gap-1">
                <h3
                    class="text-[#EF4444] bg-[#f7aeae52] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold">
                    <i class="fa-solid fa-bug"></i>${card.labels[0]}</h3>
                <h3
                    class="text-[#D97706] bg-[#fde68a53] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold">
                    <i class="fa-solid fa-life-ring"></i>${card.labels[1]}</h3>
            </div>
            <hr class="opacity-25">
            <p class="text-[#64748B] py-2 text-[12px]">${card.author}</p>
            <p class="text-[#64748B] text-[12px]">${card.createdAt}</p>
                    </div>
        `
        cardContainer.append(cardDiv);
    };
};

cards();