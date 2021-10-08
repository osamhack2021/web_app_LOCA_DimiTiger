import { Table } from "antd";

import "./SearchEngine.css";

import { useLocationLogs } from "../../api/location-logs";

const columns = [
  {
    title: "시간",
    dataIndex: "createdAt",
    key: "timestamp",
  },
  {
    title: "인원",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "장소",
    dataIndex: "location",
    key: "location",
  },
];

const SearchEngine = () => {
  const { locationLogs } = useLocationLogs();
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
        ;
      </div>
    </div>
  );
};
export default SearchEngine;
