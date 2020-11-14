/**
 * Преобразует массив во воложенный объект
 * @param {Array} items
 * @return {object}
 */
const reduceTree = (items = []) => {
  let tree = [];
  let node = {};

  items.forEach(item => node[item.id] = Object.assign(item, { children: [] }));
  Object.values(node).forEach(({ id, parent_id }) => {
    if(parent_id in node) {
      node[parent_id].children.push(node[id]);
    } else {
      tree.push(node[id])
    }
  });

  const res = [...tree];

  tree = null;
  node = null;

  return res;
}


module.exports = { reduceTree }
