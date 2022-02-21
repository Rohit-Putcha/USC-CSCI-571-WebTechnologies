function mouseOver(elem){
    elem.style.color = 'orange';
    elem.style.setProperty('text-shadow', 'white 1.5px 1.5px');
}
function mouseLeave(elem){
    elem.style.color = 'white';
    elem.style.setProperty('text-shadow', 'orange 1.5px 1.5px');
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
        general_info_child.style = "height:420px; width: 260px; " + 
        "margin-right: 20px; margin-top: 90px; margin-bottom: 90px;" +
        "background-color: rgb(15, 15, 15); " +
        "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); " + 
        "border-radius: 5px;";

        var image_div = createDivTagWithClassName("general-info-child-image");
        image_div.style = "height:140px; width:220px; margin: 20px";

        let image = createImageTag(element);
        image.style.borderRadius = "3px";
        image_div.appendChild(image);

        let text_div = createDivTagWithClassName("general-info-child-text");
        text_div.style = " height:240px; width:220px; margin: 20px;";

        let heading = document.createElement("p");
        heading.className = "general-info-child-text-heading";
        heading.innerText = element["heading"];
        heading.style = "text-align: left; margin: 0px; font-size: 18px;";

        let paragraph = document.createElement("p");
        paragraph.className = "general-info-child-text-paragraph";
        paragraph.innerText = element["text"];
        paragraph.style = "text-align: left; font-size: 14px; line-height: 120%";

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
    child_div.style = " height:240px; width: 900px; justify-content: center;" + 
    "background-color: rgb(15, 15, 15); text-align: center; display: flex;" +
    "margin-left: 177px; margin-right: 177px; margin-top: 180px;";

    var image_div = createDivTagWithClassName("la-info-child-image");
    image_div.style = "height:220px; width: 400px; margin: 10px;";

    let image = createImageTag(undefined, "lasky.png");
    
    let text_div = createDivTagWithClassName("la-info-child-text");
    text_div.style = "height:220px; width: 420px; margin: 10px;";

    Object.values(jsonData["section3"]["text"]).forEach(element => {
        let text = document.createElement("p");
        text.innerText = element
        text.style = "margin-top: 0px; text-align: justify; font-size: 14px;";

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
        child_div.style = "height:200px; width: 900px; display: flex; " + 
        "margin-left: 177px; margin-right: 177px;";

        let image_div = createDivTagWithClassName("la-info-2-child-image");
        image_div.style = "height:180px; width: 280px; margin: 10px;" +
                            "box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);";

        let image = createImageTag(element);
        image_div.append(image);

        let text_div = createDivTagWithClassName("la-info-2-child-text");
        text_div.style = "height:195px; width: 545px; margin: 5px;";

        let heading = document.createElement("p");
        heading.innerText = element["heading"];
        heading.style = "text-align: left; margin-top: 6px; font-size: 16px; font-weight: bold";

        let paragraph = document.createElement("p");
        paragraph.innerText = element["text"];
        paragraph.style = "font-size: 14px; margin-bottom: 6px; text-align: justify;";
    
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