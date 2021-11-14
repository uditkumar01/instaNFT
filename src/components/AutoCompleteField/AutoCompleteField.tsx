import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import {
  Menu,
  MenuDivider,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/menu";
import { Spinner } from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useAuth from "../../context/Auth/Auth";
import { queryTags } from "../../utils/Firestore/collections/queryTags";

interface IAutoCompleteFieldProps {
  label: string;
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

interface InitialState {
  tags: string[];
  loading: boolean;
  error: string;
}

const initalState: InitialState = {
  tags: [],
  loading: false,
  error: "",
};

export function AutoCompleteField({
  label,
  setSelectedOptions,
  selectedOptions,
}: IAutoCompleteFieldProps): JSX.Element {
  const [addTagInput, setAddTagInput] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { user } = useAuth();
  const [filteredOptions, setFilteredOptions] = useState(initalState);

  const filteredOptionsHandler = useCallback(
    async (query: string): Promise<void> => {
      if (!query) return;

      const searchRes = await queryTags(query);

      if (searchRes?.success) {
        setFilteredOptions((prevState) => {
          return {
            ...prevState,
            tags: searchRes.tags,
            loading: false,
            error: "",
          };
        });
      } else {
        setFilteredOptions((prevState) => {
          return {
            ...prevState,
            data: [],
            loading: false,
            error: "Invalid query",
          };
        });
      }
    },
    []
  );

  useEffect(() => {
    if (addTagInput) {
      const debounceHandler = (): void => {
        if (!addTagInput) return;

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(() => {
          filteredOptionsHandler(addTagInput);
        }, 2000);
      };
      debounceHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTagInput]);

  const allTags = addTagInput ? filteredOptions?.tags : [];

  return (
    <FormControl mt={4}>
      <FormLabel>{label}</FormLabel>
      <InputGroup pos="relative">
        <Input
          list="collection-tags"
          name="collection-tag"
          id="collection-tag"
          placeholder="Add tags"
          value={addTagInput}
          onChange={(event) => {
            setAddTagInput(event.target.value);
            if (event.target?.value?.length) {
              setFilteredOptions((prevState) => {
                return {
                  ...prevState,
                  loading: true,
                };
              });
            }
            setTimeout(() => {
              event.target.focus();
            }, 0);
          }}
        />
        <InputRightElement>
          <Spinner
            size="sm"
            color="gray.500"
            d={filteredOptions.loading ? "inline" : "none"}
          />
        </InputRightElement>
      </InputGroup>
      {addTagInput && (
        <Box w="full" bg="green" pos="absolute" bottom="-4px">
          <Menu autoSelect={false} isOpen isLazy>
            <MenuList autoFocus={false}>
              <MenuItemOption
                autoFocus={false}
                onClick={() => {
                  if (!addTagInput) return;
                  const value = addTagInput;
                  if (value && !selectedOptions.includes(value)) {
                    setSelectedOptions((opts) => [...opts, value]);
                  }

                  setAddTagInput("");
                  setFilteredOptions(initalState);
                }}
                key="add-new-tag"
                value="add-new-tag"
              >
                + Add new tag
              </MenuItemOption>
              {(filteredOptions?.tags?.length || 0) > 0 && (
                <>
                  <MenuDivider />
                  <Box maxH="200px" overflow="auto">
                    <MenuOptionGroup
                      onChange={(event) => {
                        // check if event is an array
                        const tagsLinked = Array.isArray(event)
                          ? event
                          : [event];
                        const allOpts = new Set([
                          ...selectedOptions,
                          ...tagsLinked,
                        ]);
                        setSelectedOptions(Array.from(allOpts));
                        setAddTagInput("");
                        setFilteredOptions(initalState);
                      }}
                      type="checkbox"
                    >
                      {allTags.map((tag) => {
                        return (
                          <MenuItemOption
                            key={`auto-complete-tag-${tag}`}
                            value={tag}
                            autoFocus={false}
                          >
                            {tag}
                          </MenuItemOption>
                        );
                      })}
                    </MenuOptionGroup>
                  </Box>
                </>
              )}
            </MenuList>
          </Menu>
        </Box>
      )}
    </FormControl>
  );
}
