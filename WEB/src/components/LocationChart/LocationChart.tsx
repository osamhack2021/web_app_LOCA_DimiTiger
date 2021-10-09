import React, { useMemo, useState } from "react";
import {
  CircleProps,
  ResponsiveCirclePacking,
} from "@nivo/circle-packing";

import "./LocationChart.css";

import { useLocationLogs } from "../../api/location-logs";
import { useLocations } from "../../api/locations";
import Location from "../../types/Location";

interface LocationDatum extends Location {
  id: string;
  value: number;
  name: string;
  children?: LocationDatum[];
}

const CustomCirclePackingComponent = (props: CircleProps<LocationDatum>) => {
  const { node } = props;
  const lineWidth = node.radius * 0.2;
  const distance = node.radius * 0.3;
  const fontSize = node.radius * 0.2 + "px";
  const [isClicked, setisClicked] = useState({ isClicked: false });
  const { data: locationLogs } = useLocationLogs({
    location: node.data._id,
  });

  const onCircleClick = () => {
    setisClicked({ isClicked: !isClicked.isClicked });
  };

  return (
    <>
      <circle
        cx={node.x}
        cy={node.y}
        r={node.radius}
        fill={node.color}
        opacity={1}
        onClick={onCircleClick}
      ></circle>
      {isClicked.isClicked ? (
        <>
          {locationLogs?.map((data, i) => {
            if (i < 10) {
              return (
                <text
                  x={node.x}
                  y={
                    node.y -
                    (i - locationLogs.length / 2 + 0.5) *
                      (distance / locationLogs.length) *
                      (locationLogs.length + 1)
                  }
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: node.radius * 0.175 + "px",
                    fontWeight: "bold",
                    fill: "rgb(255, 255, 255)",
                    pointerEvents: "none",
                  }}
                >
                  {data.user.rank} {data.user.name}
                </text>
              );
            } else if (i === 10) {
              return (
                <text
                  x={node.x}
                  y={
                    node.y -
                    (i - locationLogs.length / 2 + 0.5) *
                      (distance / locationLogs.length) *
                      (locationLogs.length + 1)
                  }
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: node.radius * 0.175 + "px",
                    fontWeight: "bold",
                    fill: "rgb(255, 255, 255)",
                    pointerEvents: "none",
                  }}
                >
                  ...
                </text>
              );
            } else {
              return;
            }
          })}
        </>
      ) : (
        <>
          <text
            x={node.x}
            y={node.y - distance * 1.2}
            text-anchor="middle"
            dominant-baseline="central"
            style={{
              fontFamily: "sans-serif",
              fontSize: node.radius * 0.7 + "px",
              fill: "rgb(255, 255, 255)",
              pointerEvents: "none",
            }}
          >
            {node.value}
          </text>
          <line
            x1={node.x - lineWidth}
            y1={node.y + distance * 0.2}
            x2={node.x + lineWidth}
            y2={node.y + distance * 0.2}
            stroke-width="5"
            stroke="#ffffff"
          />
          <text
            x={node.x}
            y={node.y + distance * 1.1}
            text-anchor="middle"
            dominant-baseline="central"
            style={{
              fontFamily: "sans-serif",
              fontSize: fontSize,
              fontWeight: 800,
              fill: "rgb(255, 255, 255)",
              pointerEvents: "none",
            }}
          >
            {node.id}
          </text>
        </>
      )}
    </>
  );
};

const LocationChart = () => {
  const { data: locations, isLoading } = useLocations();
  const { data: locationLogs } = useLocationLogs({ active: true });

  const data = useMemo(() => {
    if (!locations || !locationLogs) {
      return [];
    }
    return locations.map((location) => {
      const logs = locationLogs.filter(
        (locationLog) => locationLog.location._id === location._id
      );
      return {
        ...location,
        id: location._id,
        value: logs.length,
      };
    });
  }, [locations, locationLogs]);

  const gradProps = {
    gradientUnits: "userSpaceOnUse",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "480",
  };

  return (
    <div id="locationChart">
      <div style={{ width: 0 }}>
        <svg>
          <defs>
            <linearGradient id="gradientId1" {...gradProps}>
              <stop offset="25%" stopColor="#EEF2F3" />
              <stop offset="75%" stopColor="#94A5B2" />
            </linearGradient>
            <linearGradient id="gradientId2" {...gradProps}>
              <stop offset="25%" stopColor="#FFCCD5" />
              <stop offset="75%" stopColor="#FF30C5" />
            </linearGradient>
            <linearGradient id="gradientId3" {...gradProps}>
              <stop offset="10%" stopColor="#87F8FF" />
              <stop offset="90%" stopColor="#4071FF" />
            </linearGradient>
            <linearGradient id="gradientId4" {...gradProps}>
              <stop offset="0%" stopColor="#D7F0A0" />
              <stop offset="75%" stopColor="#78CC0E" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {isLoading ? (
        "loading..."
      ) : (
        <ResponsiveCirclePacking
          //@ts-ignore
          data={{
            name: "root",
            children: data,
          }}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          id="name"
          colors={[
            "url(#gradientId1)",
            "url(#gradientId2)",
            "url(#gradientId3)",
            "url(#gradientId4)",
          ]}
          colorBy="id"
          childColor={{ from: "color", modifiers: [["brighter", 0.4]] }}
          padding={1}
          leavesOnly={true}
          enableLabels={false}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          animate={false}
          circleComponent={CustomCirclePackingComponent}
          theme={{
            fontSize: 52,
          }}
        />
      )}
    </div>
  );
};
export default LocationChart;
