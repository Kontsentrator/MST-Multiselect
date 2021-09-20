import React, {useState, useEffect} from "react";
import axios from "axios";
import Multiselect from "./Multiselect";
import { IItem } from 'interfaces/interfaces';

const App: React.FC = () => {
    const [items, setItems] = useState<IItem[]>([]);
    // Получение списка по ссылке
    useEffect(() => {
        axios.get<IItem[]>("https://api-rguide.admire.social/api/products")
        .then(function(response) {
            setItems(response.data);
        })
    }, [setItems]);

    return(
        <Multiselect items={items} />
    );
}

export default App;