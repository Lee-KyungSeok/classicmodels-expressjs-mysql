/*
*/
exports.hasAnyRoles = (...roles) => {
    const isAllowedRole = (role) => roles.indexOf(role) > -1;

    return (req, res, next) => {
        const user = req.authenticatedUser;
        if (user) {
            let isAllowed = false;
            user.__roles__.forEach(role => {
                if (isAllowedRole(role)) {
                    isAllowed = true;
                }
            });
            if (isAllowed) {
                next();
                return;
            }
        }

        res.status(403).send("request is not allowed.");
    };
};
