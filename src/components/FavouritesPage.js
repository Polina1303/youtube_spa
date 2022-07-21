import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFavorites, deleteFavourites } from "../redux/action";
import AddFavorites from "./AddFavourites";
import axios from "axios";

function FavouritesPage({ modalActive, setModalActive }) {
  const [visibleFavorites, setVisibleFavorites] = useState(false);
  const favorite = useSelector((state) => state.favorite);
  console.log("favorite", favorite);
  let user = localStorage.getItem("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDisabled = false;
  const KEY = "AIzaSyDGe046-b4QJAWJfVRH9493fuijBM85Pjs";
  const [valueRequest, setValueRequest] = useState("");
  const [resultsVideos, setResultsVideos] = useState([]);

  const [favorites, setFavorites] = useState([]);

  async function onSearchFromFavourites(item) {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          type: "video",
          maxResults: 12,
          order: "relevance",
          q: item,
          key: KEY,
        },
      }
    );
    console.log("reee", response);
    setValueRequest(item);
    setResultsVideos(response.data.items);

    navigate("/");
  }

  function onChangeFromFavorite(obj) {
    setVisibleFavorites(!visibleFavorites);
    dispatch(changeFavorites(obj));
    console.log(obj);
  }

  return (
    <div className="favourites">
      {visibleFavorites && (
        <AddFavorites
          valueRequest={valueRequest}
          setVisibleFavorites={setVisibleFavorites}
          visibleFavorites={visibleFavorites}
          active={modalActive}
          setActive={setModalActive}
        />
      )}
      <h1 className="favor">Избранное</h1>
      {favorite.length
        ? favorite
            .filter((item) => user == item.login)
            .map((item) => {
              return (
                <div key={item.id} className="button_favourites">
                  <Button
                    type="text"
                    onClick={() => onSearchFromFavourites(item.request)}
                  >
                    {item.title}
                  </Button>
                  <div className="button_change">
                    <Button
                      type="link"
                      onClick={() => onChangeFromFavorite(item)}
                    >
                      Изменить
                    </Button>
                    <Button
                      type="text"
                      danger
                      onClick={() => dispatch(deleteFavourites(item.id))}
                    >
                      Удалить
                    </Button>
                  </div>
                </div>
              );
            })
        : null}
    </div>
  );
}

export default FavouritesPage;
