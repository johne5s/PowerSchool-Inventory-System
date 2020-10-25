function posChanged(val, div_id) {
    if(val > 5)
    {document.getElementById(div_id).value = "";}

   var x = document.getElementsByClassName("pos");
   var i;
    for (i = 0; i < x.length; i++) {
        if(x[i].value == val && x[i].id != div_id)
        {
            x[i].value = "";
        }
    }
}