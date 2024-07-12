// Importing Inquirer 
import inquirer from "inquirer";
//  Welcome Line 
console.log("Welcome to Abdullah Shaikh's Project : Student Management System");
class Student {
    name;
    static baseId = 10000;
    id;
    fatherName;
    courses = [];
    coursesIds = [];
    static allStudents = [];
    static numOfStudents = 0;
    totalFees = 0;
    feesRemaining = 0;
    feespaid = 0;
    constructor(name, fatherName) {
        name = name.trim();
        fatherName = fatherName.trim();
        this.name = name;
        this.fatherName = fatherName;
        Student.allStudents.push(this);
        Student.numOfStudents++;
        this.id = ++Student.baseId;
    }
    enrollCourses(course) {
        this.courses.push(course);
        let tempvar = {
            name: course.name,
            id: ++course.currentId
        };
        this.coursesIds.push(tempvar);
        this.totalFees += course.fees;
        this.feesRemaining += course.fees;
    }
    payingfees(value) {
        if (value > this.feesRemaining) {
            console.log("Entered value is invalid");
        }
        else {
            this.feesRemaining -= value;
            this.feespaid += value;
        }
    }
}
const std1 = new Student("Abdullah Shaikh", "Kamran Ahmed");
// Making a class of a Course
class Course {
    name;
    baseId;
    static allCoursesIds = [];
    currentId;
    fees;
    students = [];
    static allCourses = [];
    static coursesNums = 0;
    constructor(name, fees, baseId) {
        name = name.trim();
        this.name = name;
        this.fees = fees;
        Course.allCourses.push(this);
        Course.coursesNums++;
        this.baseId = baseId;
        this.currentId = baseId;
        Course.allCoursesIds.push(baseId);
    }
    addStudent(student) {
        this.students.push(student);
        let tempvar = {
            name: this.name,
            id: ++this.currentId
        };
        student.coursesIds.push(tempvar);
        student.totalFees += this.fees;
        student.feesRemaining += this.fees;
    }
}
const course1 = new Course("AI", 6000, 80000);
const course2 = new Course("TS", 4500, 40000);
// Making a App for this project
async function app() {
    const q1 = await inquirer.prompt({
        name: "q1",
        message: "What functions do you want?",
        type: "list",
        choices: ["View Students Data", "Enter New Student", "Paying Fees", "View Courses Data", "Add New Course"]
    });
    // Making a Switch Statements for q1.q1
    switch (q1.q1) {
        case "View Students Data":
            if (Student.allStudents.length === 0) {
                console.log("There is no students register");
            }
            else {
                const q2 = await inquirer.prompt({
                    name: "q1",
                    message: "Which of the following Data you want?",
                    type: "list",
                    choices: func1("Data", "Yes")
                });
                const value = q2.q1;
                switch (q2.q1) {
                    case value:
                        func2(q2.q1);
                        func4();
                        break;
                    default:
                        console.log("Sorry! An Unknown Error Occurred");
                }
            }
            break;
        case "Enter New Student":
            const q3 = await inquirer.prompt([{
                    name: "q1",
                    message: "Enter Name",
                    type: "input"
                },
                {
                    name: "q2",
                    message: "Enter Fathers Name",
                    type: "input"
                },
                {
                    name: "q3",
                    message: "In Which course enroll?",
                    type: "checkbox",
                    choices: func3()
                }
            ]);
            const std = new Student(q3.q1, q3.q2);
            let coursestoAdd = func6(q3.q3);
            for (const course of coursestoAdd) {
                course.addStudent(std);
            }
            func4();
            break;
        case "Paying Fees":
            const q4 = await inquirer.prompt([
                {
                    name: "q1",
                    message: "Which Student's fees you want to pay?",
                    type: "list",
                    choices: func1("Fees", "No")
                }
            ]);
            payingfees(q4.q1);
            break;
        case "View Courses Data":
            let arr = ["All Courses Data"];
            for (const course of Course.allCourses) {
                arr.push(course.name);
            }
            const q7 = await inquirer.prompt({
                name: "q1",
                message: "Select the option to View Data",
                type: "list",
                choices: arr
            });
            for (const course of Course.allCourses) {
                if (q7.q1 === course.name) {
                    console.log(course);
                }
            }
            func4();
            break;
        case "Add New Course":
            const q8 = await inquirer.prompt([
                {
                    name: "q1",
                    message: "Write the name of Course",
                    type: "string"
                },
                {
                    name: "q2",
                    message: "Write the fees of Course",
                    type: "number"
                },
                {
                    name: "q3",
                    message: "Write the baseId of the course consist of 5-digit",
                    type: "number"
                }
            ]);
            let course = new Course(q8.q1, q8.q2, q8.q3);
            func4();
            break;
        default:
            console.log("Sorry! An Unknown Error Occurred");
    }
}
app();
// Making Functions for performing operations that are using in this project.
function func1(additional, keyword) {
    let arr = [];
    if (keyword === "Yes") {
        arr.push("All Students " + additional);
    }
    ;
    for (const student of Student.allStudents) {
        arr.push(student.name + "'s " + additional);
    }
    return arr;
}
function func2(value) {
    if (value === "All Students Data") {
        console.log(Student.allStudents);
    }
    else {
        for (const student of Student.allStudents) {
            if (student.name + "'s Data" === value) {
                console.log(student);
            }
        }
    }
}
function func3() {
    let arr = [];
    for (const course of Course.allCourses) {
        arr.push(course.name);
    }
    return arr;
}
async function func4() {
    const isEnd = await inquirer.prompt({
        name: "isEnd",
        message: "Do you want to still in the app?",
        default: false,
        type: "confirm"
    });
    if (isEnd.isEnd === true) {
        app();
    }
    else {
        console.log("Thanks For Using");
    }
}
function func5(value) {
    for (const student of Student.allStudents) {
        if (value === student.name + "'s Fees") {
            console.log(`Fees Status of ${student.name}\n Total fees: ${student.totalFees},
            Fees Paid: ${student.feespaid} and Remaing fees:${student.feesRemaining}`);
            return student;
        }
    }
}
function func6(value) {
    let arr = [];
    for (const valuee of value) {
        for (const course of Course.allCourses) {
            if (valuee === course.name) {
                arr.push(course);
            }
        }
    }
    return arr;
}
async function payingfees(value1) {
    async function func() {
        const q5 = await inquirer.prompt({
            name: "q1",
            message: "Do you want to write fees value again",
            type: "confirm",
            default: true
        });
        if (q5.q1 === true) {
            payingfees(value1);
        }
        else {
            func4();
        }
    }
    let vari = func5(value1);
    const q6 = await inquirer.prompt({
        name: "q1",
        type: "number",
        message: `Write the amount of fees paying the amount should be equal or lesser than ${vari?.feesRemaining}`
    });
    if (q6.q1 > vari.feesRemaining) {
        console.log("OOP's The entered fees is greater than remaining fees");
        func();
    }
    else if (q6.q1 < 0) {
        console.log("The amount of fees should be in positive value");
        func();
    }
    else if (q6.q1 == 0) {
        console.log("The paying value can't be zero");
        func();
    }
    else if (q6.q1 <= vari.feesRemaining) {
        let value = q6.q1;
        vari.payingfees(value);
        let a;
        if (vari.feesRemaining == 0) {
            a = `Now the fees of ${vari?.name} is completly paid ✅`;
        }
        else {
            a = `Now the Remaining fees of ${vari?.name} is ${vari?.feesRemaining}`;
        }
        console.log(`Your entered value of fees: ${value} is paid successfully✅ and ${a}`);
        func4();
    }
    else {
        console.log("Invalid Value entered");
        func();
    }
}
// function func4(value1:string,value2:string,value3:any){
//     const std = new Student(value1,value2);
//     for(let i = 0; i<value3.length ; i++){
//         std.courses.push(value3[i]);
//     }
// }
