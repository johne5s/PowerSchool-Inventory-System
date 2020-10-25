$j(document).ready(function(){
    	$j('#deleteButton').click(function(e){
    		e.preventDefault();
    		$j('#deleteForm').submit();
    	});
    });