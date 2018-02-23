

//var blockSize = 60;
var maxColumn = 22;
var maxRow = 20;
var xoffset = 0;
var yoffset = 0;

var maxIndex = maxColumn * maxRow;
var tiles = new Array(maxIndex);
var ctiles = new Array(maxIndex);


var component;
var tilenum = 0;
var ctilenum = 0;
var combo = 0;
var playernotification;
var pnote;
var notify;
var notify_me;

var player_dialog;
var playerdialog;
var countdown = 3;

//vol_array 1= timer 2= state 3= cooldown
var vol_array = new Array(100);
for (var i=0;i<100;i++) {

    vol_array[i] = new Array(3);
}

//network vars

//var gameid = 0;
var pid = new Array(4);
for(var num =0;num < 4;num++) pid[num] = "";

var userid = "";
var gactive = 0;
var gindex = 0;
var yourturn = 0;
var sameUser = 0;
var gamerequested = 0;

// end network vars

//player cycling

var pname = new Array(4);
for(var num =0;num < 4;num++) pname[num] = "";

var pscore = new Array(4);
for(var num =0;num < 4;num++) pscore[num] = 0;

var pbacking = new Array(4);
for(var num =0;num < 4;num++) pbacking[num] = 1;

var pemblem = new Array(4);
for(var num =0;num < 4;num++) pemblem[num] = 1;

var pcombo = new Array(4);
for(var num =0;num < 4;num++) pcombo[num] = 0;

var pwins = new Array(4);
for(var num =0;num < 4;num++) pwins[num] = 0;

var plosses = new Array(4);
for(var num =0;num < 4;num++) plosses[num] = 0;

var pdraws = new Array(4);
for(var num =0;num < 4;num++) pdraws[num] = 0;

var player = 0;
var score = 0;
var gameover = 0;
var waitingfor =4;
var playerids  =["na","na","na","na"];
var gamestarted = 0;

var lname = "";
var lwins = 0;
var llosses = 0;
var ldraws = 0;
var lemblem = 0;
var lbacking = 0;


var paint = 99;

// end player cycling //



function player_notification_area() {
    if (playernotification == null) {
    playernotification = Qt.createComponent("./components/player_notification.qml");
        if(playernotification.status == Component.Ready) {

    pnote = playernotification.createObject(gamescreen);
            if (pnote == null) {
                console.log("error creating block");
                console.log(playernotification.errorString());
                return false;
            }

     //player_notification.state = "show";
    pnote.x = 0;
    pnote.y = 0;
    pnote.width = gamescreen.width * 0.40;
    pnote.height = gamescreen.height / 10;
    pnote.state = "active";
        } else { console.log("failed to load player notification area");}
    } else {
        pnote.state = "active";
    }
}

function notification() {
    if (notify == null) {
    notify = Qt.createComponent("./components/anounce.qml");
        if(notify.status == Component.Ready) {

        notify_me = notify.createObject(gamescreen);
            if (notify_me == null) {
                console.log("error creating block");
                console.log(notify.errorString());
                return false;
            }

    notify_me.width = gamescreen.width * 0.98;
    notify_me.height = gamescreen.height / 2;

    notify_me.y = gamescreen.height * 0.25;
    notify_me.x = gamescreen.width * 0.01;
    //notify_me.tmessege = "Test"

    gameover = notify_me.backhit;

        } else { console.log("failed to load notification area");}
    } else {
        //notify_me.state = "active"
    }
}

function cafesync(cod) {
//console.log("test");

        if(player_dialog == null) {

            player_dialog = Qt.createComponent("./components/cafesync.qml");

            if(player_dialog.status == Component.Ready) {
               playerdialog = player_dialog.createObject(titlescreen);

                if(playerdialog == null) {
                    console.log("error creating block");
                    console.log(player_dialog.errorString());
                    return false;
                }
             //playerdialog.width = titlescreen.width ;
            // playerdialog.height = titlescreen.height;
            }
            else {

                console.log("failed to load playerdialog");
            }
            playerdialog.state = "active";
        } else {
            playerdialog.state = "active";
        }


}

function startNewGame() {

//initial player setup //

//player_setup();

//end setup //
    player_notification_area();
    //
    if(nwtoggle != 0) {

    network_wait.stop();
        in_game.start();

        } else {
        network_wait.stop();
        notification();
    }

    pos0backing = pbacking[0];
    pos0emblem = pemblem[0];
    pos0name = pname[0];

    //Calculate board size
        maxColumn = 10;
       maxRow = 10;
      maxIndex = maxRow * maxColumn;

         //tiles = new Array(maxIndex);

       //Initialize Board
       for (var column = 0; column < maxColumn; column++) {
           for (var row = 0; row < maxRow; row++) {

               createBlock(column, row, tilenum);
                tilenum= tilenum +1;
           }
       }
    notify_me.state = "inactive";
    timer.start();
    gamestarted = 1;
   }

function createBlock(column, row, num) {

    if (component == null)
        component = Qt.createComponent("./components/tile.qml");

    // Note that if tile.qml was not a local file, component.status would be
    // Loading and we should wait for the component's statusChanged() signal to
    // know when the file is downloaded and ready before calling createObject().

    if (component.status == Component.Ready) {
        var dynamicObject = component.createObject(gameboard);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        var blockSizex = gameboard.width /10.7;
        var blockSizey = gameboard.height /10.7;
       if (row % 2 == 0) {
                dynamicObject.x = (column * blockSizex + blockSizex / 2);
            } else {

           dynamicObject.x =(column * blockSizex);
       }
        dynamicObject.y =(row * blockSizey);

        dynamicObject.width = blockSizex * 1.0;
        dynamicObject.height = blockSizey *1.3;

        dynamicObject.num = num;
        dynamicObject.row = row;
        dynamicObject.column = column;
        dynamicObject.type = 98;
        dynamicObject.player = 100;
       dynamicObject.etype = 0;
       tiles[num] = dynamicObject;


    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }

    return true;
}


