/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/detail.html",
    "jsrender"
], function ($,
             detail,
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
                            break;
                        }
                    }
                    var template = jsrender.templates(detail).render(item);
                    $("#content").html(template);

                    $("span").mouseover(function (e) {
                        $(e.target).css("opacity", 0.5);
                    });

                    $("span").mouseout(function (e) {
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

                }.bind(this));
        }.bind(this);
    }

    return new DetailModel();
});