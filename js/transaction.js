$(document).ready((function() {
    $("body").css({ overflow: "auto" }), $(".preloader").fadeOut(1e3), wow = new WOW({ animateClass: "animate__animated" }), wow.init(), $(".transaction__block-input-copy").click((function() {
        let e = $(this).parent().children("input").data("value");
        var a = $("<textarea>");
        $("body").append(a), a.val(e).select(), document.execCommand("copy"), a.remove()
    }))
}));