import QtQuick 2.0
import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.0
import QtQuick.LocalStorage 2.0 as Sql
import "components"
import "tile-game.js" as TileGame

/*!
    \Game View
*/

MainView {
    // objectName for functional testing purposes (autopilot-qt5)
    objectName: "Vola-Tile"
    id:mainwindow

    // Note! posplicationName needs to match the "name" field of the click manifest
    applicationName: "com.ubuntu.ve.bflanagin.vola-tile"

    /*
     This property enables the posplication to change orientation
     when the device is rotated. The default is false.
    */
    //automaticOrientation: true

    width: units.gu(150)
   height: units.gu(125)

    property string pos0name: "Position1"

    property int pos0score: 0

    property int pos0emblem: 0
    property int pos0backing: 0

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

   property int countdown:2*60
   property int minutes: 2


   FontLoader {
           id: minspsw
           source: "./components/minotaur.ttf"
       }

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

    },
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

        }

   ]

    Page {
            title: i18n.tr("Vola-Tile")
            id:gamescreen
            opacity: 0.0
            clip: true
            enabled:false



            Image {
                id:element
                width:parent.width
                height:parent.height
                x:0
                y:0
                source: {   if (element_type == 1) return "./img/earth.png"
                            else if (element_type == 2) return "./img/water.png"
                            else if (element_type == 3) return "./img/fire.png"
                            else if (element_type == 4) return "./img/air.png"
                            else  return "./img/gray.png"
                }
                opacity:60
            }

            Image {
                id:spinner
                width:parent.width * 1.2
                height:parent.height * 1.2
                x:parent.width * -0.60
                y:parent.height * -0.10
                source: {  if (spin_type == 1) return "./img/Tiles/earthtile.png"
                            else if (spin_type == 3) return "./img/Tiles/watertile.png"
                            else if (spin_type == 2) return "./img/Tiles/firetile.png"
                            else if (spin_type == 4) return "./img/Tiles/airtile.png"
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



Page {
    title: i18n.tr("Title Screen")
    id:titlescreen
    opacity: 1.0
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
            onClicked: mainwindow.state = "game", numofplayers =2,TileGame.player_setup()

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
            onClicked: mainwindow.state = "game", numofplayers =3,TileGame.player_setup()

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
            onClicked: mainwindow.state = "game" , numofplayers =4,TileGame.player_setup()

             }
        }

        Image {
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
            onClicked: mainwindow.state = "art",numofplayers=0,TileGame.createCanvas(),gamemode = 5

             }
        }

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


    }
    Audio {
        id:backing
        source:"./sfx/Inside the Far Away.mp3"
        autoPlay: true
        volume:0.05

    }
}

Page {
    title: i18n.tr("Art Mode")
        id:artscreen
        opacity: 0.0
        clip: true
        enabled:false
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

            x: 0
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
                x:parent.width * 0.05
                y:parent.height * 0.10
                Repeater {
                        model: 12

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
                x:parent.width * 0.025
                y:parent.height * 0.44
                Repeater {
                          model: 12

                            Image {
                                property string paintcolor: "./img/Tiles/%1.png"

                                fillMode: Image.PreserveAspectFit
                                width:controls.width * 0.05
                                //height:controls.height * 0.20
                                source:paintcolor.arg(index+13)
                                MouseArea {
                                    anchors.fill:parent
                                    onClicked:TileGame.changePaint(index+13)
                                }
                            }

                }

            }

            Image {
                id: backbutton_art
                source: "./img/backbutton.png"
                fillMode: Image.PreserveAspectFit
                x:parent.width * 0.80
                y:parent.height * 0.03
                width: parent.width * 0.25
                height: parent.height * 0.25

                MouseArea {
                    anchors.fill:parent
                    onClicked: mainwindow.state = "mainmenu"
                }
            }
        }

}

}
