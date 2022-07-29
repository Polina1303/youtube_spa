import React, { useState, useEffect } from "react";
import { Input } from "antd";
import {
  HeartOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddFavorites from "./AddFavourites";
import { search } from "../redux/action";

import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { axiosPosts } from "../redux/action";
import { SEARCH } from "./constans/constans";

const { Search } = Input;

function SearchPage() {
  // const [valueRequest, setValueRequest] = useState("");
  // const [resultsVideos, setResultsVideos] = useState([]);
  const [visibleFavorites, setVisibleFavorites] = useState(false);

  const [modalActive, setModalActive] = useState(true);
  const [sort, setSort] = useState("grid");
  const isDisabled = true;

  const dispatch = useDispatch();

  // const posts = useSelector((state) => state.posts.posts);
  // const params = useSelector((state) => state.posts.posts.config.params);
  // console.log(params);
  // const { params } = state.posts.posts.config.params;

  let { posts } = useSelector((state) => state.posts);
  console.log("posts", posts);
  let valueRequest =
    posts && posts.config && posts.config.params && posts.config.params.q;
  console.log("valueRequest", valueRequest);

  let resultsVideos = posts && posts.data && posts.data.items;
  // posts.data.items.id &&
  // posts.data.item.id.videoId;
  console.log("resultsVideos", resultsVideos);

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
    console.log("value search", value.value);
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
          // valueRequest={value.value}
          // resultsVideos={resultsVideos}
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
        <div className={video.join(" ")}>
          {valueRequest &&
            resultsVideos.map((item) => {
              let link = `https://www.youtube.com/embed/${item.id.videoId}`;
              console.log("item", item);
              return (
                <div>
                  <div>
                    <iframe src={link}> </iframe>
                    <div>
                      <h3>{item.snippet.title}</h3>
                      <p>{item.snippet.channelTitle} </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
