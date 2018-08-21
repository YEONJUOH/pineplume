/**
 * Created by OHBABY on 2018. 7. 29..
 */
define([
    "jquery"
], function ($) {
    function Util() {

        this.moneyString = function (num) {

            var len, point, str;

            num = num + "";
            point = num.length % 3;
            len = num.length;

            str = num.substring(0, point);
            while (point < len) {
                if (str != "") str += ",";
                str += num.substring(point, point + 3);
                point += 3;
            }

            return '￦' + str;

        }.bind(this);

    }

    return new Util();
});