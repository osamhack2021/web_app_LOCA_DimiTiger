import React from 'react';
import { useHistory } from 'react-router-dom';
import { animated, useTransition } from '@react-spring/web';
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

const transitionPhases = {
  enter: ({ x0, y0, x1, y1 }: HierarchyRectangularNode<Datum>) => ({
    x: [x0, x1],
    y: [y0, y1],
    opacity: 0,
  }),
  update: ({ x0, y0, x1, y1 }: HierarchyRectangularNode<Datum>) => ({
    x: [x0, x1],
    y: [y0, y1],
    opacity: 1,
  }),
  leave: ({ x0, x1, y0, y1 }: HierarchyRectangularNode<Datum>) => ({
    x: [x0, x1],
    y: [y0, y1],
    opacity: 0,
  }),
};

const textPerLine = (x0: number, x1: number) => {
  const nodeWidth = x1 - x0;
  const textWidth = 80;
  return nodeWidth - 40 > textWidth
    ? Math.floor((nodeWidth - 40) / textWidth)
    : 1;
};

const Rects = ({ nodes }: { nodes: HierarchyRectangularNode<Datum>[] }) => {
  const history = useHistory();

  const transition = useTransition<
    HierarchyRectangularNode<Datum>,
    {
      x: number[];
      y: number[];
      opacity: number;
    }
  >(nodes, {
    keys: node => (node.depth === 1 ? node.data.location!._id : ''),
    initial: transitionPhases.update,
    from: transitionPhases.enter,
    enter: transitionPhases.update,
    update: transitionPhases.update,
    leave: transitionPhases.leave,
  });

  return transition(({ x, y, opacity }, node) => {
    const { location, users } = node.data;
    return node.depth === 1 ? (
      <>
        <animated.rect
          x={x.to(x0 => x0)}
          y={y.to(y0 => y0)}
          width={x.to((x0, x1) => x1 - x0)}
          height={y.to((y0, y1) => y1 - y0)}
          strokeWidth={4}
          rx={20}
          ry={20}
          opacity={opacity}
          fill={`url(#gradient${location!.ui!.color})`}
          onClick={() =>
            history.push(`/location-logs?location=${location!._id}&active=1`)
          }
          cursor="pointer"
        />
        <animated.text
          x={x.to(x0 => x0)}
          y={y.to(y0 => y0)}
          dx={20}
          dy={40}
          opacity={opacity}
          fill="white"
          fontSize={21}
          fontWeight="800">{`${location!.name} (${
          users?.length
        }명)`}</animated.text>
        {users!.map((user, index) => (
          <animated.text
            x={x.to(x0 => x0)}
            y={y.to(y0 => y0)}
            dx={x.to((x0, x1) => 20 + 80 * (index % textPerLine(x0, x1)))}
            dy={x.to(
              (x0, x1) => 60 + Math.floor(index / textPerLine(x0, x1)) * 20,
            )}
            opacity={opacity}
            fill="white"
            fontWeight="500"
            key={user._id}>{`${user.rank} ${user.name}`}</animated.text>
        ))}
      </>
    ) : (
      <></>
    );
  });
};

const TreeMapNodes = ({
  treeMapData,
}: {
  treeMapData: HierarchyRectangularNode<Datum>;
}) => {
  const nodes = treeMapData.descendants();

  return (
    <Group>
      <Rects nodes={nodes} />
    </Group>
  );
};

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
        {treemap => <TreeMapNodes treeMapData={treemap} />}
      </Treemap>
    </svg>
  );
};

export default TreeMapChart;
