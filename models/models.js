const sequelize = require('../db');
const {DataTypes} = require('sequelize');


const Admin = sequelize.define('admin', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, defaultValue: 'Administrator'},
    role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
    img: {type: DataTypes.STRING, defaultValue: ''},
    phone: {type: DataTypes.STRING, defaultValue: 'set phone'}
});

const Teacher = sequelize.define('teacher', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "TEACHER"},
    img: {type: DataTypes.STRING, defaultValue: ''},
    qualification: {type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: []},
    phone: {type: DataTypes.STRING, defaultValue: 'set phone'}
});

const Student = sequelize.define('student', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true },
    password: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING, allowNull: false},
    parentName: {type: DataTypes.STRING, defaultValue: "set parent name"},
    role: {type: DataTypes.STRING, defaultValue: "STUDENT"},
    img: {type: DataTypes.STRING, allowNull: false },
    phone: {type: DataTypes.STRING, defaultValue: 'set student phone'},
    parentPhone: {type: DataTypes.STRING, defaultValue: 'set parent phone'},
    discount: {type: DataTypes.INTEGER, defaultValue: 0 }
});


const Lead = sequelize.define('lead', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    phone: {type: DataTypes.STRING, defaultValue: 'set phone'},
    note: {type: DataTypes.STRING, defaultValue: 'set  some note'}
});

const LeadStatus = sequelize.define('lead_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type:  DataTypes.STRING, unique: true, allowNull: false }
});

const TeacherStudent = sequelize.define('teacher_student',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Task = sequelize.define('task', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, defaultValue: '' },
    expirationDate: { type: DataTypes.DATEONLY, defaultValue: Date.now() }
});

const TaskCategory = sequelize.define('task_category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Subscription = sequelize.define('subscription', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Group = sequelize.define('group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    limit: { type:  DataTypes.INTEGER, defaultValue: 30 },
    note: {type: DataTypes.STRING, defaultValue: ''}
});

const RegularClasses = sequelize.define('regular_classes', { // temp leave than modify and toggle with Group and Course and Level
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    duration: { type:  DataTypes.INTEGER, defaultValue: 90 },
    scheduleStart: { type:  DataTypes.TIME, allowNull: false },
    scheduleEnd: { type:  DataTypes.TIME, allowNull: false },
    weekDays: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false }
});

const GroupStatus = sequelize.define('group_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const StudentStatus = sequelize.define('student_status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Branch = sequelize.define('branch', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    address: { type:  DataTypes.STRING, defaultValue: 'Main branch' }
});

const Room = sequelize.define('room', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type:  DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, defaultValue: '' },
});

const Course = sequelize.define('course', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Level = sequelize.define('level', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:  { type:  DataTypes.STRING, unique: true, allowNull: false }
});

const Gender = sequelize.define('gender', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name:{ type:  DataTypes.STRING, unique: true, allowNull: false }
});

const StudentGroup = sequelize.define('student_group',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const LeadGroup = sequelize.define('lead_group',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

// const CourseGroup = sequelize.define('course_group',{
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });
//
// const CourseLevel = sequelize.define('course_level',{
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

const GroupClasses = sequelize.define('group_classes',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});



Admin.hasMany(Teacher);
Teacher.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Task);
Task.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Student);
Student.belongsTo(Admin, {foreignKey: 'adminId'});

Admin.hasMany(Lead);
Lead.belongsTo(Admin, {foreignKey: 'adminId'});

Teacher.hasMany(Group);
Group.belongsTo(Teacher, {foreignKey: 'teacherId'});

Teacher.belongsToMany(Student, {through: TeacherStudent });
Student.belongsToMany(Teacher, {through: TeacherStudent });



Student.belongsToMany(Group, {through: StudentGroup });
Group.belongsToMany(Student, {through: StudentGroup });

Student.hasMany(StudentGroup);
StudentGroup.belongsTo(Student);
Group.hasMany(StudentGroup);
StudentGroup.belongsTo(Group);

Lead.belongsToMany(Group, {through: LeadGroup });
Group.belongsToMany(Lead, {through: LeadGroup });

Lead.hasMany(LeadGroup);
LeadGroup.belongsTo(Lead);
Group.hasMany(LeadGroup);
LeadGroup.belongsTo(Group);


GroupStatus.hasMany(Group);
Group.belongsTo(GroupStatus, {foreignKey: 'groupStatusId'});

LeadStatus.hasMany(Lead);
Lead.belongsTo(LeadStatus, {foreignKey: 'leadStatusId'});

Branch.hasMany(Group);
Group.belongsTo(Branch, {foreignKey: 'branchId'});

Branch.hasMany(Room);
Room.belongsTo(Branch, {foreignKey: 'branchId'});

Room.hasMany(RegularClasses);
RegularClasses.belongsTo(Room);

Group.belongsToMany(RegularClasses, {through: GroupClasses});
RegularClasses.belongsToMany(Group, {through: GroupClasses});
Group.hasMany(GroupClasses);
GroupClasses.belongsTo(Group);
RegularClasses.hasMany(GroupClasses);
GroupClasses.belongsTo(RegularClasses);

Course.hasMany(RegularClasses);
RegularClasses.belongsTo(Course);

