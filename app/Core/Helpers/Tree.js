'use script';

module.exports = (items = []) => {
  if (!Array.isArray(items)) {
    throw new TypeError('Expected an array but got an invalid argument');
  }

  let tree = [];
  let node = {};

  items.forEach(item => node[item.id] = { ...item, children: [] });

  Object.values(node).forEach(({ id, parent_id }) => {
    if(parent_id in node) {
      node[parent_id].children.push(node[id]);
    } else {
      tree.push(node[id])
    }
  });

  return tree;
}
