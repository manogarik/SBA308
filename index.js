// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

//FUNCTION TO FIND THE NUMBER OF LEARNERS
function findlearnerscount(learners) {
    const arrayofids = [];
    for (const i in learners) {
        if (arrayofids.indexOf(learners[i].learner_id) == -1)
            arrayofids.push(learners[i].learner_id);
    }

    return arrayofids;
    //arrayofids.forEach((id) => {console.log(id);});
}

//FUNCTION TO RETURN DUE DATE
function getdue(assignid, assign) {
    const val = assign.assignments;
    for (const i in val) {
        if (val[i].id == assignid)
            return val[i].due_at;
    }

}
//CHECK IF ASSIGNMENT IS DUE OR NOT
function checkdue(id, AssignmentGroup) {
    const val = AssignmentGroup.assignments;
    let d1 = Date();
    //console.log(d1);
    for (const i in val) {
        if (val[i].id == id) {
            let d2 = new Date(val[i].due_at);
            //console.log(d2);
            if (new Date(d1).getTime() > new Date(d2).getTime())
                return true;
            else
                return false;
        }
    }
}
//RETURN THE MAXIMUM POINTS POSSIBLE FOR THE ASSIGNEMENT
function max_Points(assign_id, ag) {
    const val = ag.assignments;
    for (const i in val) {
        if (val[i].id == assign_id) {
            return val[i].points_possible;
        }
    }
}



//FUNCTION TO ITERATE THE AVERAGE
function findavg(student, AssignmentGroup) {
    let scoresum = 0;
    let maxpoints = 0;
    for (let j = 0; j < student.length; j++) {
        if (checkdue(student[j].assignment_id, AssignmentGroup)) {
            let d1 = getdue(student[j].assignment_id, AssignmentGroup);
            let d2 = student[j].submission.submitted_at;
            //CHECKING IF THE STUDENT HAS SUBMITTED BEFORE DUE
            if (new Date(d1).getTime() >= new Date(d2).getTime()) {
                scoresum += student[j].submission.score;
                maxpoints += max_Points(student[j].assignment_id, AssignmentGroup);
            }
            else {
                //DEDUCTING 10 PERCENT FOR LATE SUBMISSION
                scoresum += student[j].submission.score - (0.10 * (max_Points(student[j].assignment_id, AssignmentGroup)));
                maxpoints += max_Points(student[j].assignment_id, AssignmentGroup);
            }

        }

    }
    const avg = scoresum / maxpoints;
    return avg;
}

//FINDING PERCENTAGES   
function findpercent(student, ag) {
    const obj = {};
    for (let j = 0; j < student.length; j++) {
        let percent = 0;
        const assignid = student[j].assignment_id;
        if (checkdue(assignid, AssignmentGroup)) {
            let d1 = getdue(assignid, AssignmentGroup);
            let d2 = student[j].submission.submitted_at;
            //CHECKING IF THE STUDENT HAS SUBMITTED BEFORE DUE
            if (new Date(d1).getTime() >= new Date(d2).getTime()) {

                const score = student[j].submission.score;
                const maxpoint = max_Points(assignid, AssignmentGroup);
                //CHECKING IF THE POSSIBLE_POINTS IS 0
                try{
                    if(maxpoint == 0)
                        throw ("Tring to divide by 0");
                    else
                        percent = score/ maxpoint;
                } 
                catch(error)
                {
                    console.log(error);
                }
                
            }
            else {
                //DEDUCTING 10 PERCENT FOR LATE SUBMISSION
                const score = student[j].submission.score - (0.10 * (max_Points(assignid, AssignmentGroup)));
                const maxpoint = max_Points(assignid, AssignmentGroup);
                //CHECKING IF THE POSSIBLE_POINTS IS 0
                try{
                    if(maxpoint == 0)
                        throw ("Tring to divide by 0");
                    else
                        percent = score/ maxpoint;
                } 
                catch(error)
                {
                    console.log(error);
                }
                

            }
            console.log(percent);
        }


    }
}

let idcount = [];
//const result =[];
//Find the total number of learners
idcount = findlearnerscount(LearnerSubmissions);

//FUNCTION TO SEPERATE EVERY LEARNER AND HIS WORK
function group(arr, key) {
    return [...arr.reduce((acc, o) =>
        acc.set(o[key], (acc.get(o[key]) || []).concat(o))
        , new Map).values()];
}
 
//FUNCTION TO CHECK IF ASSIGNMENT GROUP BELONGS TO COURSE ID OR NOT
function checkag(crse, ag)
{
     if(ag.course_id == crse.id)
           return true;
        else
            return false;
    
}






function getLearnerData(course, ag, submissions) {
    //CHECKING IF AN ASSIGNMENT GROUP BELONGS TO COURSE ID OR NOT
    try{
        if((checkag(course,ag)))
        {
            console.log("Courseid matching");
        }
        else{
            throw "Invalid input! Assignment group not belonging to courseid";
        }
       
    }
    catch(error)
    {
        console.log(error);
    }


    //FUNCTION TO SEPERATE EVERY LEARNER AND HIS WORK
    const splitarray = group(submissions, 'learner_id');
    for (let i = 0; i < splitarray.length; i++) {
        const obj = {};

        avg = findavg(splitarray[i], AssignmentGroup);
        obj.avg = avg;
        per = findpercent(splitarray[i], AssignmentGroup);
        console.log(obj);

    }
}
const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
//console.log(result);




