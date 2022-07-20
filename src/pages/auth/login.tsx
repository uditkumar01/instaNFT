import { Button } from "@chakra-ui/button";
import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { chakra, useColorModeValue } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import router from "next/router";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import { EmailLoginForm, Layout, SocialLoginButton } from "../../components";
import { WithoutAuth } from "../../HOC/WithoutAuth";
import { emailLogin } from "../../utils/Firestore/email/login/login";
import { signIn } from "../../utils/Firestore/google/googleSignIn";

function Login() {
  const toast = useToast();
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = event.target as any;
    if (!email?.value || !password?.value) {
      toast({
        title: "Error",
        description: "Please fill all fields",
        status: "error",
        variant: "left-accent",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const userRes = await emailLogin(email.value, password.value);
    if (userRes?.success) {
      toast({
        title: "Login Successful",
        description: "You have successfully logged in",
        duration: 3000,
        isClosable: true,
        variant: "left-accent",
        status: "success",
      });
    } else {
      toast({
        title: "Login Failed",
        description: userRes?.error || "Something went wrong",
        duration: 3000,
        isClosable: true,
        variant: "left-accent",
        status: "success",
      });
    }
  };

  return (
    <Layout title="instaNFT | Login" key="login-page" keywords="log in">
      <Box
        bg={useColorModeValue("gray.200", "gray.900")}
        as="section"
        py="20"
        h="full"
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          rounded={{ md: "2xl" }}
          p="8"
          maxW="2xl"
          mx="auto"
          textAlign="center"
          boxShadow="inner"
        >
          <Stack maxW="xs" mx="auto" spacing="8">
            <Stack spacing="3">
              {/* <Logo width="60px" /> */}
              <Heading fontSize="2rem" letterSpacing="wide">
                <chakra.span fontWeight="semibold">Welcome back</chakra.span>
              </Heading>
              <Text fontWeight="medium" color="gray.500">
                Create an account or log in to continue
              </Text>
            </Stack>

            <SocialLoginButton
              colorScheme="red"
              leftIcon={<FaGoogle fontSize="18px" />}
              onClick={signIn}
            />
            <EmailLoginForm onSubmit={onSubmitHandler} />

            <Box fontSize="sm">
              <Text
                fontWeight="medium"
                color={useColorModeValue("gray.600", "gray.400")}
              >
                Don&apos;t have an account?{" "}
              </Text>
              <Button
                variant="unstyled"
                fontSize="sm"
                textAlign="left"
                onClick={() => router.push("/auth/signup")}
                fontWeight="semibold"
                color={useColorModeValue("blue.600", "blue.300")}
                aria-label="Sign up"
              >
                Create now
              </Button>
            </Box>
          </Stack>
          <Text
            mt="16"
            fontSize="xs"
            mx="auto"
            maxW="md"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            By continuing, you acknowledge that you have read, understood, and
            agree to our terms and condition
          </Text>
        </Box>
      </Box>
    </Layout>
  );
}

export default WithoutAuth(Login);
