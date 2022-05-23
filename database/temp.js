// it stores data temporarily for the OTP to be verified
// after verification, registration data is inserted to database
// and removed from temp

const data = [];

function drop(){
    return data;
}

function temp_push(temp) {
    data.push(temp);
    return data;
}

function temp_remove() {
    data.pop();
    return data;
}
function temp_test(){
    console.log(data);
}


module.exports = {drop,temp_push,temp_test,temp_remove};