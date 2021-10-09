import { Table } from "antd";

import "./SearchEngine.css";

import { useLocationLogs } from "../../api/location-logs";
import User from "../../types/User";
import { Link } from "react-router-dom";
import Location from "../../types/Location";

const columns = [
  {
    title: "시간",
    dataIndex: "createdAt",
    key: "timestamp",
    width: "20%",
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
  const { data: locationLogs } = useLocationLogs();
  return (
    <div id="search_engine">
      <div className="engine_headline">
        <img src="./icons/backspace_arrow.svg" alt="" />
        <div>유동병력 검색</div>
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
