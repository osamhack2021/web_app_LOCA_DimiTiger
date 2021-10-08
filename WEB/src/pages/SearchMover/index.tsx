import React, { Component } from "react";
import Header from "../../components/Header/Header";
import SearchMover from "../../components/SearchMover/SearchMover";
import Sidebar from "../../components/Sidebar/Sidebar";

class Home extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "#f2f3f5",
        }}
      >
        <Header></Header>
        <SearchMover></SearchMover>
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Home;
