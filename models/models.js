const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const DEFAULT_IMAGE = 'https://us.123rf.com/450wm/tanyastock/tanyastock1609/tanyastock160900376/62026756-user-icon-human-person-symbol-blue-circle-button-with-flat-web-icon-vector.jpg?ver=6';

const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: ""},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
    img: {type: DataTypes.BLOB, defaultValue: {DEFAULT_IMAGE}},
    gender: {type: DataTypes.STRING, defaultValue: 'undefined'},
    phone: {type: DataTypes.STRING, defaultValue: ''}
});

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: ""},
    role: {type: DataTypes.STRING, defaultValue: "TEACHER"},
    img: {type: DataTypes.BLOB, defaultValue: {DEFAULT_IMAGE}},
    gender: {type: DataTypes.STRING, defaultValue: 'undefined'},
    qualification: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    phone: {type: DataTypes.STRING, defaultValue: ''}
});


Admin.hasMany(Teacher);
Teacher.belongsTo(Admin, {foreignKey: 'adminId'})





module.exports = {
    Admin,
    Teacher
}