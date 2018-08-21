/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/cart.html",
    "model/UtilModel",
    "jsrender"
], function ($,
             cart,
             util,
             jsrender) {
    function CartModel() {
        this.render = function () {
            $.ajax({
                url: '/getCookie',
                success: function (data) {
                    var subTotal = 0;
                    var shipCost = 2500;

                    if (data.itemList) {

                        for (var i = 0; i < data.itemList.length; i++) {
                            subTotal += Number(data.itemList[i].price);
                            data.itemList[i].moneyString = util.moneyString(data.itemList[i].price);
                        }
                    }

                    var total = subTotal + shipCost;

                    data.subTotal = util.moneyString(subTotal);
                    data.shipCost = util.moneyString(shipCost);
                    data.total = util.moneyString(total);

                    var template = jsrender.templates(cart).render(data);
                    $("#content").html(template);

                    $(".delete").mouseover(function (e) {
                        $(e.target).css("cursor", "pointer");
                        $(e.target).css("color", "black");
                    });
                    $(".delete").mouseout(function (e) {
                        $(e.target).css("color", "dimgray");
                    });

                    $(".delete").click(function (e) {
                        var name = $(e.target).parent().find('.name').text();
                        var option = $(e.target).parent().find('.option').text();
                        $.ajax({
                            url:'/deleteCookie?name=' + name + '&option=' + option,
                            success:function(data){
                                new CartModel().render();
                            }
                        })
                    });



                }
            });




        }.bind(this);
    }

    return new CartModel();
});