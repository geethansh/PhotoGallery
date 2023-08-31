import React, { useState, useEffect} from "react";
import "./App.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const GalleryApp = () => {
  const[items, setItems] = useState([]);
  const[isLoading, setIsLoading] = useState(true);
  const[currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get(`https://picsum.photos/v2/list?page=${currentPage}`)
      .then(response => {
        setIsLoading(false);
        setItems(prevItems => [...prevItems, ...response.data]);
        setCurrentPage(currentPage + 1);
      });
  };

  window.addEventListener("scroll", () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      fetchData();
    }
  });

  const handleLike = (index) => {
    const updatedItems = [...items];
    updatedItems[index].likes = (updatedItems[index].likes || 0) + 1;
    setItems(updatedItems);
  };

  return (
    <>
      <h1 className="custom-heading">Image Gallery</h1>
      <div className="custom-container">
        {items.map((item, index) => (
          <div key={index} className="custom-item">
            <img
              src={item.download_url}
              alt="Item Image"
              className="item-image"
            />
            <div className="item-info">
              <div className="item-author">{item.author}</div>
              <div className="like-section">
                <button className="like-button" onClick={() => handleLike(index)}>
                  <FontAwesomeIcon icon={faThumbsUp}/>
                </button>
                <span className="like-count">
                  {item.likes || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="custom-loading">Loading...</div>}
      </div>
    </>
  );
};

export default GalleryApp;
