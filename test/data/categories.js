const seedData = [
  { name: "Books", parentId: 0 },        // 1
  { name: "Programming", parentId: 1 },  // 2
  { name: "Languages", parentId: 2 },    // 3
  { name: "Databases", parentId: 2 },    // 4
  { name: "MongoDB", parentId: 4 },      // 5
  { name: "dbm", parentId: 4 },          // 6
];

const seedDataDelete = [
  { name: "Books", parentId: 0 },        // 7
  { name: "Programming", parentId: 7 },  // 8
  { name: "Languages", parentId: 7 },    // 9
  { name: "Databases", parentId: 8 },    // 10
  { name: "MongoDB", parentId: 8 },      // 11
  { name: "dbm", parentId: 9 },          // 12
];

const seedDataUpdate = [
  { name: "Books", parentId: 0 },        // 13
  { name: "Programming", parentId: 0 },  // 14
  { name: "Languages", parentId: 13 },   // 15
  { name: "Databases", parentId: 14 },   // 16
  { name: "MongoDB", parentId: 14 },     // 17
  { name: "dbm", parentId: 17 },         // 18
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
];

const seedTreeDelete = [
  {
    id: 7,
    parent_id: 0,
    name: 'Books',
    left: 1,
    right: 6,
    children: [
      {
        id: 9,
        parent_id: 7,
        name: 'Languages',
        left: 2,
        right: 5,
        children: [
          {
            id: 12,
            parent_id: 9,
            name: 'dbm',
            left: 3,
            right: 4,
            children: []
          }
        ]
      }
    ]
  }
];

const seedTreeUpdate = [];

module.exports = {
  seedData,
  seedDataDelete,
  seedDataUpdate,
  seedTree,
  seedTreeDelete,
  seedTreeUpdate
}
