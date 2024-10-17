import React, { useContext } from "react";
import { FormInlineContext } from "../FormInline/FormInline";
import { twMerge } from "tailwind-merge";

function FormSelect(props) {
    const formInline = useContext(FormInlineContext);
    const { formSelectSize, ...computedProps } = props;
    return (
        <select
            {...computedProps}
            className={twMerge([
                "disabled:bg-purple-500 disabled:cursor-not-allowed disabled:dark:bg-purple-900",
                "[&[readonly]]:bg-purple-500 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-purple-900",
                "transition duration-200 ease-in-out w-full text-sm border-purple-900 shadow-sm rounded-xl py-3 px-3 pr-8 focus:ring-2 focus:ring-opacity-30 dark:bg-purple-500 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50",
                props.formSelectSize === "sm" && "text-xs py-1.5 pl-2 pr-8",
                props.formSelectSize === "lg" && "text-lg py-1.5 pl-4 pr-8",
                formInline && "flex-1",
                props.className,
            ])}
        >
            {props.children}
        </select>
    );
}

export default FormSelect;
