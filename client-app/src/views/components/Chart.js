import React, { useState, useEffect } from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { ResponsiveLine } from '@nivo/line';
import { ResponsiveBar } from '@nivo/bar';
import moment from 'moment';
import { CapitalizeFirstLetter } from '../../utils/utils';


const Chart = ({data, dataType}) => {
    const [selectedMetric, setMetric] = useState()
    const [chartType, setChartType] = useState('line')
    const [chartData, setChartData] = useState([])
    const Keys = data.length ? Object.keys(data[0]) : []

    useEffect(() => {
        if(data.length){
            if(dataType.includes('Events')){
                updateData('events', chartType)
            } else {
                updateData('impressions', chartType)
            }
        }
    }, [data, dataType, selectedMetric, chartType])

    const updateData = (metric, chartType) => {
        setMetric(metric)
        setChartType(chartType)

        let formattedData = []
        if(dataType.startsWith('hourly')){
            data = data.map((x) => {
                x.date = new Date(x.date).setHours(x.hour)
                return x
            })
        }

        switch(chartType){
            case 'line':
                let lineData = data.map((x, index) => {
                    return {
                        x: dataType.startsWith('daily') ? moment(x["date"]).format('YYYY-MM-DD') : moment(x["date"]).format('YYYY-MM-DD HH:mm:ss'),
                        y: x[metric]
                    }
                })
                formattedData.push({
                    id: [metric],
                    color: "hsl(355, 70%, 50%)",
                    data: [...lineData]
                })
                break;
            case 'bar':
                let barData = []
                if(dataType.startsWith('daily')){
                    barData = data.map((x, index) => {return {key: index, date: x["date"], [metric]: x[metric]}})
                } else {
                    barData = data.map((x, index) => {return {key: index, date: x["date"], [metric]: x[metric]}})
                }          
                formattedData = barData.map((x) => {
                    x.date = dataType.startsWith('daily') ? moment(x.date).format('YYYY-MM-DD') : moment(x.date).format('YYYY-MM-DD HH')
                    x[metric] = parseFloat(x[metric]) % 1 == 0 ? x[metric] : parseFloat(x[metric]).toFixed(2)
                    return x
                })
                break;
            case 'calendar':
                let calendarData = data.map((x, index) => {return {key: index, date: x["date"], value: isNaN(x[metric]) ? parseFloat(x[metric]) : x[metric]}})
                const groups = calendarData.reduce((groups, item) => {
                    const date = item.date.split('T')[0];
                    if (!groups[date]) {
                      groups[date] = [];
                    }
                    groups[date].push(item);
                    return groups;
                  }, {});
                  
                  formattedData = Object.keys(groups).map((date) => {
                    return {
                      day: moment(date).format("YYYY-MM-DD"),
                      value: groups[date].reduce((total, x) => total + x.value, 0)
                    };
                  });
                break;
        }

        setChartData([...formattedData])
    }

    return(
        <div className={"w-100"}>
            <div className={"form-row justify-content-between"}>
                <select id="metric" className={"form-control col-2"} value={selectedMetric} onChange={(e) => updateData(e.target.value, chartType)}>
                    {Keys.map((x, index) => (x != 'date' && x != 'hour') && <option key={index} value={x}>{CapitalizeFirstLetter(x)}</option>)}
                </select>
                    <select className={"form-control col-2"} value={chartType} onChange={(e) => updateData(selectedMetric, e.target.value)}>
                        <option value="line">Line Chart</option>
                        <option value="bar">Bar Chart</option>
                        <option value="calendar">Calendar</option>
                    </select>
            </div>
            <div className={"form-row"} style={{height: 400}}>
                {chartData.length > 0 &&
                    <>
                        {chartType == 'line' &&
                            <ResponsiveLine 
                                data={chartData}
                                margin={{ top: 60, right: 110, bottom: 60, left: 95 }}
                                xScale={{ type: 'point' }}
                                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    orient: 'bottom',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: "Date",
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                axisLeft={{
                                    orient: 'left',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: CapitalizeFirstLetter(selectedMetric),
                                    legendOffset: -80,
                                    legendPosition: 'middle'
                                }}
                                colors={{ scheme: 'nivo' }}
                            />
                        }

                        {chartType == 'bar' &&
                            <ResponsiveBar
                                data={chartData}
                                keys={[selectedMetric]}
                                colors={{ scheme: 'nivo' }}
                                indexBy="date"
                                axisTop={null}
                                axisRight={null}
                                margin={{ top: 60, right: 60, bottom: 60, left: 95 }}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Date',
                                    legendPosition: 'middle',
                                    legendOffset: 32
                                }}
                                axisLeft={{
                                    orient: 'left',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: CapitalizeFirstLetter(selectedMetric),
                                    legendOffset: -80,
                                    legendPosition: 'middle'
                                }}
                                enableLabel={false}
                            />
                        }
                        {chartType == 'calendar' &&
                            <ResponsiveCalendar 
                                data={chartData}
                                colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
                                from={chartData[0].day}
                                to={chartData[chartData.length - 1].day}
                                monthBorderColor="#ffffff"
                                dayBorderWidth={2}
                                dayBorderColor="#ffffff"
                                yearSpacing={40}
                                emptyColor="#eeeeee"
                                legends={[
                                    {
                                        anchor: 'bottom-right',
                                        direction: 'row',
                                        translateY: 36,
                                        itemCount: 4,
                                        itemWidth: 42,
                                        itemHeight: 36,
                                        itemsSpacing: 14,
                                        itemDirection: 'right-to-left'
                                    }
                                ]}
                            />
                        }
                    </>
                }
                
            </div>
            
        </div>
    )
}

export default Chart;