import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Flex, HStack, Stack, Text } from "@chakra-ui/layout";
import { Skeleton, SkeletonCircle } from "@chakra-ui/skeleton";
import { Dispatch, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsPinAngle, BsPinFill } from "react-icons/bs";
import { IAuthContext, IUser } from "../../context/Auth/Auth";
import { IAuthAction } from "../../context/Auth/AuthReducer";

interface NftHeaderProps {
  name: string;
  avatar: string;
  pinned: boolean;
  likeHandler: any;
  likeNFTParams: any;
  pinNFTHandler: ({
    authDispatch,
    owner,
    toast,
    uid,
  }: {
    toast: any;
    uid: string;
    owner: IUser;
    authDispatch: Dispatch<IAuthAction>;
  }) => Promise<void>;
  isCurrentUser: boolean;
  pinNFTParams: {
    toast: any;
    uid: string;
    owner: IUser;
    authDispatch: Dispatch<IAuthAction>;
  };
  isLiked: boolean;
}

export function NftHeader({
  avatar,
  name,
  pinNFTHandler,
  pinned,
  isCurrentUser,
  pinNFTParams,
  likeHandler,
  likeNFTParams,
  isLiked,
}: NftHeaderProps): JSX.Element {
  const iconBtnBg = useColorModeValue("gray.200", "gray.700");
  const iconBorderColor = useColorModeValue("gray.300", "gray.600");
  const iconBtnHoverBg = useColorModeValue("gray.300", "gray.600");
  const iconColor = useColorModeValue("gray.700", "gray.200");
  const [pinning, setPinning] = useState(false);
  const [liking, setLiking] = useState(false);
  return (
    <Flex w="full" justify="space-between" align="center">
      <Stack mt={1} direction="row" spacing={4} align="center">
        {(avatar || name) && (
          <Avatar
            src={avatar}
            name={name}
            alt="nft owner"
            size="md"
            boxShadow="md"
          />
        )}
        <SkeletonCircle size="50px" d={avatar || name ? "none" : "block"} />
        <Stack direction="column" spacing={0} fontSize="sm">
          <Text fontWeight={600} fontSize="1.1rem" textTransform="capitalize">
            {name}
          </Text>
          <Skeleton width="140px" height="16px" d={name ? "none" : "block"} />
          <Text color="gray.500" fontSize="0.9rem">
            owner
          </Text>
        </Stack>
      </Stack>
      <HStack spacing={2} color="gray.500">
        <IconButton
          p="0.3rem"
          icon={
            isLiked ? (
              <Icon as={AiFillHeart} color={iconColor} h="20px" w="20px" />
            ) : (
              <Icon as={AiOutlineHeart} color={iconColor} h="20px" w="20px" />
            )
          }
          size="sm"
          variant="outline"
          aria-label="Like"
          rounded="full"
          bg={iconBtnBg}
          border="2px solid"
          onClick={async () => {
            setLiking(true);
            await likeHandler(likeNFTParams);
            setLiking(false);
          }}
          borderColor={iconBorderColor}
          isLoading={liking}
          transition="all 0.2s ease"
          _hover={{
            bg: iconBtnHoverBg,
          }}
          boxShadow="sm"
        />
        {isCurrentUser && (
          <IconButton
            p="0.3rem"
            icon={
              pinned ? (
                <BsPinFill fontSize="1.1rem" />
              ) : (
                <BsPinAngle fontSize="1.1rem" />
              )
            }
            onClick={async () => {
              setPinning(true);
              await pinNFTHandler(pinNFTParams);
              setPinning(false);
            }}
            size="sm"
            variant="ghost"
            aria-label="Like"
            rounded="full"
            bg={iconBtnBg}
            border="2px solid gray"
            borderColor={iconBorderColor}
            transition="all 0.2s ease"
            _hover={{
              bg: iconBtnHoverBg,
            }}
            isLoading={pinning}
            boxShadow="sm"
          />
        )}
      </HStack>
    </Flex>
  );
}
