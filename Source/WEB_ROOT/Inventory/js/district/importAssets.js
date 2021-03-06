var importRows;
var leftToImport;
var okToShowImportBtn = true;

function handleFiles(files) 
{
	// Check for the various File API support.
	if (window.FileReader) {
		// FileReader are supported.
		getAsText(files[0]);
	} else {
		alert('FileReader are not supported in this browser.');
	}
}

function getAsText(fileToRead) 
{
	var reader = new FileReader();
	// Read file into memory as UTF-8      
	reader.readAsText(fileToRead);
	// Handle errors load
	reader.onload = loadHandler;
	reader.onerror = errorHandler;
}

function loadHandler(event) 
{
	var file = event.target.result;
	processData(file);
}

function processData(file) 
{
	//error checking - search the file for quotes
	if (file.indexOf('"') >= 0) {
	   //do something
	   okToShowImportBtn = false;
	   alert("A Quote was found" + "\n" + "You need to remove ALL quotes from the import file" + "\n" + "DO NOT IMPORT THIS FILE");
	}
	
	
	var allTextLines = file.split(/\r\n|\n/);
	var lines = [];
	
	for (var i=0; i<allTextLines.length; i++) {
		var data = allTextLines[i].split(/\t/);
			var tarr = [];
			//console.log("row cell count : " + data.length);
			//error checking - check for 25 cells in each row
			if(data.length != 26 && data.length != 1)
			{
				okToShowImportBtn = false;
				alert("Invalid total number of columns, looking for 26 colums" + "\n" + "Only found " + data.length + " on row " + i + "\n" + "DO NOT IMPORT THIS FILE");
			}
			
			for (var j=0; j<data.length; j++) {
				if(j === 7 && i != 0 || j === 24 && i != 0 || j === 25 && i != 0)
				{
					//error checking - check the date format
					if (validatedate(data[j]) == false) {
					   okToShowImportBtn = false;
					   alert("Invalid Date was found" + "\n" + data[j] + "\n" + "You need to use YYYY/MM/DD date" + "\n" + "DO NOT IMPORT THIS FILE");
					}
				}
				tarr.push(data[j]);
			}
			if(tarr.length > 1)
			{
				lines.push(tarr);
			}
	}
	//console.log(lines.length);
	
	//store the lines to import once the button is clicked
	importRows = lines;
	leftToImport = importRows.length-2;
	//console.log(importRows);
  
	createHeaderRow(lines[0]); //create the header row
	for (var i=1; i<lines.length; i++) // i starts at 1 to ignor the header
	{
	  //every line needs to but pushed to the form
	  addRow(lines[i]);
	}

	//document.forms["assetform"].submit();
	showImportBtn();
}

function errorHandler(evt) 
{
	if(evt.target.error.name == "NotReadableError") {
	  alert("Can not read file !");
	}
}

function addRow(asset) 
{
	// Get a reference to the table
	let tableRef = document.getElementById('assetTable');
	
	// Insert a row at the end of the table
	let newRow = tableRef.insertRow(-1);
	var cellID = 0;
	
	// Insert a cell in the row at index 0
	$j.each(asset, function(fieldName, value)
	{
		 //console.log(fieldName + " : " + value);
		 //console.log(value[i]);
		 let newCell = newRow.insertCell(cellID);
		 newCell.innerHTML = value;
		 cellID++;
	});
}

function createHeaderRow(asset)
{
	var table = document.getElementById("assetTable");
	var tr = document.createElement("tr");
	var cell =0;

	//console.log(asset.length);
	$j.each(asset, function(fieldName, value)
	{
		//console.log("switch : " + value);
		switch (cell) 
		{
			case 0 :
				value = "ID";
				break;
			case 1 :
				value = "Active";
				break;
			case 2 :
				value = "SchoolName";
				break;
			case 3 :
				value = "SchoolId";
				break;
			case 4 :
				value = "IsStudent_dcid";
				break;
			case 5 :
				value = "AssignedTo";
				break;
			case 6 :
				value = "AssignedTo_dcid";
				break;
			case 7 :
				value = "PurchaseDate";
				break;
			case 8 :
				value = "PurchasePrice";
				break;
			case 9 :
				value = "PO_Number";
				break;
			case 10 :
				value = "Asset_FundedBy";
				break;
			case 11 :
				value = "BarCode";
				break;
			case 12 :
				value = "Asset_Type";
				break;
			case 13 :
				value = "Asset_Manufacture";
				break;
			case 14 :
				value = "Asset_Model";
				break;
			case 15 :
				value = "Asset_Serial";
				break;
			case 16 :
				value = "Asset_MacAddress";
				break;
			case 17 :
				value = "Asset_Location";
				break;
			case 18 :
				value = "Asset_Accessory_1";
				break;
			case 19 :
				value = "Asset_Accessory_2";
				break;
			case 20 :
				value = "Asset_Accessory_3";
				break;
			case 21 :
				value = "DeviceUsername";
				break;
			case 22 :
				value = "DevicePassword";
				break;
			case 23 :
				value = "Asset_Notes";
				break;
			case 24 :
				value = "Asset_CheckOutDate";
				break;
			case 25 :
				value = "Asset_CheckInDate";
				break;
			default :
				value = "not found";
				break;
		}
		cell++;
		

		var th = document.createElement("th");
		th.innerText = value;
		tr.appendChild(th);
	});

	table.appendChild(tr); 
}

