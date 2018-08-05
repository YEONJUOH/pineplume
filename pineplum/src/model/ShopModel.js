/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/shop.html",
    "jsrender"
], function ($,
             shop) {
    function ShopModel() {
        this.render = function () {
            $.getJSON("/static/item.json")
                .done(function(data) {
                    var template = $.templates(shop).render(data);
                    $("#content").html(template);

                    $('img').mouseover(function (e) {
                        $(e.target).css("opacity", 0.5);
                    });
                    $('img').mouseout(function (e) {
                        $(e.target).css("opacity", 1);
                    });
                }.bind(this));
        }.bind(this);
    }

    return new ShopModel();
});