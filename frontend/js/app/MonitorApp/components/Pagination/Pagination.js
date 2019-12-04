import React from 'react';

import './style.scss';

const Pagination = ( props ) => {

    const { getPage, nextPage, prevPage } = props;

    return (
        <div className='pagination'>
            {
                prevPage ? 
                <button onClick={() => getPage(prevPage)} className="prevPage" type="button">◀</button>
                : <button disabled className="prevPage" type="button">◀</button>
            }
            {
                nextPage ? 
                <button onClick={() => getPage(nextPage)} className="nextPage"type="button">▶</button>
                : <button disabled className="nextPage" type="button">▶</button>
            }
        </div>
    );
}

export default Pagination;