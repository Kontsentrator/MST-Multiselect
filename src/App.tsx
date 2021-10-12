import React, { useState, useEffect } from "react";
import axios from "axios";
import Multiselect from "components/Multiselect";
import { IItem } from "interfaces/interfaces";

const App: React.FC = () => {
  const API_ENDPOINT = "https://api-rguide.admire.social/api/products";
  const [items, setItems] = useState<IItem[] | string[]>([]);

  // Получение списка по ссылке
  useEffect(() => {
    axios.get<IItem[]>(API_ENDPOINT).then(function (response) {
      setItems(response.data);
    });
  }, [setItems]);

  return (
    <>
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
      <Multiselect labelText="Выберите устройства" items={items} />
    </>
  );
};

export default App;
