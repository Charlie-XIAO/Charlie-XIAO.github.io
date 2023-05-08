/**
 * 
 * This script selects all buttons with the class "hide", so that all such buttons
 * can control an element to show up on one click and to be hidden on another click.
 * Moreover, one has to use this script together with "hide.css" as well as include
 * FontAwesome icons so as to make it work.
 * 
 * For instance:
 * <script src="https://kit.fontawesome.com/96558c71d2.js" crossorigin="anonymous"></script>
 * 
 * We require the button id to be "hide-<something>", and the id of the element it
 * controls to be "<something>".
 * 
 * If one decides to hide the element initially, then one should add the class
 * "hidden-content" to that element.
 * 
 * Also note that the innerHTML of the buttons should be left empty.
 *
 **/

let hideButtons = document.querySelectorAll("button.hide");

hideButtons.forEach(hideButton => {
    let hideButtonIdPrefix = hideButton.id.slice(0, 5);
    if (hideButtonIdPrefix != "hide-") {
        console.error(`Detected hide button with ID prefix ${hideButtonIdPrefix}, expected "hide-"`);
    }
    hideButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;

    let hideTargetId = hideButton.id.slice(5);
    let hideTarget = document.getElementById(hideTargetId);
    if (hideTarget.classList.contains("hidden-content")) {
        hideButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
    }
    else {
        hideButton.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
    }

    hideButton.addEventListener("click", () => {
        if (hideTarget.classList.contains("hidden-content")) {
            hideButton.innerHTML = `<i class="fa-solid fa-chevron-up"></i>`;
            hideTarget.classList.toggle("hidden-content");
        }
        else {
            hideButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;
            hideTarget.classList.add("hidden-content");
        }
    });
});