function showImportBtn() 
{
	if(okToShowImportBtn === true)
	{
		var x = document.getElementById("confirmBtn");
		x.style.display = "block";
	}
}

function hideImportBtn() 
{
	var x = document.getElementById("confirmBtn");
	x.style.display = "none";
}

function importTheRecords()
{
	console.log("Import! are you sure, It's to late, you clicked the button!!!");
	for (var i=1; i<importRows.length; i++) // i starts at 1 to ignor the header
	{
	  //every line needs to be pushed to the database
	  addRecordToDB(importRows[i]);
	  //console.log(importRows[i]);
	}
}


function addRecordToDB(record)
{
	//console.log(record);
	//console.log(record[6] + " : " + record[22] + " : " + record[23]);
	//console.log(record[18] + " : " + record[19] + " : " + record[20]);
	var purchaseDate = convertDates(record[7]);
	var checkoutDate = convertDates(record[24]);
	var checkinDate = convertDates(record[25]);

	if(record[0] > 0)
	{
		//console.log("Update : " + record[0] + " :: " + record.length);
		$psq('u_assettable').update(record[0], 
			{
				Asset_CheckoutDate: checkoutDate,
				Asset_CheckInDate: checkinDate,
				Active: record[1], 
				SchoolName: record[2], 
				SchoolId: record[3],
				IsStudent_dcid: record[4],
				AssignedTo: record[5],
				AssignedTo_dcid: record[6],
				Asset_PurchaseDate: purchaseDate,
				PurchasePrice: record[8],
				Asset_PO_Number: record[9],
				Asset_FundedBy: record[10],
				Asset_ID: record[11],
				Asset_Type: record[12],
				Asset_Manufacture: record[13],
				Asset_Model: record[14],
				Asset_Serial: record[15],
				Asset_MacAddress: record[16],
				Asset_Location: record[17],
				Asset_Accessory_1: record[18],
				Asset_Accessory_2: record[19],
				Asset_Accessory_3: record[20],
				Device_Username: record[21],
				Device_Password: record[22],
				Asset_Notes: record[23]
			});
	}else
	{
		//console.log("Add new");
		$psq('u_assettable').insert(
			{
				Asset_CheckoutDate: checkoutDate,
				Asset_CheckInDate: checkinDate,
				Active: record[1], 
				SchoolName: record[2], 
				SchoolId: record[3],
				IsStudent_dcid: record[4],
				AssignedTo: record[5],
				AssignedTo_dcid: record[6],
				Asset_PurchaseDate: purchaseDate,
				PurchasePrice: record[8],
				Asset_PO_Number: record[9],
				Asset_FundedBy: record[10],
				Asset_ID: record[11],
				Asset_Type: record[12],
				Asset_Manufacture: record[13],
				Asset_Model: record[14],
				Asset_Serial: record[15],
				Asset_MacAddress: record[16],
				Asset_Location: record[17],
				Asset_Accessory_1: record[18],
				Asset_Accessory_2: record[19],
				Asset_Accessory_3: record[20],
				Device_Username: record[21],
				Device_Password: record[22],
				Asset_Notes: record[23]
			});
	}
	
	

	if(leftToImport > 0)
	{
		leftToImport--;
		//console.log(leftToImport);
	}else
	{
		//clear the table
		var tableSize = $j('#assetTable tr').length;
		for(var i = 0; i < tableSize; i++)
		{
			document.getElementById("assetTable").deleteRow(0);
			//console.log("removed row");
		}
		hideImportBtn();
		//console.log("Import complete");
		alert("Import complete");
	}
	

}

function convertDates(date)
{
	//dates must be submitted with /
	//input date is YYYY/MM/DD
	//output date is MM/DD/YYYY
	var res;
	if(date == "")
	{
		res = "";
	}else
	{
		res = date.split("/");
		res = res[1]+"/"+res[2]+"/"+res[0];
	}
	return res;
}

function validatedate(inputText)
{
	if(inputText == "")
	{
		//null was found, this is ok
		return true;
	}

	var dateformat = /[1-2][0-9][0-9][0-9][\/][0-9][0-9][\/][0-9][0-9]/;
	// Match the date format through regular expression
	if(inputText.match(dateformat))
	{
		//Test which seperator is used '/' or '-'
		var opera1 = inputText.split('/');
		lopera1 = opera1.length;
		// Extract the string into month, date and year
		if (lopera1>1)
		{
			var pdate = inputText.split('/');
		}

		var yy = parseInt(pdate[0]);
		var mm  = parseInt(pdate[1]);
		var dd = parseInt(pdate[2]);
		// Create list of days of a month [assume there is no leap year by default]
		var ListofDays = [31,28,31,30,31,30,31,31,30,31,30,31];
		if (mm==1 || mm>2)
		{
			if (dd>ListofDays[mm-1])
			{
				//alert('Invalid date format! DD fail');
				return false;
			}
		}
		if (mm==2)
		{
			var lyear = false;
			if ( (!(yy % 4) && yy % 100) || !(yy % 400)) 
			{
				lyear = true;
			}
			if ((lyear==false) && (dd>=29))
			{
				//alert('Invalid date format! nonleap Year DD fail');
				return false;
			}
			if ((lyear==true) && (dd>29))
			{
				//alert('Invalid date format! leap Year DD fail');
				return false;
			}
		}
	}
	else
	{
		//alert("Invalid date format! complete fail");
		return false;
	}
}