import React, { useState } from "react";
import { Input } from "antd";
import {
  HeartOutlined,
  BarsOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddFavorites from "./AddFavourites";

import { Button, Modal } from "antd";

const { Search } = Input;

function SearchPage(isToken, setIsToken) {
  const [valueRequest, setValueRequest] = useState("");
  const [resultsVideos, setResultsVideos] = useState([]);
  const [visibleFavorites, setVisibleFavorites] = useState(false);
  const KEY = "AIzaSyDGe046-b4QJAWJfVRH9493fuijBM85Pjs";

  const [result, setResult] = useState(null);
  const [modalActive, setModalActive] = useState(true);
  const [sort, setSort] = useState("grid");
  const isDisabled = true;

  async function onSearch(value) {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          type: "video",
          maxResults: 12,
          order: "relevance",
          q: value,
          key: KEY,
        },
      }
    );
    console.log(response);
    setValueRequest(value);
    setResultsVideos(response.data.items);
  }

  const classes = [];

  if (resultsVideos.length) {
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

  const columns = [];
  if (sort === "list") {
    columns.push("list_columns");
  } else {
    columns.push("grid_columns");
  }

  return (
    <div>
      <div>
        <h1>Пoиск видео</h1>
        <Search
          placeholder="Что хотите посмотреть?"
          allowClear
          enterButton="Найти"
          size="large"
          onSearch={onSearch}
          valueRequest={valueRequest}
          resultsVideos={resultsVideos}
          suffix={
            valueRequest ? (
              <HeartOutlined
                onClick={() => setVisibleFavorites(!visibleFavorites)}
              />
            ) : null
          }
        />
      </div>
      <div className={classes.join(" ")}>
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
                    <div className={columns.join(" ")}>
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
