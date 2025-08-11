import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function SecondaryButton(
    { className = "", disabled, children, ...props },
    ref
) {
    const combinedClassName = className.includes("btn-secondary-modern")
        ? className
        : `btn-secondary-modern ${className}`;

    return (
        <button
            {...props}
            className={combinedClassName}
            ref={ref}
            disabled={disabled}
        >
            {children}
        </button>
    );
});
