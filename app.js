$(window).on("load",function () {

    var $landingWrapper = $(".landing-wrapper"),
        $landingInnerContent = $(".landing-inner-content");

    // set initial container to half of .landing-inner-content width
    //TweenMax.set($landingWrapper, {scrollTo: {x: $landingInnerContent.width()/4}, ease: Power2.easeOut});

    Draggable.create(".landing-inner-content",{
        type: "x",
        bounds: ".landing-wrapper",
        throwProps: true
    });
});