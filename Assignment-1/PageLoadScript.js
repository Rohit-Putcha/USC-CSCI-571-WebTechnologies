function mouseOver(elem){
    elem.style.color = 'orange';
    elem.style.setProperty('text-shadow', 'white 2px 2px');
}
function mouseLeave(elem){
    elem.style.color = 'white';
    elem.style.setProperty('text-shadow', 'orange 2px 2px');
}

function loadFromJson(){
    fetch("data/data.json")
    .then(response => {
    return response.json();
})
.then(function(jsonData) {
    renderData(jsonData);
})
}

function renderData(jsonData){
    
    populateGeneralInfoTag(jsonData)

    populateLaInfoTag(jsonData)

    populateLaInfo2Tag(jsonData)
}

function createImageTag(element, name = ""){
    let image = document.createElement("img");

    if (element !== undefined && name === ""){
        image.src = "data/".concat(element["image"]);
        image.alt = element["heading"];
    }
    else{
        image.src = "data/".concat("lasky.png");
        image.alt = "Los Angeles Sky View";
    }

    image.style.width = "100%";
    image.style.height = "100%";

    return image;
}

function createDivTagWithClassName(className){
    let div = document.createElement("div");
    div.className = className;
    return div;
}

function populateGeneralInfoTag(jsonData){
    let general_info = document.getElementById("general-info");
    
    Object.values(jsonData["section2"]).forEach(element => {
        var general_info_child = createDivTagWithClassName("general-info-child");

        var image_div = createDivTagWithClassName("general-info-child-image");

        let image = createImageTag(element);

        image_div.appendChild(image);

        let text_div = createDivTagWithClassName("general-info-child-text");

        let heading = document.createElement("p");
        heading.className = "general-info-child-text-heading";
        heading.innerText = element["heading"];
        heading.style = "text-align: left; margin: 0px; font-size: 20px; font-family:sans-serif;";

        let paragraph = document.createElement("p");
        paragraph.className = "general-info-child-text-paragraph";
        paragraph.innerText = element["text"];
        paragraph.style = "text-align: left; font-family:sans-serif;";

        text_div.appendChild(heading);
        text_div.appendChild(paragraph);

        general_info_child.appendChild(image_div);
        general_info_child.appendChild(text_div);

        general_info.appendChild(general_info_child);
    });
}

function populateLaInfoTag(jsonData){
    var la_info = document.getElementById("la-info");
   
    var child_div = createDivTagWithClassName("la-info-child");

    var image_div = createDivTagWithClassName("la-info-child-image");
    
    let image = createImageTag(undefined, "lasky.png");
    
    let text_div = document.createElement("div");
    text_div.className = "la-info-child-text";

    Object.values(jsonData["section3"]["text"]).forEach(element => {
        let text = document.createElement("p");
        text.innerText = element
        text.style = "color: white; margin-top: 0px; text-align: justify; font-family:sans-serif; font-size: 15px;";

        text_div.appendChild(text);
    });
    
    image_div.appendChild(image);

    child_div.append(text_div);
    child_div.append(image_div);

    la_info.appendChild(child_div);
}

function populateLaInfo2Tag(jsonData){
    var la_info_2 = document.getElementById("la-info-2");
    
    let align = true;
    Object.values(jsonData["section4"]).forEach(element => {
        align = !align;
        console.log(align);
        var child_div = createDivTagWithClassName("la-info-2-child");

        let image_div = createDivTagWithClassName("la-info-2-child-image");
        let image = createImageTag(element);
        image_div.append(image);

        let text_div = createDivTagWithClassName("la-info-2-child-text");
        let heading = document.createElement("p");
        heading.innerText = element["heading"];
        heading.style = "color: white; text-align: left; margin-top: 0px; font-size: 20px; font-family:sans-serif;";

        let paragraph = document.createElement("p");
        paragraph.innerText = element["text"];
        paragraph.style = "color: white; font-size: 15px; margin-bottom: 0px; text-align: justify; font-family:sans-serif;";
    
        text_div.append(heading);
        text_div.append(paragraph);

        if (align === false){
            child_div.style.setProperty('margin-top', '100px');
            heading.style.setProperty("text-align", "left");

            child_div.append(image_div);
            child_div.append(text_div);
        }
        else{
            child_div.style.setProperty('margin-bottom', '100px');
            heading.style.setProperty("text-align", "right");

            child_div.append(text_div);
            child_div.append(image_div);
        }

        la_info_2.appendChild(child_div);
    });
}