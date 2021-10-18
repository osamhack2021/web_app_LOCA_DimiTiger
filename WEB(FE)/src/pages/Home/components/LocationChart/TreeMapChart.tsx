import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Group } from '@visx/group';
import { hierarchy, Treemap, treemapBinary } from '@visx/hierarchy';
import withParentSize, {
  WithParentSizeProvidedProps,
} from '@visx/responsive/lib/enhancers/withParentSizeModern';

import './LocationChart.css';

import { useLocationLogs } from '@/api/location-logs';
import { useLocations } from '@/api/locations';
import Location from '@/types/Location';
import User from '@/types/User';

interface Datum {
  location?: Location;
  users?: User[];
  children?: Datum[];
}

const Chart = ({
  parentWidth: width,
  parentHeight: height,
}: WithParentSizeProvidedProps) => {
  const { data: locations } = useLocations();
  const { data: locationLogs } = useLocationLogs({ active: true, limit: 0 });
  const history = useHistory();

  const data = useMemo<Datum>(() => {
    if (!locations || !locationLogs) {
      return {};
    }
    const children = locations
      .map(location => {
        const logs = locationLogs.filter(
          locationLog => locationLog.location._id === location._id,
        );
        return {
          location,
          users: logs.map(({ user }) => user),
          children: Array(logs.length).fill(''),
        };
      })
      .filter(location => location.users.length > 0);
    return {
      children,
    };
  }, [locations, locationLogs]);

  const root = useMemo(
    () =>
      hierarchy(data).sort((a, b) => {
        if (!a.data.users || !b.data.users) {
          return 0;
        }
        return b.data.users.length - a.data.users.length;
      }),
    [data],
  );

  root.count();

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={20} fill="white" />
      <Treemap<Datum>
        root={root}
        size={[width || 100, height || 100]}
        tile={treemapBinary}
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

const ChartWrapper = withParentSize(Chart);

const TreeChart = () => {
  return (
    <div id="location" className="dash_component">
      <div className="headline">
        <h1>유동병력 현황판</h1>
      </div>
      <div id="locationChart">
        <ChartWrapper />
      </div>
    </div>
  );
};
export default TreeChart;
