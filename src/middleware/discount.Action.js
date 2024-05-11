const db = require('../connection/connect');
const updateDiscount = (arrDiscountId, idUser) => {
    arrDiscountId.map(async (idDiscount) => {
        try {
            const count = await db.query(`select * from discount_user as dsu inner join discount as ds on ds.discount_id=dsu.dsc_id
            where ds.discount_id=${idDiscount} and ds.vendor_id=1`)

            if (count.length > 0) {
                db.query(`update discount set quantity=(quantity-1) where discount_id=${idDiscount};`);
                db.query(`delete from discount_user where dsc_id=${idDiscount} and user_id=${idUser}`);

            } else {
                db.query(`update discount set quantity=(quantity-1) where discount_id=${idDiscount};`)
            }

        } catch (err) {
            console.log(err);
        }
    })
}

module.exports = updateDiscount