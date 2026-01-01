import React from "react";
import RoleInfoPage from "./roleInfoPage";
import { currentOpenings } from "~/components/sections/carrersPage/CurrentOpenings/data";

interface Props {
  params: Promise<{ id: string }>;
}

const RolePage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  const role = currentOpenings.find((role) => role.id === id);

  if (!role) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center">
        Job Not Found
      </div>
    );
  }

  return <RoleInfoPage role={role} />;
};

export default RolePage;
