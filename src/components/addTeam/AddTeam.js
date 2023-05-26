import Modal from '../UI/Modal';
import './AddTeam.css';
import { projectFirestore } from '../../firebase/config';

import Close from '../assets/close_ring.png';
import { useState, useRef } from 'react';

function AddTeam(props) {
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);


    const [description, setDescription] = useState('');
    const [isDescriptionValid, setIsDescriptionValid] = useState(false);
    const [isDescriptionTouched, setIsDescriptionTouched] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [isStartDateValid, setIsStartDateValid] = useState(false);
    const [isStartDateTouched, setIsStartDateTouched] = useState(false);


    const [expireDate, setExpireDate] = useState('');
    const [isExpireDateValid, setIsExpireDateValid] = useState(false);
    const [isExpireDateTouched, setIsExpireDateTouched] = useState(false);

    const [areDatesMatch, setAreDatesMatch] = useState(true);


    // Refs
    const operatorRef = useRef();
    const phoneRef = useRef();
    const commandRef = useRef();
    const statusRef = useRef();
    const enterDateRef = useRef();
    const expireDateRef = useRef();
    const descriptionRef = useRef();

    // Phone Input

    function phoneChangeHandler(event) {
        setPhone(event.target.value);

        if (event.target.value !== '') {
            setIsPhoneValid(true);
        }
    }

    function phoneBlurHandler(event) {
        setIsPhoneTouched(true);

        if (phone.trim() === '') {
            setIsPhoneValid(false);
        }
    }


    // Description Input

    function descriptionChangeHandler(event) {
        setDescription(event.target.value);

        if (event.target.value !== '') {
            setIsDescriptionValid(true);
        }
    }

    function descriptionBlurHandler(event) {
        setIsDescriptionTouched(true);

        if (description.trim() === '') {
            setIsDescriptionValid(false);
        }
    }


    // Start Date Input

    function startDateChangeHandler(event) {
        setStartDate(event.target.value);

        if (event.target.value !== '') {
            setIsStartDateValid(true);
        }
    }

    function startDateBlurHandler(event) {
        setIsStartDateTouched(true);

        if (startDate.trim() === '') {
            setIsStartDateValid(false);
        }
    }

    // Expire Date Input

    function expireDateChangeHandler(event) {
        setExpireDate(event.target.value);

        if (event.target.value !== '') {
            setIsExpireDateValid(true);
        }
    }

    function expireDateBlurHandler() {
        setIsExpireDateTouched(true);

        if (expireDate.trim() === '') {
            setIsExpireDateValid(false);
        }
    }

    // Add Movie

    function getInputValues() {
        const team = {
            phone: phoneRef.current.value,
            operator: operatorRef.current.value,
            command: commandRef.current.value,
            status: statusRef.current.value,
            enter_date: enterDateRef.current.value,
            expiration_date: expireDateRef.current.value,
            description: descriptionRef.current.value
        }
        return team;
    }

    function addTeamHandler() {
        if (!isPhoneValid || !isDescriptionValid || !isStartDateValid || !isExpireDateValid) {
            console.log("Error");
            return;
        } else if (Date.parse(enterDateRef.current.value) > Date.parse(expireDateRef.current.value)) {
            setAreDatesMatch(false);
            return;
        }
        const newTeam = getInputValues();
        try {
            projectFirestore.collection('teams').add(newTeam);
            props.onHideModal();
        } catch(err) {
            console.log(err);
        }
    }

    const phoneWarningMessage = <p className='warningText'>Phone is empty.</p>;
    const isPhoneInvalid = !isPhoneValid && isPhoneTouched;
    const invalidPhoneClass = isPhoneInvalid ? 'warningInput' : '';

    const descriptionWarningMessage = <p className='warningText'>Description is empty.</p>;
    const isDescriptionInvalid = !isDescriptionValid && isDescriptionTouched;
    const invalidDescriptionClass = isDescriptionInvalid ? 'warningInput' : '';

    const dateWarning = <p className='warningText'>Choose a date.</p>;
    const isStartDateInvalid = !isStartDateValid && isStartDateTouched;
    const invalidStartDateClass = isStartDateInvalid ? 'dateInputs warningInput' : 'dateInputs';

    const isExpireDateInvalid = !isExpireDateValid && isExpireDateTouched;
    const invalidExpireDateClass = isExpireDateInvalid ? 'dateInputs warningInput' : 'dateInputs';

    const matchingWarning = <p className='warningText'>Expire ve Start dates don't match.</p>;


    return (
        <Modal onHideModal={props.onHideModal}>
            <div className="container">
                <main>
                    <div className="popUp">
                        <div className="closeDiv">
                            <button className="closeBtn" onClick={props.onHideModal}><img src={Close} alt="" /></button>
                        </div>
                        <p className="headerModal">New Team</p>
                        <p className="label">Operator</p>
                        <select name="" id="" placeholder="Secilmis nov" ref={operatorRef}>
                            <option value="Azercell">Azercell</option>
                            <option value="Bakcell">Bakcell</option>
                        </select>
                        <p>Command ID</p>
                        <select name="" id="" placeholder="Secilmis ID" ref={commandRef}>
                            <option value="No command">No command</option>
                            <option value="Command">Command</option>
                        </select>
                        <p>Phone</p>
                        <input name="" id="" placeholder="" onBlur={phoneBlurHandler} onChange={phoneChangeHandler} className={invalidPhoneClass} ref={phoneRef} />
                        {isPhoneInvalid && phoneWarningMessage}
                        <p>Status</p>
                        <select type="text" ref={statusRef}>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                        <div className='dateParentDiv'>
                            <div className='dateDiv'>
                                <p>Start</p>
                                <p>Expire</p>
                            </div>
                            <div className='dateDiv'>
                                <input type="date" ref={enterDateRef} onChange={startDateChangeHandler} className={invalidStartDateClass} onBlur={startDateBlurHandler} />
                                {dateWarning && isStartDateInvalid}
                                <input type="date" ref={expireDateRef} className={invalidExpireDateClass} onChange={expireDateChangeHandler} onBlur={expireDateBlurHandler} />
                                {dateWarning && isExpireDateInvalid}
                            </div>
                        </div>
                        {!areDatesMatch && matchingWarning}
                        <p>Description</p>
                        <input type="text" ref={descriptionRef} onChange={descriptionChangeHandler} onBlur={descriptionBlurHandler} className={invalidDescriptionClass} />
                        {isDescriptionInvalid && descriptionWarningMessage}
                        <button className='addBtnModal' onClick={addTeamHandler}>Add Team</button>
                    </div>
                </main>
            </div>
        </Modal>
    );
};

export default AddTeam;