let hideButtons = document.querySelectorAll("button.hide");

hideButtons.forEach(hideButton => {
    let hideButtonIdPrefix = hideButton.id.slice(0, 5);
    if (hideButtonIdPrefix != "hide-") {
        console.error(`Detected hide button with ID prefix ${hideButtonIdPrefix}, expected "btn-"`);
    }
    hideButton.innerHTML = `<i class="fa-solid fa-chevron-down"></i>`;

    let hideTargetId = hideButton.id.slice(5);
    let hideTarget = document.getElementById(hideTargetId);
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
