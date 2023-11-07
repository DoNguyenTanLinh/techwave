const adminPermission = (req, res, next) => {
    if (req.user.groupWithRole.RoleName === 'ADMIN') next();
    else res.status(403).json({
        message: "You dont have permission to access this resource..."
    })
}

module.exports = { adminPermission };