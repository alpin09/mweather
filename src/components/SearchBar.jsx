import React, { useState } from 'react';
import { FixedSizeList as List } from 'react-window';

const SearchBar = ({ onSearch, searchHistory }) => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery('');
      setShowHistory(false);
    }
  };

  const Row = ({ index, style }) => (
    <div
      style={style}
      className="history-item"
      onMouseDown={() => {
        setQuery(searchHistory[index]);
        onSearch(searchHistory[index]);
        setShowHistory(false);
      }}
    >
      {searchHistory[index]}
    </div>
  );

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowHistory(e.target.value === '');
          }}
          onFocus={() => setShowHistory(query === '')}
          onBlur={() => setTimeout(() => setShowHistory(false), 200)}
          placeholder="Введите город..."
        />
        <button type="submit">Поиск</button>
      </form>

      {showHistory && searchHistory.length > 0 && (
        <div className="history-dropdown">
          <List
            height={150} // Высота списка
            itemCount={searchHistory.length} // Количество элементов
            itemSize={35} // Высота каждого элемента
            width={300} // Ширина списка
          >
            {Row}
          </List>
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBar); // Минимизируем перерисовки