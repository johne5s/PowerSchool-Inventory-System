function MakeRequest(searchFor)
{
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
		
        var tdData = "<tr>";
        //every asset needs an edit button
        tdData += "<td><a href='editAsset.html?assetid=" + asset.id +"' class='button'><em class='ui-icon-white ui-icon-pencil ui-icon'></em></a></td>"

        //check each json view data if it should be displayed on the page,  if yes (1) then create the TD element
		if(data.view.School == 1)
		{
            tdData += "<td>" + asset.SchoolName + "</td>";
		}
		
		if(data.view.Assigned_To == 1)
		{
            tdData += "<td>" + asset.AssignedToName + "</td>";
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
            tdData += "<td>" + asset.Asset_CheckoutDate + "</td>";
		}
		
		if(data.view.Checkin_Date == 1)
		{
            tdData += "<td>" + asset.Asset_CheckinDate + "</td>";
		}
		
		//take all the TD elements and push them into the Div
        $j('#ajaxResults').append(tdData + "</tr>");
    });
    
    //console.log("loadData Complete");
}