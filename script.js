// ==UserScript==
// @name         MyAnimeList Colorizer
// @namespace    http://www.david-gouveia.com/
// @version      1.0
// @description  Adds colors based on status while browsing for anime or manga on MyAnimeList
// @author       David Gouveia
// @match        https://myanimelist.net/topanime*
// @match        https://myanimelist.net/topmanga*
// @match        https://myanimelist.net/anime*
// @match        https://myanimelist.net/manga*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function findButton(element) {
        let editButtons = element.getElementsByClassName("button_edit");
        let addButtons = element.getElementsByClassName("button_add");
        if(editButtons.length > 0) return editButtons[0].innerHTML;
        else if(addButtons.length > 0) return addButtons[0].innerHTML;
        else return "";
    }

    function getColor(text) {
        if(text.includes("Watching") || text.includes("CW") || text.includes("Reading") || text.includes("CR")) return "#ddf5dd";
        else if(text.includes("Completed") || text.includes("CMPL")) return "#d5e1ef";
        else if(text.includes("On-Hold") || text.includes("HOLD")) return "#fafadf";
        else if(text.includes("Dropped") || text.includes("DROP")) return "#ffd5d5";
        else if(text.includes("Plan to Watch") || text.includes("PTW") || text.includes("Plan to Read") || text.includes("PTR")) return "#e9e9e9";
        else return "#ffffff";
    }

    // Grid View
    for(let div of document.getElementsByClassName("seasonal-anime")) {
        let color = getColor(findButton(div));
        div.style.backgroundColor = color;
    }

    // List View
    let list = document.getElementsByClassName("js-block-list list")[0];
    if(list) {
        for(let tr of list.getElementsByTagName("tr")) {
            let color = getColor(findButton(tr));
            for(let td of tr.getElementsByTagName("td")) {
                td.style.backgroundColor = color;
            }
        }
    }

    // Top List View
    for(let tr of document.getElementsByClassName("ranking-list")) {
        let color = getColor(tr.getElementsByClassName("status")[0].innerHTML);
        for(let td of tr.getElementsByTagName("td")) {
            td.style.backgroundColor = color;
        }
    }
})();
