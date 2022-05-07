import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShowAt from '../../Common/ShowAt/ShowAt';

export default function DelayedRender({ children, ms }) {
  const [render, setRender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRender(true);
    }, ms);
  }, []);
  return <ShowAt at={render}>{children}</ShowAt>;
}
DelayedRender.defaultProps = {
  ms: 1000,
};
DelayedRender.propTypes = {
  children: PropTypes.node.isRequired,
  ms: PropTypes.number,
};
