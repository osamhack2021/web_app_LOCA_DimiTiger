import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Sidebar.css';

import { useLogout } from '../../atoms';

interface IProps {
  imgSrc: string;
  eleName: string;
  hover: boolean;
  link: string;
}

const SidebarComponent = (props: IProps) => {
  return (
    <Link to={props.link}>
      <div className={`sidebar_item${props.hover && ' flexStart'}`}>
        <img src={props.imgSrc} alt="" />
        {props.hover && (
          <div className="sidebar_item_name">{props.eleName}</div>
        )}
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [hover, setHover] = useState(false);
  const logout = useLogout();
  const sidebarMenu = [
    {
      imgSrc: './icons/sidebar_ico_home.svg',
      eleName: '홈',
      link: '/',
    },
    {
      imgSrc: './icons/sidebar_ico_search.svg',
      eleName: '유동병력검색',
      link: '/search',
    },
    {
      imgSrc: './icons/sidebar_ico_add_user.svg',
      eleName: '인원현황',
      link: '/',
    },
    {
      imgSrc: './icons/sidebar_ico_users.svg',
      eleName: '전체인원',
      link: '/',
    },
    {
      imgSrc: './icons/sidebar_ico_worker.svg',
      eleName: '근무자등록',
      link: '/',
    },
    {
      imgSrc: './icons/sidebar_ico_setting.svg',
      eleName: '설정',
      link: '/',
    },
  ];

  return (
    <div
      id="sidebar"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      {sidebarMenu.map((menu, i) => {
        return (
          <SidebarComponent
            imgSrc={menu.imgSrc}
            eleName={menu.eleName}
            hover={hover}
            link={menu.link}
            key={i}
          />
        );
      })}
      <div
        id="logout"
        className={`sidebar_item${hover && ' flexStart'}`}
        onClick={logout}>
        <img src="/icons/sidebar_ico_logout.svg" alt="" />
        {hover && <div className="sidebar_item_name">로그아웃</div>}
      </div>
    </div>
  );
};
export default Sidebar;