function handleClick(xPos,yPos) {
    if(gamestarted == 1) {
    if(nwtoggle == 0 | userid == pid[yourturn]) {
    var row = yPos;
    var column = xPos;
    combo = 0;
    sound.stop();
    sound.volume = 0.2;
    changeTiles(column,row);
        //console.log("clicked at",xPos,":",yPos);
} else {
        //console.log("Not your turn!! it's ",pname[yourturn],"turn");
    }
}
}


function changeTiles(xPos,yPos) {
    var checking = 0;
    //console.log(gamemode);
    while(checking < maxIndex) {

        if(gamemode == 5) {

        if (ctiles[checking].x <= xPos && xPos <=(ctiles[checking].width + ctiles[checking].x))  {
            if(ctiles[checking].y <= yPos && yPos <=(ctiles[checking].height + ctiles[checking].y)) {

            //console.log("changing canvas tile at",ctiles[checking].x,ctiles[checking].y,"which has an index of",ctiles[checking].num)
                break;
            }
          }
      }  else {
        if (tiles[checking].x <= xPos && xPos <=(tiles[checking].width + tiles[checking].x))  {
            if(tiles[checking].y <= yPos && yPos <=(tiles[checking].height + tiles[checking].y)) {

            //console.log("changing game tile at",tiles[checking].x,tiles[checking].y,"which has an index of",tiles[checking].num)
                break;
            }
          }

        }
        checking = checking + 1;

        }

    if(gamemode != 5) {

        if(tiles[checking].type == 98) {

            if(tiles[checking].type != 99) {
                is_volatile(101);
                if (nwtoggle == 1) {

                    player_move(checking);

                } else {
            switch(player) {
            case 0:  tiles[checking].type = pbacking[0];tiles[checking].player = 0;tiles[checking].etype = pemblem[0];break;
            case 1:  tiles[checking].type = pbacking[1];tiles[checking].player = 1;tiles[checking].etype = pemblem[1];break;
            case 2:  tiles[checking].type = pbacking[2];tiles[checking].player = 2;tiles[checking].etype = pemblem[2];break;
            case 3:  tiles[checking].type = pbacking[3];tiles[checking].player = 3;tiles[checking].etype = pemblem[3];break;

            }
            linecheck(checking);
            player = player +1;
            player_switch(player);
            }
            sound.play();
            sound.volume = 0.1;

         }

        }
      } else {

        //sound.play();
        //sound.volume = 0.1;
        ctiles[checking].type = paint;
    }


    }


