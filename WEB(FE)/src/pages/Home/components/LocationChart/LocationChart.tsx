import { useMemo } from 'react';
import { hierarchy } from '@visx/hierarchy';
import { withParentSize } from '@visx/responsive';
import { WithParentSizeProvidedProps } from '@visx/responsive/lib/enhancers/withParentSizeModern';
import { Button } from 'antd';
import { useRecoilState, useRecoilValue } from 'recoil';

import PackChart from './PackChart';
import TreeMapChart from './TreeMapChart';

import { useLocationLogs } from '@/api/location-logs';
import { useLocations } from '@/api/locations';
import { chartExpandedState, settingsState } from '@/atoms';
import LargeCard from '@/components/LargeCard';
import Location from '@/types/Location';
import User from '@/types/User';

export interface Datum {
  id: string;
  location?: Location;
  users?: User[];
  children?: Datum[];
}

const Chart = ({
  parentWidth: width,
  parentHeight: height,
}: WithParentSizeProvidedProps) => {
  const { data: locations } = useLocations({ limit: 0 });
  const { data: locationLogs } = useLocationLogs({ active: true, limit: 0 });
  const { chartDesign } = useRecoilValue(settingsState);

  const data = useMemo<Datum>(() => {
    if (!locations || !locationLogs) {
      return { id: 'root' };
    }
    const children = locations
      .map(location => {
        const logs = locationLogs.filter(
          locationLog => locationLog.location._id === location._id,
        );
        return {
          id: location._id,
          location,
          users: logs.map(({ user }) => user),
          children: logs.map(v => ({
            id: `${location._id}-${v.user._id}`,
          })),
        };
      })
      .filter(location => location.users.length > 0);
    return {
      id: 'root',
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

  return chartDesign === 'treemap' ? (
    <TreeMapChart root={root} width={width || 100} height={height || 100} />
  ) : (
    <PackChart root={root} width={width || 100} height={height || 100} />
  );
};

const ChartWrapper = withParentSize(Chart);

const LocationChart = () => {
  const [chartExpanded, setChartExpanded] = useRecoilState(chartExpandedState);
  const { chartDesign } = useRecoilValue(settingsState);
  return (
    <LargeCard
      title="유동병력 현황판"
      style={{
        height: chartExpanded
          ? 'calc(100vh - 160px)'
          : 'calc((100vh - 190px) * 0.7)',
      }}
      headerStyle={{ height: '80px' }}
      bodyStyle={{
        height: chartExpanded
          ? 'calc(100vh - 240px)'
          : 'calc((100vh - 190px) * 0.7 - 80px)',
        padding: chartDesign === 'treemap' ? 0 : 20,
      }}
      headerComponent={
        <Button
          onClick={() => setChartExpanded(!chartExpanded)}
          style={{ marginBottom: 0 }}>
          {chartExpanded ? '축소' : '확대'}
        </Button>
      }>
      <ChartWrapper />
      <svg>
        <linearGradient id="gradientRed" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fd3a84" />
          <stop offset="1" stopColor="#ffa68d" />
        </linearGradient>
        <linearGradient id="gradientGreen" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#00b59c" />
          <stop offset="1" stopColor="#9cffac" />
        </linearGradient>
        <linearGradient id="gradientBlue" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0" stopColor="#5558ff" />
          <stop offset="1" stopColor="#00c0ff" />
        </linearGradient>
        <linearGradient id="gradientYellow" x1="0%" x2="0%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#fd5900" />
          <stop offset="100%" stopColor="#feba00" />
        </linearGradient>
      </svg>
    </LargeCard>
  );
};

export default LocationChart;
