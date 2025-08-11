// GuestLayout.jsx
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/foto_pln.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-8">
                    <Link href="/">
                        <img
                            src="/images/logo-pln.png"
                            alt="Logo PLN"
                            className="h-20 w-auto mb-4"
                        />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                        CRM PAE UID ACEH
                    </h1>
                    <p className="text-sm text-gray-600 mt-1">PLN UID Aceh</p>
                </div>

                {/* Content Card */}
                <div className="w-full overflow-hidden bg-white rounded-xl shadow-xl border border-gray-200">
                    {children}
                </div>
            </div>
        </div>
    );
}