function linecheck(num) {
    var indexes = new Array();
    var icolumn = new Array();
    var irow = new Array();
    var n = 0;
    for(var i = 0; i < 100;i++) {
          if(tiles[i].player == player) {
            indexes[n] = i;
            icolumn[n] = tiles[i].column;
            irow[n] = tiles[i].row;
            ////console.log(indexes[n],icolumn[n],irow[n]);
            n = n + 1;
        }

    }
    var scan = 0;
    //straight line!

        var row0 =0;
        var row1 =0;
        var row2 =0;
        var row3 =0;
        var row4 =0;
        var row5 =0;
        var row6 =0;
        var row7 =0;
        var row8 =0;
        var row9 =0;

        var row0_array = new Array(10);
        var row1_array = new Array(10);
        var row2_array = new Array(10);
        var row3_array = new Array(10);
        var row4_array = new Array(10);
        var row5_array = new Array(10);
        var row6_array = new Array(10);
        var row7_array = new Array(10);
        var row8_array = new Array(10);
        var row9_array = new Array(10);

        var line0= 0;
        var line1= 0;
        var line2= 0;
        var line3= 0;
        var line4= 0;
        var line5= 0;
        var line6= 0;
        var line7= 0;
        var line8= 0;
        var line9= 0;

        while(indexes[scan] != null) {

            if(irow[scan] == 0) {

                row0_array[icolumn[scan]] = indexes[scan];
                row0 = row0 + 1;
            }
            if(irow[scan] == 1) {

                row1_array[icolumn[scan]] = indexes[scan];
                row1 = row1 + 1;
            }
            if(irow[scan] == 2) {

                row2_array[icolumn[scan]] = indexes[scan];
                row2 = row2 + 1;
            }
            if(irow[scan] == 3) {

                row3_array[icolumn[scan]] = indexes[scan];
                row3 = row3 + 1;

            }
            if(irow[scan] == 4) {

                row4_array[icolumn[scan]] = indexes[scan];
                row4= row4 + 1;
           }
            if(irow[scan] == 5) {

                row5_array[icolumn[scan]] = indexes[scan];
                row5 = row5 + 1;
            }
            if(irow[scan] == 6) {

                row6_array[icolumn[scan]] = indexes[scan];
                row6 = row6 + 1;
            }
            if(irow[scan] == 7) {

                row7_array[icolumn[scan]] = indexes[scan];
                row7 = row7 + 1;
            }
            if(irow[scan] == 8) {

                row8_array[icolumn[scan]] = indexes[scan];
                row8 = row8 + 1;
            }
            if(irow[scan] == 9) {

                row9_array[icolumn[scan]] = indexes[scan];
                row9 = row9 + 1;
            }


        scan = scan +1;
        }


        // row 0 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row0_array[carray] == null) {
                ////console.log("line broke");
                line0 = 0;
            } else {
                checkthem[line0] = row0_array[carray];
                line0 = line0 + 1;
                //console.log("tile count",line0,checkthem[line0-1] );

                if(line0 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line0;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                        is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }

        // row 1 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row1_array[carray] == null) {
                ////console.log("line broke");
                line1 = 0;
            } else {
                checkthem[line1] = row1_array[carray];
                line1 = line1 + 1;
                //console.log("tile count",line1,checkthem[line1-1] );

                if(line1 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line1;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }


        // row 2 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row2_array[carray] == null) {
                ////console.log("line broke");
                line2 = 0;
            } else {
                checkthem[line2] = row2_array[carray];
                line2 = line2 + 1;
                //console.log("tile count",line2,checkthem[line2-1] );

                if(line2 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line2;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }


        // row 3 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row3_array[carray] == null) {
                ////console.log("line broke");
                line3 = 0;
            } else {
                checkthem[line3] = row3_array[carray];
                line3 = line3 + 1;
                //console.log("tile count",line3,checkthem[line3-1] );

                if(line3 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line3;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }

        // row 4 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row4_array[carray] == null) {
                ////console.log("line broke");
                line4 = 0;
            } else {
                checkthem[line4] = row4_array[carray];
                line4 = line4 + 1;
                //console.log("tile count",line4,checkthem[line4-1] );

                if(line4 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line4;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;


                        }
                    }

                }
            }

        }


        // row 5 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row5_array[carray] == null) {
                ////console.log("line broke");
                line5 = 0;
            } else {
                checkthem[line5] = row5_array[carray];
                line5 = line5 + 1;
                //console.log("tile count",line5,checkthem[line5-1] );

                if(line5 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line5;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;


                        }
                    }

                }
            }

        }


        // row 6 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row6_array[carray] == null) {
                ////console.log("line broke");
                line6 = 0;
            } else {
                checkthem[line6] = row6_array[carray];
                line6 = line6 + 1;
                //console.log("tile count",line6,checkthem[line6-1] );

                if(line6 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line6;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }


        // row 7 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row7_array[carray] == null) {
                ////console.log("line broke");
                line7 = 0;

            } else {
                checkthem[line7] = row7_array[carray];
                line7 = line7 + 1;
                //console.log("tile count",line7,checkthem[line7-1] );

                if(line7 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line7;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }



        // row 8 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row8_array[carray] == null) {
                ////console.log("line broke");
                line8 = 0;

            } else {
                checkthem[line8] = row8_array[carray];
                line8 = line8 + 1;
                //console.log("tile count",line8,checkthem[line8-1] );

                if(line8 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line8;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score +5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }


        // row 9 verification

        var checkthem = new Array(8);

        for(var carray = 0; carray < 10; carray++) {


            if(row9_array[carray] == null) {
                ////console.log("line broke");
                line9 = 0;

            } else {
                checkthem[line9] = row9_array[carray];
                line9 = line9 + 1;
                //console.log("tile count",line9,checkthem[line9-1] );

                if(line9 >= 5) {
                    //console.log("line!!!!")

                    for(var num = 0;num < line9;num ++) {
                        tiles[checkthem[num]].type =99;
                        tiles[checkthem[num]].player =100;
                         is_volatile(checkthem[num]);
                        score = score + 1;
                        if(vol_array[checkthem[num]][1] == 1) {
                            combo = combo + 1;
                            score = score + 5;
                            //combo_true = 1;

                        }
                    }

                }
            }

        }

// end row test //

        //var scan = 0;

            //Left to Right angles //

            var ltrang_array = new Array(14);
            for(var i = 0;i<14;i++) {
                ltrang_array[i] = new Array(10);
            }

            for(var offset = 0;offset < 14;offset++) {

                    // starting at 0 //
                if(offset <= 10) {
                    if(row0_array[0+offset] !=null) {
                        ltrang_array[0+offset][0] = row0_array[0+offset];}

                    if(row1_array[1+offset] !=null) {
                        ltrang_array[0+offset][1] = row1_array[1+offset];}

                    if(row2_array[1+offset] !=null) {

                        ltrang_array[0+offset][2] = row2_array[1+offset];
                    }
                    if(row3_array[2+offset] !=null) {

                        ltrang_array[0+offset][3] = row3_array[2+offset];
                    }
                    if(row4_array[2+offset] !=null) {

                        ltrang_array[0+offset][4] = row4_array[2+offset];
                    }
                    if(row5_array[3+offset] !=null) {

                        ltrang_array[0+offset][5] = row5_array[3+offset];
                    }
                    if(row6_array[3+offset] !=null) {

                        ltrang_array[0+offset][6] = row6_array[3+offset];
                    }
                    if(row7_array[4+offset] !=null) {

                        ltrang_array[0+offset][7] = row7_array[4+offset];
                    }
                    if(row8_array[4+offset] !=null) {

                        ltrang_array[0+offset][8] = row8_array[4+offset];
                    }
                    if(row9_array[5+offset] !=null) {

                        ltrang_array[0+offset][9] = row9_array[5+offset];
                    }
                }

                    // starting at 1 //

                    if(row1_array[0] !=null) {
                        ltrang_array[11][0] = row1_array[0];}

                    if(row2_array[0] !=null) {
                        ltrang_array[11][1] = row2_array[0];}

                    if(row3_array[1] !=null) {

                        ltrang_array[11][2] = row3_array[1];
                    }
                    if(row4_array[1] !=null) {

                        ltrang_array[11][3] = row4_array[1];
                    }
                    if(row5_array[2] !=null) {

                        ltrang_array[11][4] = row5_array[2];
                    }
                    if(row6_array[2] !=null) {

                        ltrang_array[11][5] = row6_array[2];
                    }
                    if(row7_array[3] !=null) {

                        ltrang_array[11][6] = row7_array[3];
                    }
                    if(row8_array[3] !=null) {

                        ltrang_array[11][7] = row8_array[3];
                    }
                    if(row9_array[4] !=null) {

                        ltrang_array[11][8] = row9_array[4];
                    }

                    // starting at 3 //

                    if(row3_array[0] !=null) {
                        ltrang_array[12][0] = row3_array[0];}

                    if(row4_array[0] !=null) {
                        ltrang_array[12][1] = row4_array[0];}

                    if(row5_array[1] !=null) {

                        ltrang_array[12][2] = row5_array[1];
                    }
                    if(row6_array[1] !=null) {

                        ltrang_array[12][3] = row6_array[1];
                    }
                    if(row7_array[2] !=null) {

                        ltrang_array[12][4] = row7_array[2];
                    }
                    if(row8_array[2] !=null) {

                        ltrang_array[12][5] = row8_array[2];
                    }
                    if(row9_array[3] !=null) {

                        ltrang_array[12][6] = row9_array[3];
                    }

                    // starting at 5

                    if(row5_array[0] !=null) {
                        ltrang_array[13][0] = row5_array[0];}

                    if(row6_array[0] !=null) {
                        ltrang_array[13][1] = row6_array[0];}

                    if(row7_array[1] !=null) {

                        ltrang_array[13][2] = row7_array[1];
                    }
                    if(row8_array[1] !=null) {

                        ltrang_array[13][3] = row8_array[1];
                    }
                    if(row9_array[2] !=null) {

                        ltrang_array[13][4] = row9_array[2];
                    }


                    var ltrline = 0;
                    var checkthem = new Array(9);

                    for(var carray = 0; carray < 10; carray++) {


                        if(ltrang_array[0+offset][carray] == null) {
                            ////console.log("line broke");
                            ltrline = 0;

                        } else {
                            checkthem[ltrline] = ltrang_array[0+offset][carray];
                            ltrline = ltrline + 1;
                            //console.log("tile count",line,checkthem[line-1] );

                            if(ltrline >= 5) {
                                //console.log("line!!!!")

                                for(var num = 0;num < ltrline;num ++) {
                                    tiles[checkthem[num]].type =99;
                                    tiles[checkthem[num]].player =100;
                                     is_volatile(checkthem[num]);

                                    score = score + 1;
                                    if(vol_array[checkthem[num]][1] == 1) {
                                        combo = combo + 1;
                                        score = score + 5;
                                        //combo_true = 1;

                                    }
                                }

                            }
                        }

                    }

            }

            // end Left to right //

            // Right to Left Angles //

           var rtlang_array = new Array(14);
                        for(var i = 0;i<14;i++) {
                            rtlang_array[i] = new Array(10);
                        }

                        for(var offset = 0;offset < 14;offset++) {

                             if(row9_array[0+offset] != null) {
                              rtlang_array[0+offset][0] = row9_array[0+offset];
                             }
                             if(row8_array[0+offset] != null) {
                              rtlang_array[0+offset][1] = row8_array[0+offset];
                             }
                             if(row7_array[1+offset] != null) {
                              rtlang_array[0+offset][2] = row7_array[1+offset];
                             }
                             if(row6_array[1+offset] != null) {
                              rtlang_array[0+offset][3] = row6_array[1+offset];
                             }
                             if(row5_array[2+offset] != null) {
                              rtlang_array[0+offset][4] = row5_array[2+offset];
                             }
                             if(row4_array[2+offset] != null) {
                              rtlang_array[0+offset][5] = row4_array[2+offset];
                             }
                             if(row3_array[3+offset] != null) {
                              rtlang_array[0+offset][6] = row3_array[3+offset];
                             }
                             if(row2_array[3+offset] != null) {
                              rtlang_array[0+offset][7] = row2_array[3+offset];
                             }
                             if(row1_array[4+offset] != null) {
                              rtlang_array[0+offset][8] = row1_array[4+offset];
                             }
                             if(row0_array[4+offset] != null) {
                              rtlang_array[0+offset][9] = row0_array[4+offset];
                             }

                            // start at 7 //


                             if(row7_array[0] != null) {
                              rtlang_array[11][0] = row7_array[0];
                             }
                             if(row6_array[0] != null) {
                              rtlang_array[11][1] = row6_array[0];
                             }
                             if(row5_array[1] != null) {
                              rtlang_array[11][2] = row5_array[1];
                             }
                             if(row4_array[1] != null) {
                              rtlang_array[11][3] = row4_array[1];
                             }
                             if(row3_array[2] != null) {
                              rtlang_array[11][4] = row3_array[2];
                             }
                             if(row2_array[2] != null) {
                              rtlang_array[11][5] = row2_array[2];
                             }
                             if(row1_array[3] != null) {
                              rtlang_array[11][6] = row1_array[3];
                             }
                             if(row0_array[3] != null) {
                              rtlang_array[11][7] = row0_array[3];
                             }

                             // start at 5 //

                             if(row5_array[0] != null) {
                              rtlang_array[12][0] = row5_array[0];
                             }
                             if(row4_array[0] != null) {
                              rtlang_array[12][1] = row4_array[0];
                             }
                             if(row3_array[1] != null) {
                              rtlang_array[12][2] = row3_array[1];
                             }
                             if(row2_array[1] != null) {
                              rtlang_array[12][3] = row2_array[1];
                             }
                             if(row1_array[2] != null) {
                              rtlang_array[12][4] = row1_array[2];
                             }
                             if(row0_array[2] != null) {
                              rtlang_array[12][5] = row0_array[2];
                             }



                                var line = 0;
                                var checkthem = new Array(9);



                                for(var carray = 0; carray < 10; carray++) {


                                    if(rtlang_array[0+offset][carray] == null) {
                                        //console.log("line broke");
                                        line = 0;

                                    } else {


                                        checkthem[line] = rtlang_array[0+offset][carray];
                                        line = line + 1;
                                        //console.log("tile count",line,checkthem[line-1] );

                                        if(line >= 5) {
                                            //console.log("line!!!!")

                                            for(var num = 0;num < line;num ++) {
                                                tiles[checkthem[num]].type =99;
                                                tiles[checkthem[num]].player =100;
                                                 is_volatile(checkthem[num]);
                                                score = score + 1;
                                                if(vol_array[checkthem[num]][1] == 1) {
                                                    combo = combo + 1;
                                                    score = score + 5;
                                                    //combo_true = 1;

                                                }
                                            }

                                        }
                                    }

                                }

                        }

                        // end right to left //


}

