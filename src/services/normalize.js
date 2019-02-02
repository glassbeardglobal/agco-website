const normalize = (data) => {
  const normalized = { byId: {}, allIds: [] };
  data.forEach((el) => {
    normalized.byId[el._id] = el;
    normalized.allIds.push(el._id);
  });
  return normalized;
};

export default normalize;
