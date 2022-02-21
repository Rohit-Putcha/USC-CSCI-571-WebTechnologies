function mouseOver(elem){
    elem.style.color = 'white';
    elem.style.setProperty('text-shadow', 'orange 1.5px 1.5px');
}
function mouseLeave(elem){
    elem.style.color = 'orange';
    elem.style.setProperty('text-shadow', 'white 1.5px 1.5px');
}