function is_volatile(tile) {
        if (tile != 101) {

            if (vol_array[tile][0] == null) {
                    vol_array[tile][0] = 5;
                    vol_array[tile][1] = 0;
                    vol_array[tile][2] = 7;
               // console.log("added",vol_array[tile]);
            }

             } else {
                for(var i = 0;i < 100;i++) {
                     if (vol_array[i][0] != null) {
                             if(vol_array[i][0] == 0) {


                                 if (vol_array[i][1] == 0) {
                                    tiles[i].type = 98;
                                        tiles[i].vtile = 1;
                                         vol_array[i][1] = 1;

                                        } else {
                                            //console.log("cooldown in",vol_array[i][2] );
                                            vol_array[i][2] = vol_array[i][2] - 1;
                                        }

                                     if (vol_array[i][2]  == 0) {
                                         vol_array[i][0] = null;
                                         vol_array[i][1] = null;
                                         vol_array[i][2] = null;
                                         tiles[i].vtile = 0;
                                         if(tiles[i].player == 100) tiles[i].etype = 0;
                                     }

                               } else {

                                    vol_array[i][0] = vol_array[i][0] - 1;

                                 //console.log("tick", vol_array[i][0]);
                                 }
                         }
                }
}
}

function player_setup() {

    //wipeAll();
    notification();

    gamemode = 0;

    theWindow.wemblem = 99;
    theWindow.wbacking = 1;
    notify_me.tmessege = "Please Wait"

    theWindow.emblem5 = 0;
    theWindow.emblem2 = 0;
    theWindow.emblem3 = 0;
    theWindow.emblem4 = 0;

    theWindow.backing5 = 0;
    theWindow.backing2 = 0;
    theWindow.backing3 = 0;
    theWindow.backing4 = 0;

    theWindow.player5 = "";
    theWindow.player2 = "";
    theWindow.player3 = "";
    theWindow.player4 = "";



    if (nwtoggle == 0) {
        var p1 = "Player 1";
         pbacking[0] = 17;
         pos0backing = 17;
        pos0emblem = 0;
        pemblem[0] = 0;

    //pname[0] = "No Player";
   // pname[1] = "No Player";
    //pname[2] ="No Player";
    //pname[3] ="No Player";

    pbacking[1] = 22;
    pbacking[2] = 18;
    pbacking[3] = 19;

        pemblem[1] = 0;
        pemblem[2] = 0;
        pemblem[3] = 0;

        switch(numofplayers) {
        case 2:pname[0] = "Player 1";pname[1] ="Player 2";break;
        case 3:pname[0] = "Player 1";pname[1] ="Player 2";pname[2] ="Player 3";break;
        case 4:pname[0] = "Player 1";pname[1] ="Player 2";pname[2] ="Player 3";pname[3] ="Player 4";break;
        }

        pos0name = pname[0];
    startNewGame();

   } else {




        if(gameid == 0) {
            check_network();
          network_match();
        } else {
            network_update();
            //console.log("waiting for",waitingfor,"more players");
            if(pname[numofplayers-1].length <= 1) {
            get_players();
            var count = 0;
            while(playerids[count] !="na") {
            set_player(playerids[count],count);
                //console.log("Player ", count, " should be",pname[count]);


                count = count + 1;
            }
            }

            switch (numofplayers) {
            case 2: player2 = pname[0];backing2 = pbacking[0];emblem2 = pemblem[0];player3 = pname[1];backing3 = pbacking[1];emblem3 = pemblem[1];break;


            case 3: player2 = pname[0];backing2 = pbacking[0];emblem2 = pemblem[0];player3 = pname[1];backing3 = pbacking[1];emblem3 = pemblem[1];
                    player4 = pname[2];backing4 = pbacking[2];emblem4 = pemblem[2];break;

            case 4: player2 = pname[0];backing2 = pbacking[0];emblem2 = pemblem[0];player3 = pname[1];backing3 = pbacking[1];
                    emblem3 = pemblem[1];player4 = pname[2];backing4 = pbacking[2];emblem4 = pemblem[2];
                    player5 = pname[3];backing5 = pbacking[3];emblem5 = pemblem[3];break;
        }



        }

        //if(pname[0] != null ) {
       // pos0name = pname[0];
        //} else {pos0name = "loading";}

        console.log(gameid);
        if(gactive == 1) {
            //console.log("Game in active state");
            //console.log(pname[0])
                if(pname[numofplayers-1].length > 1) {
                    pos0name = pname[0];
                    pos0backing=pbacking[0];
                    pos0emblem=pemblem[0];
                //console.log(numofplayers);
                    if(countdown == 0) {
                    startNewGame(); } else { countdown = countdown -1;
                                             notify_me.tmessege= "Please Wait. ("+countdown+")"; }
                }
            }
           // }


 }


}

