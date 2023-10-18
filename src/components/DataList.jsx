import React from "react";

const DataList = ({ dataList, addItemToLsit }) => {
  return (
    <div>
      <h1>Список пиц</h1>
      <ul>
        {dataList.map((item, index) => (
          <li key={index}>
            🍕 {item.title}
            <button onClick={() => addItemToLsit(item)}>Выбрать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
