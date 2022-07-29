import React, { useState } from "react";
import { useSelector } from "react-redux";

function Items() {
  const [sort, setSort] = useState("grid");
  let { posts } = useSelector((state) => state.posts);
  let valueRequest =
    posts && posts.config && posts.config.params && posts.config.params.q;
  let resultsVideos = posts && posts.data && posts.data.items;
  const video = [];
  if (sort == "list") {
    video.push("list_video");
  } else {
    video.push("grid_video");
  }
  return (
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
  );
}

export default Items;
