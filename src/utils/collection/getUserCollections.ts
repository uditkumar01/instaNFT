import { firestore } from "../../Firebase";
import { ICollection } from "../../reducer/collectionReducer";
import { getNftsImages } from "../Firestore/nft/getNftsImages";
import { getUser } from "../Firestore/user/getUser";
import { getSquareRootWholeNum } from "../getSquareRootWholeNum";

export const getUserCollections = async (
  userId: string
): Promise<
  | {
      success: true;
      collections: ICollection[];
    }
  | {
      success: false;
      error: string;
    }
> => {
  try {
    const collections = await firestore()
      .collection("collections")
      .where("owner", "==", userId)
      .get();
    const collectionsArray: ICollection[] = await Promise.all(
      collections.docs.map(async (collectionDoc) => {
        const collectionData = collectionDoc.data() as ICollection;
        const collectionCreatorRes = await getUser(
          collectionData.owner as string
        );
        const collectionCreator = collectionCreatorRes.success
          ? collectionCreatorRes.user
          : collectionData.owner;
        let squareNum = getSquareRootWholeNum(
          collectionData?.items?.length || 0
        );
        squareNum = squareNum > 5 ? 5 : squareNum;
        const imagesRes = await getNftsImages(
          collectionData?.items?.slice(0, squareNum * squareNum) || []
        );

        return {
          ...collectionData,
          owner: collectionCreator,
          uid: collectionDoc?.id,
          images: imagesRes.success ? imagesRes.images : [],
        } as ICollection;
      })
    );

    return {
      success: true,
      collections: collectionsArray,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message,
    };
  }
};
