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
		MakeRequest($j('#searchBox').val());

	});
});


//This is not working,  Listen for the ENTER key
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    $j('#searchBoxBtn').click(function(){
		MakeRequest($j('#searchBox').val());
	});
  }
});
