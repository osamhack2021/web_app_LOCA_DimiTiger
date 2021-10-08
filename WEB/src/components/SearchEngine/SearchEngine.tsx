import React from 'react';
import './SearchEngine.css';

const SearchEngine = () => {
  return (
    <div id="search_engine">
      <div className="engine_headline">
        <img src="./icons/backspace_arrow.svg" alt="" />
        <div>유동병력 검색</div>
      </div>
      <div className="engine_container">
        <div className="search_bar">
          <img src="./icons/search.svg" alt="" />
          <input type="search" />
        </div>
      </div>
    </div>
  );
}
export default SearchEngine;