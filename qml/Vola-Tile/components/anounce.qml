import QtQuick 2.0
//import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.0
import "../tile-game.js" as TileGame



Item {
    property string tmessege: ""
    property int backhit: 0

    id: note

    states: [
    State {
            name: "combo"
            when: combo_true == 1
            PropertyChanges {
                target: saybg
                opacity: 1.0
                enabled:true

                }

        },
        State {
            name: "winner"
            when: winner_true == 1
            PropertyChanges {
                target:saybg
                opacity:1.0
                enabled:true
            }
     },
        State {
            name: "inactive"
            PropertyChanges {
                target:saybg
                opacity:0.0
                enabled:false
            }
        }

    ]


   Image {
           id:saybg
           source:"../img/ingameb.png"
           opacity: 0.0
           x:0
           y:0
           width:parent.width
           height:parent.height
           anchors.fill:parent
           enabled:false
           clip:true

           Text {
               id:player_setup
               x:firstbacking.width + 10
               y:parent.height * 0.07

               text:tmessege
               font.pixelSize: parent.width / (tmessege.length /1.3 )
               font.family:minspsw.name
               color: "white"
           }
           Image {
               id:firstbacking
               source: { if (wbacking == 1) return "../img/Tiles/1.png";
                      else if (wbacking == 2) return "../img/Tiles/2.png";
                      else if (wbacking == 3) return "../img/Tiles/3.png";
                      else if (wbacking == 4) return "../img/Tiles/4.png";
                      else if (wbacking == 5) return "../img/Tiles/5.png";
                      else if (wbacking == 6) return "../img/Tiles/6.png";
                      else if (wbacking == 7) return "../img/Tiles/7.png";
                      else if (wbacking == 8) return "../img/Tiles/8.png";
                      else if (wbacking == 9) return "../img/Tiles/9.png";
                      else if (wbacking == 10) return "../img/Tiles/10.png";
                      else if (wbacking == 11) return "../img/Tiles/11.png";
                      else if (wbacking == 12) return "../img/Tiles/12.png";
                      else if (wbacking == 13) return "../img/Tiles/13.png";
                      else if (wbacking == 14) return "../img/Tiles/14.png";
                      else if (wbacking == 15) return "../img/Tiles/15.png";
                      else if (wbacking == 16) return "../img/Tiles/16.png";
                      else if (wbacking == 17) return "../img/Tiles/17.png";
                      else if (wbacking == 18) return "../img/Tiles/18.png";
                      else if (wbacking == 19) return "../img/Tiles/19.png";
                      else if (wbacking == 20) return "../img/Tiles/20.png";
                      else if (wbacking == 21) return "../img/Tiles/21.png";
                      else if (wbacking == 22) return "../img/Tiles/22.png";
                      else if (wbacking == 23) return "../img/Tiles/23.png";
                      else if (wbacking == 24) return "../img/Tiles/24.png";
                   else return "";
               }
               x:10
               y:0
               height:parent.height
               fillMode:Image.PreserveAspectFit



               Image {
                   id:firstemblem

                   width:parent.width
                   height:parent.height
                   source: {if (wemblem == 1) return "../img/Emblems/a.png";
                       else if (wemblem == 2) return "../img/Emblems/b.png";
                       else if (wemblem == 3) return "../img/Emblems/c.png";
                       else if (wemblem == 4) return "../img/Emblems/d.png";
                       else if (wemblem == 5) return "../img/Emblems/e.png";
                       else if (wemblem == 6) return "../img/Emblems/f.png";
                       else if (wemblem == 7) return "../img/Emblems/g.png";
                       else if (wemblem == 8) return "../img/Emblems/h.png";
                       else if (wemblem == 9) return "../img/Emblems/i.png";
                       else if (wemblem == 10) return "../img/Emblems/j.png";
                       else if (wemblem == 11) return "../img/Emblems/k.png";
                       else if (wemblem == 12) return "../img/Emblems/l.png";
                       else if (wemblem == 13) return "../img/Emblems/m.png";
                       else if (wemblem == 14) return "../img/Emblems/n.png";
                       else if (wemblem == 15) return "../img/Emblems/o.png";
                       else if (wemblem == 16) return "../img/Emblems/p.png";
                       else if (wemblem == 17) return "../img/Emblems/q.png";
                       else if (wemblem == 18) return "../img/Emblems/r.png";
                       //else if (wemblem == 19) return "../img/Emblems/s.png";
                       //else if (wemblem == 20) return "../img/Emblems/t.png";
                       //else if (wemblem == 21) return "../img/Emblems/u.png";
                       //else if (wemblem == 22) return "../img/Emblems/v.png";
                       //else if (wemblem == 23) return "../img/Emblems/w.png";
                      // else if (wemblem == 24) return "../img/Emblems/x.png";
                      // else if (wemblem == 25) return "../img/Emblems/y.png";
                      // else if (wemblem == 26) return "../img/Emblems/z.png";
                       else if (wemblem == 99) return "../img/Emblems/gear_emblem-small-66.png";

                     else return "";
                   }
               }

           }

           Image {
               id:secondbacking
               x:firstbacking.width + 10
               y:player_setup.height + 30
               width: parent.width * 0.04

               fillMode:Image.PreserveAspectFit


               source: { if (backing2 == 1) return "../img/Tiles/1.png";
                      else if (backing2 == 2) return "../img/Tiles/2.png";
                      else if (backing2 == 3) return "../img/Tiles/3.png";
                      else if (backing2 == 4) return "../img/Tiles/4.png";
                      else if (backing2 == 5) return "../img/Tiles/5.png";
                      else if (backing2 == 6) return "../img/Tiles/6.png";
                      else if (backing2 == 7) return "../img/Tiles/7.png";
                      else if (backing2 == 8) return "../img/Tiles/8.png";
                      else if (backing2 == 9) return "../img/Tiles/9.png";
                      else if (backing2 == 10) return "../img/Tiles/10.png";
                      else if (backing2 == 11) return "../img/Tiles/11.png";
                      else if (backing2 == 12) return "../img/Tiles/12.png";
                      else if (backing2 == 13) return "../img/Tiles/13.png";
                      else if (backing2 == 14) return "../img/Tiles/14.png";
                      else if (backing2 == 15) return "../img/Tiles/15.png";
                      else if (backing2 == 16) return "../img/Tiles/16.png";
                      else if (backing2 == 17) return "../img/Tiles/17.png";
                      else if (backing2 == 18) return "../img/Tiles/18.png";
                      else if (backing2 == 19) return "../img/Tiles/19.png";
                      else if (backing2 == 20) return "../img/Tiles/20.png";
                      else if (backing2 == 21) return "../img/Tiles/21.png";
                      else if (backing2 == 22) return "../img/Tiles/22.png";
                      else if (backing2 == 23) return "../img/Tiles/23.png";
                      else if (backing2 == 24) return "../img/Tiles/24.png";
                   else return "";
               }


               Image {
                   id:secondemblem
                   x:0
                   y:0
                   width:parent.width
                   height:parent.height

                   source: {if (emblem2 == 1) return "../img/Emblems/a.png";
                       else if (emblem2 == 2) return "../img/Emblems/b.png";
                       else if (emblem2 == 3) return "../img/Emblems/c.png";
                       else if (emblem2 == 4) return "../img/Emblems/d.png";
                       else if (emblem2 == 5) return "../img/Emblems/e.png";
                       else if (emblem2 == 6) return "../img/Emblems/f.png";
                       else if (emblem2 == 7) return "../img/Emblems/g.png";
                       else if (emblem2 == 8) return "../img/Emblems/h.png";
                       else if (emblem2 == 9) return "../img/Emblems/i.png";
                       else if (emblem2 == 10) return "../img/Emblems/j.png";
                       else if (emblem2 == 11) return "../img/Emblems/k.png";
                       else if (emblem2 == 12) return "../img/Emblems/l.png";
                       else if (emblem2 == 13) return "../img/Emblems/m.png";
                       else if (emblem2 == 14) return "../img/Emblems/n.png";
                       else if (emblem2 == 15) return "../img/Emblems/o.png";
                       else if (emblem2 == 16) return "../img/Emblems/p.png";
                       else if (emblem2 == 17) return "../img/Emblems/q.png";
                       else if (emblem2 == 18) return "../img/Emblems/r.png";
                      // else if (emblem2 == 19) return "../img/Emblems/s.png";
                      // else if (emblem2 == 20) return "../img/Emblems/t.png";
                      // else if (emblem2 == 21) return "../img/Emblems/u.png";
                      // else if (emblem2 == 22) return "../img/Emblems/v.png";
                      // else if (emblem2 == 23) return "../img/Emblems/w.png";
                      // else if (emblem2 == 24) return "../img/Emblems/x.png";
                      // else if (emblem2 == 25) return "../img/Emblems/y.png";
                      // else if (emblem2 == 26) return "../img/Emblems/z.png";
                       else if (emblem2 == 99) return "../img/Emblems/gear_emblem-small-66.png";

                     else return "";
                   }

               }
               Text {
                   id:secondname
                   x:parent.width + 10
                   y:parent.height / 3.5
                   font.family:minspsw.name
                   font.pixelSize: parent.width / 2
                   color: "white"
                   text:player2

               }
           }

           Image {
               id:thirdbacking

               x:firstbacking.width + 10
               y:secondbacking.y + secondbacking.height +10
               width: parent.width * 0.04

               fillMode:Image.PreserveAspectFit



               source: { if (backing3 == 1) return "../img/Tiles/1.png";
                      else if (backing3 == 2) return "../img/Tiles/2.png";
                      else if (backing3 == 3) return "../img/Tiles/3.png";
                      else if (backing3 == 4) return "../img/Tiles/4.png";
                      else if (backing3 == 5) return "../img/Tiles/5.png";
                      else if (backing3 == 6) return "../img/Tiles/6.png";
                      else if (backing3 == 7) return "../img/Tiles/7.png";
                      else if (backing3 == 8) return "../img/Tiles/8.png";
                      else if (backing3 == 9) return "../img/Tiles/9.png";
                      else if (backing3 == 10) return "../img/Tiles/10.png";
                      else if (backing3 == 11) return "../img/Tiles/11.png";
                      else if (backing3 == 12) return "../img/Tiles/12.png";
                      else if (backing3 == 13) return "../img/Tiles/13.png";
                      else if (backing3 == 14) return "../img/Tiles/14.png";
                      else if (backing3 == 15) return "../img/Tiles/15.png";
                      else if (backing3 == 16) return "../img/Tiles/16.png";
                      else if (backing3 == 17) return "../img/Tiles/17.png";
                      else if (backing3 == 18) return "../img/Tiles/18.png";
                      else if (backing3 == 19) return "../img/Tiles/19.png";
                      else if (backing3 == 20) return "../img/Tiles/20.png";
                      else if (backing3 == 21) return "../img/Tiles/21.png";
                      else if (backing3 == 22) return "../img/Tiles/22.png";
                      else if (backing3 == 23) return "../img/Tiles/23.png";
                      else if (backing3 == 24) return "../img/Tiles/24.png";
                   else return "";
                        }

               Image {
                   id:thirdemblem
                   x:0
                   y:0
                   width:parent.width
                   height:parent.height


                   source: {if (emblem3 == 1) return "../img/Emblems/a.png";
                       else if (emblem3 == 2) return "../img/Emblems/b.png";
                       else if (emblem3 == 3) return "../img/Emblems/c.png";
                       else if (emblem3 == 4) return "../img/Emblems/d.png";
                       else if (emblem3 == 5) return "../img/Emblems/e.png";
                       else if (emblem3 == 6) return "../img/Emblems/f.png";
                       else if (emblem3 == 7) return "../img/Emblems/g.png";
                       else if (emblem3 == 8) return "../img/Emblems/h.png";
                       else if (emblem3 == 9) return "../img/Emblems/i.png";
                       else if (emblem3 == 10) return "../img/Emblems/j.png";
                       else if (emblem3 == 11) return "../img/Emblems/k.png";
                       else if (emblem3 == 12) return "../img/Emblems/l.png";
                       else if (emblem3 == 13) return "../img/Emblems/m.png";
                       else if (emblem3 == 14) return "../img/Emblems/n.png";
                       else if (emblem3 == 15) return "../img/Emblems/o.png";
                       else if (emblem3 == 16) return "../img/Emblems/p.png";
                       else if (emblem3 == 17) return "../img/Emblems/q.png";
                       else if (emblem3 == 18) return "../img/Emblems/r.png";
                      // else if (emblem3 == 19) return "../img/Emblems/s.png";
                      // else if (emblem3 == 20) return "../img/Emblems/t.png";
                      // else if (emblem3 == 21) return "../img/Emblems/u.png";
                      // else if (emblem3 == 22) return "../img/Emblems/v.png";
                      // else if (emblem3 == 23) return "../img/Emblems/w.png";
                     //  else if (emblem3 == 24) return "../img/Emblems/x.png";
                     //  else if (emblem3 == 25) return "../img/Emblems/y.png";
                      // else if (emblem3 == 26) return "../img/Emblems/z.png";
                       else if (emblem3 == 99) return "../img/Emblems/gear_emblem-small-66.png";

                     else return "";
                   }
               }

               Text {
                   id:thirdname
                   x:parent.width + 10
                   y:parent.height / 3.5
                   font.family:minspsw.name
                   font.pixelSize: parent.width / 2
                   color: "white"

                   text:player3
               }
           }
           Image {
               id:fourthbacking
               x:firstbacking.width + 10
               y:thirdbacking.y + thirdbacking.height +10
               width: parent.width * 0.04
               fillMode:Image.PreserveAspectFit

               source: { if (backing4 == 1) return "../img/Tiles/1.png";
                      else if (backing4 == 2) return "../img/Tiles/2.png";
                      else if (backing4 == 3) return "../img/Tiles/3.png";
                      else if (backing4 == 4) return "../img/Tiles/4.png";
                      else if (backing4 == 5) return "../img/Tiles/5.png";
                      else if (backing4 == 6) return "../img/Tiles/6.png";
                      else if (backing4 == 7) return "../img/Tiles/7.png";
                      else if (backing4 == 8) return "../img/Tiles/8.png";
                      else if (backing4 == 9) return "../img/Tiles/9.png";
                      else if (backing4 == 10) return "../img/Tiles/10.png";
                      else if (backing4 == 11) return "../img/Tiles/11.png";
                      else if (backing4 == 12) return "../img/Tiles/12.png";
                      else if (backing4 == 13) return "../img/Tiles/13.png";
                      else if (backing4 == 14) return "../img/Tiles/14.png";
                      else if (backing4 == 15) return "../img/Tiles/15.png";
                      else if (backing4 == 16) return "../img/Tiles/16.png";
                      else if (backing4 == 17) return "../img/Tiles/17.png";
                      else if (backing4 == 18) return "../img/Tiles/18.png";
                      else if (backing4 == 19) return "../img/Tiles/19.png";
                      else if (backing4 == 20) return "../img/Tiles/20.png";
                      else if (backing4 == 21) return "../img/Tiles/21.png";
                      else if (backing4 == 22) return "../img/Tiles/22.png";
                      else if (backing4 == 23) return "../img/Tiles/23.png";
                      else if (backing4 == 24) return "../img/Tiles/24.png";
                   else return "";
               }

               Image {
                   id:fourthemblem
                    x:0
                    y:0
                    width:parent.width
                    height:parent.height
                   source: {if (emblem4 == 1) return "../img/Emblems/a.png";
                       else if (emblem4 == 2) return "../img/Emblems/b.png";
                       else if (emblem4 == 3) return "../img/Emblems/c.png";
                       else if (emblem4 == 4) return "../img/Emblems/d.png";
                       else if (emblem4 == 5) return "../img/Emblems/e.png";
                       else if (emblem4 == 6) return "../img/Emblems/f.png";
                       else if (emblem4 == 7) return "../img/Emblems/g.png";
                       else if (emblem4 == 8) return "../img/Emblems/h.png";
                       else if (emblem4 == 9) return "../img/Emblems/i.png";
                       else if (emblem4 == 10) return "../img/Emblems/j.png";
                       else if (emblem4 == 11) return "../img/Emblems/k.png";
                       else if (emblem4 == 12) return "../img/Emblems/l.png";
                       else if (emblem4 == 13) return "../img/Emblems/m.png";
                       else if (emblem4 == 14) return "../img/Emblems/n.png";
                       else if (emblem4 == 15) return "../img/Emblems/o.png";
                       else if (emblem4 == 16) return "../img/Emblems/p.png";
                       else if (emblem4 == 17) return "../img/Emblems/q.png";
                       else if (emblem4 == 18) return "../img/Emblems/r.png";
                     //  else if (emblem4 == 19) return "../img/Emblems/s.png";
                      // else if (emblem4 == 20) return "../img/Emblems/t.png";
                     //  else if (emblem4 == 21) return "../img/Emblems/u.png";
                      // else if (emblem4 == 22) return "../img/Emblems/v.png";
                      // else if (emblem4 == 23) return "../img/Emblems/w.png";
                      // else if (emblem4 == 24) return "../img/Emblems/x.png";
                      // else if (emblem4 == 25) return "../img/Emblems/y.png";
                     //  else if (emblem4 == 26) return "../img/Emblems/z.png";
                       else if (emblem4 == 99) return "../img/Emblems/gear_emblem-small-66.png";

                     else return "";
                   }
               }
               Text {
                   id:fourthname
                   x:parent.width + 10
                   y:parent.height / 3.5
                   font.family:minspsw.name
                   font.pixelSize: parent.width / 2
                   color: "white"

                   text:player4
               }
           }

           Image {
               id:fifthbacking
               x:firstbacking.width + 10
               y:fourthbacking.y + fourthbacking.height +10
               width: parent.width * 0.04

               fillMode:Image.PreserveAspectFit

               source: { if (backing5 == 1) return "../img/Tiles/1.png";
                      else if (backing5 == 2) return "../img/Tiles/2.png";
                      else if (backing5 == 3) return "../img/Tiles/3.png";
                      else if (backing5 == 4) return "../img/Tiles/4.png";
                      else if (backing5 == 5) return "../img/Tiles/5.png";
                      else if (backing5 == 6) return "../img/Tiles/6.png";
                      else if (backing5 == 7) return "../img/Tiles/7.png";
                      else if (backing5 == 8) return "../img/Tiles/8.png";
                      else if (backing5 == 9) return "../img/Tiles/9.png";
                      else if (backing5 == 10) return "../img/Tiles/10.png";
                      else if (backing5 == 11) return "../img/Tiles/11.png";
                      else if (backing5 == 12) return "../img/Tiles/12.png";
                      else if (backing5 == 13) return "../img/Tiles/13.png";
                      else if (backing5 == 14) return "../img/Tiles/14.png";
                      else if (backing5 == 15) return "../img/Tiles/15.png";
                      else if (backing5 == 16) return "../img/Tiles/16.png";
                      else if (backing5 == 17) return "../img/Tiles/17.png";
                      else if (backing5 == 18) return "../img/Tiles/18.png";
                      else if (backing5 == 19) return "../img/Tiles/19.png";
                      else if (backing5 == 20) return "../img/Tiles/20.png";
                      else if (backing5 == 21) return "../img/Tiles/21.png";
                      else if (backing5 == 22) return "../img/Tiles/22.png";
                      else if (backing5 == 23) return "../img/Tiles/23.png";
                      else if (backing5 == 24) return "../img/Tiles/24.png";
                   else return "";
               }

               Image {
                   id:fifthemblem
                    x:0
                    y:0
                    width:parent.width
                    height:parent.height
                   source: {if (emblem5 == 1) return "../img/Emblems/a.png";
                       else if (emblem5 == 2) return "../img/Emblems/b.png";
                       else if (emblem5 == 3) return "../img/Emblems/c.png";
                       else if (emblem5 == 4) return "../img/Emblems/d.png";
                       else if (emblem5 == 5) return "../img/Emblems/e.png";
                       else if (emblem5 == 6) return "../img/Emblems/f.png";
                       else if (emblem5 == 7) return "../img/Emblems/g.png";
                       else if (emblem5 == 8) return "../img/Emblems/h.png";
                       else if (emblem5 == 9) return "../img/Emblems/i.png";
                       else if (emblem5 == 10) return "../img/Emblems/j.png";
                       else if (emblem5 == 11) return "../img/Emblems/k.png";
                       else if (emblem5 == 12) return "../img/Emblems/l.png";
                       else if (emblem5 == 13) return "../img/Emblems/m.png";
                       else if (emblem5 == 14) return "../img/Emblems/n.png";
                       else if (emblem5 == 15) return "../img/Emblems/o.png";
                       else if (emblem5 == 16) return "../img/Emblems/p.png";
                       else if (emblem5 == 17) return "../img/Emblems/q.png";
                       else if (emblem5 == 18) return "../img/Emblems/r.png";
                     //  else if (emblem5 == 19) return "../img/Emblems/s.png";
                     //  else if (emblem5 == 20) return "../img/Emblems/t.png";
                     //  else if (emblem5 == 21) return "../img/Emblems/u.png";
                     //  else if (emblem5 == 22) return "../img/Emblems/v.png";
                     //  else if (emblem5 == 23) return "../img/Emblems/w.png";
                     //  else if (emblem5 == 24) return "../img/Emblems/x.png";
                     //  else if (emblem5 == 25) return "../img/Emblems/y.png";
                      // else if (emblem5 == 26) return "../img/Emblems/z.png";
                       else if (emblem5 == 99) return "../img/Emblems/gear_emblem-small-66.png";

                     else return "";
                   }
               }
               Text {
                   id:fifthname
                   x:parent.width + 10
                   y:parent.height / 3.5
                   font.family:minspsw.name
                   font.pixelSize: parent.width / 2
                   color: "white"

                   text:player5
               }
           }




           Image {
               id:backbutton
               source:"../img/backbutton.png"
               x:parent.width * 0.87
               y:parent.height * 0.75
               fillMode:Image.PreserveAspectFit
               MouseArea{
                   anchors.fill:parent
                   onClicked: mainwindow.state = "mainMenu",note.state = "inactive"
               }
           }

    }
 }
