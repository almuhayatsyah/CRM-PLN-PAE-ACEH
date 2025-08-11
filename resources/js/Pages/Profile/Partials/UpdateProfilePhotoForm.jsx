import { useRef, useState } from "react";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputError from "@/Components/InputError";
import { Transition } from "@headlessui/react";

export default function UpdateProfilePhotoForm({ className = "" }) {
    const user = usePage().props.auth.user;
    const [photoPreview, setPhotoPreview] = useState(null);
    const photoInput = useRef(null);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            photo: null,
        });

    const selectNewPhoto = () => {
        photoInput.current.click();
    };

    const updatePhotoPreview = () => {
        const photo = photoInput.current.files[0];
        if (!photo) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            setPhotoPreview(e.target.result);
        };
        reader.readAsDataURL(photo);
        setData("photo", photo);
    };

    const updateProfilePhoto = (e) => {
        e.preventDefault();
        post(route("profile.photo.update"), {
            preserveScroll: true,
            onSuccess: () => {
                setPhotoPreview(null);
                setData("photo", null);
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Foto Profil
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Perbarui foto profil akun Anda.
                </p>
            </header>

            <form onSubmit={updateProfilePhoto} className="mt-6 space-y-6">
                <div className="col-span-6 sm:col-span-4">
                    <input
                        type="file"
                        className="hidden"
                        ref={photoInput}
                        onChange={updatePhotoPreview}
                    />
                    <InputLabel htmlFor="photo" value="Foto" />

                    {/* Current Profile Photo */}
                    <div className="mt-2">
                        <img
                            src={photoPreview || user.profile_photo_url}
                            alt={user.name}
                            className="rounded-full h-20 w-20 object-cover"
                        />
                    </div>

                    <SecondaryButton
                        className="mt-2 mr-2"
                        type="button"
                        onClick={selectNewPhoto}
                    >
                        Pilih Foto Baru
                    </SecondaryButton>

                    <InputError message={errors.photo} className="mt-2" />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Tersimpan.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
