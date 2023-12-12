import React from "react";
import { mentorDashboardAction } from "../../_actions/mentor";
import NoTeamAssignedCard from "./no-team-assigned-card";
import TeamCards from "./team-cards";

const MentorDashboard = async () => {
  const mentor = await mentorDashboardAction();

  if (!mentor) {
    return <div>Login using mentor id </div>;
  }

  if (mentor?.assignedTeam.length === 0) {
    return <NoTeamAssignedCard />;
  }

  if (mentor) {
    return (
      <div
        className={`grid-cols-${
          mentor?.assignedTeam.length === 1 ? "1" : "3"
        } card grid transform gap-4 rounded-md p-4 transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
      >
        {mentor?.assignedTeam.map((team, index) => (
          <div key={index}>
            <TeamCards team={team} />
          </div>
        ))}
      </div>
    );
  }
};

export default MentorDashboard;
