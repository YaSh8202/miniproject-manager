import React from "react";
import { studentDashboardAction } from "../_actions/student";
import NoMiniProjectCard from "./no-miniproject-card";


const StudentDashboard = async () => {
  const student = await studentDashboardAction();
  console.log(student);

  if(!student?.miniProject){
    return <NoMiniProjectCard />
  }

  return (
    <div>
      
    </div>
  );
};

export default StudentDashboard;
