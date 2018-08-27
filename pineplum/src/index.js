/**
 * Created by OHBABY on 2018. 7. 29..
 */
require([
    "model/MainModel",
    "model/MenuModel",
    "model/ShopModel",
    "model/VintageModel",
    "model/SideModel",
    "model/BuyModel"
], function (main, menu, shop, vintage, side, buy) {
    main.render();
    menu.render();
    side.render();
    //buy.render();


});