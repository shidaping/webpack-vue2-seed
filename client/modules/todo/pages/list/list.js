const List = {
  // template: require('./list.html'), // eslint-disable-line
  template: `
    <div>
      {{msg}}
      {{name}}
      <input v-model="name" />
      <button v-on:click="handleClick">click</button>
    </div>
  `,
  methods: {
    handleClick: function() {
      alert(this.name);
    },  
  },
  data: () => {
    return {
      name: 'aa',
      msg: 'hello, world',
    };
  },
};
export default List;
