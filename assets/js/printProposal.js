function printContent(el) {
    var restorePage = document.body.innerHTML;
    var printContent = document.getElementById(el);
    document.body.innerHTML = printContent;
    var wme = window.open("","","width: 920, height:920");
    wme.document.write(printContent.outerHTML);
    wme.document.close();
    wme.focus();
    wme.print();
    //wme.close();
    document.body.innerHTML = restorePage;
}
function printMe(a,e){
    var restorePage = document.body.innerHTML;
    document.getElementById(a).style.display='none';
    var printContent = document.getElementById(e);
    //document.body.innerHTML = printContent;
    window.print();
    document.getElementById(a).style.display='block';
    document.body.innerHTML = restorePage;

}   