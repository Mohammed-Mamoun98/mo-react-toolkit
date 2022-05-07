import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import './Stepper.scss';

export const addPropsToChildren = (children, extraProps = {}) => {
  const childrenWithProps = React.Children.map(children, (child, index) => {
    if (!child) return;
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        ...extraProps,
      });
    }
    return child;
  });
  return childrenWithProps;
};

export default function Stepper({ currentStepIndex: passedIndex, children, ...rest }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  useEffect(() => {
    setCurrentStepIndex(passedIndex);
  }, [passedIndex]);
  const passPropsToChildren = useMemo(() => {
    let _index = 0;
    const childrenWithProps = React.Children.map(children, (child, index) => {
      if (!child) return;
      if (React.isValidElement(child)) {
        _index += 1;
        return React.cloneElement(child, {
          order: index,
          currentStepIndex,
        });
      }
      return child;
    });
    return childrenWithProps;
  }, [children, currentStepIndex]);

  return <div className="stepper">{passPropsToChildren}</div>;
}

Stepper.propTypes = {
  currentStepIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Stepper.Step = ({ children, currentStepIndex, order: parentOrder, passedOrder }) => {
  const order = passedOrder || parentOrder;
  const show = currentStepIndex === order;
  return <div>{show && children}</div>;
};

Stepper.Step.propTypes = {
  children: PropTypes.node.isRequired,
  currentStepIndex: PropTypes.number,
  order: PropTypes.number,
  passedOrder: PropTypes.number,
};

Stepper.Step.defaultProps = {
  currentStepIndex: 0,
  order: 0,
  passedOrder: 0,
};

Stepper.defaultProps = {
  currentStepIndex: 0,
};
