import React from "react";
import { Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { YoutubeOutlined } from "@ant-design/icons";

function AppHeader({ isToken, setIsToken }) {
  const navigate = useNavigate();

  async function logOut() {
    await localStorage.clear();
    await setIsToken(!isToken);
    navigate("/");
  }
  return (
    <div className="container-fluid">
      <div className="header">
        <YoutubeOutlined style={{ color: "#1390E5", fontSize: "60px" }} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["Поиск"]}>
          <Menu.Item>
            <Link to="/youtube_spa/">Поиск</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/youtube_spa/favourite">Избранное</Link>
          </Menu.Item>
          <Menu.Item>
            <div onClick={logOut}>Выйти</div>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
}

export default AppHeader;
