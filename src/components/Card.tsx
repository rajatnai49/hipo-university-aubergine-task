import Link from "next/link";
import React from "react";
import * as htmlToImage from 'html-to-image';

const Card = ({ cardDetails }: any) => {
    const handleImageDownload = () => {
        const element = document.getElementById(cardDetails.alpha_two_code + cardDetails.country + cardDetails.name);
        if (element) {
            htmlToImage.toJpeg(element, { quality: 0.95 })
                .then(function(dataUrl) {
                    var link = document.createElement('a');
                    link.download = cardDetails.alpha_two_code + " " + cardDetails.countryi + " " + cardDetails.name + ".jpeg";
                    link.href = dataUrl;
                    link.click();
                });
        }
    }

    return (
        <div className="flex flex-col pt-20 h-auto bg-blue-50 rounded-lg items-center text-center gap-5 border border-black" >
            <div className="pt-20 px-8 h-auto bg-blue-50 rounded-lg items-center text-center flex flex-col" id={cardDetails.alpha_two_code + cardDetails.country + cardDetails.name}>
                <div className="text-3xl font-semibold">{cardDetails.name}</div>
                <div className="my-10">
                    {
                        cardDetails.web_pages.map((item: any) => (
                            <Link href={item} key={item} target="_blank" className="text-blue-800 text-lg"> {item} </Link>
                        ))
                    }
                </div>
            </div>
            <button onClick={handleImageDownload} className="w-full bg-white p-6 mt-auto text-lg shadow-black border-t border-black"> Download </button>
        </div>
    )
}

export default Card
