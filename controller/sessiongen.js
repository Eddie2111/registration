const bcrypt = require('bcrypt');

function sessiongen(){
    const saltRounds = 10;
    const plaintext = process.env.secret_key;     
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plaintext, salt);
    return hash;
}

module.exports = {sessiongen};