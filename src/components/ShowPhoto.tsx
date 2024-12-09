import type { TShowPhotoProps } from "../types";
import { useParams } from "react-router-dom";
import {
    Box,
    VStack,
    Image
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { MainHeader } from "./MainHeader";
import { CustomButton } from './CustomButton';

const ShowPhoto = (props: TShowPhotoProps) => {
    const navigate = useNavigate();

    const { id, photoName } = useParams();

    const photo = props.transferredDataMap.get(`${id}`);
    const photoData = photo?.get(`${photoName}`);

    return(

        <VStack
            h = "100%"
            align = "stretch"
        >
            <MainHeader title={`Photo: ${photoName}`}>
                <CustomButton label="Back" onClick={() => navigate(`../${id}`)} />
            </MainHeader>
            <Box bg='tomato' w='100%' p={4} color='white'>
                <Image boxSize="640px" src={photoData?.url} alt={photoName} />
            </Box>
        </VStack>
    )
}

export { ShowPhoto }