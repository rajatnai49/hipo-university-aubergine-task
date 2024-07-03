'use client'

import { getUniversitiesData } from "@/utils/getBackendData";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { toast } from 'react-hot-toast';

const UniversitiesComp = () => {

    const [searchCountryName, setSearchCountryName] = useState<string>('')
    const [universitiesData, setUniversitiesData] = useState<any[]>([])
    const [universitiesDataOnState, setUniversitiesDataOnState] = useState<any[]>([])
    const [stateValues, setStateValues] = useState<any[]>([])
    const [selectedState, setState] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getData = async () => {
        setIsLoading(true)
        const data = await getUniversitiesData(searchCountryName)
        console.log(data)
        const statesValues = data.map((item: any) => {
            if (item != null) {
                return item['state-province']
            }
        })
        const filtered = statesValues.filter(function(el: any) {
            return el != null;
        });
        setStateValues(filtered)
        setState('')
        setUniversitiesData(data)
        toast.success('Universities fetched successfully!');
        setIsLoading(false)
    }

    useEffect(() => {
        const filterData = async () => {
            const filterUnis = universitiesData.filter(function(item: any) {
                if (item['state-province'] === selectedState) {
                    return item;
                }
            })
            setUniversitiesDataOnState(filterUnis)
        }
        filterData()
    }, [selectedState])

    const handleStateChange = (event: any) => {
        setState(event.target.value);
    };

    return (
        <div className="w-screen px-8 lg:px-24">
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-2">
                <div className="flex flex-row items-center justify-center">
                    <input placeholder="Enter Country & press Enter" className="p-4 rounded-lg" onChange={e => setSearchCountryName(e.target.value)} onKeyDown={(e) => {
                        if (e.code == "Enter") {
                            getData()
                        }
                    }} />
                    <button className="mx-5 bg-orange-500 text-white rounded-lg h-10 p-5 flex flex-row items-center justify-center" onClick={getData}>Search</button>
                </div>

                <select id="states" name="states" className="p-4 rounded-lg w-auto my-5 md:my-0" onChange={handleStateChange} >
                    <option value={""}>Select State-Provision</option>
                    {
                        stateValues.map((item, index) => (
                            <option value={item} key={item + index}>{item}</option>
                        ))
                    }
                </select>
            </div>

            {
                isLoading ?
                    <div className="flex flex-row items-center justify-center my-40">Loading Please Wait...</div>
                    :

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-20">
                        {
                            selectedState ?
                                universitiesDataOnState.map((item, index) => (
                                    <Card key={index} cardDetails={item} />
                                ))
                                :
                                universitiesData.map((item, index) => (
                                    <Card key={index} cardDetails={item} />
                                ))
                        }
                    </div>
            }
        </div>
    )
}

export default UniversitiesComp