// Course.belongsToMany(Group, {through: CourseGroup});
// Group.belongsToMany(Course, {through: CourseGroup});
// Course.hasMany(CourseGroup);
// CourseGroup.belongsTo(Course);
// Group.hasMany(CourseGroup);
// CourseGroup.belongsTo(Group);

Level.hasMany(RegularClasses);
RegularClasses.belongsTo(Level);



// Course.belongsToMany(Level, {through: CourseLevel});
// Level.belongsToMany(Course, {through: CourseLevel});
// Course.hasMany(CourseLevel);
// CourseLevel.belongsTo(Course);
// Level.hasMany(CourseLevel);
// CourseLevel.belongsTo(Level);


Gender.hasMany(Admin);
Admin.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Teacher);
Teacher.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Student);
Student.belongsTo(Gender, {foreignKey: 'genderId'});
Gender.hasMany(Lead);
Lead.belongsTo(Gender, {foreignKey: 'genderId'});


StudentStatus.hasMany(Student);
Student.belongsTo(StudentStatus, {foreignKey: 'studentStatusId'});

Subscription.hasMany(Student);
Student.belongsTo(Subscription, {foreignKey: 'subscriptionId'});

TaskCategory.hasMany(Task);
Task.belongsTo(TaskCategory, {foreignKey: 'taskCategoryId'});







// create first main tables


// (async () => {
//     await sequelize.sync();
//
//     const course = await Course.create({
//         id: '1',
//         name: 'FrontEnd01'
//     });
//     console.log(course);
//
//     const level = await Level.create({
//         id: '1',
//         name: 'Middle'
//     });
//     console.log(level);
//
//
//     const gender = await Gender.create({
//         id: '1',
//         name: 'Male'
//     });
//     console.log(gender);
//
//     const groupStatus = await GroupStatus.create({
//         id: '1',
//         name: 'Active'
//     });
//     console.log(groupStatus);
//
//     const studentStatus = await StudentStatus.create({
//         id: '1',
//         name: 'Studying'
//     });
//     console.log(studentStatus);
//
//     const branch = await Branch.create({
//         id: '1',
//         name: 'Bishkek'
//     });
//     console.log(branch);
//
//     const room = await Room.create({
//         id: '1',
//         name: 'Room 32',
//         branchId: 1
//     });
//     console.log(room);
//
//     const subscription = await Subscription.create({
//         id: '1',
//         name: 'Basic 5$ for class'
//     });
//     console.log(subscription);
//
//     const teacher = await Teacher.create({
//         id: '1',
//         email: 'teacher@gmail.com',
//         password: 'fly',
//         name: 'Teacher Main',
//         phone: '99688377373',
//         genderId: 1,
//         qualification: ["bachelor", "master"]
//     });
//     console.log(teacher);
//
//     const group = await Group.create({
//         id: '1',
//         name: 'Group01',
//         limit: 30,
//         note: 'this is first default created group',
//         branchId: 1,
//         groupStatusId: 1,
//         teacherId: 1
//     });
//     console.log(group);
//
//     const regularClasses = await RegularClasses.create({
//         id: '1',
//         name: 'First Regular Class',
//         scheduleStart: '13:00:00',
//         scheduleEnd: '14:30:00',
//         weekDays: ["Monday", "Friday"],
//         levelId: 1,
//         courseId: 1,
//         roomId: 1
//     });
//     console.log(regularClasses);
//
//     const admin = Admin.create({
//         id: '1',
//         email: 'akimov@gmail.com',
//         password: 'fly',
//         name: 'Zhoomart Akimov',
//         phone: '996772171263',
//         genderId: 1
//     });
//     console.log(admin)
//
//
//     const student = await Student.create({
//         id: '1',
//         email: 'student@gmail.com',
//         password: 'fly',
//         name: 'Student First',
//         phone: '997334444744',
//         parentName: "Kendy",
//         parentPhone: '121209092323',
//         discount: 20,
//         genderId: 1,
//         adminId: 1,
//         img: "0b236f7a-5c6c-4bbe-b03f-7afd67ce1126.jpg",
//         studentStatusId: 1,
//         groupId: 1,
//         subscriptionId: 1
//     });
//     console.log(student);
//
//
//
//
//     const teacherStudent = await TeacherStudent.create({
//         id: '1',
//         studentId: 1,
//         teacherId: 1
//     });
//     console.log(teacherStudent);
//
//     const studentGroup = await StudentGroup.create({
//         id: '1',
//         studentId: 1,
//         groupId: 1
//     });
//     console.log(studentGroup);
//
//     const groupClasses = await GroupClasses.create({
//         id: '1',
//         regularClassId: 1,
//         groupId: 1
//     });
//     console.log(groupClasses);
//
// })();
// console.log(admin);





module.exports = {
    Admin,
    Teacher,
    Student,
    TeacherStudent,
    Subscription,
    TaskCategory,
    Task,
    Group,
    StudentGroup,
    StudentStatus,
    Branch,
    Course,
    GroupStatus,
    Lead,
    LeadStatus,
    LeadGroup,
    Room,
    RegularClasses,
    GroupClasses,
    Level,
    Gender
}