import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useUser from "@/hooks/useUser";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
  const { deliveryData } = useUser();
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", deliveryData?._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${deliveryData._id}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <div className="w-10/12 mx-auto">
      <h2 className="mt-16 text-4xl mb-12 text-center">All Parcels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <Card key={review._id}>
            <CardHeader>
              <img src={review.usersImage} alt="User" className="w-full h-40 object-cover rounded-t" />
            </CardHeader>
            <CardContent>
              <h3 className="text-lg font-semibold">{review.userName}</h3>
              <p className="text-sm text-gray-600">{review?.reviewDate}</p>
              <p className="">{review.review}</p>
              <p>{review.feedback}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;
