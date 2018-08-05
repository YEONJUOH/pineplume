/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery",
    "text!html/main.html",
], function ($,
             main) {
    function MainModel() {
        this.render = function () {
            $("#content").html(main);
        }.bind(this);
    }

    return new MainModel();
});