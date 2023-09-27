/*
API result format :-
    "tag": "",
    "free": true,
    "role": false,
    "user": "jatinkevlani01",
    "email": "jatinkevlani01@gmail.com",
    "score": 0.64,
    "state": "deliverable",
    "domain": "gmail.com",
    "reason": "valid_mailbox",
    "mx_found": true,
    "catch_all": null,
    "disposable": false,
    "smtp_check": true,
    "did_you_mean": "",
    "format_valid": true
*/

/*
Invalid format :-
{
    "message": "Validation error",
    "errors": {
        "email": [
            "The email must be a valid email address."
        ]
    },
    "info": "For more information, see documentation: https://emailvalidation.io/docs/status-codes#_422"
}
*/

var result = {}
var checkValid = ``
var details = ``;
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    resultCont.innerHTML = `<img width="123" src="img/loading.svg" alt="loading svg">`
    detailsDiv.innerHTML = ``;
    let key = "ema_live_gJVxfFpD3BE2H6E7TKWflkqtJNIStW6OmJYo8W8t";
    let email = document.getElementById("email").value;
    let url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;
    let res = await fetch(url);
    result = await res.json();
    for (key of Object.keys(result)) {
        if (result[key] !== "" && result[key] !== " ") {
            if(result.message == "Validation error"){
                checkValid = `<h1 style="color: red;">${email} INVALID FORMAT!</h1>`;
                details += `<div>${key}: ${result[key]}</div>`;
            }
            else if (result.smtp_check == false || result.state == "undeliverable") {
                checkValid = `<h1 style="color: red;">${email} is an INVALID email!</h1>`;
                details += `<div>${key}: ${result[key]}</div>`;
            }
            else {
                checkValid = `<h1 style="color: green;">${email} is a VALID email!</h1>`;
                details += `<div>${key}: ${result[key]}</div>`;
            }
        }
    }
    console.log(details);
    resultCont.innerHTML = checkValid + `<input id="detailsBtn" type="submit" class="btn" value="Show details">`;
    detailsBtn.addEventListener("click", () => {
        detailsDiv.innerHTML = details;
        details = ``;
    })
});