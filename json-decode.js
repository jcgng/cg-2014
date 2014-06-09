/**
 * Usage:
 */

var JsonInfo = {
    _dataReceivedCallback : null,
    _xmlHttp : null,
    _serverAddress : "http://localhost/HealthMonitor/get-health.php",
    _user : "joao.guiomar",
    _pass : "ola",
/*
    _bedNumber : null,
    _running : false,
*/
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
        this._xmlHttp.onreadystatechange = function() {
            if(JsonInfo._xmlHttp.readyState == 4 && JsonInfo._xmlHttp.status == 200) {
                JsonInfo.createList();
            }
        };
        this._xmlHttp.open("GET", this._serverAddress+"?board="+idBoards+"&patient="+idPatients+"&bedNumber="+bedNumber+"&user="+this._user+"&pass="+this._pass, true);
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
JsonInfo.getBalance = function() {
    if(this._data!=null) {
        for(var row=0;row<this._data.length;row++) {
            if(this._data[row]['param1']=='move') return parseInt(this._data[row]['val1']);
        }
    }
    return null;
};
/*
JsonInfo.setBedNumber = function(bedNumber) {
    JsonInfo._bedNumber = bedNumber;
};
JsonInfo.getBedNumber = function() {
    return JsonInfo._bedNumber;
};
JsonInfo.resetBedNumber = function() {
    JsonInfo._bedNumber = null;
};

JsonInfo.isRunning = function() {
    return JsonInfo._running;
};
JsonInfo.setRunning = function(value) {
    JsonInfo._running = value;
};
*/

var init_time = 0;
function initialise () {
    JsonInfo.initialize();
};

/*
function getHealthSyncPool() {
    if(JsonInfo.getBedNumber()!=null) {
        JsonInfo.setRunning(true);
        
        Browser.println("Start getHealthSync: " + JsonInfo.getBedNumber()); 

        JsonInfo.fetchInfoSync('','');
        bpm = JsonInfo.getBPM();
        temp = JsonInfo.getTemp();
        blc = JsonInfo.getBalance();

        Browser.println("getHealthSync: " + bpm + "," + temp + "," + blc);
        
        setTimeout(function() { 
            getHealthSyncPool();
        }, 10000);
    } else {
        JsonInfo.setRunning(false);
    }
};
function setBedStartPool(value,timestep) {
    Browser.println("setBedStartPool: " + bedNumber + " - " + value); 
    JsonInfo.setBedNumber(bedNumber);
    if(JsonInfo.isRunning()==false)  
        getHealthSyncPool();
};
function resetBedStopPool(value,timestep) {
    Browser.println("resetBedStopPool"); 
    JsonInfo.resetBedNumber();
};
*/

function getHealthSync(value,timestep) {
    if(bedNumber!=null && typeof bedNumber!='undefined') {
        // Browser.println("Start getHealthSync: " + bedNumber); 
        
        JsonInfo.fetchInfoSync(/*board*/'',/*patient*/'',bedNumber);
        alert = false;
        if(JsonInfo.getBPM()!=null) {
            bpm = JsonInfo.getBPM() + " bpm";
            if(JsonInfo.getBPM()<55 || JsonInfo.getBPM()>100)
                alert = true;
        } else {
            bpm = '... bpm';
        }
        if(JsonInfo.getTemp()!=null) {
            temp = JsonInfo.getTemp() + " C";
            if(JsonInfo.getTemp()<35 || JsonInfo.getTemp()>37)
                alert = true;
        } else {
            temp = '... C';
        }
        if(JsonInfo.getBalance()!=null) {
            blc = JsonInfo.getBalance();
        } else {
            blc = '...';
        }
        
        // Browser.println("getHealthSync: " + bpm + "," + temp + "," + blc + "," + alert);
    }
};