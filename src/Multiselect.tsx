import './Multiselect.css';
import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {IItem} from './interfaces/interfaces';

import ListItem from './ListItem';

import clear_img from './img/Clear.svg';
import triangle_img from './img/Triangle.svg';

const Multiselect: React.FC = () => {
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);
  const [massiv, setMassiv] = useState<IItem[]>([]);
  const [selectedMassiv, setSelectedMassiv] = useState<IItem[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Получение списка по ссылке
  useEffect(() => {
    axios.get("https://api-rguide.admire.social/api/products")
    .then(function(response) {
      setMassiv(response.data);
    })
  }, [setMassiv]);

  // Закрытие списка при клике мимо него
  useEffect(() => {
    function handleOutOfListClick(e: Event) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as HTMLElement)) {
        setListIsOpen(false);
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

  function handleOpenCloseListClick() {
    setListIsOpen(prev => {return !prev});
  }

  function handleCheckBoxClick(e: React.FormEvent<HTMLInputElement>, id: number) {   
    if(e.currentTarget.checked) {
      var item = massiv.find(el => el.id === id)!;
      setSelectedMassiv(prev => [item, ...prev]);
    } else {
      setSelectedMassiv(prev => prev.filter(item => item.id !== id));
    }
  }

  function handleDeleteClick(id: number) {
    setSelectedMassiv(prev => prev.filter(item => item.id !== id));
  }

  return (
    <div className="form__item">
      <label htmlFor="multiselect__datasets" className="label">Датасеты</label>

      <div id="multiselect__datasets" className="multiselect" ref={wrapRef}>
        <div className="multiselect__selected-items">
          <ul className="multiselect__selected-items-list">
            {selectedMassiv.map((item) =>
              <li key={item.id} id={item.id.toString()} className="selected-item">
                <span className="selected-item__text">{item.title}</span>
                <button className="button-clear" onClick={() => handleDeleteClick(item.id)}><img src={clear_img} alt="Убрать" /></button>
              </li>
            )}
          </ul>
        
          <div className="multiselect__console">
            <button className="button-clear" onClick={handleСlearClick}><img src={clear_img} alt="Очистить" /></button>
            <div className="gate" />
            <button className="button-open" onClick={handleOpenCloseListClick}><img src={triangle_img} alt="Открыть" /></button>
          </div>
        </div>

        <div className={listIsOpen ? "multiselect__items_active" : "multiselect__items"}>
          <ul className="multiselect__items-list">
            
            {massiv.map((item) =>
              <ListItem item={item} checked={selectedMassiv.includes(item)} onChange={(e) => handleCheckBoxClick(e, item.id)} />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Multiselect;