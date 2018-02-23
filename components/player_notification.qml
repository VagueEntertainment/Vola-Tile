import QtQuick 2.0
//import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.0
import "../tile-game.js" as TileGame

Item {

    states: [
        State {
          name: "active"
          PropertyChanges {
              target: player_notification
              opacity: 1.0

              }

      },
        State {
          name: "inactive"
          PropertyChanges {
              target: player_notification
              opacity: 0.0

              }

      }

    ]

    id:player_notification

    clip:true
   property int type: 0
    opacity:0.0

    Image {
        id:player_backing
        source:"../img/player_notification.png"
        anchors.fill:parent
        opacity: 0.95

    }
    Image {
        id:current_player_element
        source: { if (pos0backing == 1) return "../img/Tiles/1.png";
               else if (pos0backing == 2) return "../img/Tiles/2.png";
               else if (pos0backing == 3) return "../img/Tiles/3.png";
               else if (pos0backing == 4) return "../img/Tiles/4.png";
               else if (pos0backing == 5) return "../img/Tiles/5.png";
               else if (pos0backing == 6) return "../img/Tiles/6.png";
               else if (pos0backing == 7) return "../img/Tiles/7.png";
               else if (pos0backing == 8) return "../img/Tiles/8.png";
               else if (pos0backing == 9) return "../img/Tiles/9.png";
               else if (pos0backing == 10) return "../img/Tiles/10.png";
               else if (pos0backing == 11) return "../img/Tiles/11.png";
               else if (pos0backing == 12) return "../img/Tiles/12.png";
               else if (pos0backing == 13) return "../img/Tiles/13.png";
               else if (pos0backing == 14) return "../img/Tiles/14.png";
               else if (pos0backing == 15) return "../img/Tiles/15.png";
               else if (pos0backing == 16) return "../img/Tiles/16.png";
               else if (pos0backing == 17) return "../img/Tiles/17.png";
               else if (pos0backing == 18) return "../img/Tiles/18.png";
               else if (pos0backing == 19) return "../img/Tiles/19.png";
               else if (pos0backing == 20) return "../img/Tiles/20.png";
               else if (pos0backing == 21) return "../img/Tiles/21.png";
               else if (pos0backing == 22) return "../img/Tiles/22.png";
               else if (pos0backing == 23) return "../img/Tiles/23.png";
               else if (pos0backing == 24) return "../img/Tiles/24.png";
        }
        x:10
        y:0
        height:parent.height
        fillMode:Image.PreserveAspectFit
    }
    Image {
        id:current_player_emblem
        width:current_player_element.width
        height:current_player_element.height
        x:current_player_element.width /9
        fillMode:Image.PreserveAspectFit
        source: {
            if (pos0emblem == 1) return "../img/Emblems/a.png";
              else if (pos0emblem == 2) return "../img/Emblems/b.png";
              else if (pos0emblem == 3) return "../img/Emblems/c.png";
              else if (pos0emblem == 4) return "../img/Emblems/d.png";
              else if (pos0emblem == 5) return "../img/Emblems/e.png";
              else if (pos0emblem == 6) return "../img/Emblems/f.png";
              else if (pos0emblem == 7) return "../img/Emblems/g.png";
              else if (pos0emblem == 8) return "../img/Emblems/h.png";
              else if (pos0emblem == 9) return "../img/Emblems/i.png";
              else if (pos0emblem == 10) return "../img/Emblems/j.png";
              else if (pos0emblem == 11) return "../img/Emblems/k.png";
              else if (pos0emblem == 12) return "../img/Emblems/l.png";
              else if (pos0emblem == 13) return "../img/Emblems/m.png";
              else if (pos0emblem == 14) return "../img/Emblems/n.png";
              else if (pos0emblem == 15) return "../img/Emblems/o.png";
              else if (pos0emblem == 16) return "../img/Emblems/p.png";
              else if (pos0emblem == 17) return "../img/Emblems/q.png";
              else if (pos0emblem == 18) return "../img/Emblems/r.png";
              else if (pos0emblem == 19) return "../img/Emblems/s.png";
              else if (pos0emblem == 20) return "../img/Emblems/t.png";
              else if (pos0emblem == 21) return "../img/Emblems/u.png";
              else if (pos0emblem == 22) return "../img/Emblems/v.png";
              else if (pos0emblem == 23) return "../img/Emblems/w.png";
              else if (pos0emblem == 24) return "../img/Emblems/x.png";
              else if (pos0emblem == 25) return "../img/Emblems/y.png";
              else if (pos0emblem == 26) return "../img/Emblems/z.png";
              else if (pos0emblem == 99) return "../img/Emblems/gear_emblem-small-66.png";

            else return "";
        }
        //fillMode: Image.PreserveAspectFill
        z:1
        opacity: {if(type == 5) return 0.5;
                    else return 0.9;
                }

    }
    Text {
        id:current_player_ident
        text:pos0name
        x:current_player_element.width + 16
        y:10
        font.family:minspsw.name
        color:"lightgray"
        font.pixelSize:parent.height * 0.60

    }
    Text {
        id:current_player_score_label
        text:"S:"
        x:current_player_element.width + 10
        y:current_player_ident.height +10
        color:"lightgray"
        font.pixelSize: parent.height* 0.25
        font.family:minspsw.name
    }
    Text {
        id:current_player_score
        text:pos0score
        x:current_player_element.width + current_player_score_label.width + 14
        y:current_player_ident.height +10
        color:"lightgray"
        font.pixelSize: parent.height* 0.25
        font.family:minspsw.name
    }
    Text {
        id:current_player_combo_label
        text:"C:"
        x:current_player_element.width + current_player_score_label.width + current_player_score.width + 20
        y:current_player_ident.height +10
        color:"lightgray"
        font.pixelSize: parent.height* 0.25
        font.family:minspsw.name
    }
    Text {
        id:current_player_combo
        text:pos0combo
        x:current_player_element.width + current_player_score_label.width + current_player_score.width + current_player_combo_label.width + 22
        y:current_player_ident.height +10
        color:"lightgray"
        font.pixelSize: parent.height* 0.25
        font.family:minspsw.name
    }

        }

