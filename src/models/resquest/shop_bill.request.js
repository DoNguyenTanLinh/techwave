const ShopBillResquest = function (shop) {
    this.shop_id = shop.shopId;
    this.totalbill = shop.totalBill;
    this.totalVoucherDiscount = shop.totalVoucherDiscount ?? 0;
    this.shipFee = shop.shipFee ?? 0;
    this.bill_id = shop.bill_id;
}
module.exports = ShopBillResquest;