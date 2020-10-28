$j(document).ready(function(){
	$j('#deleteButton').click(function(e){
		e.preventDefault();
		$j('#deleteForm').submit();
	});
});

function addHistory(aseetid)
{
    addRecordToHistoryDB(assetid,document.getElementById("note_manual").value)
    location.reload();
}