function player_switch(player_num) {
    if (sameUser != player_num) {
    //console.log("switched to player ",pname[player_num]);
        sameUser = player_num;
    if(numofplayers == 4) {

    switch(player_num) {
        //case 0: console.log("player1's turn");break;
        case 1: pscore[0]=pscore[0] + score; pcombo[0] = pcombo[0] + combo; break;
        case 2: pscore[1]=pscore[1] + score; pcombo[1] = pcombo[1] + combo;break;
        case 3: pscore[2]=pscore[2] + score; pcombo[2] = pcombo[2] + combo;break;
        default: player =0;pscore[3]=pscore[3] + score; pcombo[3] = pcombo[3] + combo;break;

    }

   switch(player_num) {
        case 1: pos0name = pname[1];pos0score = pscore[1];pos0backing = pbacking[1];pos0emblem = pemblem[1];pos0combo = pcombo[1];

                break;
        case 2: pos0name = pname[2];pos0score = pscore[2];pos0backing = pbacking[2];pos0emblem = pemblem[2];pos0combo = pcombo[2];

                break;
        case 3: pos0name = pname[3];pos0score = pscore[3];pos0backing = pbacking[3];pos0emblem = pemblem[3];pos0combo = pcombo[3];

                break;

        default:pos0name = pname[0];pos0score = pscore[0];pos0backing = pbacking[0];pos0emblem = pemblem[0];pos0combo = pcombo[0];

                break;
    }

    }

    if(numofplayers == 3) {

    switch(player_num) {
        case 1: pscore[0]=pscore[0] + score; pcombo[0] = pcombo[0] + combo;break;
        case 2: pscore[1]=pscore[1] + score; pcombo[1] = pcombo[1] + combo;break;
        default: player =0;pscore[2]=pscore[2] + score; pcombo[2] = pcombo[2] + combo;break;

    }

    switch(player_num) {
        case 1: pos0name = pname[1];pos0score = pscore[1];pos0backing = pbacking[1];pos0emblem = pemblem[1];pos0combo = pcombo[1];


                break;
        case 2: pos0name = pname[2];pos0score = pscore[2];pos0backing = pbacking[2];pos0emblem = pemblem[2];pos0combo = pcombo[2];


                break;

        default:pos0name = pname[0];pos0score = pscore[0];pos0backing = pbacking[0];pos0emblem = pemblem[0];pos0combo = pcombo[0];


                break;
    }

    }

    if(numofplayers == 2) {

    switch(player_num) {
        case 1: pscore[0]=pscore[0] + score; pcombo[0] = pcombo[0] + combo; break;
        default: player =0;pscore[1]=pscore[1] + score; pcombo[1] = pcombo[1] + combo; break;

    }

    switch(player_num) {
        case 1: pos0name = pname[1];pos0score = pscore[1];pos0backing = pbacking[1];pos0emblem = pemblem[1];pos0combo = pcombo[1];
                //pos1name = pname[0];pos1score = pscore[0];pos1emblem = 0;

                break;

        default:pos0name = pname[0];pos0score = pscore[0];pos0backing = pbacking[0];pos0emblem = pemblem[0];pos0combo = pcombo[0];
                //pos1name = pname[1];pos1score = pscore[1];pos1emblem = 1;

                break;
    }

        //pos2name = "No Player";
        //pos3name = "No Player ";

    }

    var highscore = 0;
    if(highscore < pscore[0]) {
        highscore = pscore[0];
    }
    if(highscore < pscore[1]) {
        highscore = pscore[1];
    }
    if(highscore < pscore[2]) {
        highscore = pscore[2];
    }
    if(highscore < pscore[3]) {
        highscore = pscore[3];
    }

    if(highscore == pscore[0]) {
        spin_type = pbacking[0];
    } else if(highscore == pscore[1]) {
        spin_type = pbacking[1];
    } else if(highscore == pscore[2]) {
        spin_type = pbacking[2];
    } else if(highscore == pscore[3]) {
        spin_type = pbacking[3];
    }

    score = 0;

    } else {
        console.log("waiting for ",pname[player_num]);
    }

    //player_notification.state = "show";

}

