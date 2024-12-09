import type { TMainHeaderProps } from "../types";
import {
    Box,
    HStack 
} from "@chakra-ui/react";

const MainHeader = (props: TMainHeaderProps) => {
    return (      
        <HStack
            w = "100%"
            h = "80px"
            align = "stretch"
            justify = "space-between"
        >
            <Box bg='red.400' alignContent={"center"}>
                {props.title}
            </Box>
            
            <Box bg='red.400' alignContent={"center"}>
                {props.children}
            </Box>
        </HStack>
    );
}

export { MainHeader };
