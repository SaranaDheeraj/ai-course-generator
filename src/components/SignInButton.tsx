"use client";
import React from "react";
import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      colorScheme="blue"
      onClick={() => {
        signIn("google");
      }}
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
