import React from "react";
import RoleInfoPage from "./roleInfoPage";
// import { currentOpenings } from "~/components/sections/carrersPage/CurrentOpenings/data";

interface Props {
  params: Promise<{ id: string }>;
}

const RolePage: React.FC<Props> = async ({ params }) => {
  const { id } = await params;

  return <RoleInfoPage id={id} />;
};

export default RolePage;
