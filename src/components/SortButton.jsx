import { Button } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';
import { useState } from 'react';

const SortButton = () => {
  const [isSortAscending, setIsSortAscending] = useState(true);

  const handleSort = () => {
    setIsSortAscending((prevState) => !prevState);
  };

  return (
    <Button
      style={{ margin: '0px 5px' }}
      size="large"
      type="primary"
      onClick={handleSort}
    >
      {isSortAscending ? (
        <>
          Сортировать по алфавиту <SortAscendingOutlined />
        </>
      ) : (
        <>
          Сортировать по алфавиту <SortDescendingOutlined />
        </>
      )}
    </Button>
  );
};

export default SortButton;