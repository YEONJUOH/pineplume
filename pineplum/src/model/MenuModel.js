/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/menu.html",
    "model/ShopModel",
    "model/VintageModel"
], function ($,
             menu,
             shop,
             vintage) {
    function MenuModel() {
        this.render = function () {
            $("#menu").html(menu);
            $(".menu").mouseover(function (e) {
                $(e.target).css("color", "red");
            });
            $(".menu").mouseout(function (e) {
                $(e.target).css("color", "black");
            })
            $(".menu").click(function (e) {
                var menuName = $(e.target).text().toLowerCase();
                switch (menuName) {
                    case "shop" : shop.render(); break;
                    case "vintage" : vintage.render(); break;

                }
            })
        }.bind(this);


    }

    return new MenuModel();
});