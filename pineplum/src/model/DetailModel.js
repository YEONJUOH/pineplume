/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/detail.html",
    "model/CartModel",
    "model/UtilModel",
    "jsrender"
], function ($,
             detail,
             cart,
             util,
             jsrender) {
    function DetailModel() {
        this.render = function (itemType, itemName) {
            $.getJSON("/static/item.json")
                .done(function (data) {
                    var items = data[itemType];
                    var item;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].itemName == itemName) {
                            item = items[i];
                        }
                        items[i].moneyString = util.moneyString(items[i].price);
                    }
                    var template = jsrender.templates(detail).render(item);
                    $("#content").html(template);

                    $("#detail span").mouseover(function (e) {
                        $(e.target).css("opacity", 0.5);
                    });

                    $("#detail  span").mouseout(function (e) {
                        $(e.target).css("opacity", 1);
                    });

                    $("#infoTab").find("span").click(function (e) {
                        var selectedTab = $(e.target).text().toLowerCase().trim();
                        $(".infoTabSelected").removeClass("infoTabSelected");
                        $(e.target).addClass("infoTabSelected");
                        var description = item[selectedTab];
                        if (description == null) {
                            description = "";
                        }
                        $("#description").text(description);

                    }).bind(this);


                    $("#addToCart").click(function (e) {

                        if($("select option").length!=1&& $("select option:selected").val()=="noOption") {
                            alert("옵션을 선택해주세요");
                            return;
                        }

                        var url = '/setCookie' +'?name=' + item.itemName + '&option=' + $("select option:selected").val()
                        + '&price=' + item.price +'&src=' + item.src;
                        console.log("src" + item.src);

                        $.ajax({
                            url:url,
                            success:function(data){
                                cart.render();
                            }
                        })
                    })

                }.bind(this));
        }.bind(this);
    }

    return new DetailModel();
});