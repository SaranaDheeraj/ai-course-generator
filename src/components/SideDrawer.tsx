"use client";
import React, { useRef } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import LogOutButton from "./LogOutButton";
import UserAccountNav from "./UserAccountNav";
import SignInButton from "./SignInButton";

interface SideDrawerProps {
  session: any;
}

function SideDrawer({ session }: SideDrawerProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} colorScheme="blue" onClick={onOpen}>
        <HamburgerMenuIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Flex
              display={{ base: "flex", md: "none" }}
              gap={5}
              alignItems="flex-start"
              flexDirection="column"
              ml={5}
              mt={5}
            >
              {session?.user ? (
                <>
                  <Link onClick={onClose} href="/gallery">
                    Browse Courses
                  </Link>
                  <Link onClick={onClose} href="/create">
                    Create Course
                  </Link>
                  <Link onClick={onClose} href="/settings">
                    Settings
                  </Link>
                  <LogOutButton />
                </>
              ) : (
                <Link href="/">Home</Link>
              )}
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton />
              )}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
