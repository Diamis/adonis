const seedData = [
  { name: "Books", parentId: 0, left: 1, right: 12 },
  { name: "Programming", parentId: 1, left: 2, right: 11  },
  { name: "Languages", parentId: 2, left: 3, right: 4 },
  { name: "Databases", parentId: 2, left: 5, right: 10 },
  { name: "MongoDB", parentId: 4, left: 6, right: 7  },
  { name: "dbm", parentId: 4, left: 8, right: 9 },
];

const seedTree = [
  {
    id: 1,
    name: "Books",
    parent_id: 0,
    left: 1,
    right: 12,
    children: [
      {
        id: 2,
        name: "Programming",
        parent_id: 1,
        left: 2,
        right: 11,
        children: [
          {
            id: 3,
            name: "Languages",
            parent_id: 2,
            left: 3,
            right: 4,
            children: []
          },
          {
            id: 4,
            name: "Databases",
            parent_id: 2,
            left: 5,
            right: 10,
            children: [
              {
                id: 5,
                name: "MongoDB",
                parent_id: 4,
                left: 6,
                right: 7,
                children: []
              },
              {
                id: 6,
                name: "dbm",
                parent_id: 4,
                left: 8,
                right: 9,
                children: []
              }
            ]
          },
        ]
      },
    ]
  },

]

module.exports = {
  seedData,
  seedTree
}
