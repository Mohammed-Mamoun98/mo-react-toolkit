import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import trans from '../../../services/translate/translate';
import ShowAt from '../ShowAt/ShowAt';
import SkeletonWrapper from '../../hoc/SkeletonWrapper/SkeletonWrapper';
import './Table.scss';

const Up = () => <span className="font-white">&#11014;</span>;
const Down = () => <span className="font-white">&#11015;</span>;

export default function Table({
  dataSourse = [],
  cols = [],
  rowClass = 'table-row',
  hiddenCols = [],
  hiddenTitles = [],
  hideHeader = false,
  loading,
  noDataText,
  renderNoData,
  sortable,
  defaultSortProp,
  defaultIsAsc,
  onSort,
}) {
  const [sortProp, setSortProp] = useState(defaultSortProp || '');
  const [isAsc, setIsAsc] = useState(defaultIsAsc || false);

  const toggleSort = () => setIsAsc(!isAsc);

  const onColClick = (col) => {
    setSortProp(col.id);
    onSort(!isAsc);
    toggleSort();
  };
  const isStr = typeof dataSourse?.[0]?.[sortProp] === 'string';

  // const sortedDataSrc = useMemo(
  //   () =>
  //     sortable
  //       ? arraySort(dataSourse, sortProp, {
  //           isAsc,
  //           isString: isStr,
  //         })
  //       : dataSourse,
  //   [dataSourse, sortProp, isAsc],
  // );

  const renderedCols = useMemo(() => cols.filter((col) => !hiddenCols.includes(col.id)), [hiddenCols, cols]);
  const isHiddenTitle = (col) => hiddenTitles.includes(col?.title);
  const renderedTitle = (col) => (isHiddenTitle(col.id) ? '' : col.title && trans(col.title, false, false, false));

  return (
    <div className="table-wrapper">
      <table>
        {!hideHeader && (
          <thead>
            <tr>
              {renderedCols.map((col, index) => (
                <th key={col.title || index} className="white-space-pre">
                  <div className="d-flex align-center" onClick={() => onColClick(col)}>
                    {col.renderTitle ? col.renderTitle() : renderedTitle(col)}
                    {sortable && sortProp === col.id && <>{isAsc ? <Up /> : <Down />}</>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}
        <ShowAt at={!loading}>
          <tbody>
            {dataSourse.map((record, index) => (
              <tr key={record?.id || index} className={rowClass}>
                {renderedCols.map((col) => (
                  <td key={col?.title}>{col.render?.(record, record?.[col.id]) || record?.[col.id] || col.default}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </ShowAt>
      </table>
      <div className="flex flex-center-x w-100 text-light text-center">
        <ShowAt at={!!noDataText && !dataSourse.length && !loading}>
          {renderNoData || <span className="d-block my-2">{trans(noDataText)}</span>}
        </ShowAt>
        <SkeletonWrapper loading={loading} count={3} wrapperClass="d-flex flex-column gap-md" minHeight="3vh" />
      </div>
    </div>
  );
}
Table.defaultProps = {
  hiddenCols: [],
  hiddenTitles: [],
  hideHeader: false,
  loading: false,
  sortable: false,
  defaultIsAsc: false,
  rowClass: 'table-row',
  noDataText: null,
  renderNoData: null,
  defaultSortProp: '',
  onSort: () => {},
};

Table.propTypes = {
  dataSourse: PropTypes.array.isRequired,
  renderNoData: PropTypes.node,
  hiddenTitles: PropTypes.array,
  cols: PropTypes.array.isRequired,
  onSort: PropTypes.func,
  rowClass: PropTypes.string,
  hiddenCols: PropTypes.array,
  hideHeader: PropTypes.bool,
  sortable: PropTypes.bool,
  loading: PropTypes.bool,
  noDataText: PropTypes.string,
  defaultSortProp: PropTypes.string,
  defaultIsAsc: PropTypes.bool,
};
