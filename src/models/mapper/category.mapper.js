exports.toEntity = function (data, oldCate) {
    data.createAt = oldCate.createAt;
    data.createBy = oldCate.createBy;
    return data;
}