import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

function isFunction(functionToCheck) {
  return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export default function Tabs({ children, tabs, initCurrentTab, TabPicker }) {
  const shownTabs = useMemo(() => tabs.filter((tab) => !tab.hiddenAt), [tabs]);
  const [currentTab, setCurrentTab] = useState(initCurrentTab || shownTabs?.[0]?.id);

  const passPropsToChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { currentTab, setCurrentTab }),
  );

  useEffect(() => {
    if (initCurrentTab) setCurrentTab(initCurrentTab);
  }, [initCurrentTab]);

  return (
    <>
      <TabPicker currentTab={currentTab} setCurrentTab={setCurrentTab} tabs={shownTabs} />
      {passPropsToChildren}
    </>
  );
}

Tabs.Tab = ({ children, currentTab, setCurrentTab, tab }) => {
  const passPropsToChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, { currentTab, setCurrentTab }),
  );
  return <>{tab === currentTab && passPropsToChildren}</>;
};

Tabs.defaultProps = {
  initCurrentTab: null,
};

Tabs.Tab.defaultProps = {
  currentTab: '',
  setCurrentTab: () => {},
};

Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.node]).isRequired,
  tabs: PropTypes.array.isRequired,
  initCurrentTab: PropTypes.string,
  TabPicker: PropTypes.object.isRequired,
};

Tabs.Tab.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.node]).isRequired,
  currentTab: PropTypes.string,
  tab: PropTypes.string.isRequired,
  setCurrentTab: PropTypes.func,
};
