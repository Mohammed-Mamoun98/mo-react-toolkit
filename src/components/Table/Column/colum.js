const schema = {
  Portion: 'New Portion',
};

export const colsTitleMapper = (cols = [], scheam = {}) =>
  cols.map((col) => ({
    ...col,
    title: schema?.[col.title] || col.title,
  }));
