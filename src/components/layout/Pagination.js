import React, { useContext } from 'react';
import ReactPaginate from 'react-paginate';
import GithubContext from '../../context/github/githubContext';
const Pagination = () => {
  const githubContext = useContext(GithubContext);

  return (
    githubContext.totalCount != 0 && (
      <div className="row" style={{ margin: '5%' }}>
        <div className="col s12">
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={githubContext.pageCount}
            marginPagesDisplayed={10}
            pageRangeDisplayed={10}
            onPageChange={githubContext.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </div>
      </div>
    )
  );
};

export default Pagination;
