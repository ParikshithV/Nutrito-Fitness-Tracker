import { ResponsivePie } from '@nivo/pie'
import React from "react";
import axios from 'axios';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var sPro = getCookie("sumPro");
  var sCarbs = getCookie("sumCarbs");
  var sFat = getCookie("sumFat");
  var sCal = getCookie("sumCal");

  console.log("calories "+sCal);

// axios.get('http://localhost:8080/nutrito').then(res => this.setState({console.log(res.data)}))

const data = [
    {
      "id": "CALORIES",
      "label": "CALORIES",
      "value": sCal,
      "color": "hsl(11, 70%, 50%)"
    },
    {
      "id": "FAT",
      "label": "FAT",
      "value": sFat,
      "color": "hsl(23, 70%, 50%)"
    },
    {
      "id": "PROTEIN",
      "label": "PROTEIN",
      "value": sPro,
      "color": "hsl(105, 70%, 50%)"
    },
    {
      "id": "CARBS",
      "label": "CARBOHYDRATE",
      "value": sCarbs,
      "color": "hsl(222, 70%, 50%)"
    }
  ]


const MyResponsivePie = () => (
    <ResponsivePie
        data={data}
        margin={{ top: 80, right: 100, bottom: 100, left: 150 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'CALORIES'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'FAT'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'PROTEIN'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'CARBOHYDRATE'
                },
                id: 'lines'
            },
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                translateY: 56,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)


export default MyResponsivePie;
