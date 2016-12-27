import QtQuick 2.0
//import Ubuntu.Components 0.1
import QtGraphicalEffects 1.0
import QtMultimedia 5.0

//import "components"
//import "tile-game.js" as TileGame

Item {


        property int type: 0
        property int num: 0
        property int row: 0
        property int column: 0
        property int vtile: 0
        property int etype: 0
        property int player: 0

        id: tile



    Image {
          id: img
          anchors.fill: parent
          z:0
          source: {
              if (type == 1) return "../img/Tiles/1.png";
                else if (type == 2) return "../img/Tiles/2.png";
                else if (type == 3) return "../img/Tiles/3.png";
                else if (type == 4) return "../img/Tiles/4.png";
                else if (type == 5) return "../img/Tiles/5.png";
                else if (type == 6) return "../img/Tiles/6.png";
                else if (type == 7) return "../img/Tiles/7.png";
                else if (type == 8) return "../img/Tiles/8.png";
                else if (type == 9) return "../img/Tiles/9.png";
                else if (type == 10) return "../img/Tiles/10.png";
                else if (type == 11) return "../img/Tiles/11.png";
                else if (type == 12) return "../img/Tiles/12.png";
                else if (type == 13) return "../img/Tiles/13.png";
                else if (type == 14) return "../img/Tiles/14.png";
                else if (type == 15) return "../img/Tiles/15.png";
                else if (type == 16) return "../img/Tiles/16.png";
                else if (type == 17) return "../img/Tiles/17.png";
                else if (type == 18) return "../img/Tiles/18.png";
                else if (type == 19) return "../img/Tiles/19.png";
                else if (type == 20) return "../img/Tiles/20.png";
                else if (type == 21) return "../img/Tiles/21.png";
                else if (type == 22) return "../img/Tiles/22.png";
                else if (type == 23) return "../img/Tiles/23.png";
                 else if (type == 24) return "../img/Tiles/24.png";
                else if (type == 25) return "../img/Tiles/25.png";
                else if (type == 26) return "../img/Tiles/26.png";

                 else if (type == 27) return "../img/Tiles/27.png";
                 else if (type == 28) return "../img/Tiles/28.png";
                else if (type == 29) return "../img/Tiles/29.png";
                else if (type == 30) return "../img/Tiles/30.png";
                else if (type == 31) return "../img/Tiles/31.png";
                 else if (type == 32) return "../img/Tiles/32.png";

                else if (type == 98) return "../img/Tiles/defaulttile.png";
                else if (type == 99) return "../img/Tiles/locktile.png";

                else return "../img/Tiles/greentile.png"

          }

    }

    Image {
        id:emblem
        width:parent.width
        height:parent.height
        source: {if (etype == 99) return "../img/gear_emblem-small-black-66.png";
                else if (etype == 1) return "../img/Emblems/a.png";
                 else if (etype == 2) return "../img/Emblems/b.png";
                 else if (etype == 3) return "../img/Emblems/c.png";
                else if (etype == 4) return "../img/Emblems/d.png";
                else if (etype == 5) return "../img/Emblems/e.png";
                else if (etype == 6) return "../img/Emblems/f.png";
                else if (etype == 7) return "../img/Emblems/g.png";
                else if (etype == 8) return "../img/Emblems/h.png";
                else if (etype == 9) return "../img/Emblems/i.png";
                else if (etype == 10) return "../img/Emblems/j.png";
                else if (etype == 11) return "../img/Emblems/k.png";
                else if (etype == 12) return "../img/Emblems/l.png";
                else if (etype == 13) return "../img/Emblems/m.png";
                else if (etype == 14) return "../img/Emblems/n.png";
                else if (etype == 15) return "../img/Emblems/o.png";
                else if (etype == 16) return "../img/Emblems/p.png";
                else if (etype == 17) return "../img/Emblems/q.png";
                else if (etype == 18) return "../img/Emblems/r.png";
                else if (etype == 19) return "../img/Emblems/s.png";
                //else if (etype == 20) return "../img/Emblems/t.png";
                //else if (etype == 21) return "../img/Emblems/u.png";
                else return "";
        }
        //fillMode: Image.PreserveAspectFill
        z:1
        opacity: {if(type == 5) return 0.5;
                    else return 0.7;
                }

    }


   /*DropShadow {
            anchors.fill: img
            horizontalOffset: 5
            verticalOffset: 5
            radius: 8.0
            samples: 16
            color: "#80000000"
            source: img
        } */

   ColorOverlay {
           anchors.fill: img
           source: img
           color: { if (vtile == 0) return "#00000000"
                    else return "#20FF0000" }
           //color:"#60FF0000"
       }

}


