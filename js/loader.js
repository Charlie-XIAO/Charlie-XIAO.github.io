/**
 * 
 * This script adds a loading page that waits for the page to load plus two seconds.
 * It can be used for pages that cannot render with ignorable delay, for instance,
 * those with a lot of MathJax formulas.
 * 
 * This requires css definition of the loader class, which can be commonly obtained
 * from "loader.css". See also https://projects.lukehaas.me/css-loaders/.
 * 
 * This would also have a dependency on jQuery, so the following has to be added to the
 * end of the HTML file.
 * <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
 *
 **/

$("body").append("<div id='loading-frame'><div class='loader'>Loading...</div></div>");
$(window).on("load", function() {
    setTimeout(removeLoader, 2000);
});

function removeLoader(){
    $("#loading-frame").fadeOut(500, function() {
        $("#loading-frame").remove();
    });  
}
