import { StrictMode } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import theme from "../theme";
import AppRoutes from '@/routes';
import AuthProvider from '@/provider/authProvider';

const App = () => {  
    return (
        <StrictMode>
            <ChakraProvider theme={theme}>
                <AuthProvider>
                    <AppRoutes />
                </AuthProvider>
            </ChakraProvider>
        </StrictMode>
    );
}

export default App;