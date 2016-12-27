//var blockSize = 60;
var maxColumn = 22;
var maxRow = 20;
var xoffset = 0;
var yoffset = 0;

var maxIndex = maxColumn * maxRow;
var tiles = new Array(maxIndex);

var component;
var tilenum = 0;
var combo = 0;
var playernotification;
var pnote;
var notify;
var notify_me;

var player_dialog;
var playerdialog;
//var countdown = 0;

//vol_array 1= timer 2= state 3= cooldown
var vol_array = new Array(100);
for (var i=0;i<100;i++) {

    vol_array[i] = new Array(3);
}

//network vars

//var gameid = 0;
var pid = new Array(4);
var userid = "";
var gactive = 0;
var gindex = 0;
var yourturn = 0;

// end network vars

//player cycling

var pname = new Array(4);

var pscore = new Array(4);

var pbacking = new Array(4);

var pemblem = new Array(4);

var pcombo = new Array(4);

var pwins = new Array(4);
var plosses = new Array(4);
var pdraws = new Array(4);

var player = 0;
var score = 0;
var gameover = 0;
var waitingfor =4;
var playerids;
var gamestarted = 0;


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
        notify_me.state = "active"
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
             playerdialog.width = titlescreen.width ;
             playerdialog.height = titlescreen.height;
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
    notification();
    if(nwtoggle != 0) {
    in_game.start();
    } else {

    }
    network_wait.stop();

    pos0backing = pbacking[0];
    pos0emblem = pemblem[0];

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
    if(userid == pid[yourturn]) {
    var row = yPos;
    var column = xPos;
    combo = 0;
    sound.stop();
    sound.volume = 0.2;
    changeTiles(column,row);
} else {
        console.log("Not your turn!! it's ",pname[yourturn],"turn");
    }
}
}


