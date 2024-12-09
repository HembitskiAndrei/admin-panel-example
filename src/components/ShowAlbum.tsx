import type { TPhoto, TShowAlbumProps } from "../types";
import { useParams } from "react-router-dom";
import {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    Box,
    VStack
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { PhotosList } from "./PhotosList";
import { MainHeader } from "./MainHeader";
import { CustomButton } from './CustomButton';

const ShowAlbum = (props: TShowAlbumProps) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const album = props.transferredDataMap.get(`${id}`);
    const {title, userName, photos} = album || {};

    return(
        <VStack
            h = "100%"
            align = "stretch"
        >
            <MainHeader title={`Album: ${title}`}>
                <CustomButton label="Back" onClick={() => navigate("../")} />
            </MainHeader>
            <Tabs>
                <TabList>
                    <Tab>Basic</Tab>
                    <Tab>Photos</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            ID: {id}
                        </Box>
                        <Box bg='tomato' w='100%' p={4} color='white'>
                            User: {userName}
                        </Box>
                    </TabPanel>
                    <TabPanel>
                        <PhotosList transferredData={photos as TPhoto[]} />
                    </TabPanel> 
                </TabPanels>
            </Tabs>
        </VStack>
    )
}

export { ShowAlbum }
