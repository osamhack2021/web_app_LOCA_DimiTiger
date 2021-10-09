import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Header.css";

interface iprops {}
interface istate {
  date: Date;
  timeID: any;
  watch1: string;
  watch2: string;
  watch3: string;
}
class Header extends Component<iprops, istate> {
  constructor(props: iprops) {
    super(props);
    this.state = {
      date: new Date(),
      timeID: "",
      watch1: "",
      watch2: "",
      watch3: "",
    };
  }

  componentDidMount() {
    this.setState({
      timeID: setInterval(() => this.Change(), 1000),
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.timeID);
  }
  Change = () => {
    this.setState({
      date: new Date(),
      watch1: this.getToday(),
      watch2:
        ("0" + this.state.date.getHours()).slice(-2) +
        ":" +
        ("0" + this.state.date.getMinutes()).slice(-2),
      watch3: ("0" + this.state.date.getSeconds()).slice(-2),
    });
  };

  getToday = () => {
    const week: Array<string> = ["일", "월", "화", "수", "목", "금", "토"];
    const date: Date = this.state.date;
    const year: string = String(date.getFullYear());
    const month: string = ("0" + (1 + date.getMonth())).slice(-2);
    const day: string = ("0" + date.getDate()).slice(-2);
    const dayOfTheWeek: number = date.getDay();
    return year + "-" + month + "-" + day + " " + week[dayOfTheWeek] + "요일";
  };

  render() {
    return (
      <header>
        <div id="belong">
          <Link to="/">
            <img id="belong_logo" src="./icons/25div.png" alt="logo" />
            <p className="belong_name">
              70여단 <span>국사봉대대</span>
            </p>
          </Link>
        </div>
        <div id="watch_widget">
          <div className="vertical_line"></div>
          <div className="watch">
            <div className="date">{this.state.watch1}</div>
            <div className="time">
              {this.state.watch2}
              <div className="seconds">{this.state.watch3}</div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
