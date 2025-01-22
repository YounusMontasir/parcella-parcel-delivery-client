import React from 'react';
import bannerLottie from './../assets/asset/bannerLottie.json'
import Lottie from 'lottie-react';

const Banner = () => {
    const bannerStyle = {
        backgroundColor: '#01313D',
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1067%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='url(%26quot%3b%23SvgjsLinearGradient1068%26quot%3b)'%3e%3c/rect%3e%3cpath d='M679.374%2c161.982C716.292%2c162.842%2c751.676%2c143.096%2c768.99%2c110.478C785.395%2c79.573%2c776.043%2c43.327%2c758.392%2c13.116C740.935%2c-16.764%2c713.98%2c-42.727%2c679.374%2c-42.909C644.513%2c-43.092%2c615.782%2c-18.225%2c598.902%2c12.277C582.604%2c41.727%2c580.772%2c76.817%2c596.708%2c106.464C613.552%2c137.8%2c643.808%2c161.153%2c679.374%2c161.982' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M597.9257423984333 400.82817640199875L629.46155929523 527.3114295351487 755.9448124283799 495.7756126383519 724.4089955315832 369.292359505202z' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float3'%3e%3c/path%3e%3cpath d='M386.809%2c254.065C430.904%2c254.166%2c463.04%2c216.379%2c483.447%2c177.291C502.135%2c141.497%2c503.095%2c100.824%2c485.883%2c64.297C465.284%2c20.581%2c435.105%2c-26.097%2c386.809%2c-27.796C336.698%2c-29.559%2c296.147%2c11.466%2c274.875%2c56.872C256.529%2c96.034%2c269.589%2c139.24%2c290.937%2c176.849C312.648%2c215.097%2c342.829%2c253.964%2c386.809%2c254.065' fill='rgba(28%2c 83%2c 142%2c 0.4)' class='triangle-float2'%3e%3c/path%3e%3c/g%3e%3c/svg%3e")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="h-[600px]  " style={bannerStyle}>
            <div className='flex gap-16 pt-20 items-center w-10/12 mx-auto'>
            <div className="text-white text-center pt-32 ">
                <h2 className="text-4xl font-bold">Deliver the Happiness</h2>
                <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci itaque, maiores aspernatur cupiditate tempore, facere vero ducimus voluptatibus consequuntur culpa magnam quidem nulla eius quod ipsa deserunt inventore obcaecati natus!
                </p>
                <button className="btn bg-yellow-700 text-white mt-6 px-6 py-2 rounded-lg">
                    Deliver
                </button>
            </div>
            <div className='w-full'>
              <Lottie animationData={bannerLottie}></Lottie>
            </div>
            </div>
        </div>
    );
};

export default Banner;
