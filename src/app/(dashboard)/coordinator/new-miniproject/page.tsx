import React from "react";
import NewMiniProjectForm from "./_components/form";

const NewMiniProject = () => {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="my-6">
        <h2 className="text-2xl font-bold pb-1 ">Start New Mini Project</h2>
        <p className="text-muted-foreground text-sm" >
          Starting a mini project will notify all the students of the batch to register the team for the mini project.
        </p>
      </div>
      <NewMiniProjectForm />
    </div>
  );
};

export default NewMiniProject;
