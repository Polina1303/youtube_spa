import { Layout } from "antd";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppHeader from "./AppHeader";
import SearchPage from "./components/SearchPage";
import FavouritesPage from "./components/FavouritesPage";
import LoginPage from "./components/LoginPage";
import { Content, Footer } from "antd/lib/layout/layout";
const { Header } = Layout;

function App() {
  const [isToken, setIsToken] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  return (
    <div className="App">
      <Layout>
        {localStorage.getItem("token") ? (
          <>
            <Header>
              <AppHeader
                isToken={isToken}
                setIsToken={setIsToken}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            </Header>
            <Content style={{ background: "#fafafa" }}>
              <Routes>
                <Route
                  path="/youtube_spa"
                  element={
                    <SearchPage userInfo={userInfo} setUserInfo={setUserInfo} />
                  }
                />
                <Route
                  path="/youtube_spa/favourite"
                  element={
                    <FavouritesPage
                      userInfo={userInfo}
                      setUserInfo={setUserInfo}
                    />
                  }
                />
              </Routes>
            </Content>
            <Footer style={{ background: "#fafafa" }} />
          </>
        ) : (
          <Content className="content" style={{ background: "#fafafa" }}>
            <Routes>
              <Route
                path="/youtube_spa"
                element={
                  <LoginPage isToken={isToken} setIsToken={setIsToken} />
                }
              />
            </Routes>
            <Footer style={{ background: "#fafafa" }}></Footer>
          </Content>
        )}
      </Layout>
    </div>
  );
}

export default App;