function createCanvas() {

    gamemode = 5;
    wipeAll();
    network_wait.stop();
    element_type = 99;
    in_game.stop();
    gamestarted = 1;

    //Calculate board size
         maxColumn = 22;
       maxRow = 20;
      maxIndex = maxRow * maxColumn;

        //tiles = new Array(maxIndex);

       //Initialize Board

       for (var column = 0; column < maxColumn; column++) {
           for (var row = 0; row < maxRow; row++) {

               createTile(column, row, ctilenum);
                ctilenum= ctilenum +1;
           }
       }

   }

function createTile(column, row, num) {

    if (component == null)
        component = Qt.createComponent("./components/tile.qml");

    // Note that if tile.qml was not a local file, component.status would be
    // Loading and we should wait for the component's statusChanged() signal to
    // know when the file is downloaded and ready before calling createObject().

    if (component.status == Component.Ready) {
        var dynamicObject = component.createObject(artcanvas);
        if (dynamicObject == null) {
            console.log("error creating block");
            console.log(component.errorString());
            return false;
        }
        var blockSizex = gameboard.width /20.7;
        var blockSizey = gameboard.height /22.7;

       if (row % 2 == 0) {
                dynamicObject.x = (column * blockSizex + blockSizex / 2) ;
            } else {

           dynamicObject.x =(column * blockSizex) ;
       }
        dynamicObject.y =(row * blockSizey);

        dynamicObject.width = blockSizex * 1.1;
        dynamicObject.height = blockSizey *1.4;

        dynamicObject.num = num;
        dynamicObject.row = row;
        dynamicObject.column = column;
        dynamicObject.type = 98;
       ctiles[num] = dynamicObject;


    } else {
        console.log("error loading block component");
        console.log(component.errorString());
        return false;
    }

    return true;
}

