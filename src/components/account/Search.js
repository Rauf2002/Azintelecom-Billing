import SearchImg from '../assets/Search.png';
import DeleteImg from '../assets/delete.png';
import './Account.css';
import { projectFirestore } from '../../firebase/config';

import { useState, useRef, useEffect } from 'react';


function Search() {

    const [fetchedData, setFetchedData] = useState([]);

    function GetData() {
        const unsub = projectFirestore.collection('teams').onSnapshot((snapshot) => {
            //if (!snapshot.empty) {
                let results = [];
                snapshot.docs.forEach(doc => {
                    results.push({id: doc.id, ...doc.data()});
                });
                setFetchedData(results);
            //}
        }, (err) => {
            console.log(err.message);
        })

        return () => unsub();
    }

    useEffect(() => { GetData(); }, []);


    const fullTableRows = fetchedData.map((data) =>
        <tr>
            <td><button className="deleteBtn" onClick={() => DeleteTeam(data.id)}><img src={DeleteImg}/></button></td>
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

    const filteredTableRows = filteredData.map((data) =>
        <tr>
            <td><button className="deleteBtn" onClick={() => DeleteTeam(data.id)}><img src={DeleteImg}/></button></td>
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

    // Delete function
    function DeleteTeam (id) {
        projectFirestore.collection('teams').doc(id).delete();
    }

    return (
        <div className='main'>
            <div className="billingDiv">
                <div>
                    <p className='title'><i>Billing System:</i> Enter info and filter teams</p>
                </div>
                <div className="selectionDiv">
                    <div className="selectionOne">
                        <div>
                            <p>Status</p>
                            <select name="" id="" class="inputs" ref={statusRef}>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <p>Phone</p>
                            <input type="text" class="inputs" placeholder="+994 XX XXX XX XX" onChange={filterPhoneChangeHandler} />
                        </div>
                        <div>
                            <p>Operator</p>
                            <select name="" id="" class="inputs" ref={operatorRef}>
                                <option value="Azercell">Azercell</option>
                                <option value="Bakcell">Bakcell</option>
                            </select>

                            <p>Date Interval</p>
                            <div class="dateDiv">
                                <input type="date" className="dateInputs" ref={startDateRef} />
                                <input type="date" className="dateInputs" ref={expireDateRef} />
                            </div>
                        </div>
                    </div>
                    <div className="searchBtnDiv">
                        <button className="searchBtn" onClick={FilterData}><img src={SearchImg} alt="" /> <p>SEARCH</p></button>
                    </div>
                </div>
            </div>

            <div className='tableDiv'>
                <div>
                    <h2>{shownTable.length} results found</h2>
                </div>
                <table>
                    <tr>
                        <th className='numberHead'>#</th>
                        <th>Phone</th>
                        <th>Operator</th>
                        <th>Command</th>
                        <th>Status</th>
                        <th>Enter Date</th>
                        <th>Expiration Date</th>
                        <th>Description</th>
                    </tr>
                    {shownTable}

                </table>
            </div>
        </div>
    );
};

export default Search;