import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    
    const submit = (e) => {
        e.preventDefault();
        post(route("password.email"));
    };

    return (
        <GuestLayout>
            <Head title="Lupa Password" />

            <div className="px-8 py-8">
                {/* Header Section */}
                <div className="mb-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Atur Ulang Kata Sandi
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Masukkan email Anda untuk menerima tautan pengaturan ulang
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                        {status}
                    </div>
                )}

                {/* Instructions */}
                <div className="mb-6 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                    Lupa password Anda? Tidak masalah. Masukkan alamat email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda.
                </div>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat Email
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            isFocused={true}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-1" />
                    </div>

                    <div className="mt-6">
                        <PrimaryButton
                            className="w-full justify-center py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg shadow-md transition-all"
                            disabled={processing}
                        >
                            {processing ? 'Mengirim...' : 'Kirim Tautan Reset'}
                        </PrimaryButton>
                    </div>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        Ingat password Anda?{' '}
                        <a href={route('login')} className="text-blue-600 hover:underline">
                            Kembali ke halaman masuk
                        </a>
                    </div>
                </form>
            </div>
        </GuestLayout>
    );
}