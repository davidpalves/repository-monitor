import React from 'react';

import '../../../../../sass/components/pagination.scss';

const Pagination = (props) => {
  const { getPage, nextPage, prevPage } = props;

  return (
    <div className="pagination">
      {prevPage ? (
        <button className="prevPage" type="button" onClick={() => getPage(prevPage)}>
          ◀
        </button>
      ) : (
        <button className="prevPage" disabled type="button">
          ◀
        </button>
      )}
      {nextPage ? (
        <button className="nextPage" type="button" onClick={() => getPage(nextPage)}>
          ▶
        </button>
      ) : (
        <button className="nextPage" disabled type="button">
          ▶
        </button>
      )}
    </div>
  );
};

export default Pagination;
