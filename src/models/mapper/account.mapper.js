exports.toResponse = function (data, account) {
    return data.map(accountData => new account(accountData, account));
}
exports.toResponseSimple = function (data, accountResponse) {
    return new accountResponse(data, accountResponse);
}
exports.toResquestSimple = function (data, accountResquest) {
    return new accountResquest(data, accountResquest);
}
