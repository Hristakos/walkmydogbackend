const { runSql } = require("../db/runsSql");
const SQL = require("../db/usersSql.js");
const walkerSql = require("../db/walkerSql.js");
const User = require("./user");


const Walker = {};
Walker.updateProfile = async (profile) => {
    console.log("User update profile = ", profile);
    const {
        id,
        type,
        email,
        firstname,
        lastname,
        streetAddress,
        suburb,
        postCode,
        phone,
        dateOfBirth,
        licenseNumber,
        bankName,
        bsb,
        accountNumber,
        size,
        serviceType,
    } = profile;

    // Need to make function
    let walker30HV = 1;
    let walker60HV = 1;
    let walker30WO = 1;
    let walker60WO = 1;

    if (serviceType.includes("Walks")) {
        walker30WO = 2;
        walker60WO = 4;
    };
    if (serviceType.includes("Home")) {
        walker30HV = 3;
        walker60HV = 5;
    };
    console.log("30WO = ", walker30WO);
    console.log("60WO = ", walker60WO);
    console.log("30HV = ", walker30HV);
    console.log("60HV = ", walker60HV);

    try {

        await runSql(walkerSql.UPDATE_WALKER, [
            firstname,
            lastname,
            streetAddress,
            suburb,
            postCode,
            phone,
            dateOfBirth,
            licenseNumber,
            bankName,
            bsb,
            accountNumber,
            walker30HV,
            walker60HV,
            walker30WO,
            walker60WO,
            size.sort().join(""), // PREFERENCES ALPHABETICALLY"LMS".
            id,
        ]);

        await runSql(SQL.UPDATE_USER_PROFILE, [id]);
        // TODO error checking update worked

        const token = User.generateAuthToken(
            id,
            type,
            email,
            true,
            firstname,
            lastname
        );
        console.log("user update profile token = ", token);
        return { data: { token }, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error };
    }
};

module.exports = Walker;