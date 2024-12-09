
import type { TCustomButtonProps } from "../types";
import { Button } from "@chakra-ui/react";

const CustomButton = (props: TCustomButtonProps) => {
    return (
        <Button
            w={"162px"}
            onClick={props.onClick}
            colorScheme="teal"
        >
            {props.label}
        </Button>
    );
}

export { CustomButton };
