const users = [{ id: "1", name: "Mubbashir Qureshi" }];

function addUser(user) {
    users.push(user);
}

function updateUser(id, user) {
    const userIndex = users.findIndex((user) => user.id == id);
    users[userIndex] = user;
}

module.exports = {
    users,
    addUser,
    updateUser,
};
