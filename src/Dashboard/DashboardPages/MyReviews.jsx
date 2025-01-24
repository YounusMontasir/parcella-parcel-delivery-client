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
    <div className="w-10/12 mx-auto mb-20">
      <h1 className="text-4xl text-center text-[#25224B] mb-12 mt-8 font-bold">My <span className="text-[#F06728]">Reviews</span></h1>
      {reviews.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
       : <div className='text-3xl text-center'>There is no Review For You</div>}
    </div>
  );
};

export default MyReviews;
