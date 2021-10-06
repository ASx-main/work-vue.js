export default {
  genId: 1,
  users: [],
  createUser(user) {
    this.users.push({ id: this.genId, ...user });
    this.genId += 1;

    return true;
  },
};