function changePaint(type) {
paint = type;
element_type = type;

}



function endgame() {
    in_game.stop();
    var highscore = 0;
    if(highscore < pscore[0]) {
        highscore = pscore[0];
    }
    if(highscore < pscore[1]) {
        highscore = pscore[1];
    }
    if(highscore < pscore[2]) {
        highscore = pscore[2];
    }
    if(highscore < pscore[3]) {
        highscore = pscore[3];
    }

    if(highscore == pscore[0]) {
        var s = pname[0];
        s = s.concat(" Wins!");
        wemblem = pemblem[0];
        wbacking = pbacking[0];

        notify_me.tmessege = s
        notify_me.state = "winner";

        if( nwtoggle == 1 | userid == pid[0]) {player_update(0,"w"); //} else {
        player_update(2,"l");
        player_update(1,"l");
        player_update(3,"l");
    }
       // console.log(s);

    }
    if(highscore == pscore[1]) {
        var s = pname[1];
        s = s.concat(" Wins!");
        wemblem = pemblem[1];
        wbacking = pbacking[1];

        notify_me.tmessege = s
        notify_me.state = "winner";


        if( nwtoggle == 1 | userid == pid[0]) {player_update(1,"w"); //} else {
        player_update(2,"l");
        player_update(3,"l");
        player_update(0,"l");
    }
       // console.log("Player 2 WINS!");
    }
    if(highscore == pscore[2]) {
        var s = pname[2];
        s = s.concat(" Wins!");
        wemblem = pemblem[2];
        wbacking = pbacking[2];

        notify_me.tmessege = s
        notify_me.state = "winner";

        if( nwtoggle == 1 | userid == pid[0]) {player_update(2,"w"); //} else {
        player_update(3,"l");
        player_update(1,"l");
        player_update(0,"l");
    }

       // console.log("Player 3 WINS!");
    }
    if(highscore == pscore[3]) {
        var s = pname[3];
        s = s.concat(" Wins!");
        wemblem = pemblem[3];
        wbacking = pbacking[3];

        notify_me.tmessege = s
        notify_me.state = "winner";

       if( nwtoggle == 1 | userid == pid[0]) { player_update(3,"w"); //} else {
           player_update(2,"l");
           player_update(1,"l");
           player_update(0,"l");
       }

       // console.log("Player 4 WINS!");
    }
    //console.log(gameover)
   wipeAll();

}

function wipeAll() {
    console.log("cleaning");

    //if(gamestarted == 1) notify_me.state = "inactive";



    if (gamemode != 5) {

    pnote.state = "inactive";

    for (var i = 0; i < 22*20; i++) {
        if (tiles[i] != null) {
            //tiles[i] = null;
            tiles[i].destroy();
            //console.log("Tile",i," Destroyed");
    }
        if (vol_array[i] !=null) {
            vol_array[i] = null;
    }
    }
    //in_game.stop();

     pscore[0] = 0;
     pcombo[0] = 0;
     pwins[0] = 0;
    plosses[0] = 0;
    pdraws[0] =0;

     pscore[1] = 0;
     pcombo[1] = 0;
    pwins[1] = 0;
   plosses[1] = 0;
   pdraws[1] =0;


     pscore[2] = 0;
     pcombo[2] = 0;
    pwins[2] = 0;
   plosses[2] = 0;
   pdraws[2] =0;


     pscore[3] = 0;
     pcombo[3] = 0;
    pwins[3] = 0;
   plosses[3] = 0;
   pdraws[3] =0;



   //if (nwtoggle == 0) {
     pid[0] = "";
     pname[0] = "";
     pbacking[0] = 1;
     pemblem[0] = 0;
     playerids[0] = "na";


     pid[1] = "";
     pname[1] = "";
     pbacking[1] = 1;
     pemblem[1] = 0;
     playerids[1] = "na";

     pid[2] = "";
     pname[2] = "";
     pbacking[2] = 1;
     pemblem[2] = 0;
     playerids[2] = "na";

     pid[3] = "";
     pname[3] = "";
     pbacking[3] = 1;
     pemblem[3] = 0;
     playerids[3] = "na";

//}

    userid = "";
    gactive = 0;
    gindex = 0;
    yourturn = 0;
   sameUser = 0;
    gamerequested = 0;
    gamestarted = 0;
    waitingfor = 0;

     player = 0;
     score = 0;
     gameover = 0;
     tilenum = 0;
     xoffset = 0;
     yoffset = 0;
    gameid = 0;

     theWindow.countdown = 5*60;
     theWindow.minutes = 5;

    //theWindow.numofplayers =0;
    theWindow.pos0score= 0;
    theWindow.pos0emblem= 1;
    theWindow.pos0backing=1;
    theWindow.pos0combo=0;
    theWindow.pos0name ="";

    //theWindow.wins= 0;
   // theWindow.loss= 0;
    //theWindow.draw= 0;
   // theWindow.moves= 0;


    theWindow.spin_type= 1;
    theWindow.element_type= 0;
    theWindow.gamemode= 0;
    theWindow.combo_true= 0;
    theWindow.element_type = 0;


    for (var i=0;i<100;i++) {

        vol_array[i] = new Array(3);
    }

    //theWindow.state = "mainmenu";


    } else {
        for (var i = 0; i < 22*20; i++) {
            if (ctiles[i] != null) {
                //tiles[i] = null;
                ctiles[i].destroy();
                //console.log("Tile",i," Destroyed");
        }
    }
        ctilenum = 0;
       //xoffset = 0;
       //yoffset = 0;
        paint = 99;

    }

    console.log("clean");
}


//Network functions //

