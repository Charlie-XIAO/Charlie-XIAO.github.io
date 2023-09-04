/**
 * 
 * This script selects all divs with the class "flip-select", so that all such divs
 * can control an element to show up on one click and to be hidden on another click.
 * Moreover, one has to use this script together with "flipper.css" so as to make it
 * work.
 * 
 * We require the button id to be "flip-select-<something>", and the id of the element
 * it controls to be "<something>".
 * 
 * If one decides to not show the element initially, then one should add the class
 * "hidden-content" to that element.
 * 
 * Also note that the innerHTML of the divs should be left empty.
 * 
 * Usage:
 * 
 * One should first init a FlipSelectInstance object. Then one should run
 * `FlipSelectInstance.executeFlipSelect()`.
 *
 **/

var FlipSelectInstance = FlipSelectInstance || (function() {
    return {
        init: function() {},
        executeFlipSelect: function() {
            let flipSelectDivs = document.querySelectorAll("div.flip-select");

            flipSelectDivs.forEach(flipSelectDiv => {
                let flipSelectDivIdPrefix = flipSelectDiv.id.slice(0, 12);
                if (flipSelectDivIdPrefix != "flip-select-") {
                    console.error(`Detected flip-select button with ID prefix ${hideButtonIdPrefix}, expected "flip-select-"`);
                }

                let flipSelectTargetId = flipSelectDiv.id.slice(12);
                let flipSelectTarget = document.getElementById(flipSelectTargetId);

                flipSelectDiv.addEventListener("click", () => {
                    if (flipSelectTarget.classList.contains("hidden-content")) {
                        flipSelectTarget.classList.toggle("hidden-content");
                        flipSelectDiv.style.transform = "scaleX(1) scaleY(-1)";
                    }
                    else {
                        flipSelectTarget.classList.add("hidden-content");
                        flipSelectDiv.style.transform = "scaleX(1) scaleY(1)";
                    }
                });
            });
        }
    }
}());
