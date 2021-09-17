import './Multiselect.css';
import axios from 'axios';
import {useState, useEffect, useRef} from 'react';

import clear_img from './img/Clear.svg';
import triangle_img from './img/Triangle.svg';

function Multiselect() {
  const [isOpen, setIsOpen] = useState(false);
  const [massiv, setMassiv] = useState([]);
  const [selectedMassiv, setSelectedMassiv] = useState([]);
  const wrapRef = useRef(null);

  useEffect(() => {
    axios.get("https://api-rguide.admire.social/api/products")
    .then(function (response) {
      setMassiv(response.data);
    })
  }, [setMassiv]);

  useEffect(() => {
    function handleOutOfListClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }

    window.addEventListener("mouseup", handleOutOfListClick);
    return () => {
      window.removeEventListener("mouseup", handleOutOfListClick);
    };
  });

  function handleСlearClick() {
    setSelectedMassiv([]);
  }

  function handleOpenCloseClick() {
    setIsOpen(!isOpen);
  }

  function handleCheckBoxClick(e) {
    var id = e.currentTarget.value;
    var items = selectedMassiv;
    
    if(e.currentTarget.checked) {
      items.push(massiv.find(el => el.id == id));
    } else {
      items.splice(id, 1); 
    }
    setSelectedMassiv(items);
    console.log(selectedMassiv);
  }

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">Датасеты</label>

      <div id="multiselect__datasets" className="multiselect" ref={wrapRef}>
        <div className="multiselect__selected-items">
          <ul className="multiselect__selected-items-list">
            {selectedMassiv.map((item) =>
              <li key={item.id} className="selected-item">
                <span className="selected-item__text">{item.title}</span>
                <button className="button-clear"><img src={clear_img} alt="Убрать" /></button>
              </li>
            )}
          </ul>
        
          <div className="multiselect__console">
            <button className="button-clear" onClick={handleСlearClick}><img src={clear_img} alt="Очистить" /></button>
            <div className="gate" />
            <button className="button-open" onClick={handleOpenCloseClick}><img src={triangle_img} alt="Открыть" /></button>
          </div>
        </div>

        <div className={isOpen ? "multiselect__items_active" : "multiselect__items"}>
          <ul className="multiselect__items-list">
            {massiv.map((item) =>
              <li key={item.id} className="item__data">
                <label>
                  <input type="checkbox" value={item.id} onChange={handleCheckBoxClick}></input>
                  {item.title}
                </label>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Multiselect;