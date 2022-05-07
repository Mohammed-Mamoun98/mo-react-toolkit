import clsx from 'clsx';
import React from 'react';
import PropTypes from 'prop-types';
import './Skeleton.scss';
import ShowAt from '../ShowAt/ShowAt';

export const skeletonBg = 'rgba(255, 255, 255, 0.097)';
export default function Skeleton({ className, hideAt, children, loading, mockChildren, minHeight, noAnimation, ...rest }) {
  const baseCLassName = 'skeleton';
  const mergedClassName = clsx({ [baseCLassName]: loading && !noAnimation }, className);
  const minHeightObj = (loading && { minHeight }) || {};
  return (
    <ShowAt at={!hideAt}>
      <div {...rest} className={mergedClassName} style={{ ...minHeightObj, ...rest?.style }}>
        {loading ? mockChildren : children}
      </div>
    </ShowAt>
  );
}

Skeleton.defaultProps = {
  className: '',
  loading: false,
  mockChildren: null,
  noAnimation: false,
  children: null,
  minHeight: '',
  hideAt: false,
};

Skeleton.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  mockChildren: PropTypes.node,
  loading: PropTypes.bool,
  noAnimation: PropTypes.bool,
  hideAt: PropTypes.bool,
  minHeight: PropTypes.string,
};
