const cards = () =>{
    url = ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    fetch(url)
    .then((res)=> res.json())
    .then((json)=> displayCards(json.data))
}

const displayCards =(card)=>{
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML ="";
    
    card.forEach(element => {
        const cardDiv = document.createElement("div");

        cardDiv.innerHTML = `
        
        `
    });
}