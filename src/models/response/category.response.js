const Category = require("../entity/category.entity");

const CategoryResponse = function (category, query) {
    this.category_id = category.category_id;
    this.name = category.name;
    this.slug = category.slug;
    this.image = category.image;
    this.cate_child = null;
    this.initCateChild = async () => {
        try {
            if (query.page) {
                const cate_childs = await Category.getChild(category.category_id);
                const page = parseInt(query.page);
                const limit = parseInt(query.limit);
                // calculating the starting and ending index
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                const results = {};
                results.total = Math.ceil(cate_childs.length / limit)
                if (endIndex < cate_childs.length) {
                    results.next = {
                        page: page + 1,
                        limit: limit
                    };
                }
                if (startIndex > 0) {
                    results.previous = {
                        page: page - 1,
                        limit: limit
                    };
                }
                results.results = cate_childs.slice(startIndex, endIndex);
                this.cate_child = results;
            }
            else {
                this.cate_child = await Category.getChild(category.category_id);
            }

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = CategoryResponse;