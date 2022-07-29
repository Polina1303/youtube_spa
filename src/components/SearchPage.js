import React, { useState } from "react";
import { Input } from "antd";
import {
  HeartOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import AddFavorites from "./AddFavourites";
import { search } from "../redux/action";
import { useDispatch, useSelector } from "react-redux";
import { axiosPosts } from "../redux/action";
import { SEARCH } from "./constans/constans";
import Items from "./Items";
const { Search } = Input;

function SearchPage() {
  const [visibleFavorites, setVisibleFavorites] = useState(false);
  const [modalActive, setModalActive] = useState(true);
  const [sort, setSort] = useState("grid");
  const dispatch = useDispatch();
  let { posts } = useSelector((state) => state.posts);
  let valueRequest =
    posts && posts.config && posts.config.params && posts.config.params.q;
  let resultsVideos = posts && posts.data && posts.data.items;

  const renderPosts = (value) => {
    return dispatch(axiosPosts(value));
  };

  const classes = [];
  if (resultsVideos) {
    classes.push("wrapper_top");
  } else {
    classes.push("wrapper");
  }

  const video = [];
  if (sort == "list") {
    video.push("list_video");
  } else {
    video.push("grid_video");
  }

  const value = useSelector((state) => state.posts);

  function handlerChange(e) {
    dispatch(search(SEARCH, e.target.value));
  }

  return (
    <div>
      <div className={classes.join(" ")}>
        <h1>Пoиск видео</h1>
        <Search
          placeholder="Что хотите посмотреть?"
          allowClear
          enterButton="Найти"
          size="large"
          onSearch={renderPosts}
          onChange={handlerChange}
          value={value.value}
          suffix={
            valueRequest ? (
              <HeartOutlined
                onClick={() => setVisibleFavorites(!visibleFavorites)}
              />
            ) : null
          }
        />
      </div>
      <div>
        {visibleFavorites && (
          <AddFavorites
            valueRequest={valueRequest}
            setVisibleFavorites={setVisibleFavorites}
            visibleFavorites={visibleFavorites}
            active={modalActive}
            setActive={setModalActive}
          />
        )}
      </div>
      <div>
        {valueRequest ? (
          <div className="list_or_grid">
            <h3>Видео по запросу:&#171;{valueRequest}&#187;</h3>
            <div>
              <div className="listgrid">
                <button
                  className="search__heart"
                  onClick={() => setSort("list")}
                >
                  <BarsOutlined style={{ fontSize: "25px" }} />
                </button>
                <button
                  className="search__heart"
                  onClick={() => setSort("grid")}
                >
                  <AppstoreOutlined style={{ fontSize: "25px" }} />
                </button>
              </div>
            </div>
          </div>
        ) : null}
        <>
          <Items />
        </>
      </div>
    </div>
  );
}

export default SearchPage;
