import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '../../Common';
import ShowAt from '../../Common/ShowAt/ShowAt';

export default function SkeletonWrapper({ loading, children, count, wrapperClass, ...rest }) {
  const mockArray = useMemo(() => new Array(count).fill({}).map(() => ({ id: Math.random(count * 10) })), [count]);
  return (
    <>
      {loading ? (
        <ShowAt at={loading}>
          <div className={wrapperClass}>
            {mockArray.map((elem) => (
              <Skeleton key={elem.id} {...rest} loading />
            ))}
          </div>
        </ShowAt>
      ) : (
        children
      )}
    </>
  );
}
SkeletonWrapper.defaultProps = {
  children: <></>,
};

SkeletonWrapper.propTypes = {
  children: PropTypes.node,
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  wrapperClass: PropTypes.string.isRequired,
};
