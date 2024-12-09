import {
    Box,
    VStack
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { CustomButton } from './CustomButton';

const PageNotFound = () => {
    const navigate = useNavigate();

    return(
        <VStack            
            align = "stretch"
        >
            <Box bg='tomato' w='100%' p={4} color='white'>
                <CustomButton label="Back" onClick={() => navigate(`/`)} />
            </Box>
            <Box bg='tomato' w='100%' p={4} color='white'>
                <center>404 Page Not Found</center>                
            </Box>
        </VStack>
    )
}

export { PageNotFound }