import { Button, IconButton } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { motion } from "framer-motion";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { INftOptions } from "../../constants/nftOptions";

interface CustomMenuProps {
  options: INftOptions[];
  uid: string;
}

export function CustomMenu({ options, uid }: CustomMenuProps): JSX.Element {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        rounded="full"
        cursor="pointer"
        minW={0}
      >
        <IconButton
          icon={<IoEllipsisHorizontal fontSize="1.1rem" />}
          rounded="full"
          bg="transparent"
          _hover={{ bg: useColorModeValue("gray.200", "gray.700") }}
          aria-label="Like"
        />
      </MenuButton>
      <MenuList>
        {options.map((optionItem) => {
          const { label, onClick } = optionItem;
          return (
            <MenuItem
              p="0"
              d="flex"
              alignItems="center"
              key={`menu-option-${label}-${uid}`}
            >
              {optionItem?.button ? (
                optionItem?.button
              ) : (
                <Button
                  textDecoration="none !important"
                  textAlign="left"
                  justifyContent="flex-start"
                  fontWeight="normal"
                  bg="transparent"
                  w="full"
                  rounded="none"
                  onClick={onClick}
                  aria-label={label}
                >
                  {label}
                </Button>
              )}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
