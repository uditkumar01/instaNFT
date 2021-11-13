import { Box, Heading, Link, Stack, Text } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { FaGoogle } from "react-icons/fa";
import router from "next/router";
import { useToast } from "@chakra-ui/toast";
import { Button } from "@chakra-ui/button";
import { EmailLoginForm, Layout, SocialLoginButton } from "../../components";
import { emailSignUp } from "../../utils/Firestore/email/signup/signup";
import { signIn } from "../../utils/Firestore/google/googleSignIn";
import { WithoutAuth } from "../../HOC/WithoutAuth";

function SignUp(): JSX.Element {
  const toast = useToast();
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const [email, password] = event.target as any;
    const userRes = await emailSignUp(email.value, password.value);
    if (userRes?.success) {
      toast({
        title: "Singup Successful",
        description: "You have successfully signed up",
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
        status: "error",
      });
    }
  };
  return (
    <Layout title="instaNFT | Login" key="signin-page" keywords="log in">
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
              <Heading
                fontSize="2rem"
                letterSpacing="wide"
                // fontWeight="semibold"
              >
                Sign in
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
                Already have an account?
              </Text>
              <Button
                variant="unstyled"
                fontSize="sm"
                textAlign="left"
                onClick={() => router.push("/auth/login")}
                fontWeight="semibold"
                color={useColorModeValue("blue.600", "blue.300")}
                aria-label="Login back in"
              >
                Log back in
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

export default WithoutAuth(SignUp);
