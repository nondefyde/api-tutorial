const USERS = [
  {
    id: 1,
    email: 'user1@gmail.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password',
    address: '10 Bode Thomos Ojuelegba',
    status: false,
    isAdmin: false,
  },
];

function UserStore() {
  this.data = [];
  this.nextId = 0;
  this.updateIdFlag = function () {
    this.nextId = this.data.length + 1;
  };
}

UserStore.prototype.init = function () {
  this.data = this.data.concat(USERS);
  this.updateIdFlag();
  return this;
};

UserStore.prototype.matchPassword = function (user, password) {
  return user.password === password;
};

UserStore.prototype.update = function (object, key) {
  for (let i = 0; i < this.length; i += 1) {
    if (String(this[i][key]) === String(object[key])) {
      this[i] = object;
      break;
    }
  }
};

UserStore.prototype.createNew = function (payload) {
  const defaultPayload = {
    id: this.nextId, status: false, isAdmin: false, address: null,
  };
  const object = Object.assign({}, defaultPayload, payload);
  this.data.push(object);
  this.updateIdFlag();
  return object;
};

UserStore.prototype.find = function () {
  return this.data;
};

UserStore.prototype.findByID = function (id) {
  return this.data.find(user => String(user.id) === id);
};

UserStore.prototype.findByEmail = function (email) {
  return this.data.find(user => user.email === email);
};

UserStore.prototype.deleteByID = function (object) {
  let index = -1;
  for (let i = 0; i < this.length; i += 1) {
    if (String(this[i].id) === String(object.id)) {
      index = i;
      break;
    }
  }
  this.data.splice(index, 1);
};

export default new UserStore().init();
