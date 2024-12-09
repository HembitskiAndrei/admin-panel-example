import type { TMainComponentProps } from "../types";
import {
    Box,
    Grid,
    GridItem,    
    VStack,
    Center,
    LinkBox,
    LinkOverlay
} from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Logout } from "./Login";

const MainComponent = (props: TMainComponentProps) => {
    return (
        <Grid
            templateAreas={`"nav main"`}
            gridTemplateRows={'1fr'}
            gridTemplateColumns={'200px 1fr'}
            h='100vh'
            gap='1'
            color='blackAlpha.700'
            fontWeight='bold'
        >
            <GridItem bg='pink.300' area={'nav'}>
                <VStack
                    h = "100%" 
                    align = "stretch"
                    justify = "space-between"
                >
                    <Box p='4' bg='red.400'>
                        <Center>
                            <LinkBox as='article'>                           
                                <LinkOverlay href='./albums'>
                                    Albums List
                                </LinkOverlay>                            
                            </LinkBox>
                        </Center>
                    </Box>
                    
                    <Box p='4' bg='red.400'>
                        <Center>
                            <Logout />
                        </Center>
                    </Box>
                </VStack>
            </GridItem>
            <GridItem pl="26px" pr="33px" bg='green.300' area={'main'}>
                {props.children}
                <Outlet />
            </GridItem>
        </Grid>
    );
}

export { MainComponent };
