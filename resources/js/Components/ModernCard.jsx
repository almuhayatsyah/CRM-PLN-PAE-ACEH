import { forwardRef } from "react";

const ModernCard = forwardRef(({ className = "", children, ...props }, ref) => {
    return (
        <div ref={ref} className={`modern-card ${className}`} {...props}>
            {children}
        </div>
    );
});

export default ModernCard;
