import React from 'react';
import { useHistory } from 'react-router-dom';
import { Group } from '@visx/group';
import { Pack } from '@visx/hierarchy';
import { HierarchyNode } from 'd3-hierarchy';

import './LocationChart.css';

import Location from '@/types/Location';
import User from '@/types/User';

interface Datum {
  location?: Location;
  users?: User[];
  children?: Datum[];
}

const PackChart = ({
  width,
  height,
  root,
}: {
  root: HierarchyNode<Datum>;
  width: number;
  height: number;
}) => {
  const history = useHistory();

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={20} fill="white" />
      <Pack<Datum> root={root} size={[width || 100, height || 100]} padding={0}>
        {packData => (
          <Group>
            {packData.descendants().map((circle, i) => {
              const { location } = circle.data;
              const lineWidth = circle.r * 0.2;
              const distance = circle.r * 0.3;
              const fontSize = circle.r * 0.25 + 'px';
              return (
                <Group key={`node-${i}`}>
                  {circle.depth === 1 && (
                    <>
                      <circle
                        key={`circle-${i}`}
                        r={circle.r}
                        cx={circle.x}
                        cy={circle.y}
                        fill={`url(#gradient${location!.ui!.color})`}
                        onClick={() =>
                          history.push(
                            `/location-logs?location=${location!._id}&active=1`,
                          )
                        }
                        cursor="pointer"
                      />
                      <text
                        x={circle.x}
                        y={circle.y - distance * 1.2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                          fontFamily: 'sans-serif',
                          fontSize: circle.r * 0.7 + 'px',
                          fill: 'rgb(255, 255, 255)',
                          pointerEvents: 'none',
                        }}>
                        {circle.value}
                      </text>
                      <line
                        x1={circle.x - lineWidth}
                        y1={circle.y + distance * 0.2}
                        x2={circle.x + lineWidth}
                        y2={circle.y + distance * 0.2}
                        strokeWidth="3"
                        stroke="#ffffff"
                      />
                      <text
                        x={circle.x}
                        y={circle.y + distance * 1.1}
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                          fontFamily: 'sans-serif',
                          fontSize: fontSize,
                          fontWeight: 800,
                          fill: 'rgb(255, 255, 255)',
                          pointerEvents: 'none',
                        }}>
                        {location!.name}
                      </text>
                      <linearGradient
                        id="gradientRed"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1">
                        <stop offset="0" stopColor="#fd3a84" />
                        <stop offset="1" stopColor="#ffa68d" />
                      </linearGradient>
                      <linearGradient
                        id="gradientGreen"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1">
                        <stop offset="0" stopColor="#00b59c" />
                        <stop offset="1" stopColor="#9cffac" />
                      </linearGradient>
                      <linearGradient
                        id="gradientBlue"
                        x1="0%"
                        x2="0%"
                        y1="0%"
                        y2="100%">
                        <stop offset="0" stopColor="#5558ff" />
                        <stop offset="1" stopColor="#00c0ff" />
                      </linearGradient>
                      <linearGradient
                        id="gradientYellow"
                        x1="0%"
                        x2="0%"
                        y1="0%"
                        y2="100%">
                        <stop offset="0%" stopColor="#fd5900" />
                        <stop offset="100%" stopColor="#feba00" />
                      </linearGradient>
                    </>
                  )}
                </Group>
              );
            })}
          </Group>
        )}
      </Pack>
    </svg>
  );
};

export default PackChart;
