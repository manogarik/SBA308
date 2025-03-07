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
 function checkdue(id,AssignmentGroup)
 {
   const val = AssignmentGroup.assignments;
   let d1 = Date ();
   //console.log(d1);
   for( const i in val)
   {
       if(val[i].id == id)
       {
          let d2 = new Date(val[i].due_at);
           //console.log(d2);
           if(new Date(d1).getTime() > new Date(d2).getTime())
               return true;
           else 
               return false;
       }
   }
 }
 //CHECK IF LATE SUBMISSION



//FUNCTION TO ITERATE THE AVERAGE
function findavg(student, AssignmentGroup) {
    let avg=0;
    for (let j=0; j < student.length;j++)
    {
        if(checkdue(student[j].assignment_id , AssignmentGroup))
        {
            let d1 = getdue(student[j].assignment_id, AssignmentGroup);
            let d2 = student[j].submission.submitted_at;
            //CHECKING IF THE STUDENT HAS SUBMITTED BEFORE DUE
            if(new Date(d1).getTime() >= new Date(d2).getTime())
            {
                avg += student[j].submission.score;
            }
            else
            {
                //DEDUCTING 10 PERCENT FOR LATE SUBMISSION
            } 
                
        }
       
    }
    console.log(avg);
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
const result = group(LearnerSubmissions, 'learner_id');
//console.log(result);

for (let i =0 ;i < result.length;i++)
{
    avg = findavg(result[i],AssignmentGroup);
}






//for (let j =0 ;j< result[i].length ; j++)
//{
  //  console.log(result[i][j].submission.score);
//}