import User from "./User";

export default class UsersStore {

  constructor(eventbus) {
    this.eventbus = eventbus;
    this.STORAGE_ID = "hotelbooking";
  }

  getUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_ID + "_users") || "[]");
  }

  putUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_ID + "_users", JSON.stringify(users));
  }

  findUserById(id: string): User {
    let users: User[] = this.getUsers();
    for (let user of users) {
      if (user.id === id) {
        return user;
      }
    }
    return null;
  }

  saveUser(user: User): void {
    let users: User[] = this.getUsers();
    for (let i = 0, len = users.length; i < len; i++) {
      let _user = users[i];
      if (_user.id === user.id) {        
        users[i] = user;
        break;
      }      
    }
    this.putUsers(users);
  }

}
