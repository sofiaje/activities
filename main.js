let getActivityBtn = document.getElementById("getActivityBtn");
let showActivityDiv = document.getElementById("showActivityDiv")

async function getData(params) {
    let res = await fetch(`https://www.boredapi.com/api/activity?` + params)
    let data = await res.json();

    return data;
}


getActivityBtn.addEventListener("click", async () => {

    //uppdaterad lösning
    let radioBtn = document.querySelector('input[name="numberOfParticipants"]:checked');
    let select = document.querySelector("#typOfActivity");
    let freeActivity = document.querySelector("#freeActivity")

    let params = new URLSearchParams()

    radioBtn && radioBtn.id !== "any" ? params.append("participants", radioBtn.id) : "";
    select && select.value !== "any" ? params.append("type", select.value) : "";
    freeActivity.checked ? params.append("price", 0) : "";

    data = await getData(params);
    displayData(data);
    // console.log(params.toString())
})


function displayData(data) {
    let { activity, participants, type, price } = data
    if (activity) {
        showActivityDiv.innerHTML = `<h2>${activity}</h2>
        <p>Participants: ${participants}<br>
        Typ of activity: ${type}<br>
        `
        // Cost: $${price}</p>
    } else {
        showActivityDiv.innerHTML = `<h1>${data.error}</h1>`
    }
}


const filter = document.getElementById("filter");

filter.addEventListener("click", () => {
    const toggleDiv = document.getElementById("toggleDiv");
    toggleDiv.classList.toggle("hidden")
})