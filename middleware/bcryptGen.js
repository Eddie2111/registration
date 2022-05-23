const bcrypt = require ('bcrypt');

function cryptGenerate(data){
    return bcrypt.hashSync(data,bcrypt.genSaltSync(10));
}
module.exports = {cryptGenerate};