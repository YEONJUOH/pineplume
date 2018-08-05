/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/vintage.html",
    "slick-carousel",
    "jsrender"
], function ($,
             vintage, slick) {
    function VindtageModel() {
        this.render = function () {

            $.getJSON("/static/item.json")
                .done(function(data) {
                    var template = $.templates(vintage).render(data);
                    $("#content").html(template);
                    $(".regular").slick({
                        dots: true,
                        infinite: true,
                        autoplay: true,
                        autoplaySpeed: 2000,
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        centerMode: false
                    });

                    $('img').mouseover(function (e) {
                        $(e.target).css("opacity", 0.5);
                    });
                    $('img').mouseout(function (e) {
                        $(e.target).css("opacity", 1);
                    });


                }.bind(this));
            

            
        }.bind(this);


    }

    return new VindtageModel();
});