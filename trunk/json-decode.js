/**
 * Obter da base de dados a informação relacionada com cada paciente
 */

var JsonInfo = {
    _dataReceivedCallback : null,
    _xmlHttp : null,
    // _serverAddress : "http://clevermobile.dx.am/HealthMonitor/get-health.php",
    _serverAddress : "http://localhost/HealthMonitor/get-health.php",
    _user : "admin",
    _pass : "iscte@2014",
    _data : null
};

JsonInfo.initialize = function () {
    if(this._xmlHttp) {
        this._xmlHttp.destroy();
        this._xmlHttp = null;
    }
};

JsonInfo.fetchInfoAsync = function(idBoards,idPatients,bedNumber) {
    if(this._xmlHttp == null) {
        this._xmlHttp = new XMLHttpRequest();
    }
    if(this._xmlHttp) {
        this._xmlHttp.open("GET", this._serverAddress+"?board="+idBoards+"&patient="+idPatients+"&bedNumber="+bedNumber+"&user="+this._user+"&pass="+this._pass, true);
        this._xmlHttp.onreadystatechange = function() {
            if(JsonInfo._xmlHttp.readyState == 4 && JsonInfo._xmlHttp.status == 200) {
                Browser.println("done!"); 
                JsonInfo.createList();
            }
        };
        this._xmlHttp.send(null);
    }
};

JsonInfo.fetchInfoSync = function(idBoards,idPatients,bedNumber) {
    if(this._xmlHttp == null) {
        this._xmlHttp = new XMLHttpRequest();
    }
    if(this._xmlHttp) {
        this._xmlHttp.open("GET", this._serverAddress+"?board="+idBoards+"&patient="+idPatients+"&bedNumber="+bedNumber+"&user="+this._user+"&pass="+this._pass, false);
        this._xmlHttp.send(null);
        this.createList();
    }
};

JsonInfo.createList = function() {
    if(this._xmlHttp.responseText!=null && this._xmlHttp.responseText!='' && typeof this._xmlHttp.responseText!='undefined') {
        var response = JSON.parse(this._xmlHttp.responseText);
        if(response) {
            this._data = response;
        }       
        if (this._dataReceivedCallback) {
            this._dataReceivedCallback(); /* Notify all data is received and stored */
        }
    }
};

JsonInfo.getBPM = function() {    
    if(this._data!=null) {
        for(var row=0;row<this._data.length;row++) {
            if(this._data[row]['param1']=='bpm') return parseInt(this._data[row]['val1']);
        }
    }
    return null;
};
JsonInfo.getTemp = function() {
    if(this._data!=null) {
        for(var row=0;row<this._data.length;row++) {
            if(this._data[row]['param1']=='temp') return parseFloat(this._data[row]['val1']);
        }
    }
    return null;
};
/*
JsonInfo.getBalance = function() {
    if(this._data!=null) {
        for(var row=0;row<this._data.length;row++) {
            if(this._data[row]['param1']=='move') return parseInt(this._data[row]['val1']);
        }
    }
    return null;
};
*/
JsonInfo.getName = function() {
    if(this._data!=null) {
        return this._data[0]['name'];
    }
    return null;
};
JsonInfo.getAge = function() {
    if(this._data!=null) {
        return this._data[0]['age'];
    }
    return null;
};

var init_time = 0;
function initialise () {
    JsonInfo.initialize();
};

function getHealthSync(value,timestep) {
    if(bedNumber!=null && typeof bedNumber!='undefined') {
        // Browser.println("Start getHealthSync: " + bedNumber); 
        
        JsonInfo.fetchInfoSync('','',bedNumber);
        alert = false;
        if(JsonInfo.getBPM()!=null) {
            bpm = JsonInfo.getBPM();
            if(JsonInfo.getBPM()<55 || JsonInfo.getBPM()>100)
                alert = true;
        } else {
            bpm = '...';
        }
        if(JsonInfo.getTemp()!=null) {
            temp = JsonInfo.getTemp();
            if(JsonInfo.getTemp()<35 || JsonInfo.getTemp()>37)
                alert = true;
        } else {
            temp = '...';
        }
        
        // if(JsonInfo.getBalance()!=null) {
        //    blc = JsonInfo.getBalance();
        // } else {
        //    blc = '...';
        //}

        if(JsonInfo.getName()!=null) {
            name = JsonInfo.getName();
        } else {
            name = '...';
        }
        if(JsonInfo.getAge()!=null) {
            age = JsonInfo.getAge();
        } else {
            age = '...';
        }
        
        // Browser.println("getHealthSync: " + bpm + "," + temp + "," + blc + "," + alert);
    }
};

/*
var serverAddress = "http://localhost/HealthMonitor/get-health.php";
var user = "admin";
var pass = "iscte@2014";
 
function setValues(responseText,name) {
    if(responseText!=null && responseText!='' && typeof responseText!='undefined') {
        var json = JSON.parse(responseText);
        if(json) {
            // bpm
            for(var row=0;row<json.length;row++) {
                if(json[row]['param1']=='bpm') bpm = parseInt(json[row]['val1']);
            }
            // temp
            for(var row=0;row<json.length;row++) {
                if(json[row]['param1']=='temp') temp = parseInt(json[row]['val1']);
            }
            // name
            if(json!=null) {
                if(bedNumber==1) {
                    name.string = json[0]['name'];
                } else {
                    name = json[0]['name'];   
                }
            }
            // age
            if(json!=null) {
                age = json[0]['age'];
            }
            Browser.println(name); 
        }       
    }
};

fetchInfoAsync = function(url,callback,name) {
    var xmlHttp = new XMLHttpRequest();
    if(xmlHttp) {
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = function() {
            if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                Browser.println("done!"); 
                callback(xmlHttp.responseText,name);
            }
        };
        xmlHttp.send(null);
    }
}

function getHealthSync(value,timestep) {
    if(bedNumber!=null && typeof bedNumber!='undefined') {
        // Browser.println("Start getHealthSync: " + bedNumber); 
        Browser.println(name.string); 
        fetchInfoAsync(serverAddress+"?bedNumber="+bedNumber+"&user="+user+"&pass="+pass,setValues,name);
        // Browser.println("getHealthSync: " + bpm + "," + temp + "," + blc + "," + alert);
    }
};
*/