function changeTiles(xPos,yPos) {
    var checking = 0;


    while(checking < maxIndex) {

        if (tiles[checking].x <= xPos && xPos <=(tiles[checking].width + tiles[checking].x))  {
            if(tiles[checking].y <= yPos && yPos <=(tiles[checking].height + tiles[checking].y)) {

            //console.log("changing tile at",tiles[checking].x,tiles[checking].y,"which has an index of",tiles[checking].num)
                break;
            }
          }
        checking = checking + 1;
        }



    if(gamemode !=5) {

        player_move(checking);

        if(tiles[checking].type == 98) {

            if(tiles[checking].type != 99) {
                is_volatile(101);
            switch(player) {
            case 0:  tiles[checking].type = pbacking[0];tiles[checking].player = 0;tiles[checking].etype = pemblem[0];break;
            case 1:  tiles[checking].type = pbacking[1];tiles[checking].player = 1;tiles[checking].etype = pemblem[1];break;
            case 2:  tiles[checking].type = pbacking[2];tiles[checking].player = 2;tiles[checking].etype = pemblem[2];break;
            case 3:  tiles[checking].type = pbacking[3];tiles[checking].player = 3;tiles[checking].etype = pemblem[3];break;
            }

            sound.play();
            sound.volume = 0.1;
            linecheck(checking);
            player = player +1;
            player_switch(player);
         }

        }
      } else {
        //sound.play();
        //sound.volume = 0.1;
        tiles[checking].type = paint;
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

function player_setup() {

    wipeAll();

    if (nwtoggle == 0) {
        var p1 = "Player 1";
         pbacking[0] = 17;
         pos0backing = 17;
        pos0emblem = 0;


    pname[0] = "No Player";
    pname[1] = "No Player";
    pname[2] ="No Player";
    pname[3] ="No Player";

    pbacking[1] = 22;
    pbacking[2] = 18;
    pbacking[3] = 19;





   } else {
       /* var db = Sql.LocalStorage.openDatabaseSync("UserInfo", "1.0", "Local UserInfo", 1);
        db.transaction(function(rtx) {
            rtx.executeSql('CREATE TABLE IF NOT EXISTS Users(id TEXT, name TEXT, email TEXT)');

            var pull = rtx.executeSql('SELECT name FROM Users');
            if(pull.rows.length > 0) {
            p1 = pull.rows.item(0).name;
            }
        }
            ) */


          check_network();
        if(gameid == 0) {
          network_match();
        } else {
            network_update();
            //console.log("waiting for",waitingfor,"more players");
            get_players();
            var count = 0;
            while(playerids[count] !="na") {
            set_player(playerids[count],count);
                count = count + 1;
            }

        }


        //switch(numofplayers) {
       // case 2:pname[0] = p1;pname[1] ="Player 2";break;
       // case 3:pname[0] = p1;pname[1] ="Player 2";pname[2] ="Player 3";break;
       // case 4:pname[0] = p1;pname[1] ="Player 2";pname[2] ="Player 3";pname[3] ="Player 4";break;
       // }
        //if(pname[0] != null ) {
       // pos0name = pname[0];
        //} else {pos0name = "loading";}

        //console.log(gameid);
        if(gactive == 1) {
                if(pname[0] != null) {
                    pos0name = pname[0];
                //console.log("Game Started");
                    startNewGame();
                }
            }
           // }
        }



 if (nwtoggle == 0) {

     switch(numofplayers) {
     case 2:pname[0] = p1;pname[1] ="Player 2";break;
     case 3:pname[0] = p1;pname[1] ="Player 2";pname[2] ="Player 3";break;
     case 4:pname[0] = p1;pname[1] ="Player 2";pname[2] ="Player 3";pname[3] ="Player 4";break;
     }
    pos0name = pname[0];

    startNewGame();
 }


}

function player_switch(player_num) {

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
    //player_notification.state = "show";

}

function createCanvas() {
    wipeAll();
    element_type = 99;
    //Calculate board size
         maxColumn = 22;
       maxRow = 20;
      maxIndex = maxRow * maxColumn;

        //tiles = new Array(maxIndex);

       //Initialize Board

       for (var column = 0; column < maxColumn; column++) {
           for (var row = 0; row < maxRow; row++) {

               createTile(column, row, tilenum);
                tilenum= tilenum +1;
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
       tiles[num] = dynamicObject;


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

function is_volatile(tile) {
        if (tile != 101) {

            if (vol_array[tile][0] == null) {
                    vol_array[tile][0] = 5;
                    vol_array[tile][1] = 0;
                    vol_array[tile][2] = 4;
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
                                        tiles[i].etype = 0;
                                     }

                               } else {

                                    vol_array[i][0] = vol_array[i][0] - 1;

                                 //console.log("tick", vol_array[i][0]);
                                 }
                         }
                }
}
}

function endgame() {

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
        s = s.concat(" WINS!!");
        notify_me.tmessege = s
        notify_me.state = "winner";
       // console.log(s);
    }
    if(highscore == pscore[1]) {
        var s = pname[1];
        s = s.concat(" WINS!!");
        notify_me.tmessege = s
        notify_me.state = "winner";
       // console.log("Player 2 WINS!");
    }
    if(highscore == pscore[2]) {
        var s = pname[2];
        s = s.concat(" WINS!!");
        notify_me.tmessege = s
        notify_me.state = "winner";
       // console.log("Player 3 WINS!");
    }
    if(highscore == pscore[3]) {
        var s = pname[3];
        s = s.concat(" WINS!!");
        notify_me.tmessege = s
        notify_me.state = "winner";
       // console.log("Player 4 WINS!");
    }
   // console.log(gameover)

}

function wipeAll() {

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
//if (nwtoggle == 0) {
     //pname[0] = "";
     pscore[0] = 0;

    // pbacking[0] = 1;
     //pemblem[0] = 0;

     pcombo[0] = 0;

     //pname[1] = "";
     pscore[1] = 0;
     //pbacking[1] = 0;
     //pemblem[1] = 0;
     pcombo[1] = 0;

    // pname[2] = "";
     pscore[2] = 0;
    // pbacking[2] = 0;
    // pemblem[2] = 0;
     pcombo[2] = 0;

    // pname[3] = "";
     pscore[3] = 0;
    // pbacking[3] = 0;
    // pemblem[3] = 0;
     pcombo[3] = 0;
//}


     player = 0;
     score = 0;
     gameover = 0;
     tilenum = 0;
     xoffset = 0;
     yoffset = 0;
     mainwindow.countdown = 4*60;
     mainwindow.minutes = 4;

    //mainwindow.numofplayers =0;
    mainwindow.pos0score= 0;
    mainwindow.pos0emblem= 0;
    mainwindow.pos0combo=0;

    //mainwindow.wins= 0;
   // mainwindow.loss= 0;
    //mainwindow.draw= 0;
   // mainwindow.moves= 0;


    mainwindow.spin_type= 0;
    mainwindow.element_type= 0;
    mainwindow.gamemode= 0;
    mainwindow.combo_true= 0;

    for (var i=0;i<100;i++) {

        vol_array[i] = new Array(3);
    }

    //mainwindow.state = "mainmenu";
}

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
            }

        });
        userName = Username;
        userEmail = Useremail;
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
                pwins[0] = query[4];
                plosses[0] = query[5];
                pdraws[0] = query[6];
                pemblem[0] = query[3];
                pbacking[0] = query[2];
                pos0backing = pbacking[0];
                pos0emblem = pemblem[0];
            }
        }
        http.open('GET', url, true);
        http.send(null);

    // Queried //


}

function network_match() {

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



            }
        }
        http.open('GET', url, true);
        http.send(null);



}

function network_update() {

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
                waitingfor = query[1];
                if(query[0] !="NR") {
                gactive = 1;
                console.log(query);
                tiles[query[2]].type = pbacking[query[1]];tiles[query[2]].player = query[1];tiles[query[2]].etype = pemblem[query[1]];
                    yourturn = query[1];

                } else {
                console.log(query);


            }
        }
        }
        http.open('GET', url, true);
        http.send(null);



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
        var url = "http://www.vagueentertainment.com/cafesync/vola-tile/game.php/?id=" +gameid+"&gindex="+index;

        //console.log(url)
    var query
        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                query = http.responseText;
                   }
        }
        http.open('GET', url, true);
        http.send(null);

}
