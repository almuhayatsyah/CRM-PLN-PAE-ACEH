import { Fragment, useEffect, useState } from "react";

export default function Modal({
    children,
    show = false,
    maxWidth = "2xl",
    closeable = true,
    onClose = () => {},
}) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const closeOnEscape = (e) => {
        if (e.key === "Escape") {
            close();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, []);

    const maxWidthClass = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
        "2xl": "sm:max-w-2xl",
    }[maxWidth];

    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">
            <div className="flex min-h-full items-end justify-center sm:items-center">
                <div
                    className="fixed inset-0 bg-gray-500/75 backdrop-blur-sm transition-opacity"
                    onClick={close}
                ></div>

                <div
                    className={`relative transform overflow-hidden rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl shadow-gray-900/20 transition-all sm:my-8 sm:w-full ${maxWidthClass} sm:mx-auto animate-slide-up`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

Modal.Header = function ModalHeader({ children, ...props }) {
    return (
        <div
            {...props}
            className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-white/20"
        >
            <div className="text-lg font-medium text-gray-900">{children}</div>
        </div>
    );
};

Modal.Content = function ModalContent({ children, ...props }) {
    return (
        <div {...props} className="px-6 py-4">
            {children}
        </div>
    );
};

Modal.Footer = function ModalFooter({ children, ...props }) {
    return (
        <div
            {...props}
            className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-white/20 rounded-b-2xl"
        >
            {children}
        </div>
    );
};
