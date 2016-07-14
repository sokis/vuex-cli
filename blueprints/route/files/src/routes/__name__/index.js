// Sync route definition
export default {
  name: '<%= pascalEntityName %>',
  title: '<%= pascalEntityName %>',
  exact: true,
  component: resolve => require(['./components/<%= pascalEntityName %>View'], resolve)
};
// <%= pascalEntityName %>
// <%= camelEntityName %>
// <%= snakeEntityName %>
// <%= dashesEntityName %>


