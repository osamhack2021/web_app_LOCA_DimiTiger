import React from 'react';
import { useHistory } from 'react-router-dom';
import { Group } from '@visx/group';
import { Treemap, treemapSquarify } from '@visx/hierarchy';
import {
  HierarchyNode,
  HierarchyRectangularNode,
} from '@visx/hierarchy/lib/types';

import './LocationChart.css';

import Location from '@/types/Location';
import User from '@/types/User';

interface Datum {
  location?: Location;
  users?: User[];
  children?: Datum[];
}

const ratio = (1 + Math.sqrt(5)) / 2;

const TreeMapChart = ({
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
      <Treemap<Datum>
        root={root}
        size={[width || 100, height || 100]}
        tile={(
          tile =>
          (
            node: HierarchyRectangularNode<Datum>,
            x0: number,
            y0: number,
            x1: number,
            y1: number,
          ) => {
            tile(node, x0 / ratio, y0, x1 / ratio, y1);
            if (node.children)
              for (const child of node.children) {
                child.x0 *= ratio;
                child.x1 *= ratio;
              }
          }
        )(treemapSquarify.ratio(1))}
        padding={20}
        round>
        {treemap => (
          <Group>
            {treemap.descendants().map((node, i) => {
              const nodeWidth = node.x1 - node.x0;
              const nodeHeight = node.y1 - node.y0;
              const { location, users } = node.data;

              const textWidth = 80;
              const textPerLine =
                nodeWidth - 40 > textWidth
                  ? Math.floor((nodeWidth - 40) / textWidth)
                  : 1;
              return (
                <Group key={`node-${i}`} top={node.y0} left={node.x0}>
                  {node.depth === 1 && (
                    <>
                      <rect
                        width={nodeWidth}
                        height={nodeHeight}
                        strokeWidth={4}
                        rx={20}
                        ry={20}
                        fill={`url(#gradient${location!.ui!.color})`}
                        onClick={() =>
                          history.push(
                            `/location-logs?location=${location!._id}&active=1`,
                          )
                        }
                        cursor="pointer"
                      />
                      <text
                        dx={20}
                        dy={40}
                        fill="white"
                        fontSize={21}
                        fontWeight="800">{`${location!.name} (${
                        users?.length
                      }명)`}</text>
                      {users!.map((user, index) => (
                        <text
                          dx={20 + 80 * (index % textPerLine)}
                          dy={60 + Math.floor(index / textPerLine) * 20}
                          fill="white"
                          fontWeight="500"
                          key={user._id}>{`${user.rank} ${user.name}`}</text>
                      ))}
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
      </Treemap>
    </svg>
  );
};

export default TreeMapChart;
