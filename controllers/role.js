const Role = require('../models/Role');

const roles = [
    { name: 'user' },
    { name: 'moderator' },
    { name: 'admin' }
];

exports.createRoles = async () => {
    try {
        for (const role of roles) {
            const existingRole = await Role.findOne({ name: role.name });
            if (!existingRole) {
                const newRole = new Role(role);
                await newRole.save();
            }
        }
        console.log('Roles created');
    } catch (error) {
        console.log(error);
    }
};