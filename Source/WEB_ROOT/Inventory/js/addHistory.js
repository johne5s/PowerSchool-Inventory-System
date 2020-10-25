function addRecordToHistoryDB(assetid,note)
{
	//console.log("Add new - " + assetid);
	$psq('u_assethistory').insert(
		{
			Asset_ID: assetid,
			History_DateTime: curDate(),
			Notes: note
		});

}

function curDate()
{
    var d = new Date();
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth()+1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var currentDate = year + "/" + month + "/" + day + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

    return currentDate;
}