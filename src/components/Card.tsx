import Link from "next/link";
import React from "react";

const Card = ({ cardDetails }: any) => {
    console.log(cardDetails)
    return (
        <div className="flex flex-col p-20 h-auto bg-lime-50 rounded-lg items-center text-center gap-5">
            {cardDetails.name}
            {
                cardDetails.web_pages.map((item:any) => (
                   <Link href={item} key={item} target="_blank" className="text-blue-700"> {item} </Link>
                ))
            }
        </div>
    )
}

export default Card
