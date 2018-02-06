$(document).ready(function () {
  $('.buy-ticket').hover(function () {
    $('.buy-ticket-title .img2').show();
    $('.buy-ticket .img1').hide();
  });
  $('.buy-ticket').mouseleave(function () {
    $('.buy-ticket-title .img2').hide();
    $('.buy-ticket .img1').show();
  });
});