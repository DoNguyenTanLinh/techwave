const Category = require("../entity/category.entity");

const CategoryResponse = function (category) {
    this.category_id = category.category_id;
    this.name = category.name;
    this.slug = category.slug;
    this.image = category.image;
    this.cate_child = null;
    this.initCateChild = async () => {
        try {
            this.cate_child = await Category.getChild(category.category_id);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CategoryResponse;