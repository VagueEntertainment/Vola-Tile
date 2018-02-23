import QtQuick 2.10
//import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.9
import QtQuick.LocalStorage 2.0 as Sql
import QtQuick.Controls 2.2
import "cafesync.js" as CafeSync

//import "components"



Item {
    id:pd
    //property string user: "User Name"
   // property string emailaddress:"Email Address"
    property int type: 0
    //property int tile: pos0backing
    //property int emblem: pos0emblem
    x:0
    y:0
    width:parent.width
    height:parent.height

    states: [

        State { name: "active"
            PropertyChanges {
            target:psbg
            opacity: 1.0
            z:1
            restoreEntryValues:true
            enabled:true
            }

            },
        State {
            name: "inactive"
            PropertyChanges {
            target:psbg
            opacity: 0.0
            z:0
            restoreEntryValues:true
            enabled:false

            }
        }

    ]

  Image {
      opacity: 0.0
      id: psbg
          anchors.fill: parent
          //fillMode: Image.PreserveAspectFit
          source: "../img/player_setup_bg.png"
          clip: true
          MouseArea { anchors.fill:parent }
          Rectangle {
              z:-1
              anchors.fill:parent
              color: "black"
              opacity: 0.6
              x:0
              y:0
          }

          Image {
              id:backbutton
              fillMode: Image.PreserveAspectFit
              width:parent.width * 0.08
              //height:parent.height *0.08
              x:parent.width * 0.28
              y:parent.height * 0.87
              source: "../img/backbutton.png"
              MouseArea {
                  anchors.fill:parent
                  onClicked: pd.state = "inactive"
              }
          }
          Text {
              id:player_setup
              x:parent.width *0.265
              y:parent.height *0.12

              text:"Player Setup"
              font.pixelSize: parent.width * 0.09
              font.family:minspsw.name
          }
            Image {
                id:color_minus
                x:parent.width * 0.34
                y:parent.height * 0.64
                height:parent.height *.10
                fillMode: Image.PreserveAspectFit
                source:"../img/dleft.png"
                MouseArea {
                    anchors.fill:parent
                    onClicked: if(tile > 0) {tile = tile - 1} else {tile = 24 }
                }
            }
            Image {
                id:emblem_minus
                x:parent.width * 0.40
                y:parent.height * 0.64
                height:parent.height *.10
                fillMode: Image.PreserveAspectFit
                source:"../img/left.png"
                MouseArea {
                    anchors.fill:parent
                    onClicked: if(emblem > 0) {emblem = emblem - 1} else {emblem = 18 }
                }
            }

          Image {
              id:color
              x:parent.width * 0.444
              y:parent.height * 0.60
              height:parent.height *.18
              fillMode: Image.PreserveAspectFit
              clip:true
              source: {
                  if (tile == 1) return "../img/Tiles/1.png";
                    else if (tile == 2) return "../img/Tiles/2.png";
                    else if (tile == 3) return "../img/Tiles/3.png";
                    else if (tile == 4) return "../img/Tiles/4.png";
                    else if (tile == 5) return "../img/Tiles/5.png";
                    else if (tile == 6) return "../img/Tiles/6.png";
                    else if (tile == 7) return "../img/Tiles/7.png";
                    else if (tile == 8) return "../img/Tiles/8.png";
                    else if (tile == 9) return "../img/Tiles/9.png";
                    else if (tile == 10) return "../img/Tiles/10.png";
                    else if (tile == 11) return "../img/Tiles/11.png";
                    else if (tile == 12) return "../img/Tiles/12.png";
                    else if (tile == 13) return "../img/Tiles/13.png";
                    else if (tile == 14) return "../img/Tiles/14.png";
                    else if (tile == 15) return "../img/Tiles/15.png";
                    else if (tile == 16) return "../img/Tiles/16.png";
                    else if (tile == 17) return "../img/Tiles/17.png";
                    else if (tile == 18) return "../img/Tiles/18.png";
                    else if (tile == 19) return "../img/Tiles/19.png";
                    else if (tile == 20) return "../img/Tiles/20.png";
                    else if (tile == 21) return "../img/Tiles/21.png";
                    else if (tile == 22) return "../img/Tiles/22.png";
                    else if (tile == 23) return "../img/Tiles/23.png";
                     else if (tile == 24) return "../img/Tiles/24.png";

                  else return "../img/Tiles/locktile.png";
              }


          Image {
              id:emblem_picker
              x:parent.width * -0.02
              y:parent.height * 0.05
              height:parent.height * 0.90
              fillMode: Image.PreserveAspectFit
              source: {
                  if (emblem == 1) return "../img/Emblems/a.png";
                    else if (emblem == 2) return "../img/Emblems/b.png";
                    else if (emblem == 3) return "../img/Emblems/c.png";
                    else if (emblem == 4) return "../img/Emblems/d.png";
                    else if (emblem == 5) return "../img/Emblems/e.png";
                    else if (emblem == 6) return "../img/Emblems/f.png";
                    else if (emblem == 7) return "../img/Emblems/g.png";
                    else if (emblem == 8) return "../img/Emblems/h.png";
                    else if (emblem == 9) return "../img/Emblems/i.png";
                    else if (emblem == 10) return "../img/Emblems/j.png";
                    else if (emblem == 11) return "../img/Emblems/k.png";
                    else if (emblem == 12) return "../img/Emblems/l.png";
                    else if (emblem == 13) return "../img/Emblems/m.png";
                    else if (emblem == 14) return "../img/Emblems/n.png";
                    else if (emblem == 15) return "../img/Emblems/o.png";
                    else if (emblem == 16) return "../img/Emblems/p.png";
                    else if (emblem == 17) return "../img/Emblems/q.png";
                    else if (emblem == 18) return "../img/Emblems/r.png";
                   //else if (emblem == 19) return "../img/Emblems/s.png";
                  //else if (emblem == 20) return "../img/Emblems/t.png";
                    //else if (emblem == 21) return "../img/Emblems/u.png";
                    //else if (emblem == 22) return "../img/Emblems/v.png";
                    //else if (emblem == 23) return "../img/Emblems/w.png";
                    //else if (emblem == 24) return "../img/Emblems/x.png";
                    //else if (emblem == 25) return "../img/Emblems/y.png";
                    //else if (emblem == 26) return "../img/Emblems/z.png";

                  else return "../img/Emblems/gear_emblem-small-66.png";
              }
          }
          }

          Image {
              id:emblem_plus
              x:parent.width * 0.565
              y:parent.height * 0.64
              height:parent.height *.10
              fillMode: Image.PreserveAspectFit
              source:"../img/right.png"
              MouseArea {
                  anchors.fill:parent
                  onClicked: if(emblem < 18) {emblem = emblem + 1} else {emblem = 0 }
              }
          }

          Image {
              id:color_plus
              x:parent.width * 0.608
              y:parent.height * 0.64
              height:parent.height *.10
              fillMode: Image.PreserveAspectFit
              source:"../img/dright.png"
              MouseArea {
                  anchors.fill:parent
                  onClicked: if(tile < 24) {tile = tile + 1} else {tile = 0 }
              }
          }


          Rectangle {
                id:username_bg
                x:parent.width *0.24
                y:parent.height * 0.28
                width:parent.width * 0.52
                height:parent.height * 0.1

          TextField {
                id:username
                anchors.fill: parent
               //font.family: minspsw.name
                font.pixelSize: parent.height
                horizontalAlignment:Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                placeholderText: "User Name"
                text: userName

             }
          }
          Rectangle {
                id:email_bg
                x:parent.width *0.18
                y:parent.height * 0.45
                width:parent.width * 0.65
                height:parent.height * 0.1

          TextField {
                id:email
                anchors.fill: parent
               //font.family: minspsw.name
                font.pixelSize: parent.height
                horizontalAlignment:Text.AlignHCenter
                verticalAlignment: Text.AlignVCenter
                placeholderText: "Email Address"
                text: userEmail

             }

            }
          Image {
               id:setback
               x:parent.width *0.55
               y:parent.height * 0.87
               width:parent.width * 0.16
               height:parent.height * 0.08
               source: "../img/menubacking.png"

               Text {
                   text: "Set"
                   //anchors.fill:parent
                   font.pixelSize: parent.height
                   font.family:minspsw.name
                   x:parent.width * 0.24
                   y:parent.height * 0.08
               }
               MouseArea {
                   anchors.fill: parent
                   onClicked: { if( CafeSync.genterate_id(username.text,email.text) == 1) return pd.state ="inactive"; }
               }
          }

    }
}
