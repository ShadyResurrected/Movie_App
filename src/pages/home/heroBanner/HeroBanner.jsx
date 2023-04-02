import React, { useState, useEffect } from "react";
import "./style.scss";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  const { data, loading } = useFetch("/movie/popular");

  useEffect(() => {
    // to get random value
    // ? is used to check whether data exists or not. This is called optional chaining
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = (e) => {
    // only execute this method when the enter key is pressed and the length of typed text is not null
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>
      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome</span>
          <span className="subTitle">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nisi, quo?
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies or tv shows.."
              onKeyUp={searchQueryHandler}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;
