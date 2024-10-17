import React, { createContext } from "react";
import { twMerge } from "tailwind-merge";

const FormInlineContext = createContext(false);

function FormInline(props) {
    return (
        <FormInlineContext.Provider value={true}>
            <div
                {...props}
                className={twMerge(["block sm:flex items-center", props.className])}
            >
                {props.children}
            </div>
        </FormInlineContext.Provider>
    );
}

export default FormInline;
export { FormInlineContext };
