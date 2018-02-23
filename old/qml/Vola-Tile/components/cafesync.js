function genterate_id(username,email) {
//console.log(username, email);

    var userlength = username.length;
    var emaillength = email.length;
    var mix1 = emaillength / userlength;

   var pass1 = "";

    var emailsalt = email.slice(0,mix1);
    var num = 0;
    var offset = 0;
    while(num < userlength) {
        var byoffset = email.slice(offset,offset+mix1);
        var nooffset = username.slice(num,num+1);
        offset = mix1 + offset;
       pass1 = pass1.concat(byoffset);
        pass1 = pass1.concat(nooffset);
        num = num + 1;
    }
//console.log(pass1);

    var pass2 = "";
    var num = 0;
    while(num < pass1.length) {
        if(num % 2 == 0) {
            pass2 = pass2.concat(pass1.charCodeAt(num));
        } else {
            pass2 = pass2.concat(pass1.slice(num,num+1));
        }

        num = num +1;
    }
    //console.log(pass2);

return databasing(pass2,username,email);

}

function databasing(id,name,email) {
    //var rs = "";
    var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var dataStr = "INSERT INTO Users VALUES(?, ?, ?)";
        var data = [id, name, email];
        db.transaction(function(tx) {
            tx.executeSql("DROP TABLE Users");
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users(id TEXT, name TEXT, email TEXT)');
            tx.executeSql(dataStr, data);

        });

cafesyncing(id,name,email);
vola_tiling(id,tile,emblem);


return 1;
}

function cafesyncing(id,name,email) {

var http = new XMLHttpRequest();
    var url = "http://www.vagueentertainment.com/cafesync/create_user.php/?userid=" + id + "&username=" + name + "&email=" + email;
    //console.log(url)
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            //console.log(http.responseText);
        }
    }
    http.open('GET', url, true);
    http.send(null);
}


// Vola-Tile Spec

function vola_tiling(id,tile,emblem) {

var http = new XMLHttpRequest();
    var url = "http://www.vagueentertainment.com/cafesync/vola-tile/add_user.php/?userid=" + id + "&tile=" + tile + "&emblem=" + emblem + "&activated=1";
    //console.log(url)
    http.onreadystatechange = function() {
        if (http.readyState == 4) {
            //console.log(http.responseText);
        }
    }
    http.open('GET', url, true);
    http.send(null);
}
