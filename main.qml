import QtQuick 2.9
//import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.9
import QtQuick.LocalStorage 2.0 as Sql
import QtQuick.Window 2.0
import QtQuick.Controls 1.4

import "components"
import "tile-game.js" as TileGame
import "components/bots/gwendal-bot.js" as Bot1

/*!
    \Game View
*/
ApplicationWindow {
//MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    //objectName: "Vola-Tile"
    id:theWindow
    visible: true

    // Note! posplicationName needs to match the "name" field of the click manifest
    //applicationName: "com.ubuntu.ve.bflanagin.vola-tile"

    /*
     This property enables the posplication to change orientation
     when the device is rotated. The default is false.
    */
    //automaticOrientation: true

    //width: units.gu(150)
   //height: units.gu(125)
    width:1024
    height:768

    property string pos0name: "Position1"
   property string userName: "username"
   property string userEmail: "email"
    property int tile: 0
    property int emblem: 0

    property int pos0score: 0

    property int pos0emblem: 0
    property int pos0backing: 0


    property int wemblem: 0
    property int wbacking: 0

   property int emblem1: 0
   property int backing1: 0
   property string player1: ""

   property int emblem2: 0
   property int backing2: 0
   property string player2: ""

   property int emblem3: 0
   property int backing3: 0
   property string player3: ""

   property int emblem4: 0
   property int backing4: 0
   property string player4: ""

   property int emblem5: 0
   property int backing5: 0
   property string player5: ""


   property int pos0combo: 0

    property int wins: 0
    property int loss: 0
    property int draw: 0
    property int moves: 0

    property int numofplayers: 0
    property int spin_type: 0
    property int element_type: 0
    property int gamemode: 0
    property int combo_true: 0

   property int countdown:5*60
   property int minutes: 5
   property int nwtoggle: 1

   property int gameid: 0
   property string test: ""

   Component.onCompleted: TileGame.check_network()


   FontLoader {
           id: minspsw
           source: "./components/minotaur.ttf"
       }

   Item {
        id:mainwindow
        anchors.fill: parent
    states: [

    State {
        name: "mainMenu"

        PropertyChanges {
        target:titlescreen
        opacity: 1.0
        z:1
        restoreEntryValues:true
        }
        PropertyChanges {
        target:gamescreen
        opacity: 0.0
        z:0
        enabled:false
        restoreEntryValues:true
        }
        PropertyChanges {
        target:artscreen
        opacity: 0.0
        z:0
        enabled:false
        restoreEntryValues:true
        }

    },
    State {
        name: "game"
        PropertyChanges {
        target:gamescreen
        opacity: 1.0
        z:1
        enabled:true
        restoreEntryValues:true
        }
        PropertyChanges {
        target:titlescreen
        opacity: 0.0
        z:0
        enabled:false
        restoreEntryValues:true
        }

    }/*,
        State {
            name: "art"
            PropertyChanges {
            target:artscreen
            opacity: 1.0
            z:1
            restoreEntryValues:true
            enabled:true
            }
            PropertyChanges {
            target:titlescreen
            opacity: 0.0
            z:0
            restoreEntryValues:true
            enabled:false
            }

        } */

   ]

    Item {
            //title: i18n.tr("Vola-Tile")
            id:gamescreen
            opacity: 0.0
            clip: true
            enabled:false
            anchors.fill:parent

            Image {
                width:parent.width
                height:parent.height
                source: "./img/background.png"
                x:0
                y:0
            }



            Image {
                id:spinner
                width:parent.width * 1.2
                height:parent.height * 1.2
                x:parent.width * -0.60
                y:parent.height * -0.10
                source: {  if (spin_type == 1) return "./img/Tiles/1.png"
                            else if (spin_type == 2) return "./img/Tiles/2.png"
                            else if (spin_type == 3) return "./img/Tiles/3.png"
                            else if (spin_type == 4) return "./img/Tiles/4.png"
                            else if (spin_type == 5) return "./img/Tiles/5.png"
                            else if (spin_type == 6) return "./img/Tiles/6.png"
                            else if (spin_type == 7) return "./img/Tiles/7.png"
                            else if (spin_type == 8) return "./img/Tiles/8.png"
                            else if (spin_type == 9) return "./img/Tiles/9.png"
                            else if (spin_type == 10) return "./img/Tiles/10.png"
                            else if (spin_type == 11) return "./img/Tiles/11.png"
                            else if (spin_type == 12) return "./img/Tiles/12.png"
                            else if (spin_type == 13) return "./img/Tiles/13.png"
                            else if (spin_type == 14) return "./img/Tiles/14.png"
                            else if (spin_type == 15) return "./img/Tiles/15.png"
                            else if (spin_type == 16) return "./img/Tiles/16.png"
                            else if (spin_type == 17) return "./img/Tiles/17.png"
                            else if (spin_type == 18) return "./img/Tiles/18.png"
                            else if (spin_type == 19) return "./img/Tiles/19.png"
                            else if (spin_type == 20) return "./img/Tiles/20.png"
                            else if (spin_type == 21) return "./img/Tiles/21.png"
                            else if (spin_type == 22) return "./img/Tiles/22.png"
                            else if (spin_type == 23) return "./img/Tiles/23.png"
                            else if (spin_type == 24) return "./img/Tiles/24.png"









                            else return "./img/Tiles/locktile.png"

                }
                fillMode:Image.PreserveAspectFit
                opacity: 0.6
                RotationAnimation on rotation {
                        loops: Animation.Infinite
                       from: 0
                        to: 360
                        duration: 100000
                    }


            }
            Timer {
                    id:timer
                     interval: 1000; running:false; repeat: true

                     onTriggered: { if(countdown > 0)
                         {countdown = countdown -1

                          var second  = countdown % 60
                             if (second == 59) {
                                 if (minutes != 0) {
                                 minutes = minutes -1 } else { minutes = 0}
                             }

                          var down =""
                             down = down.concat(minutes.toFixed(0))
                             down = down.concat(":")
                             if (second.toFixed(0) > 9) {
                             down = down.concat(second.toFixed(0))
                             } else {
                                 down = down.concat(0,second.toFixed(0))
                             }
                          time.text = down
                         } else {
                           timer.stop();TileGame.endgame()} }
                 }

                 Text { id: time
                        x:parent.width * 0.90
                        y:parent.height * 0.02
                        width:parent.width * 0.90
                        height:parent.height * 0.06
                        font.family:minspsw.name
                        color:"white"
                        font.pixelSize:parent.height * 0.06
                        }

            Item {

                id: gameboard

                x: parent.width * 0.05
                y: parent.height * 0.09
                width: parent.width * 0.90
                height: parent.height * 0.90

                clip: true

               Audio {
                        id: sound
                        source: "./sfx/placement.ogg"
                        autoLoad: true

                    }

               MouseArea {
                                anchors.fill: parent
                                onClicked: TileGame.handleClick(mouse.x, mouse.y)

                          }

            }


        }



Item {
    //title: i18n.tr("Title Screen")
    id:titlescreen
    opacity: 1.0
    anchors.fill:parent


    Item {
        id:root
        width:parent.width
        height:parent.height
        clip: true

        Image {
            id:background
            width:parent.width
            height:parent.height
            source:"./img/background.png"
            MouseArea {
                anchors.fill:parent
            }
        }
        Image {
            id:std2back
            x: parent.width *0.5
            y: parent.height * 0.02
            width:parent.width /3
            height:parent.height /6
            //fillMode:Image.PreserveAspectFit
            source:"./img/menubacking.png"
            clip: true


        Text {
            id:std2players
            text:"2 Players"
            x:parent.width * 0.1
            y:parent.height * 0.3
            width:parent.width
            height:parent.height
            font.pixelSize: parent.height * 0.50
            fontSizeMode:Text.Fit
            font.family:minspsw.name


        }
        MouseArea {
            anchors.fill:parent
            onClicked: mainwindow.state = "game", numofplayers =2,network_wait.start()

             }
        }

        Image {
            id:std3back
            x: parent.width *0.60
            y: parent.height * 0.04 + parent.height /6
            width:parent.width /3
            height:parent.height /6
            //fillMode:Image.PreserveAspectFit
            source:"./img/menubacking.png"
            clip: true


        Text {
            id:std3players
            text:"3 Players"
            x:parent.width * 0.1
            y:parent.height * 0.3
            width:parent.width
            height:parent.height
            font.pixelSize: parent.height * 0.50
            fontSizeMode:Text.Fit
            font.family:minspsw.name

        }
        MouseArea {
            anchors.fill:parent
            onClicked: mainwindow.state = "game", numofplayers =3,network_wait.start()

             }
        }

        Image {
            id: std4back
            x: parent.width *0.55
            y: parent.height * 0.06 + (parent.height /6) * 2
            width:parent.width /3
            height:parent.height /6
            //fillMode:Image.PreserveAspectFit
            source:"./img/menubacking.png"
            clip: true


        Text {
            id:std4players
            text:"4 Players"
            x:parent.width * 0.1
            y:parent.height * 0.3
            width:parent.width
            height:parent.height
            font.pixelSize: parent.height * 0.50
            fontSizeMode:Text.Fit
            font.family:minspsw.name
            clip: true

        }
        MouseArea {
            anchors.fill:parent
            onClicked: mainwindow.state = "game" , numofplayers =4,network_wait.start()

             }
        }

       /* Image {
            id: artback
            x: parent.width *0.50
            y: parent.height * 0.08 + (parent.height /6) * 3
            width:parent.width /3
            height:parent.height /6
            //fillMode:Image.PreserveAspectFit
            source:"./img/menubacking.png"
            clip: true


        Text {
            id:artmode
            text:"Art Mode"
            x:parent.width * 0.1
            y:parent.height * 0.3
            width:parent.width
            height:parent.height
            font.pixelSize: parent.height * 0.50
            fontSizeMode:Text.Fit
            font.family:minspsw.name

        }
        MouseArea {
            anchors.fill:parent
            onClicked: mainwindow.state = "art",numofplayers=0,TileGame.createCanvas(),gamemode = 5,nwtoggle=0

             }
        } */

        Image {
            id:spinner1
            width:parent.width * 1.2
            height:parent.height * 1.2
            x:parent.width * -0.60
            y:parent.height * -0.10
            source:"./img/Tiles/paletile.png"
            fillMode:Image.PreserveAspectFit
            opacity: 0.4
            smooth: true
            RotationAnimation on rotation {
                    loops: Animation.Infinite
                   from: 0
                    to: 360
                    duration: 100000
                }

        }

        Image {
            id:networkToggle
            width:parent.width * 0.08
            height:parent.height * 0.08
            x:parent.width * 0.867
            y:parent.height * 0.92
            source: { if(nwtoggle == 1) {return "./img/nw-on.png"}
                else { return "./img/nw-off.png"}
            }
            fillMode:Image.PreserveAspectFit
            opacity: 1.0

            MouseArea {
                anchors.fill:parent
                onClicked: if(nwtoggle == 1) {nwtoggle = 0} else {nwtoggle = 1}

                 }


        }
        Image {
            id:settings
            width:parent.width * 0.08
            height:parent.height * 0.08
            x:parent.width * 0.92
            y:parent.height * 0.92
            source:"./img/settings.png"
            fillMode:Image.PreserveAspectFit
            opacity: 1.0

            MouseArea {
                anchors.fill:parent
                onClicked: TileGame.cafesync(1)

                 }


        }

        Image {
            id:love
            width:parent.width * 0.08
            height:parent.height * 0.08
            x:parent.width * 0.893
            y:parent.height * 0.8594
            source:"./img/showlove.png"
            fillMode:Image.PreserveAspectFit
            opacity: 1.0

            MouseArea {
                anchors.fill:parent
                onClicked: Qt.openUrlExternally ( "http://www.vagueentertainment.com/vola-tile-thankyou" )

                 }

        }


    }
    Audio {
        id:backing
        source:"./sfx/bgm.mp3"
        autoPlay: true
        volume:0.05

    }

    Timer {
            id:network_wait
             interval: 2000; running:false; repeat: true

             onTriggered: {TileGame.player_setup()}

    }
    Timer {
            id:in_game
             interval: 1000; running:false; repeat: true

             onTriggered: {TileGame.network_update()}

    }



}

Item {
    //title: i18n.tr("Art Mode")
        id:artscreen
        opacity: 0.0
        clip: true
        enabled:false
        anchors.fill:parent
        Image {
            id:artbg
            width:parent.width
            height:parent.height
            x:0
            y:0
            source: "./img/gray.png"

        }
        Item {

            id: artcanvas

            x: parent.width * 0.008
            y: 0
            width: parent.width
            height: parent.height * 0.90
            clip: true

            MouseArea {
                id:mousearea
                anchors.fill:parent
                onPositionChanged: TileGame.handleClick(mouse.x, mouse.y),gamemode = 5
                enabled:true
            }
        }

        Item {
            id:controls

            x:0
            y:parent.height * 0.82
            width:parent.width
            height:parent.height * 0.18
            clip: true

            Image {
                id: controlbacking
                anchors.fill:parent
                source: "./img/ingameb.png"
        }

            Row {
                x:parent.width * 0.1
                y:parent.height * 0.10
                Repeater {
                        model: 16
                        Image {

                            property string paintcolor: "./img/Tiles/%1.png"

                            fillMode: Image.PreserveAspectFit
                            width:controls.width * 0.05
                            //height:controls.height * 0.20
                            source:paintcolor.arg(index+1)
                            MouseArea {
                                anchors.fill:parent
                                onClicked:TileGame.changePaint(index+1)
                            }
                        }

                 }
              }
             Row {
                x:parent.width * 0.125
                y:parent.height * 0.44
                Repeater {
                          model: 16

                            Image {
                                property string paintcolor: "./img/Tiles/%1.png"

                                fillMode: Image.PreserveAspectFit
                                width:controls.width * 0.05
                                //height:controls.height * 0.20
                                source:paintcolor.arg(index+17)
                                MouseArea {
                                    anchors.fill:parent
                                    onClicked:TileGame.changePaint(index+17)
                                }
                            }

                }

            }

             Image {
                 id:current_color
                 x:parent.width * 0.01
                 y:parent.height * 0.16
                 fillMode: Image.PreserveAspectFit
                 width:parent.width * 0.08
                 source:  {
                     if (element_type == 1) return "./img/Tiles/1.png";
                       else if (element_type == 2) return "./img/Tiles/2.png";
                       else if (element_type == 3) return "./img/Tiles/3.png";
                       else if (element_type == 4) return "./img/Tiles/4.png";
                       else if (element_type == 5) return "./img/Tiles/5.png";
                       else if (element_type == 6) return "./img/Tiles/6.png";
                       else if (element_type == 7) return "./img/Tiles/7.png";
                       else if (element_type == 8) return "./img/Tiles/8.png";
                       else if (element_type == 9) return "./img/Tiles/9.png";
                       else if (element_type == 10) return "./img/Tiles/10.png";
                       else if (element_type == 11) return "./img/Tiles/11.png";
                       else if (element_type == 12) return "./img/Tiles/12.png";
                       else if (element_type == 13) return "./img/Tiles/13.png";
                       else if (element_type == 14) return "./img/Tiles/14.png";
                       else if (element_type == 15) return "./img/Tiles/15.png";
                       else if (element_type == 16) return "./img/Tiles/16.png";
                       else if (element_type == 17) return "./img/Tiles/17.png";
                       else if (element_type == 18) return "./img/Tiles/18.png";
                       else if (element_type == 19) return "./img/Tiles/19.png";
                       else if (element_type == 20) return "./img/Tiles/20.png";
                       else if (element_type == 21) return "./img/Tiles/21.png";
                       else if (element_type == 22) return "./img/Tiles/22.png";
                       else if (element_type == 23) return "./img/Tiles/23.png";
                        else if (element_type == 24) return "./img/Tiles/24.png";
                        else if (element_type == 25) return "./img/Tiles/25.png";
                        else if (element_type == 26) return "./img/Tiles/26.png";
                         else if (element_type == 27) return "./img/Tiles/27.png";
                         else if (element_type == 28) return "./img/Tiles/28.png";
                        else if (element_type == 29) return "./img/Tiles/29.png";
                         else if (element_type == 30) return "./img/Tiles/30.png";
                         else if (element_type == 31) return "./img/Tiles/31.png";
                        else if (element_type == 32) return "./img/Tiles/32.png";

                       else if (element_type == 98) return "./img/Tiles/defaulttile.png";
                       else if (element_type == 99) return "./img/Tiles/locktile.png";

                       else return "./img/Tiles/greentile.png"

                 }

             }

            Image {
                id: backbutton_art
                source: "./img/backbutton.png"
                fillMode: Image.PreserveAspectFit
                x:parent.width * 0.85
                y:parent.height * 0.25
                width: parent.width * 0.25
                height: parent.height * 0.25

                MouseArea {
                    anchors.fill:parent
                    onClicked: mainwindow.state = "mainMenu"
                }
            }
        }

}
   }

}
