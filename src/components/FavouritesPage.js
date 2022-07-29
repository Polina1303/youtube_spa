import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeFavorites, deleteFavourites } from "../redux/action";
import { axiosPosts } from "../redux/action";

function FavouritesPage({ modalActive, setModalActive }) {
  const [visibleFavorites, setVisibleFavorites] = useState(false);
  const favorite = useSelector((state) => state.favorite);
  let user = localStorage.getItem("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { posts } = useSelector((state) => state.posts);
  let valueRequest =
    posts && posts.config && posts.config.params && posts.config.params.q;
  console.log("valueRequest", valueRequest);

  function onSearchFromFavourites(value) {
    dispatch(axiosPosts(value));
    navigate("/");
  }

  function onChangeFromFavorite(obj) {
    setVisibleFavorites(!visibleFavorites);
    dispatch(changeFavorites(obj));
  }

  return (
    <div className="favourites">
      <h1 className="favor">Избранное</h1>
      {favorite.length
        ? favorite
            .filter((item) => user == item.login)
            .map((item) => {
              return (
                <div key={item.id} className="button_favourites">
                  <Button
                    value={item.title}
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
