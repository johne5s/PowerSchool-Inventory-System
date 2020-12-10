function MakeRequest(searchFor)
{
    //set the searchFor cookie
    setCookie("searchFor", searchFor, 1);
    if(searchFor == "return_ALL_assets")
    {
        searchFor = " ";
    }
    
    url = 'scripts/getAssetsHelper.html' + '?searchFor=' + searchFor;
			
   //console.log("url : " + url);
   //console.log("run aJax");
   
   $j.getJSON(url, function ()
            {
				//alert( "success");
				//console.log("success");
			})
				.done(function(data){
				    //console.log("done");
				    loadData(data);
				})
				.fail(function(e){
					console.log("failed");
					console.log(e);
				})
				.always(function(){
                    //console.log("always");
                });
}


function loadData(data)
{
    //console.log(data);
    //console.log(data.view);

    $j('#ajaxResults').empty(); //clear whats curently in the table
    
    //start to rebuild the table
    
    //build the header row
    $j('#ajaxResults').append("<th width=1%>Edit</th>"); //add a blank header field
    
    $j.each(data.view, function(asset_key, view){
        if(view == 1)
        {
            $j('#ajaxResults').append("<th>"+asset_key+"</th>");
        }
    });
    //header building completed
    
    //build a row for each asset
    $j.each(data.asset, function(asset_key, asset){
		if(asset.id == 0){ return; } // id 0 is a dummy asset,  doen't build a row for it
		
        var tdData = "<tr  style='color:"+ asset.Active + "'>";
        //every asset needs an edit button
        tdData += "<td><a href='editAsset.html?assetid=" + asset.id +"' class='button'><em class='ui-icon-white ui-icon-pencil ui-icon'></em></a></td>"

        //check each json view data if it should be displayed on the page,  if yes (1) then create the TD element
		if(data.view.School == 1)
		{
            tdData += "<td>" + asset.SchoolName + "</td>";
		}
		
		if(data.view.Assigned_To == 1)
		{
            if(asset.isStudent == 1)
    		{
    		    //student
    		    tdData +=  "<td><svg width='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path opacity='0.5' fill='#0066a5' d='M15 5A5 5 0 115 5a5 5 0 0110 0'></path><path fill='#0066a5' d='M0 20h20c0-6.338-4.476-9-10-9-5.522 0-10 2.662-10 9z'></path></svg> <a href='../students/home.html?frn=001'" + asset.AssignedTo_DCID + "'>" + asset.AssignedToName + "</a></td>";
    	
    		}else
    		{
    		    //Staff
    		    tdData +=  "<td><svg width='20px' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'><path opacity='0.5' fill='#4c9c6c' d='M15 5A5 5 0 115 5a5 5 0 0110 0'></path><path fill='#4c9c6c' d='M0 20h20c0-6.338-4.476-9-10-9-5.522 0-10 2.662-10 9z'></path></svg> <a href='../faculty/home.html?frn=005'" + asset.AssignedTo_DCID + "'>" + asset.AssignedToName + "</a></td>";
    		}
		}
		
		if(data.view.Purchase_Date == 1)
		{
            tdData += "<td>" + asset.Asset_PurchaseDate + "</td>";
		}
		
		if(data.view.Purchase_Price == 1)
		{
            tdData += "<td>" + asset.PurchasePrice + "</td>";
		}
		
		if(data.view.Po_Number == 1)
		{
            tdData += "<td>" + asset.Asset_PO_Number + "</td>";
		}
		
		if(data.view.FundedBy == 1)
		{
            tdData += "<td>" + asset.Asset_FundedBy + "</td>";
		}
		
		if(data.view.Barcode == 1)
		{
            tdData += "<td>" + asset.Barcode + "</td>";
		}
		
		if(data.view.Asset_Type == 1)
		{
            tdData += "<td>" + asset.Asset_Type + "</td>";
		}
		
		if(data.view.Manufacture == 1)
		{
            tdData += "<td>" + asset.Asset_Manufacture + "</td>";
		}
		
		if(data.view.Model == 1)
		{
            tdData += "<td>" + asset.Asset_Model + "</td>";
		}
		
		if(data.view.Serial == 1)
		{
            tdData += "<td>" + asset.Asset_Serial + "</td>";
		}
		
		if(data.view.MacAddress == 1)
		{
            tdData += "<td>" + asset.Asset_MacAddress + "</td>";
		}
		
		if(data.view.Location == 1)
		{
            tdData += "<td>" + asset.Asset_Location + "</td>";
		}
		
		if(data.view.Accessory_1 == 1)
		{
            tdData += "<td>" + asset.Asset_Accessory_1 + "</td>";
		}
		
		if(data.view.Accessory_2 == 1)
		{
            tdData += "<td>" + asset.Asset_Accessory_2 + "</td>";
		}
		
		if(data.view.Accessory_3 == 1)
		{
            tdData += "<td>" + asset.Asset_Accessory_3 + "</td>";
		}
		
		if(data.view.Device_Username == 1)
		{
            tdData += "<td>" + asset.Device_Username + "</td>";
		}
		
		if(data.view.Device_Password == 1)
		{
            tdData += "<td>" + asset.Device_Password + "</td>";
		}
		
		if(data.view.Notes == 1)
		{
            tdData += "<td>" + asset.Asset_Notes + "</td>";
		}
		
		if(data.view.Checkout_Date == 1)
		{
		    if(asset.Asset_CheckoutDate == "")
		    {
		        //no check in Date has been set,  so display the check out btn
		        tdData +=  "<th><a href='checkoutDialogM.html?assetid=" + asset.id + "' class='button dialogM' dialogcontent=''>Check Out</a></th>";
		    }else
		    {
		        tdData +=  "<th>" + asset.Asset_CheckoutDate + "</th>";
		    }
 
		}
		
		if(data.view.Checkin_Date == 1)
		{
		    if(asset.Asset_CheckoutDate == "")
		    {
		        tdData +=  "<th></th>";
		        
		    }else
		    {
		        tdData +=  "<th><a href='checkinDialogM.html?assetid=" + asset.id + "' class='button dialogM' dialogcontent=''>Check In</a></th>";
		    }
		    
		}
		
		//take all the TD elements and push them into the Div
        $j('#ajaxResults').append(tdData + "</tr>");
    });
    
    //console.log("loadData Complete");
}