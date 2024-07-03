'use client'

import { getUniversitiesData } from "@/utils/getBackendData";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const UniversitiesComp = () => {

    const [searchCountryName, setSearchCountryName] = useState<string>('')
    const [universitiesData, setUniversitiesData] = useState<any[]>([])
    const [universitiesDataOnState, setUniversitiesDataOnState] = useState<any[]>([])
    const [stateValues, setStateValues] = useState<any[]>([])
    const [selectedState, setState] = useState<string>('')

    const getData = async () => {
        const data = await getUniversitiesData(searchCountryName)
        const statesValues = data.map((item: any) => {
            if (item != null) {
                return item['state-province']
            }
        })
        const filtered = statesValues.filter(function(el: any) {
            return el != null;
        });
        setStateValues(filtered)
        setUniversitiesData(data)
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
            <div className="flex flex-row justify-between items-center gap-2">
                <input className="p-4 rounded-lg" onChange={e => setSearchCountryName(e.target.value)} onKeyDown={(e) => {
                    if (e.code == "Enter") {
                        getData()
                    }
                }} />
                <label htmlFor="states" className="ml-auto">Choose a State-Provision:</label>
                <select id="states" name="states" className="p-4 rounded-lg" onChange={handleStateChange} >
                    <option value={""}>Select State-Provision</option>
                    {
                        stateValues.map((item, index) => (
                            <option value={item}>{item}</option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-4 gap-10 my-20">
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
        </div>
    )
}

export default UniversitiesComp
