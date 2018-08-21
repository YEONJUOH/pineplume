/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/shop.html",
    "model/DetailModel",
    "model/UtilModel",
    "jsrender"
], function ($,
             shop,
             detail,
             util,
             jsrender) {
    function ShopModel() {
        this.render = function () {
            $.getJSON("/static/item.json")
                .done(function (data) {

                    for (var i = 0; i < data.shopitems.length; i++) {
                        var price = data.shopitems[i].price;
                        data.shopitems[i].price = util.moneyString(price);
                    }

                    var template = jsrender.templates(shop).render(data);
                    $("#content").html(template);

                    $('img').mouseover(function (e) {
                        $(e.target).css("opacity", 0.5);
                    });
                    $('img').mouseout(function (e) {
                        $(e.target).css("opacity", 1);
                    });

                    $('img').click(function (e) {
                        var itemName = $(e.target).parent().find(".itemName").text();
                        detail.render("shopitems", itemName);
                    })
                }.bind(this));
        }.bind(this);
    }

    return new ShopModel();
});