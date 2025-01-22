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
            updateUserProfile(user.name,res.data.data.display_url)
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            <p>{profile?.name }</p>
            {profile?.image ? (
                <img src={profile.image} alt="Profile" />
            ) : (
                <p>No profile image available</p>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <Label htmlFor="file">Upload File</Label>
                    <Input
                        id="file"
                        type="file"
                        {...register('image', { required: true })}
                    />
                    {errors.image && <p className="text-red-500">Image is required</p>}
                    <Input
                        className="bg-blue-600 text-white cursor-pointer"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    );
};

export default MyProfile;
