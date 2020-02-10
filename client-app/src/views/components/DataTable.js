import React, {useState, useEffect} from 'react';
import { CapitalizeFirstLetter } from '../../utils/utils';
import Fuse from "fuse.js";

const DataTable = ({data}) => {
    const [searchVal, setSearchval] = useState('')
    const [tableData, setTableData] = useState([])

    const options = {
        shouldSort: false,
        threshold: 0.7,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [...Object.keys(data.length ? data[0] : [])]
    };
    const fuse = new Fuse(data, options);

    useEffect(() => {
        const result = searchVal.length ? fuse.search("") : data;
        setTableData([...result])
    }, [data])

    const fuzzySearch =(val)=>{
        setSearchval(val)
        if(val == ""){
            setTableData([...data])
        } else {
            const result = fuse.search(val);
            setTableData([...result])
        }
    }

    const renderTableRows = tableData.length ? tableData.map((row, index) => {
        return(
            <tr className={"table-row"}>
                {Object.keys(row).map((key) => {
                    return(<td className={"table-cell"}>{row[key]}</td>)
                })}
            </tr>
        )
    }) : []

    const ColumnHeaders = tableData.length ? Object.keys(tableData[0]) : []
    const renderTableHeaders =  ColumnHeaders.map((x) => {
        return(
            <th scope="col" data-content={x}>{CapitalizeFirstLetter(x)}</th>
        )
    })

    return(
        <>
            <div className="form-row justify-content-end">
                <div className={"input-group col-3"}>
                    <input className={"form-control"} value={searchVal} onChange={(e) => fuzzySearch(e.target.value)}/>
                    <div className={"input-group-append"}>
                        <button className={"btn btn-outline-secondary"} onClick={() => fuzzySearch('')}>
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <hr/>
            <table className={"table"}>
                <thead>
                    <tr>
                        {renderTableHeaders}
                    </tr>
                </thead>
                <tbody>
                    {renderTableRows}
                </tbody>
            </table>
        </>
    )
}

export default DataTable;