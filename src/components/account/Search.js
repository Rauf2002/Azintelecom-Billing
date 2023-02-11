import SearchImg from '../assets/Search.png';
import './Account.css';

import { useState, useRef, useEffect } from 'react';


function Search() {

    const [fetchedData, setFetchedData] = useState([]);

    async function GetData() {
        const response = await fetch('http://localhost:3000/teams/');
        const data = await response.json();
        const transformedData = data.map((tableData) => {
            return {
                id: tableData.id,
                phone: tableData.phone,
                operator: tableData.operator,
                command: tableData.command,
                status: tableData.status,
                enter_date: tableData.enter_date,
                expiration_date: tableData.expiration_date,
                description: tableData.description
            }
        });

        setFetchedData(transformedData);
    }

    useEffect(() => { GetData(); }, []);


    const fullTableRows = fetchedData.map((data) =>
        <tr>
            <td>{data.id}</td>
            <td>{data.phone}</td>
            <td>{data.operator}</td>
            <td>{data.command}</td>
            <td>{data.status}</td>
            <td>{data.enter_date}</td>
            <td>{data.expiration_date}</td>
            <td>{data.description}</td>
        </tr>
    );


    const [filteredData, setFilteredData] = useState([]);
    const [isSearchClicked, setIsSearchClicked] = useState(false);

    const [filterPhone, setFilterPhone] = useState('');

    // Refs

    const statusRef = useRef();
    const operatorRef = useRef();
    const startDateRef = useRef();
    const expireDateRef = useRef();



    function filterPhoneChangeHandler(event) {
        setFilterPhone(event.target.value);
    }

    
    let filters = "singleData.status === statusRef.current.value && singleData.operator === operatorRef.current.value"
    function FilterData() {
        setIsSearchClicked(true);
        const filtered = fetchedData.filter(singleData => {
            console.log(expireDateRef.current.value);
            console.log(startDateRef.current.value);

            if (filterPhone !=='') {
                filters += " && singleData.phone === filterPhone";
            } else if (startDateRef.current.value !== '') {
                filters += " Date.parse(singleData.enter_date) >= Date.parse(startDateRef.current.value)"
            } else if (expireDateRef.current.value !== '') {
                filters += " && Date.parse(singleData.expiration_date) <= Date.parse(expireDateRef.current.value)";
            }

            return eval(filters);

        });

        setFilteredData(filtered);
    }

    // Date options
    //const options = {year: 'numeric', month: 'short', day: 'numeric'};

    const filteredTableRows = filteredData.map((data) =>
        <tr>
            <td>{data.id}</td>
            <td>{data.phone}</td>
            <td>{data.operator}</td>
            <td>{data.command}</td>
            <td>{data.status}</td>
            <td>{data.enter_date}</td>
            <td>{data.expiration_date}</td>
            <td>{data.description}</td>
        </tr>
    );

    const shownTable = isSearchClicked ? filteredTableRows : fullTableRows;

    return (
        <div className='main'>
            <div className="billingDiv">
                <div>
                    <p className='title'><i>Billing Sistemi</i> uzre melumatlari daxil ederek axtaris edin</p>
                </div>
                <div className="selectionDiv">
                    <div className="selectionOne">
                        <div>
                            <p>Status</p>
                            <select name="" id="" class="inputs" ref={statusRef}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <p>Telefon</p>
                            <input type="text" class="inputs" placeholder="+994 XX XXX XX XX" onChange={filterPhoneChangeHandler} />
                        </div>
                        <div>
                            <p>Operator</p>
                            <select name="" id="" class="inputs" ref={operatorRef}>
                                <option value="Azercell">Azercell</option>
                                <option value="Bakcell">Bakcell</option>
                            </select>

                            <p>Tarix araligi</p>
                            <div class="dateDiv">
                                <input type="date" className="dateInputs" ref={startDateRef} />
                                <input type="date" className="dateInputs" ref={expireDateRef} />
                            </div>
                        </div>
                    </div>
                    <div className="searchBtnDiv">
                        <button className="searchBtn" onClick={FilterData}><img src={SearchImg} alt="" /> <p>AXTAR</p></button>
                    </div>
                </div>
            </div>

            <div className='tableDiv'>
                <div>
                    <h2>Axtaris uzre {shownTable.length} netice tapildi</h2>
                </div>
                <table>
                    <tr>
                        <th className='numberHead'>#</th>
                        <th>Telefon</th>
                        <th>Operator</th>
                        <th>Command</th>
                        <th>Status</th>
                        <th>Daxil edilme</th>
                        <th>Bitme Tarixi</th>
                        <th>Description</th>
                    </tr>
                    {shownTable}

                </table>
            </div>
        </div>
    );
};

export default Search;