import React from "react";
import { studentDashboardAction } from "../../_actions/student";
import NoMiniProjectCard from "./no-miniproject-card";
import CreateTeamCard from "./create-team-card";
import InviteTeamCard from "./invite-team";
import AddMentorListCard from "./add-mentor-list";

const StudentDashboard = async () => {
  const student = await studentDashboardAction();

  if (!student) {
    return <div>Login using the college id</div>;
  }

  if (!student?.batch?.miniProject) {
    return <NoMiniProjectCard />;
  }

  if (!student?.team) {
    return <CreateTeamCard />;
  }

  if (student.team.members.length < 3) {
    return (
      <>
        <InviteTeamCard team={student.team} />
        <AddMentorListCard team={student.team} />
      </>
    );
  }

  if (student.team.members.length === 3) {
    return <AddMentorListCard team={student.team} />;
  }

  return <div></div>;
};

export default StudentDashboard;
