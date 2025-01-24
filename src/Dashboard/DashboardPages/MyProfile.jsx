import { Input } from '@/components/ui/input';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { Label } from '@radix-ui/react-label';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
    const axiosPublic = useAxiosPublic();
    const { user, updateUserProfile } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { data: profile, isLoading, error, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Ensure the query only runs when the email exists
    });

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        });
        if (res.data.success) {
            const image = {
                image: res.data.data.display_url,
            };
            updateUserProfile(user.name, res.data.data.display_url);
            axiosPublic.patch(`/users/${user.email}`, image).then((res) => {
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Your photo updated successfully',
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
                refetch();
            });
        }
    };

    if (isLoading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error.message}</p>;
    }

    return (
        <div className="w-11/12 lg:w-5/12 mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
           <h1 className="text-4xl text-center text-[#25224B] mb-12 mt-8 font-bold">My <span className="text-[#F06728]">Profile</span></h1>

            <div className="flex flex-col items-center mb-6">
                {profile?.image ? (
                    <img
                        src={profile.image}
                        alt="Profile"
                        className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover mb-4"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <p className="text-gray-500">No Image</p>
                    </div>
                )}
                <h3 className="text-xl font-semibold">{profile?.name || 'N/A'}</h3>
                <p className="text-gray-600">{profile?.email}</p>
                <p className="text-gray-600">Parcels Booked: {profile?.parcelBooked || 0}</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Profile Image
                    </Label>
                    <Input
                        id="file"
                        type="file"
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
                        {...register('image', { required: true })}
                    />
                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">Image is required</p>
                    )}
                </div>

                <div>
                    <Input
                        type="submit"
                        value="Update Profile"
                        className="w-full bg-[#F06728] text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    />
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
