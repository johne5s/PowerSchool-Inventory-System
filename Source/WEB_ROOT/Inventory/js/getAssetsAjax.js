function MakeRequest(searchFor)
{
    url = 'scripts/getAssetsHelper.html' + '?action=loadResults&searchFor=' + searchFor;
			
   console.log("url : " + url);
   console.log("run aJax");
   
   $j.getJSON(url, function ()
            {
				//alert( "success");
				//console.log("success");
			})
				.done(function(data){
				    console.log("done");
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
    $j('#ajaxResults').empty();
    $j.each(data.asset, function(asset_key, asset){
		if(asset.id == 0){ return; }
		
        $j('#ajaxResults').append("<tr><td>" + asset.id +"</td><td>"+ asset.d1 +"</td><td>"+ asset.d2 +"</td><td>"+ asset.d3 +"</td><td>"+ asset.d4 + "</td></tr>");
        //console.log("id :  " + asset.id);
    });
    
    console.log("loadData Complete");
}