function check_network() {

    //gets user Id //
    var UserId = "";
    var Username = "";
    var Useremail = "";
    var getUserId = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
    var dataStr = "SELECT * FROM Users WHERE 1";

        getUserId.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Users(id TEXT, name TEXT, email TEXT)');
            var pull = tx.executeSql(dataStr);
            if(pull.rows.length > 0) {
            userid = pull.rows.item(0).id;
            Username = pull.rows.item(0).name;
            Useremail = pull.rows.item(0).email;
            lname = Username;
            } else {
                cafesync(1);
            }

        });
        userName = Username;
        userEmail = Useremail;
        //pos0backing =
        //pos0emblem =
    // Got it //

    //Queries Online DB //
    var query = ""
    var http = new XMLHttpRequest();
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/retrieve_user.php/?userid=" + userid;
        //console.log(url)
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                query = query.split("%;%");
                lwins = query[4];
                llosses = query[5];
                ldraws = query[6];
                lemblem = query[3];
                lbacking = query[2];
                if(lbacking != null) {
                tile = lbacking;
                emblem = lemblem;
                }
            }
        }
        http.open('GET', url, true);
        http.send(null);

    // Queried //


}

function network_match() {
    if(gamerequested == 0) {
    // Requesting a game //
    var http = new XMLHttpRequest();
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/game.php/?id=request&players=" + numofplayers + "&userid="+ userid + "&game=1";
        //console.log(url)
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                query = query.split("%;%");
                gameid = query[0];
                gactive = query[1];
                //console.log(gameid);
                notify_me.state= "winner";
                notify_me.tmessege = "Please Wait";
                wemblem = 99;
                wbacking = 1;

            }
        }
        http.open('GET', url, true);
        http.send(null);

        gamerequested = 1;
}


}

function network_update() {


   //if(userid != pid[yourturn]) {
    // checking game //
    var http = new XMLHttpRequest();
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/game.php/?id=" +gameid+"&check=check";

        //console.log(url)
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                query = query.split("%;%");
                //gameid = query[0];

                //console.log(query[1]);
                if(query[0] !="NR") {
                gactive = 1;
                    waitingfor= 0;
                //console.log(query);
                    if (query[2] != 101) {
                        console.log(query[2]);
                        if(tiles[query[2]].type != null) {
                        if(tiles[query[2]].type != 99) {
                            is_volatile(101);
                            if(tiles[query[2]].type == 98) {
                    /*tiles[query[2]].type = pbacking[query[1] - 1 ];
                    tiles[query[2]].player = query[1] -1 ;
                    tiles[query[2]].etype = pemblem[query[1] - 1 ]; */
                    tiles[query[2]].type = pbacking[player];
                    tiles[query[2]].player = player;
                    tiles[query[2]].etype = pemblem[player];

                    //sound.play();
                    //sound.volume = 0.1;
                    linecheck(query[2]);
                    yourturn = query[1] -1;
                    player = yourturn;
                    player_switch(player);

                        }
                    }
                  }
                }
                    //player_switch(query[1]);
                } else {
                    waitingfor = query[1];
                    notify_me.state= "winner";
                    notify_me.tmessege = "Please Wait";
                    wemblem = 99;
                    wbacking = 1;
              // console.log(query);


            }
        }
        }
        http.open('GET', url, true);
        http.send(null);

//}

}

function get_players() {

    // Requesting members //
    var http = new XMLHttpRequest();
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/game.php/?id=" +gameid+"&players=list";

        //console.log(url)
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                query = query.split("%;%");
                //console.log(query);
                playerids = query;

            }
        }
        http.open('GET', url, true);
        http.send(null);

}

function set_player(id,pnum) {

    //Queries Online DB //
    var query = ""
    var http = new XMLHttpRequest();
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/retrieve_user.php/?userid=" + id;
        //console.log(url)
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                query = query.split("%;%");
                pwins[pnum] = query[4];
                plosses[pnum] = query[5];
                pdraws[pnum] = query[6];
                pemblem[pnum] = query[3];
                pbacking[pnum] = query[2];
                pname[pnum] = query[0];
                pid[pnum] = id;


            }
        }
        http.open('GET', url, true);
        http.send(null);

    // Queried //


    return 1;
}

function player_move(index) {

    // checking game //
    var http = new XMLHttpRequest();

        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/game.php/?id=" +gameid+"&gindex="+index+"&check="+yourturn;

        console.log(url)
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;

                   }
        }
        http.open('GET', url, true);
        http.send(null);


}

function player_update(id,wld) {
    var http = new XMLHttpRequest();
    var wins = Number(pwins[id]);
    var losses = Number(plosses[id]);
    var draws = Number(pdraws[id]);

    if(nwtoggle == 1) {
    switch (wld) {
    case "w": wins = wins + 1; var url = "http://www.vagueentertainment.com/cafesync/vola-tile/add_user.php/?userid=" +pid[id]+"&wins="+ wins + "&activated=1&emblem=" + pemblem[id] + "&tile="
              + pbacking[0] + "&losses=" + losses + "&draws=" + draws;break;
    case "l": losses = losses + 1; var url = "http://www.vagueentertainment.com/cafesync/vola-tile/add_user.php/?userid=" +pid[id]+"&wins="+ wins + "&activated=1&emblem=" + pemblem[id] + "&tile="
                                   + pbacking[0] + "&losses=" + losses + "&draws=" + draws;break;
    case "d": draws = draws + 1; var url = "http://www.vagueentertainment.com/cafesync/vola-tile/add_user.php/?userid=" +pid[id]+"&wins="+ wins + "&activated=1&emblem=" + pemblem[id] + "&tile="
                                 + pbacking[0] + "&losses=" + losses + "&draws=" + draws;break;
        }
    console.log(pid[id],"updated");
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;

                   }
        }
        http.open('GET', url, true);
        http.send(null);
}

}
