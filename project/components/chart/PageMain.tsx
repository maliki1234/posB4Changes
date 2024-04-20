"use client";
import React, { useEffect, useState } from "react";
import { Area, BarChart } from "recharts";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import HashLoader from "react-spinners/HashLoader";

Chart.register(...registerables);
// import Chart from 'chart.js/auto';

export const datas = [
  { id: 1, year: 2016, UserGrain: 8000 },
  { id: 2, year: 2017, UserGrain: 4490 },
  { id: 3, year: 2018, UserGrain: 580 },
];

export default function PageMain() {
  const [useData, setuseData] = useState(
    
  );
  // console.log(useData)

  const getYearSales = async()=>{
    try {
      const respond = await fetch(
        process.env.NEXT_PUBLIC_URL + "/api/report/byMonth",
        { cache: "no-store", method: "GET" }
      );
  
      if (!respond.ok) {
        throw new Error("failed to fetch error");
      }
  
      const data = await respond.json();
      // setreport(data.message)
      // console.log(data.message)
      const b = data.message

      setuseData({
        labels: b.map((el:any) => el.month),
        datasets:[
          {
            label: `sales in this year  ${ new Date().getFullYear()} `,
            data: b.map((el:any) => el._sum.price)
          }
        ]

        })
      
    
    } catch (error) {
      return error
    }

  }

useEffect(() => {
getYearSales()
 
 
}, [])


  // console.log(useData);


if (!useData) {
return <div className=" w-full  h-full flex justify-center items-center">
<HashLoader color="#36d7b7" size={200} />
{/* <ClipLoader /> */}
</div>

}
return<>
<Line data={useData} />
</>;

  
}
