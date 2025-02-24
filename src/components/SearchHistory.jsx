import { FixedSizeList as List } from 'react-window';

const SearchHistory = ({ history, onSearch }) => (
  <div className="history">
    <h3>История поиска:</h3>
    <List
      height={150}
      itemCount={history.length}
      itemSize={35}
      width="100%"
    >
      {({ index, style }) => (
        <div style={style} onClick={() => onSearch(history[index])}>
          {history[index]}
        </div>
      )}
    </List>
  </div>
);

export default SearchHistory;