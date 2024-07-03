'use client'

import { getUniversitiesData } from "@/utils/getBackendData";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const UniversitiesComp = () => {

    const [searchCountryName, setSearchCountryName] = useState<string>('')
    const [universitiesData, setUniversitiesData] = useState<any[]>([])
    const [stateValues, setStateValues] = useState<any[]>([])

    const getData = async () => {
        const data = await getUniversitiesData(searchCountryName)
        const statesValues = data.map((item: any) => {
            if (item != null) {
                return item['state-province']
            }
        })
        console.log(statesValues)
        setUniversitiesData(data)
    }

    return (
        <div className="w-screen px-8 lg:px-24">
            <div className="flex flex-row justify-between items-center gap-2">
                <input className="p-4 rounded-lg" onChange={e => setSearchCountryName(e.target.value)} onKeyDown={(e) => {
                    if (e.code == "Enter") {
                        getData()
                    }
                }} />
                <label htmlFor="states" className="ml-auto">Choose a State-Provision:</label>
                <select id="states" name="states" className="p-4 rounded-lg">
                    <option value={""}>Select State-Provision</option>
                    {
                        stateValues.map((item, index) => (
                            <option value={item}>item</option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-4 gap-10 my-20">
                {
                    universitiesData.map((item, index) => (
                        <Card key={index} cardDetails={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default UniversitiesComp
