"use client";
import React from "react";
import { Button } from "@chakra-ui/react";
import { signOut } from "next-auth/react";

type Props = {};

const LogOutButton = (props: Props) => {
  return (
    <Button
      colorScheme="red"
      onClick={() => {
        signOut();
      }}
    >
      Log Out
    </Button>
  );
};

export default LogOutButton;
