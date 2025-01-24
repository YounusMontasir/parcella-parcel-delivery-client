import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import useAxiosPublic from "@/hooks/useAxiosPublic";
  import { useQuery } from "@tanstack/react-query";
  import React from "react";
  
  const TopDeliveryMan = () => {
    const axiosPublic = useAxiosPublic();
  
    const { data: deliveryMans = [], isLoading, error } = useQuery({
      queryKey: ["deliveryman"],
      queryFn: async () => {
        const res = await axiosPublic.get("/users/deliverymans");
        return res.data.filter((user) => user.role === "deliveryman");
      },
    });
  
   
    const topDeliveryMan = deliveryMans
      .sort((a, b) => b.averageReview - a.averageReview)
      .slice(0, 3);
  
    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div className="w-11/12 lg:w-10/12 mx-auto my-24">
         <h1 className="text-4xl lg:text-5xl text-center text-[#25224B] mb-16 mt-8 font-bold">Top Delivery <span className="text-[#F06728]">Man</span></h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {topDeliveryMan.map((delivery) => (
            <div key={delivery._id}>
              <Card>
                <CardHeader>
                  <img
                    className="h-56 w-full object-cover"
                    src={delivery.image || "https://via.placeholder.com/150"}
                    alt={delivery.name || "Delivery Man"}
                  />
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardTitle>{delivery.name}</CardTitle>
                  <CardDescription>
                    Parcels Delivered: {delivery.parcelDelivered || 0}
                  </CardDescription>
                  <p>Average Review: {delivery.averageReview || "N/A"}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TopDeliveryMan;
  