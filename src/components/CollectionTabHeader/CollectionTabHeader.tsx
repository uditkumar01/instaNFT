import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import { AiOutlinePlus } from "react-icons/ai";
import { CreateCollectionModal } from "..";
import useColorProvider from "../../context/ColorsProvider";
// eslint-disable-next-line max-len
import { createCollectionHandler } from "../../utils/collection/createCollectionHandler";

export function CollectionTabHeader({
  collectionDispatch,
}: {
  collectionDispatch: any;
}): JSX.Element {
  const { color } = useColorProvider();
  return (
    <Flex justify="flex-end">
      <CreateCollectionModal
        collectionDispatch={collectionDispatch}
        callback={createCollectionHandler}
      >
        <Button aria-label="Create collection" colorScheme={color}>
          <AiOutlinePlus />
          &nbsp;&nbsp;Create Collection
        </Button>
      </CreateCollectionModal>
    </Flex>
  );
}
