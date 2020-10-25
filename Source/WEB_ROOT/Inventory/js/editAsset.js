
// One time page load checks
function init(assetid)
{
    if($j('.serialInput')){
		checkForDup(assetid);
		if(document.getElementById('isStudent_dcid').value == "0")
		{
			document.getElementById('isStudentCheckBox').checked = false;
		}else{
			document.getElementById('isStudentCheckBox').checked = true;
		}
		
        if(assetid == -1)
		{
			showHideFormElements("formElement", false);
			showHideFormElements("assignedToElement", false);
		}
		else
		{
			showHideFormElements("formElement", true);
			showHideFormElements("assignedToElement", true);
		}
        toggleIsStudent();
    }
    else {
        setTimeout(check, 100); // check again in a second if class serialInput was not found
    }
}
// End

$j(document).ready(function(){
	$j('#deleteButton').click(function(e){
		e.preventDefault();
		$j('#deleteForm').submit();
	});
	$j('#btnSubmit').click(function(e){
	    addRecordToHistoryDB("~(gpv.assetid)","Asset was Edited from the Edit Asset page by ~[x:username]");
	});
});


// OnChange Events
$j('#schoolDropDown').change(function(){
		//The school drop down has changed
		SetDropDowns();
        $j('#storeSchoolId').val($j('#schoolDropDown :selected').val());
        $j('#storeSchoolName').val($j('#schoolDropDown :selected').text());

        //show the student / teacher check box
        showHideFormElements("assignedToElement", true);
});

function createlisteners()
{
	$j('#teachersDropdown').change(function(){
	    //The Teachers drop down has changed
		//console.log($j('#teachersDropdown :selected').val());
		 $j('#AssignedTo_dcid').val($j('#teachersDropdown :selected').val());
		 $j('#AssignedTo_name').val($j('#teachersDropdown :selected').text());
		
		 if($j('#teachersDropdown :selected').val() != "")
		 {
			toggleAssetElements(true);
		 }else{
			toggleAssetElements(false);
		 }
		 
	});

	$j('#studentsToDropdown').change(function(){
	    //The Teachers drop down has changed
		//console.log($j('#studentsToDropdown :selected').val());
		$j('#AssignedTo_dcid').val($j('#studentsToDropdown :selected').val());
		$j('#AssignedTo_name').val($j('#studentsToDropdown :selected').text());
		if($j('#studentsToDropdown :selected').val() != "")
		 {
			toggleAssetElements(true);
		 }else{
			toggleAssetElements(false);
		 }
	});
}
//End Onchange Events

var assignedType;

function SetDropDowns(){
	//clear the dropdowns
	document.getElementById('studentsToDropdown').options.length = 0;
	document.getElementById('teachersDropdown').options.length = 0;

	//run Ajax to get the dcid
	 
	if (document.getElementById('isStudentCheckBox').checked) 
	{
		assignedType = 1;
	} else {
		assignedType = 0;
	};

	var url = "scripts/AssignedToDropDown.html?type=" + assignedType +"&id=" + "&schoolid=" + $j('#schoolDropDown :selected').val();
	//console.log(url);
	$j.ajax(
	{
		url: url, 
		dataType: "text",
		success: function(result)
		{
			if (assignedType == 1) 
			{
				//push students to the dropdown
				var options = '<select id="studentsToDropdown">' + result + '</select>';
				document.getElementById( 'studentsToDropdown' ).outerHTML = options;
			} else {
				//push teachers to the dropdown
				var options = '<select id="teachersDropdown">' + result + '</select>';
				document.getElementById( 'teachersDropdown' ).outerHTML = options;
			};
			createlisteners();
		}
	});
}

function checkForDup(assetid)
{
    var serial = document.getElementById("serialInput").value

    $j.ajax(
	{
		url: "scripts/checkDupSerial.html?serial=" + serial + "&assetid=" + assetid, 
		dataType: "text",
		success: function(result)
		{
            var warning = document.getElementById("serialDupWarning");
            
			if(result.length > 0)
			{
				warning.style.display = "block";
			}else
			{
				warning.style.display = "none";
			}
		}
	});
}

function toggleIsStudent()
{
    //console.log(document.getElementById('isStudentCheckBox').checked);
    //I need to verify that true = 1 and false = 0 or null in the database
  if (document.getElementById('isStudentCheckBox').checked) 
  {
	  document.getElementById('isStudentCheckBoxText').innerHTML = "<font color=green>Student - </font>";
	  document.getElementById('isStudent_dcid').value = "1";
      showHideFormElements("studentDropDownElement", true);
      showHideFormElements("teacherDropDownElement", false);
  }else {
	  document.getElementById('isStudentCheckBoxText').innerHTML = "<font color=blue>Teacher - </font>";
	  document.getElementById('isStudent_dcid').value = "0";
      showHideFormElements("studentDropDownElement", false);
      showHideFormElements("teacherDropDownElement", true);
  }
  SetDropDowns();
}

// show or hide all the form elements
    function showHideFormElements(className, value)
    {
        var elements = document.getElementsByClassName(className);
        //console.log(elements);
        for (var i = 0; i < elements.length; i++)
        {
            if(value === true)
            {
                elements[i].style.display = "block";
            }else{
                elements[i].style.display = "none";
            }
        }
    }
// End Show / Hide Elements

// Asset Type Dropdown section
    $j('#commontypes').change(function(){
            TypeChanged();
        });

    function TypeChanged()
    {
        document.getElementById("storetype").value = $j('#commontypes :selected').val();
    }
// End


function toggleAssetElements(value)
{
	if(value == false)
	{
		showHideFormElements("formElement", false);
	}
	else{
		showHideFormElements("formElement", true);
	}
}
