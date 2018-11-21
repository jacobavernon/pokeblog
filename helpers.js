// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// This is our data base
exports.menu = [
  { slug: '/blog', title: 'Blog' }
];
