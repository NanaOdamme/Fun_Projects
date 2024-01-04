// filter js
$(document).ready(function() {
    $(".filter-items").click(function () {
        const value = $(this).attr("data-filter");
        if (value == 'all') {
            $(".post-box").show("1000");
        } else {
            $(".post-box")
            .not("." + value)
            .hide("1000");
            $(".post-box")
            .filter("." + value)
            .show("1000");
        }
    });
});