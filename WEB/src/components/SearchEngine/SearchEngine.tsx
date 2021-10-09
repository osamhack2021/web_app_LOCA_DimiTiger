import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { DatePicker, Input, Select, Space, Table } from "antd";
import { format } from "date-fns";

import "./SearchEngine.css";

import { useLocationLogs } from "../../api/location-logs";
import Location from "../../types/Location";
import User from "../../types/User";

const { RangePicker } = DatePicker;
const { Search } = Input;
const { Option } = Select;

const columns = [
  {
    title: "시간",
    dataIndex: "createdAt",
    key: "timestamp",
    width: "20%",
    render: (createdAt: string) =>
      format(new Date(createdAt), "yyyy-MM-dd HH:mm"),
  },
  {
    title: "인원",
    dataIndex: "user",
    key: "user",
    render: (user: User) => (
      <Link to={`/user/${user._id}`}>{`${user.rank} ${user.name}`}</Link>
    ),
  },
  {
    title: "장소",
    dataIndex: "location",
    key: "location",
    render: (location: Location) => (
      <Link to={`/location/${location._id}`}>{`${location.name}`}</Link>
    ),
  },
];

const SearchEngine = () => {
  const history = useHistory();
  const [range, setRange] = useState<string[]>();
  const [userName, setUserName] = useState<string>();
  const [location, setLocation] = useState<string>();
  const { data: locationLogs } = useLocationLogs({
    rangeStart: range && new Date(range[0]),
    rangeEnd: range && new Date(range[1]),
    location,
  });
  return (
    <div id="search_engine">
      <div className="engine_headline">
        <img
          src="./icons/backspace_arrow.svg"
          alt=""
          onClick={() => history.goBack()}
        />
        <div>유동병력 검색</div>
        <Space>
          <RangePicker
            showTime={{ format: "HH:mm" }}
            format="yyyy-MM-DD HH:mm"
            onChange={(_, range) => setRange(range)}
          />
          <Search onChange={(e) => setUserName(e.target.value)} loading />
          <Select
            defaultValue=""
            onChange={(value) => setLocation(value)}
            loading
          >
            <Option value="">전체위치</Option>
          </Select>
        </Space>
      </div>
      <div className="engine_container">
        <Table
          dataSource={locationLogs}
          columns={columns}
          style={{ flex: 1 }}
        />
      </div>
    </div>
  );
};
export default SearchEngine;
