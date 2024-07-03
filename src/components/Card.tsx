import Link from "next/link";
import React from "react";
import * as htmlToImage from 'html-to-image';
import toast from "react-hot-toast";

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
            toast.success("University Card downloaded :)")
        }
        else {
            toast.error("There is some error :(")
        }
    }

    return (
        <div className="flex flex-col pt-20 h-auto bg-white rounded-lg items-center text-center gap-5 border border-black" >
            <div className="pt-20 px-8 h-auto bg-white rounded-lg items-center text-center flex flex-col" id={cardDetails.alpha_two_code + cardDetails.country + cardDetails.name}>
                <div className="text-3xl font-semibold">{cardDetails.name}</div>
                <div className="my-10">
                    {
                        cardDetails.web_pages.map((item: any) => (
                            <Link href={item} key={item} target="_blank" className="text-blue-800 text-lg"> {item} </Link>
                        ))
                    }
                </div>
            </div>
            <button onClick={handleImageDownload} className="bg-black text-white m-5 py-4 px-8 mt-auto text-lg shadow-black border-t border-black rounded-xl"> Download </button>
        </div>
    )
}

export default Card
