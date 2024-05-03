import React from "react";
import { getAuthSession } from "@/lib/auth";
import UserAccountNav from "./UserAccountNav";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { Box, Button, Container, Flex, Spacer } from "@chakra-ui/react";
import LogOutButton from "./LogOutButton";
import SideDrawer from "./SideDrawer";

const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <>
      <Box
        bgColor="blue.200"
        as="nav"
        color="gray.200"
        fontWeight="bold"
        fontSize="xl"
        py={3}
      >
        <Container maxW="1400px" mx="auto">
          <Flex alignItems="center">
            <Link href="/">Learn Genius</Link>

            <Spacer />
            <Flex
              display={{ base: "none", md: "flex" }}
              gap={5}
              alignItems="center"
            >
              {session?.user ? (
                <>
                  <Link href="/gallery">Browse Courses</Link>
                  <Link href="/create">Create Course</Link>
                  <Link href="/settings">Settings</Link>
                  <LogOutButton />
                </>
              ) : (
                <Link href="/"></Link>
              )}
              {session?.user ? (
                <UserAccountNav user={session.user} />
              ) : (
                <SignInButton />
              )}
            </Flex>
            <Box display={{ base: "block", md: "none" }}>
              <SideDrawer session={session} />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default Navbar;
