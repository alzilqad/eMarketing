function insertValidation(){
    var full_name = document.forms["clientInsertForm"]["full_name"].value;
    var phone = document.forms["clientInsertForm"]["phone"].value;
    var address = document.forms["clientInsertForm"]["address"].value;
    var city = document.forms["clientInsertForm"]["city"].value;
    var country = document.forms["clientInsertForm"]["country"].value;
    var website = document.forms["clientInsertForm"]["website"].value;
    var billing_city = document.forms["clientInsertForm"]["billing_city"].value;
    var billing_state = document.forms["clientInsertForm"]["billing_state"].value;
    var billing_zip = document.forms["clientInsertForm"]["billing_zip"].value;
    var billing_country = document.forms["clientInsertForm"]["billing_country"].value;
    var email = document.forms["clientInsertForm"]["email"].value;
    var status = document.forms["clientInsertForm"]["status"].value;

    if (full_name == "" || full_name.length <1) {
        document.getElementById('msg').innerHTML = "*First Name can not be empty!";
        return false;
    } else if (phone == "" || phone.length <1) {
        document.getElementById('msg').innerHTML = "*Phone can not be empty!";
        return false;
    } 
    else if (address == "" || address.length <1) {
        document.getElementById('msg').innerHTML = "*Address can not be empty!";
        return false;
    } 
    else if (city == "" || city.length <1) {
        document.getElementById('msg').innerHTML = "*City can not be empty!";
        return false;
    } 
    else if (country == "" || country.length <1) {
        document.getElementById('msg').innerHTML = "*Country can not be empty!";
        return false;
    } 
    else if (billing_city == "" || billing_city.length <1) {
        document.getElementById('msg').innerHTML = "*Billing City Name can not be empty!";
        return false;
    } 
    else if (billing_country == "" || billing_country.length <1) {
        document.getElementById('msg').innerHTML = "*Billing Country can not be empty!";
        return false;
    } 
    else if (email == "" || email.length <1){
        document.getElementById('msg').innerHTML = "*Email can not be empty!";
        return false;
    } 
    else if (status == "" || status.length <1) {
        document.getElementById('msg').innerHTML = "*Status can not be empty!";
        return false;
    }
    else if (isNaN(phone)) {
        document.getElementById('msg').innerHTML = "*Phone Number should be numeric only!";
        return false;
    }
    else if (isNaN(billing_zip)) {
        document.getElementById('msg').innerHTML = "*Zip Code should be numeric only!";
        return false;
    }
}