/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/vintage.html",
    "model/DetailModel",
    "slick-carousel",
    "jsrender"
], function ($,
             vintage,
             detail,
             slick,
             jsrender) {
    function VindtageModel() {
        this.render = function () {

            $.getJSON("/static/item.json")
                .done(function (data) {
                    var template = jsrender.templates(vintage).render(data);
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

                    $('img').click(function (e) {
                        var itemName = $(e.target).parent().find("input").val();
                        detail.render("vintageitems", itemName);
                    })

                }.bind(this));


        }.bind(this);


    }

    return new VindtageModel();
});