// ---------- ---------- ---------- ---------- ---------- //
//                                                        //
//                   TOGGLE ICON NAVBAR                   //
//                                                        //
// ---------- ---------- ---------- ---------- ---------- //

let menuicon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuicon.onclick = () => {
    menuicon.classList.toggle("bx-x");
    navbar.classList.toggle("active");

};

// ---------- ---------- ---------- ---------- ---------- //
//                                                        //
//                  ACTIVE SECTION LINK                   //
//                                                        //
// ---------- ---------- ---------- ---------- ---------- //

let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            navlinks.forEach(link => {
                link.classList.remove("active");
                document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
            })
        }
    });

    menuicon.classList.remove("bx-x");
    navbar.classList.remove("active");
};

// ---------- ---------- ---------- ---------- ---------- //
//                                                        //
//               EDUCATION SECTION SELECTOR               //
//                                                        //
// ---------- ---------- ---------- ---------- ---------- //

let educationSelectors = document.querySelectorAll(".education .heading-select label");

educationSelectors.forEach(selector => {
    let selectorTargetId = selector.id.slice(16);
    let selectorTarget = document.getElementById(`education-${selectorTargetId}`);
    if (!selector.childNodes[0].checked) {
        selectorTarget.classList.add("force-display-none");
    }
    selector.addEventListener("change", () => {
        selectorTarget.classList.toggle("force-display-none");
    });
});


// https://www.youtube.com/watch?v=Tkp3FDgOueM >> 50 min
