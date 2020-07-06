import React from 'react';
import './tvlist.css';


export default function TvList(){

    return(
        <div className="W_container">
			<div className="W_waitingListItem" id="W_active">
				<div className="W_patientInfo">
					<div className="W_name">Mr. Adil</div>
					<div className="W_id">T123278</div>
				</div>
				<div className="W_time">
					<div>13 : 45 : 00</div>
				</div>
			</div>
			<div className="W_waitingListItem">
				<div className="W_patientInfo">
					<div className="W_name">Mr. Adil</div>
					<div className="W_id">T123278</div>
				</div>
				<div className="W_time">
					<div>13 : 45 : 00</div>
				</div>
			</div>
			<div className="W_waitingListItem">
				<div className="W_patientInfo">
					<div className="W_name">Mr. Adil</div>
					<div className="W_id">T123278</div>
				</div>
				<div className="W_time">
					<div>13 : 45 : 00</div>
				</div>
			</div>
		</div>
    );
}