function editValidation(){
    var company_name = document.forms["companyEditForm"]["company_name"].value;
    var address = document.forms["companyEditForm"]["address"].value;
    var phone = document.forms["companyEditForm"]["phone"].value;
    var type = document.forms["companyEditForm"]["type"].value;
    
    if (company_name == "" || company_name.length <1) {
        document.getElementById('msg').innerHTML = "*Company Name can not be empty!";
        return false;
    } else if (phone == "" || phone.length <1) {
        document.getElementById('msg').innerHTML = "*Phone can not be empty!";
        return false;
    } 
    else if (type == "" || type.length <1) {
        document.getElementById('msg').innerHTML = "*Type can not be empty!";
        return false;
    } 
    else if (address == "" || address.length <1) {
        document.getElementById('msg').innerHTML = "*Address can not be empty!";
        return false;
    } 
    else if (isNaN(phone)) {
        document.getElementById('msg').innerHTML = "*Phone Number should be numeric only!";
        return false;
    }
    
}