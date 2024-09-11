$(".slider-for").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    speed: 200,
    fade: true,
    // adaptiveHeight: true,
    asNavFor: ".slider-nav"
});

$(".slider-nav").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    dots: false,
    focusOnSelect: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 2000,
    infinity : true
});