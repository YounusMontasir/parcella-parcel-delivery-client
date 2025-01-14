import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

const TopDeliveryMan = () => {
    return (
        <div className='w-10/12 mx-auto my-24'>
            <div className='grid grid-cols-3 gap-6'>
            <Card>
               <CardHeader>
                <img className='h-56 object-cover' src='https://i.ibb.co.com/YWrjRjt/delivery-man-3.png'></img>
               </CardHeader>
               <CardContent className="space-y-2">
               <CardTitle>Alex Johnson</CardTitle>
               <CardDescription>A highly dedicated delivery man known for his punctuality and customer-friendly attitude.</CardDescription>
               <p>300</p>
               </CardContent>
            </Card>
            {/* card 2 */}
            <Card>
               <CardHeader>
                <img className='h-56 object-cover' src='https://i.ibb.co.com/phdWjgz/delivery-man-2.png'></img>
               </CardHeader>
               <CardContent className="space-y-2">
               <CardTitle>Michael Lee</CardTitle>
               <CardDescription>Famous for his efficiency and knack for handling high-pressure delivery schedules.</CardDescription>
               <p>300</p>
               </CardContent>
            </Card>
            {/* card 3 */}
            <Card>
               <CardHeader>
                <img className='h-56 object-cover' src='https://i.ibb.co.com/M2tHRvG/delivery-man-1.png'></img>
               </CardHeader>
               <CardContent className="space-y-2">
               <CardTitle>David Williams</CardTitle>
               <CardDescription>Known for his reliability and maintaining a positive relationship with customers.</CardDescription>
               <p>300</p>
               </CardContent>
            </Card>
        </div>
        </div>
    );
};

export default TopDeliveryMan;
// https://i.ibb.co.com/YWrjRjt/delivery-man-3.png
// https://i.ibb.co.com/M2tHRvG/delivery-man-1.png
// https://i.ibb.co.com/phdWjgz/delivery-man-2.png