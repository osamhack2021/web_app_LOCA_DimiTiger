import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

interface IProps {
  imgSrc: string,
  eleName: string,
  hover: any,
  link: string,
}

const SidebarComponent = (props: IProps) => {
  return (
    <Link to={props.link}>
    {
      props.hover.isHover ? 
        <div className="sidebar_item flexStart">
          <img src={props.imgSrc} alt="" />
          <div className="sidebar_item_name">{props.eleName}</div>
        </div>
        : 
        <div className="sidebar_item">
          <img src={props.imgSrc} alt="" />
        </div>
    }
    </Link>
  )
}

const Sidebar = () => {
  const [hover, setHover] = useState({ isHover: false })
  const onHover = () => {
    setHover({isHover: true});
  }
  const onHoverOut = () => {
    setHover({isHover: false});
  }
  const sidebarMenu = [
    { imgSrc: './icons/sidebar_ico_home.svg', eleName: '홈', hover: hover, link: '/' },
    { imgSrc: './icons/sidebar_ico_search.svg', eleName: '유동병력검색', hover: hover, link: '/search' },
    { imgSrc: './icons/sidebar_ico_add_user.svg', eleName: '인원현황', hover: hover, link: '/' },
    { imgSrc: './icons/sidebar_ico_users.svg', eleName: '전체인원', hover: hover, link: '/' },
    { imgSrc: './icons/sidebar_ico_worker.svg', eleName: '근무자등록', hover: hover, link: '/' },
    { imgSrc: './icons/sidebar_ico_setting.svg', eleName: '설정', hover: hover, link: '/' },
    { imgSrc: './icons/sidebar_ico_logout.svg', eleName: '로그아웃', hover: hover, link: '/' },
  ]

  return (
    <div id="sidebar" onMouseOver={onHover} onMouseLeave={onHoverOut}>
      {
        sidebarMenu.map((menu, i) => {
          return <SidebarComponent imgSrc={menu.imgSrc} eleName={menu.eleName} hover={hover} link={menu.link} key={i}></SidebarComponent>
        })
      }
    </div>
  );
}
export default Sidebar;