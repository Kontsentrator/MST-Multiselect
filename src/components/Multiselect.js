import './Multiselect.css';

const massiv = ["Вариант1", "Вариант2", "Треитй вариань"];
const options = massiv.map((option) => 
    <option key={option.id}>
        {option}
    </option>
);

function Multiselect() {
  return (
    <div className="Multiselect">
      <label htmlFor="multiselect_datasets" className="Form__label">Датасеты</label>
      <select id="multiselect datasets" className="Form__input">
        {options}
      </select>
    </div>
  );
}

export default Multiselect;
