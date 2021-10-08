import React, { Component } from "react";
import Dashboard from "../../components/Dashboard/Dashboard";
import Header from "../../components/Header/Header";
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
        <Dashboard></Dashboard>
        <Sidebar></Sidebar>
      </div>
    );
  }
}

export default Home;
