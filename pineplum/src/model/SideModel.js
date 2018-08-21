/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/side.html",
    "model/CartModel"
], function ($,
             side,
             cartModel) {
    function SideModel() {
        this.render = function () {
            $("#nav").html(side);
            $("#cart").mouseover(function (e) {
                $(e.target).css("cursor", "pointer");
                $(e.target).css("color", "black");
            });
            $("#cart").mouseout(function (e) {
                $(e.target).css("color", "dimgray");
            });
            $("#cart").click(function (e) {
               cartModel.render();
            });

        }.bind(this);


    }

    return new SideModel();
});