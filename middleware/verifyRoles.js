const verifyRoles = (...allowedRoles) => {  // alike as ...args, try to change that with ...args and notice what will happen
    return (req, res, next) => {
        if (!req.roles) { return res.sendStatus(401); }
        const rolesArray = [...allowedRoles]
        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true)

        // od roles array se mapuva i proveruva dali se soodejstvuva nekoja od dozvolenite ulogi so ulogite od req.roles, ako ima prisustvo  togas VideoPlaybackQuality, najdi ja onaa onaa uloga kade vrednosta === true

        if (!result) return res.sendStatus(401)

        next()
    }
}

module.exports = verifyRoles;