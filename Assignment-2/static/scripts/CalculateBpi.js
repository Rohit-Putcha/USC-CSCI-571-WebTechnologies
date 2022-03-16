function calcBpi(){
    const uri = "https://rohitkumarputcha.pythonanywhere.com/bpi";

    const age = document.getElementById("Age").value;
    const weight = document.getElementById("Weight").value;

    if (age >= 1 && weight >= 1){
        const item = {
            age: age,
            weight: weight
        };

        /*var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                var responseJson = JSON.parse(xhttp.responseText)
                console.log(responseJson)
                document.getElementById("bpi-value").innerText = responseJson['bpi']
            }
        }

        xhttp.open("post", uri);

        xhttp.setRequestHeader('Accept', 'application/json');

        xhttp.send(JSON.stringify(item));*/

        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            mode:"cors",
            body: JSON.stringify(item)
        })
        .then(response => {
            res = response.json();
            return res;
        })
        .then(jsonData => {
            document.getElementById("bpi-value").innerText = "Predicted Blood Pressure is " + parseInt(jsonData['bpi']).toFixed(2);
            showResultVisibility(1)
        })
        .catch(error => {
            alert('Unable to calculate BPI')
            console.log('Unable to calculate BPI', error)
        });
    }
}

function clearInputFields(){
    document.getElementById("Age").value = ""
    document.getElementById("Weight").value = ""
    document.getElementById("bpi-value").innerText = ""
    showResultVisibility(0)

}

function openNav() {
    document.getElementById("mySidebar").style.width = "500px";
    //document.getElementById("container").style.marginLeft = "500px";
}
  
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    //document.getElementById("container").style.marginLeft= "0";
}

function populateSidebar(){

    showResultVisibility(0)
    fetch("../static/data/data.json")
    .then(response => {
    return response.json();})
    .then(function(jsonData) {
        populateSidebarData(jsonData)
    })
}

function populateSidebarData(data){

    const relativeUri = "../static/images/";
    let sidebarContainerDiv = document.getElementById("mySidebar");

    let sidebarTextDiv = document.createElement("div")
    sidebarTextDiv.id = "sidebar-text-div";

    let sidebarTextElement = document.createElement("p")
    sidebarTextElement.id = "sidebar-text";

    sidebarTextElement.innerText = data["data"];

    sidebarTextDiv.append(sidebarTextElement)

    sidebarContainerDiv.append(sidebarTextDiv)

    let sidebarImage1Div = document.createElement("div")
    sidebarImage1Div.id = "sidebar-image-1-div"

    let sidebarImage1Element = document.createElement("img");
    sidebarImage1Element.id = "sidebar-image-1"
    sidebarImage1Element.src = relativeUri + data["image1"];

    sidebarImage1Div.append(sidebarImage1Element)

    sidebarContainerDiv.append(sidebarImage1Div)

    let sidebarImage2Div = document.createElement("div")
    sidebarImage2Div.id = "sidebar-image-2-div"

    let sidebarImage2Element = document.createElement("img");
    sidebarImage2Element.id = "sidebar-image-2"
    sidebarImage2Element.src = relativeUri + data["image2"];

    
    sidebarImage2Div.append(sidebarImage2Element)

    sidebarContainerDiv.append(sidebarImage2Div)

}

function showResultVisibility(show){
    resultDivElement = document.getElementById("result-div")
    
    if (show == 1){
        resultDivElement.style.display = "block"
        resultDivElement.style.visibility = "visible"
    }
    else{
        resultDivElement.style.display = "none"
        resultDivElement.style.visibility = "hidden"
    }
}