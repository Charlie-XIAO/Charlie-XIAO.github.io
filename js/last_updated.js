/**
 * 
 * This script selects all elements with the class "get-last-updated", so that
 * the innerHTML of these elements will be set to the last updated date of the
 * webpage, formatted as Y/m/d.
 * 
 * Note that the innerHTML of these elements should be left empty.
 * 
 **/

let lastUpdated = new Date(document.lastModified);
let lastUpdatedDate = lastUpdated.toLocaleDateString(undefined, {year: "numeric", month: "numeric", day: "numeric"});

let targets = document.querySelectorAll(".get-last-updated");
targets.forEach(target => {
    target.innerHTML = lastUpdatedDate;
});
