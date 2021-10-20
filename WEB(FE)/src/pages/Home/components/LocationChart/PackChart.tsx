import React from 'react';
import { useHistory } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
import { Group } from '@visx/group';
import { Pack } from '@visx/hierarchy';
import { HierarchyCircularNode, HierarchyNode } from 'd3-hierarchy';

import './LocationChart.css';

import Location from '@/types/Location';
import User from '@/types/User';

interface Datum {
  location?: Location;
  users?: User[];
  children?: Datum[];
}

const transitionPhases = {
  enter: (node: HierarchyCircularNode<Datum>) => ({
    x: node.x,
    y: node.y,
    r: 0,
    xyr: [node.x, node.y, 0],
    opacity: 0,
  }),
  update: (node: HierarchyCircularNode<Datum>) => ({
    x: node.x,
    y: node.y,
    r: node.r,
    xyr: [node.x, node.y, node.r],
    opacity: 1,
  }),
  leave: (node: HierarchyCircularNode<Datum>) => ({
    x: node.x,
    y: node.y,
    r: 0,
    xyr: [node.x, node.y, 0],
    opacity: 0,
  }),
};

const Circles = ({ nodes }: { nodes: HierarchyCircularNode<Datum>[] }) => {
  const history = useHistory();

  const transition = useTransition<
    HierarchyCircularNode<Datum>,
    {
      x: number;
      y: number;
      r: number;
      xyr: number[];
      opacity: number;
    }
  >(nodes, {
    keys: (node: HierarchyCircularNode<Datum>) =>
      node.depth === 1 ? node.data.location!._id : '',
    initial: transitionPhases.update,
    from: transitionPhases.enter,
    enter: transitionPhases.update,
    update: transitionPhases.update,
    leave: transitionPhases.leave,
  });

  return transition((transitionProps, node) => {
    const { location } = node.data;
    return node.depth === 1 ? (
      <>
        <animated.circle
          key={node.data.location!._id}
          r={transitionProps.r}
          cx={transitionProps.x}
          cy={transitionProps.y}
          opacity={transitionProps.opacity}
          fill={`url(#gradient${node.data.location!.ui!.color})`}
          onClick={() =>
            history.push(
              `/location-logs?location=${node.data.location!._id}&active=1`,
            )
          }
          cursor="pointer"
        />
        <animated.text
          x={transitionProps.x}
          y={transitionProps.xyr.to((x, y, r) => y - r * 0.36)}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: 'sans-serif',
            fontSize: transitionProps.r.to(v => v * 0.7),
            fill: 'rgb(255, 255, 255)',
            pointerEvents: 'none',
          }}>
          {node.value}
        </animated.text>
        <animated.line
          x1={transitionProps.xyr.to((x, y, r) => x - r * 0.2)}
          y1={transitionProps.xyr.to((x, y, r) => y + r * 0.06)}
          x2={transitionProps.xyr.to((x, y, r) => x + r * 0.2)}
          y2={transitionProps.xyr.to((x, y, r) => y + r * 0.06)}
          strokeWidth="3"
          stroke="#ffffff"
        />
        <animated.text
          x={transitionProps.x}
          y={transitionProps.xyr.to((x, y, r) => y + r * 0.33)}
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fontFamily: 'sans-serif',
            fontSize: transitionProps.r.to(v => v * 0.25),
            fontWeight: 800,
            fill: 'rgb(255, 255, 255)',
            pointerEvents: 'none',
          }}>
          {location!.name}
        </animated.text>
      </>
    ) : (
      <></>
    );
  });
};

const PackNodes = ({
  packData,
}: {
  packData: HierarchyCircularNode<Datum>;
}) => {
  const nodes = packData.descendants();

  return (
    <Group>
      <Circles nodes={nodes} />
    </Group>
  );
};

const PackChart = ({
  width,
  height,
  root,
}: {
  root: HierarchyNode<Datum>;
  width: number;
  height: number;
}) => {
  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={20} fill="white" />
      <Pack<Datum> root={root} size={[width || 100, height || 100]} padding={0}>
        {packData => <PackNodes packData={packData} />}
      </Pack>
    </svg>
  );
};

export default PackChart;
