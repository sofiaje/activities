let getActivityBtn = document.getElementById("getActivityBtn");
let showActivityDiv = document.getElementById("showActivityDiv")

async function getData(params) {
    let res = await fetch(`https://www.boredapi.com/api/activity?` + params)
    let data = await res.json();

    return data;
}


getActivityBtn.addEventListener("click", async () => {

    let radioBtn = document.querySelector('input[name="numberOfParticipants"]:checked');
    let select = document.querySelector("#typOfActivity");
    let freeActivity = document.querySelector("#freeActivity")

    let participants = ""
    let type = "";
    let price = "";

    radioBtn ? participants = radioBtn.id : "";
    select ? type = select.value : "";
    freeActivity.checked ? price = 0 : ""

    let params = new URLSearchParams({
        participants,
        type,
        price
    })

    data = await getData(params);
    displayData(data);

})


function displayData(data) {
    if (data.activity) {
        showActivityDiv.innerHTML = `<h1>${data.activity}</h1>
        <p>Participants: ${data.participants}<br>
        Typ of activity: ${data.type}<br>
        Cost: $${data.price}</p>`
    } else {
        showActivityDiv.innerHTML = `<h1>${data.error}</h1>`
    }
}