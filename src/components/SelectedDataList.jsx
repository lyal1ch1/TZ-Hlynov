import React from "react";

const SelectedDataList = ({ selectedDataList, removeItemFromList }) => {
  return (
    <div>
      <h1>Выбранные данные</h1>
      <ul>
        {selectedDataList.map((item, index) => (
          <li key={index}>
            😋 {item.title} (Количество: {item.count})
            <button onClick={() => removeItemFromList(index)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedDataList;
