import {Chart} from '@antv/g2';
import {useEffect, useRef} from 'react';

interface DataType {
    genre: string;
    sold: number;
}


function Fetch() {
    const container = useRef<HTMLDivElement | null>(null);
    const chart = useRef(null);

    useEffect(() => {
        if (!chart.current) {
            chart.current = renderBarChart(container?.current)
        }
    }, []);

    const data = [
        {genre: 'Sports', sold: 275},
        {genre: 'Strategy', sold: 115},
        {genre: 'Action', sold: 120},
        {genre: 'Shooter', sold: 350},
        {genre: 'Other', sold: 159},
    ]
    const renderBarChart = (container: HTMLDivElement) => {
        const chart = new Chart({
            container,
            theme: 'classic'
        });

        chart.interval()
            .data(data)
            .encode('x', 'genre')
            .encode('y', 'sold')
            .encode('key', 'genre')
            .animate('update', {duration: 300});

        chart.render();
        return chart

    }
    const updateBarChart = (chart: any) => {
        const interval = chart.getNodesByType('interval')[0];
        const newData = interval.data().map((d: DataType) => ({
            ...d,
            sold: Math.random() * 400 + 100
        }));
        interval.data(newData);
        chart.render()
    }

    return (
        <>
            <div className="fetch-container" ref={container}></div>
            <button onClick={() => updateBarChart(chart.current)}>update Data</button>
        </>

    )
}


export default Fetch;