/*
    psQuery Java Script Library
    dependencies: PowerSchool, jQuery as $j, 'psQueryX.html' files located in /admin/psQuery, /teachers/psQuery and /guardian/psQuery folders
    author: Jim Parsons
    version: 0.1
    description: insert, update, and delete records via AJAX 
    installation: <script src="/scripts/psQuery/psQuery.js"></script>
    
    usage: 
        var table_object = $psq(table);
        --- creates a table_object: 'table' can be the PS table number, or the table name ... eg. 'students' or 1
        --- example:
                var students_table = $psq('students');

        table_object.insert(fields_values, callback_function);
        --- inserts a new record into the table; if callback is supplied, will return the record ID (or 0 on failure)
        --- fields_values is an object with field name and value pairs ... eg, {last_name: 'Smith', first_name: 'John'} 
        --- example:
                $psq('u_vex_vehicles').insert({studentsdcid: 123456, license: 'ABC123', make: 'Toyota' }, function(retID) {
                   if  (retID) alert('Record Inserted: ' + retID);
                });
                
        table_object.update(id, fields_values, callback_function);
        --- updates an existing record in the table; if callback is supplied, will return the record ID (or 0 on failure)
        --- id is either the DCID of stock tables, or the ID of extended schema tables
        --- fields_values is an object with field name and value pairs ... eg, {last_name: 'Smith', first_name: 'John'} 
        --- example:
                $psq('students').update(12345, {last_name: 'Smith', first_name: 'John'}, function(retID) {
                   if  (retID) alert('Record Updated: ' + retID);
                });                
        
        table_object.delete(id, callback_function);
        --- deletes an existing record in the table; if callback is supplied, will return the record ID (or 0 on failure)
        --- id is either the DCID of stock tables, or the ID of extended schema tables
        --- example:
                $psq('log').delete(123456, function(retID) {
                   if  (retID) alert('Record Deleted: ' + retID);
                });

*/

