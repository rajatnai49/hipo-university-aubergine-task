import Link from "next/link";
import React from "react";
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from 'html-to-image';

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
        <div className="flex flex-col p-20 h-auto bg-lime-50 rounded-lg items-center text-center gap-5" id={cardDetails.alpha_two_code + cardDetails.country + cardDetails.name}>
            {cardDetails.name}
            {
                cardDetails.web_pages.map((item: any) => (
                    <Link href={item} key={item} target="_blank" className="text-blue-700"> {item} </Link>
                ))
            }
            <button onClick={handleImageDownload} > Download </button>
        </div>
    )
}

export default Card
