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
 * Usage:
 * 
 * One should first init a HideInstace object, optionally specifying the hide and
 * reveal description one wants to show next to the chevron, and whether to put
 * that description before of after that chevron. By default no additional text
 * is shown. Then one should run `HideInstance.executeHide()`.
 *
 **/

var HideInstance = HideInstance || (function() {
    var _hideString;
    var _revealString;

    return {
        init: function(hide_description=null, reveal_description=null, front=false) {
            if (front) {
                if (hide_description === null) _hideString = `<i class="fa-solid fa-chevron-up"></i>`;
                else _hideString = `${hide_description} <i class="fa-solid fa-chevron-up"></i>`;
                if (reveal_description === null) _revealString = `<i class="fa-solid fa-chevron-down"></i>`;
                else _revealString = `${reveal_description} <i class="fa-solid fa-chevron-down"></i>`;
            }
            else {
                if (hide_description === null) _hideString = `<i class="fa-solid fa-chevron-up"></i>`;
                else _hideString = `<i class="fa-solid fa-chevron-up"></i> ${hide_description}`;
                if (reveal_description === null) _revealString = `<i class="fa-solid fa-chevron-down"></i>`;
                else _revealString = `<i class="fa-solid fa-chevron-down"></i> ${reveal_description}`;
            }
        },
        executeHide: function() {
            let hideButtons = document.querySelectorAll("button.hide");

            hideButtons.forEach(hideButton => {
                let hideButtonIdPrefix = hideButton.id.slice(0, 5);
                if (hideButtonIdPrefix != "hide-") {
                    console.error(`Detected hide button with ID prefix ${hideButtonIdPrefix}, expected "hide-"`);
                }
                hideButton.innerHTML = _revealString;

                let hideTargetId = hideButton.id.slice(5);
                let hideTarget = document.getElementById(hideTargetId);
                if (hideTarget.classList.contains("hidden-content")) {
                    hideButton.innerHTML = _revealString;
                }
                else {
                    hideButton.innerHTML = _hideString;
                }

                hideButton.addEventListener("click", () => {
                    if (hideTarget.classList.contains("hidden-content")) {
                        hideButton.innerHTML = _hideString;
                        hideTarget.classList.toggle("hidden-content");
                    }
                    else {
                        hideButton.innerHTML = _revealString;
                        hideTarget.classList.add("hidden-content");
                    }
                });
            });
        }
    }
}());
