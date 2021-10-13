import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "components/Multiselect";
import { IItem } from "interfaces/interfaces";

const App: React.FC = () => {
  const API_ENDPOINT = "https://api-rguide.admire.social/api/product";
  const [items, setItems] = useState<IItem[] | string[]>([]);
  const [error, setError] = useState<Error>();

  // Получение списка по ссылке
  useEffect(() => {
    axios.get<IItem[]>(API_ENDPOINT).then(response => setItems(response.data))
      .catch(error => setError(error));
  }, [setItems]);

  return (
    <>
      {console.log(error?.message)}
      {error ? <span className="error">{error.message}</span> : ''}
      <Multiselect
        labelText="Выберите участников"
        items={[
          "Ануфриенко Н.",
          "Астафьев П.",
          "Участник 3",
          "Участник 4",
          "Участник 5",
        ]}
      />
      
      <Multiselect 
        labelText="Выберите устройства" 
        items={items} 
      />
    </>
  );
};

export default App;
