import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'rc-pagination';
import trans from 'translate';
import './Paginator.scss';

const Paginator = ({ pageSize, total, records, children }) => {
  const [page, setPage] = useState(1);
  const calculateRenderedRecords = () => records.slice((page - 1) * pageSize, page * pageSize);
  const renderedRecords = useMemo(() => calculateRenderedRecords(), [records, page, pageSize]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    setPage(1);
  }, [records.length]);

  return (
    <>
      <>{children?.({ renderedRecords })}</>
      {records?.length / pageSize > 1 && (
        <div className="rc-paginator">
          <Pagination
            onChange={handlePageChange}
            current={page}
            pageSize={pageSize}
            total={records.length}
            showPrevNextJumpers
          />
        </div>
      )}
    </>
  );
};

Paginator.defaultProps = {
  pageSize: 4,
  records: [],
  children: null,
  total: 0,
};

Paginator.propTypes = {
  pageSize: PropTypes.number,
  total: PropTypes.number,
  records: PropTypes.array,
  children: PropTypes.func,
};

export default Paginator;