;(function(global, $j) {
    
    var psQuery = function(table) {
        return new psQuery.init(table);
    }
    
    var maxParams = 25;
    
    // is this Admin, Teacher or Guardian portal ?? (note: script breaks where URL contains "/guardian/" or "/teachers/" in Admin portal)
    var isGuardian = window.location.href.includes("/guardian/");
    var isTeachers = window.location.href.includes("/teachers/");
    
    // selected stock tables, enables named parameter ... can add to if needed
    var stockTables = {
        students: '001',
        courses: '002',
        sections: '003',
        cc: '004',
        users: '005', // formerly teachers
        gen: '006',
        log: '008',
        prefs: '009',
        terms: '013',
        schools: '039',
        calendar_day: '051',
        fees: '054',
        guardians: '055'
    };
    
    psQuery.prototype = {
        
        // built-in methods
        
        delete: function(dcid, callback) {
            
            // call the update function with 'delete' as fields
            return this.update(dcid, 'delete', callback);

        },

        insert: function(fields, callback) {
            
            // call the update function with a dcid as '-99'
            return this.update(-99, fields, callback);

        },
        
        insertChild: function(parent, fields, callback) {
            
            // call the update function passing the parent table
            return this.update(parent, fields, callback);

        },        
        
        update: function(dcid, fields, callback) {
            
            var self = this;
            var frn; // used for stock tables
            var parentStr;
            var parentID;
            
            // set url for AJAX call
            var url = '/Inventory/psQuery/psQueryA.html?no-store-lp=1';
            if (isGuardian) url = '/guardian/psQuery/psQueryP.html?g=1'
            if (isTeachers) url = '/teachers/psQuery/psQueryT.html?t=1'
            
            var isDelete = false;
            if (fields==='delete') isDelete=true;
            
            if (dcid !== null && typeof dcid === "object") {
                // must be insertChild, add the parent params to the URL
                parentStr = dcid.table + '.' + self.id_name;
                parentID = dcid.id;
                url = url + '&p=1&parentStr=' +parentStr + '&parentID=' + parentID;
                dcid = -99;
            }
            
            // determine the table type
            if (self.table_custom) {
                if (isDelete) {
                    name_prefix = 'DD-' + self.table_name + '.ID:' + dcid;
                } else {
                    name_prefix = 'CF-[' + self.table_name + ':' + dcid + ']';
                }
            } else {
                frn = self.table_number + String(dcid);
                url = url + '&frn=' + frn;
                if (isDelete) {
                    name_prefix = 'DR-' + frn;
                } else {
                    name_prefix = '[' + self.table_number + ']';
                }
            }

            // make sure fields is an object OR fields is 'delete'
            if ((fields !== null && typeof fields === 'object') || isDelete) {
                
                // map fields to key/name pairs for helper file (psQuery.html)
                var count = 0;
                var params = {};
                var valuemap = ['prim'];
                if (isGuardian) valuemap = ['autosendupdate'];
                if (isTeachers) valuemap = ['webasmt'];
                
                if (isDelete) {
                    params.key1 = 1;
                    params.name1 = name_prefix;
                    valuemap.push(1);
                    
                } else {
                    for (k in fields) {
                        if (fields.hasOwnProperty(k)) {
                            count++;
                            params['key'+count] = count;
                            params['name'+count] = name_prefix + k;
                            
                            // map the value for insertion later
                            valuemap.push(fields[k]);
                        }
                    }
                }
                
                // the helper has a limit to the number of fields it can create/update ... edit the file to increase
                if (count>self.maxParams) {
                    throw "to many items in fields parameters";
                }

                // call the helper file using jQuery's .post() method, passing the key/name gpv's
                
                $j.post(url, params, function(retForm) {
                    
                    // get the returned form and serialize the names and insert the values
                    var formFields = $j(retForm).children("input");
                    var fieldData = {};
                    
                    count = 0;
                    formFields.each(function() {
            			fieldData[$j(this).attr("name")] = valuemap[count];
            			count++;
                    });
                    if (parentStr) fieldData[parentStr] = parentID;
                    
                    // add gpv's to URL (z, id_name, table_name)
                    url = url + '&table_name=' + self.table_name + '&id_name=' + self.id_name+ '&z=1';
                    
                    // sumbit (post) the data to the server, retValue is the ID
                    $j.post(url, fieldData, function(retID) {
                        
                        if (typeof callback === 'function') {
                            
                            if (isNaN(retID)) retID = 0;
                            
                            if (isDelete) {
                                if (retID == -1) {
                                    retID = dcid;
                                } else {
                                    retID = 0;
                                }
                                
                            } else {
                                if (dcid > 0 && retID > 0) retID = dcid;
                                
                            }
                            
                            callback(retID);
                            
                        } else {
                            return self;
                        }
                        
                    });
                    
                });

            } else {
                throw "missing fields parameter";
            }

        },
        
        get: function(dcid, fields, callback) {
            
            // under construction
            return this;
            
        }
        
    };
    
    psQuery.init = function(table) {
        
        var self = this;
        self.table_custom = false;
        self.id_name = 'dcid';
        if (table/1>0) {
            // table passed as a number, pad with zeros
            if (table/1 <= 999) { table = ("00"+table).slice(-3); }
            self.table_number = table;

            for(var k in stockTables) {
                if(stockTables[k] === table) self.table_name = k;
            }
            
            if (self.table_name===undefined) {
                throw "table not defined";
            }

        } else {
            if (stockTables[table]===undefined) {
                // table could be a custom table
                if (table.toUpperCase().substring(0,2)==='U_') {
                    self.table_custom = true;
                    self.table_name = table;
                    self.id_name = 'id';
                } else {
                    throw "unknown table";
                }
                
            } else {
                self.table_name = table;
                self.table_number = stockTables[table];
            }
        }
        
    }
    
    psQuery.init.prototype = psQuery.prototype;
    
    global.psQuery = global.$psq = psQuery;
    
}(window, jQuery));