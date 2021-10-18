import React from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

import { useLogout } from '@/atoms';

interface IProps {
  imgSrc: string;
  eleName: string;
  link: string;
}

const SidebarComponent = (props: IProps) => {
  return (
    <Link to={props.link}>
      <div className="sidebar_item">
        <img src={props.imgSrc} alt="" />
        <div className="sidebar_item_name">{props.eleName}</div>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const logout = useLogout();
  const sidebarMenu = [
    {
      imgSrc: '/icons/sidebar_ico_home.svg',
      eleName: '홈',
      link: '/',
    },
    {
      imgSrc: '/icons/sidebar_ico_search.svg',
      eleName: '유동병력 검색',
      link: '/location-logs',
    },
    {
      imgSrc: '/icons/sidebar_ico_add_user.svg',
      eleName: '인원 현황',
      link: '/users',
    },
    {
      imgSrc: '/icons/sidebar_ico_users.svg',
      eleName: '장소 현황',
      link: '/locations',
    },
    {
      imgSrc: '/icons/sidebar_ico_beacon.svg',
      eleName: '비콘 현황',
      link: '/beacons',
    },
    {
      imgSrc: '/icons/sidebar_ico_emergency.svg',
      eleName: '긴급 신고 현황',
      link: '/emergencyReports',
    },
    {
      imgSrc: '/icons/sidebar_ico_setting.svg',
      eleName: '설정',
      link: '/settings',
    },
  ];

  return (
    <div id="sidebar">
      {sidebarMenu.map((menu, i) => {
        return (
          <SidebarComponent
            imgSrc={menu.imgSrc}
            eleName={menu.eleName}
            link={menu.link}
            key={i}
          />
        );
      })}
      <div className="sidebar_item" onClick={logout}>
        <img src="/icons/sidebar_ico_logout.svg" alt="" />
        <div className="sidebar_item_name">로그아웃</div>
      </div>
    </div>
  );
};
export default Sidebar;
