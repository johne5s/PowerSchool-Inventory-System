function CheckOutDateBtn()
{
	//I don't anything is using this
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	var day = d.getDate();
	var currentDate = month + "/" + day + "/" + year;
	$j('.CheckOutDateBtn').val(currentDate); 
}

$j(document).ready(function(){
    $j('#searchBoxBtn').click(function(){
	    //The Search button was clicked
		//console.log("Search was clicked : " + $j('#searchBox').val());
		if($j('#searchBox').val() == "")
		{
		    //console.log("search for all");
		    MakeRequest("return_ALL_assets");
		}else
		{
		    MakeRequest($j('#searchBox').val());
		}
	});
	
	$j('#searchBox').keypress(function(){
	    //The Enter Key was pressed?
		if (event.keyCode === 13) {
		    if($j('#searchBox').val() == "")
    		{
    		    //console.log("search for all");
    		    MakeRequest("return_ALL_assets");
    		}else
    		{
    		    MakeRequest($j('#searchBox').val());
    		}
		}
	});
});
