import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

function SideBar(props) {
  const {
    history,
    location: { pathname },
    IN_APP_ROUTES,
  } = props;
  const expanded = true;
  return (
    <SideNav
      className="Sidebar-fixe"
      expanded={expanded}
      onToggle={(expan) => {
        console.log({ expan });
      }}
      onSelect={(selected) => {
        const to = selected;
        if (pathname !== to) {
          history.push(to);
        }
      }}
    >
      <SideNav.Toggle />
      <SideNav.Nav defaultSelected="home">
        {IN_APP_ROUTES.map((inApp, index) => (
          <NavItem eventKey={inApp.path} key={index}>
            <NavIcon>{inApp.icon(inApp.path === pathname ? 'text-primary icon-sidebar' : 'icon-sidebar')}</NavIcon>
            <NavText>{inApp.name}</NavText>
          </NavItem>
        ))}
      </SideNav.Nav>
    </SideNav>
  );
}

export default SideBar;
