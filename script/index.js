const cards = () => {
    url = ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    fetch(url)
        .then((res) => res.json())
        .then((json) => displayCards(json.data))
}

const displayCards = (cards) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for(let card of cards) {
        const cardDiv = document.createElement("div");

        cardDiv.innerHTML = `
        <div class="card p-4 bg-[#FFFFFF] shadow-sm space-y-2">
            <div class="flex justify-between items-center">
                <img class="h-5" src="./assets/Open-Status.png" alt="">
                <p class="text-[#EF4444] bg-[#f7aeae77] pl-4 pr-4 rounded-2xl text-[12px] text-center">High</p>
            </div>
            <h2 class="font-semibold text-[14px]">Fix navigation menu on mobile devices</h2>
            <p class="text-[12px] text-[#64748B]">The navigation menu doesn't collapse properly on mobile
                devices...</p>
            <div class="help-2 flex justify-start gap-1">
                <h3 class="text-[#EF4444] bg-[#f7aeae52] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold"><i
                        class="fa-solid fa-bug"></i>Bug</h3>
                <h3 class="text-[#D97706] bg-[#fde68a53] px-2 py-1 rounded-2xl text-center text-[12px] font-semibold"><i
                        class="fa-solid fa-life-ring"></i>Help Wanted</h3>
            </div>
            <hr class="opacity-25">
            <p class="text-[#64748B] py-2 text-[12px]">#1
                by john_doe</p>
            <p class="text-[#64748B] text-[12px]">1/15/2024</p>
        </div>
        `
        cardContainer.append(cardDiv);
    };
};

cards();