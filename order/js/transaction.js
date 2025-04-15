$(document).ready(function () {

  $("body").css({overflow: "auto"});

  $(".preloader").fadeOut(1000);

  wow = new WOW({
    animateClass: "animate__animated",
  });

  wow.init();

  $(".transaction__block-input-copy").click(function () {
    let val = $(this).parent().children("input").data("value");
    var $tmp = $("<textarea>");
    $("body").append($tmp);
    $tmp.val(val).select();
    document.execCommand("copy");
    $tmp.remove();
  });

  // $(".transaction__block-btn").click(function (e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "../assets/php/changeStep.php",
  //     method: "post",
  //     data: {
  //       id: $(".transaction__order span").text(),
  //       step: 4,
  //     },
  //     success: function () {
  //       location.reload();
  //     },
  //   });
  // });

  // $(".transaction__btn-search").click(function (e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "../assets/php/changeStep.php",
  //     method: "post",
  //     data: {
  //       id: $(".transaction__order span").text(),
  //       step: 4,
  //     },
  //     success: function () {
  //       location.reload();
  //     },
  //   });
  // });
});
