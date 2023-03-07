let getActivityBtn = document.getElementById("getActivityBtn");
let showActivityDiv = document.getElementById("showActivityDiv")

async function getData(params) {
    let res = await fetch(`https://www.boredapi.com/api/activity?` + params)
    let data = await res.json();

    return data;
}


getActivityBtn.addEventListener("click", async () => {

    // // min lösning
    // let radioBtn = document.querySelector('input[name="numberOfParticipants"]:checked');
    // let select = document.querySelector("#typOfActivity");
    // let freeActivity = document.querySelector("#freeActivity")

    // let participants = "";
    // let type = "";
    // let price = "";

    // radioBtn ? participants = radioBtn.id : "";
    // select ? type = select.value : "";
    // freeActivity.checked ? price = 0 : "";

    // let params = new URLSearchParams({
    //     participants,
    //     type,
    //     price
    // })
    // data = await getData(params);
    // console.log(params.toString())
    // displayData(data);


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
    console.log(params.toString())
})


function displayData(data) {
    let { activity, participants, type, price } = data
    if (activity) {
        showActivityDiv.innerHTML = `<h1>${activity}</h1>
        <p>Participants: ${participants}<br>
        Typ of activity: ${type}<br>
        Cost: $${price}</p>`
    } else {
        showActivityDiv.innerHTML = `<h1>${data.error}</h1>`
    }
}