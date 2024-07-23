"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Arrays
    const boxCarArray = [];
    const boxCarCargoManifestArray = [];
    const s1WarehouseCargoManifestArray = [];
    const s2WarehouseCargoManifestArray = [];
    const s3WarehouseCargoManifestArray = [];
    const s4WarehouseCargoManifestArray = [];
    const totalWarehouseCargoManifestArray = [];

    // Variables
    var currentDay = 1;
    var currentStationNum = 1;
    var maxStationNum = 4;
    var currentStation = 'S1';

    // Get all the divs required
    const divA = $("#divA");
    const divB = $("#divB");
    const divC = $("#divC");
    const divD = $("#divD");
    const divE = $("#divE");
    const divF = $("#divF");
    const divG = $("#divG");

    // Get all the radio buttons required
    const radioB = $("#divBRadio");
    const radioD = $("#divDRadio");
    const radioC = $("#divCRadio");
    const radioF = $("#divFRadio");
    const radioG = $("#divGRadio");

    // Get all the inputs for div B (Create box car)
    const boxCarIDInput = $("#boxcarID");
    const tareWeightInput = $("#tareWeight");
    const maxGrossWeightInput = $("#maxGrossWeight");
    const cargoWeightInput = $("#cargoWeight");
    const grossWeightInput = $("#grossWeight");

    // Get all the buttons required for div B (Create box car)
    const processBoxCarBtn = $("#processBoxCar");
    const divBResetFormBtn = $("#divBResetForm");
    const divBReturnToMainPageBtn = $("#divBReturnMainPage");

    // Get all the spans required for div B (Create box car)
    const boxcarIDSpan = $("#boxcarIDSpan");
    const tareWeightSpan = $("#tareWeightSpan");
    const maxGrossWeightSpan = $("#maxGrossWeightSpan");

    // Get the table for div C (Display All Box Cars)
    const configuredBoxCarTable = $("#configuredBoxCarTable");
    const totalCargoWeightIntValue = $("#totalCargoWeightIntValue");

    // Get all the buttons required for div C (Display All Box Cars)
    const returnToCreateBoxCar = $("#returnToCreateBoxCar");
    const divCReturnToMainPageBtn = $("#divCReturnMainPage");

    // Get all the inputs required for div D (Create Freight Entry)
    const divDSelectBoxCar = $("#divDSelectBoxCar");
    const divDBoxCarSelected = $("#divDBoxCarSelected");
    const divDTransportID = $("#divDTransportID");
    const divDDescription = $("#divDDescription");
    const divDCargoWeight = $("#divDCargoWeight");

    // Get all the buttons required for div D (Create Freight Entry)
    const processCargoBtn = $("#processCargo");
    const divDResetFormBtn = $("#divDResetForm");
    const divDReturnToMainPageBtn = $("#divDReturnMainPage");

    // get all the spans required for div D (Create Freight Entry)
    const divDTransportIDSpan = $("#divDTransportIDSpan");
    const divDDescriptionSpan = $("#divDDescriptionSpan");
    const divDCargoWeightSpan = $("#divDCargoWeightSpan");

    // Get the table for div E (Boxcar Manifest)
    const boxcarManifestTable = $("#boxCarManifest");

    // Get all the buttons for div E (Boxcar Manifest)
    const divEReturnToMainPageBtn = $("#divEReturnMainPage");
    const returnToCreateFreightEntryBtn = $("#returnToCreateFreightEntry");


    // Get the table for div F (Warehouse Manifest)
    const warehouseManifestTableS1 = $("#warehouseManifestS1");
    const warehouseManifestTableS2 = $("#warehouseManifestS2");
    const warehouseManifestTableS3 = $("#warehouseManifestS3");
    const warehouseManifestTableS4 = $("#warehouseManifestS4");

    // Get all the buttons for div F (Warehouse Manifest)
    const divFReturnToMainPageBtn = $("#divFReturnMainPage");
    const divFReturnToCreateFreightEntryBtn = $("#divFReturnToCreateFreightEntry");

    // Get the table for div G (Complete Freight Status)
    const completeFreightStatusTable = $("#completeFreightStatus");

    // Get all the buttons for div G (Complete Freight Status)
    const divGReturnToMainPageBtn = $("#divGReturnMainPage");

    /* 
        Function that takes in a div, and hides all other divs except for the ones required.

        ****SPECIAL CASE****
        If div B is displayed, div C is ALWAYS displayed with it.
    */
    const changeDiv = (div) => {
        divA.hidden = true;
        divB.hidden = true;
        divC.hidden = true;
        divD.hidden = true;
        divE.hidden = true;
        divF.hidden = true;
        divG.hidden = true;

        div.hidden = false;

        if (div === divB) {
            divC.hidden = false;
        }
    };

    /*
        Function which passes in the Box Car Array.
        Checks if certain conditions are met, if they are, it will append the info to an array, and then to the master array.
        It will then display this information on the Configured Boxcar table.
    */
    const processBoxCar = (boxCarArray) => {
        // Get the value of the Div B, create box car inputs.
        let boxCarIDVal = boxCarIDInput.value;
        let tareWeightVal = parseInt(tareWeightInput.value);
        let maxGrossWeightVal = parseInt(maxGrossWeightInput.value);
        let cargoWeightVal = parseInt(cargoWeightInput.value);
        let grossWeightVal = parseInt(grossWeightInput.value);

        // Set the value of grossWeight.
        grossWeightVal = tareWeightVal + cargoWeightVal;

        // If statements to display errors.
        if (!(/BX\d{3}$/).test(boxCarIDVal)) {
            boxcarIDSpan.textContent = "Boxcar ID must be in the format 'bx123'";
        } else if (tareWeightVal < 0 || tareWeightVal > 20000) {
            tareWeightSpan.textContent = "TARE Weight must be in the range of 0 to 20000";
        } else if (maxGrossWeightVal < tareWeightVal || maxGrossWeightVal > 200000) {
            maxGrossWeightSpan.textContent = "Must be greater than TARE and must be in range of 0 to 200000";
        // Else statement to proceed with the function.
        } else {
            const currentBoxCar = {
                boxCarID: boxCarIDVal,
                tareWeight: tareWeightVal,
                maxGrossWeight: maxGrossWeightVal,
                cargoWeight: cargoWeightVal,
                grossWeight: grossWeightVal
            };
            boxCarArray.push(currentBoxCar);
            displayConfiguredBoxCars(boxCarArray);
        }
    };

    /*
        Function which takes in boxCarArray.
        Checks to see if a body exists in the table, and if so, deletes it.
        loops through the boxCarArray, gets each object, and then displays the info in the table.

    */
    const displayConfiguredBoxCars = (boxCarArray) => {
        // Check if tbody exists and remove it
        let oldTbody = configuredBoxCarTable.querySelector('tbody');
        if (oldTbody) {
            configuredBoxCarTable.removeChild(oldTbody);
            totalCargoWeightIntValue.textContent = "0";
        }
    
        let tableBody = document.createElement('tbody');
        let totalCargoWeight = 0;
    
        boxCarArray.forEach(boxCar => {
            let tableRow = document.createElement('tr');
            for (let key in boxCar) {
                let tableCell = document.createElement('td');
                tableCell.textContent = boxCar[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeight += parseFloat(boxCar[key]);
                }
            }
            tableBody.append(tableRow);
        });
    
        configuredBoxCarTable.append(tableBody);
        totalCargoWeightIntValue.textContent = totalCargoWeight;
    };

    const divDOnStart = (boxCarArray) => {
        divDSelectBoxCar.removeAttribute("disabled");
        boxCarArray.forEach(boxCar => {
            let selectOption = document.createElement('option');
            for (let key in boxCar) {
                if (key === 'boxCarID') {
                    selectOption.value = boxCar[key];
                    selectOption.textContent = boxCar[key];
                }
            }
            divDSelectBoxCar.appendChild(selectOption);
        });
    };

    const divDSelectChange = (boxCarArray) => {
        let selectedOption = divDSelectBoxCar.value;
        if (selectedOption == "select") {
            alert("You need to select an option");
        } else {
            if (divDTransportID.hasAttribute('disabled') || divDDescription.hasAttribute('disabled') || divDCargoWeight.hasAttribute('disabled') || processCargoBtn.hasAttribute('disabled') || divDResetFormBtn.hasAttribute('disabled')) {
                divDTransportID.removeAttribute('disabled');
                divDDescription.removeAttribute('disabled');
                divDCargoWeight.removeAttribute('disabled');
                processCargoBtn.removeAttribute('disabled');
                divDResetFormBtn.removeAttribute('disabled');
            }
            divDSelectBoxCar.setAttribute('disabled', 'true');
    
            boxCarArray.forEach(boxCar => {
                for (let key in boxCar) {
                    if (key === 'boxCarID') {
                        if (boxCar[key] == selectedOption) {
                            console.log(selectedOption);
                            divDBoxCarSelected.textContent = selectedOption;
                            divDBoxCarSelected.value = selectedOption;
                        }
                    }
                }
            });
        }
    };

    const divDResetForm = () => {
        divDBoxCarSelected.textContent = "";
        divDBoxCarSelected.value = "";
        divDTransportID.value = "";
        divDDescription.value = "";
        divDCargoWeight.value = "";
        divDTransportIDSpan.textContent = "";
        divDDescriptionSpan.textContent = "";
        divDCargoWeightSpan.textContent = "";
        divDSelectBoxCar.removeAttribute("disabled");
        divDTransportID.setAttribute('disabled', 'true');
        divDDescription.setAttribute('disabled', 'true');
        divDCargoWeight.setAttribute('disabled', 'true');
        processCargoBtn.setAttribute('disabled', 'true');
        divDResetFormBtn.setAttribute('disabled', 'true');
    };
    

    /*
        Function
    */

    const processCargo = (boxCarCargoManifestArray, boxCarArray, s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray, totalWarehouseCargoManifestArray) => {
        // Validate input fields
        if (divDTransportID.value === "") {
            divDTransportIDSpan.textContent = "Must enter a transport ID";
        } else if (divDDescription.value === "") {
            divDDescriptionSpan.textContent = "Must enter a Description";
        } else if (isNaN(divDCargoWeight.value) || parseInt(divDCargoWeight.value) <= 0) {
            divDCargoWeightSpan.textContent = "Cargo weight must be a number and > 0";
        } else if (!(/[a-zA-Z]{3}\d{4}S0[1-4]/).test(divDTransportID.value)){
            divDTransportIDSpan.textContent = "Transport ID must match the following format: 3 letters, 4 digits, S0[1-4]"
        } else {
            const freightEntry = {
                boxCarID: divDBoxCarSelected.value,
                transportID: divDTransportID.value,
                description: divDDescription.value,
                cargoWeight: parseInt(divDCargoWeight.value)
            };
        
            // Find the box car corresponding to the selected boxCarID
            const selectedBoxCar = boxCarArray.find(boxCar => boxCar.boxCarID === divDBoxCarSelected.value);
        
            // Calculate new gross weight if this cargo were added
            const newGrossWeight = selectedBoxCar.tareWeight + selectedBoxCar.cargoWeight + freightEntry.cargoWeight;
        
            if (newGrossWeight <= selectedBoxCar.maxGrossWeight) {
                // Add cargo weight to the selected box car
                selectedBoxCar.cargoWeight += freightEntry.cargoWeight;
                selectedBoxCar.grossWeight = newGrossWeight;
                boxCarCargoManifestArray.push(freightEntry);
                divF.hidden = true;
                divE.hidden = false;
                displayBoxCarManifest(boxCarCargoManifestArray);
            } else {
                // If exceeds max gross weight, add to proper warehouse Array
                if (currentStation == 'S1') {
                    s1WarehouseCargoManifestArray.push(freightEntry);
                    divF.hidden = false;
                    divE.hidden = true;
                    divDTransportIDSpan.textContent = "Cargo Diverted to Warehouse - Weight Exceeded";
                    displayWarehouseManifest(s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray);
                } else if (currentStation == 'S2') {
                    s2WarehouseCargoManifestArray.push(freightEntry);
                    divF.hidden = false;
                    divE.hidden = true;
                    divDTransportIDSpan.textContent = "Cargo Diverted to Warehouse - Weight Exceeded";
                    displayWarehouseManifest(s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray);
                } else if (currentStation == 'S3') {
                    s3WarehouseCargoManifestArray.push(freightEntry);
                    divF.hidden = false;
                    divE.hidden = true;
                    divDTransportIDSpan.textContent = "Cargo Diverted to Warehouse - Weight Exceeded";
                    displayWarehouseManifest(s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray);
                } else if (currentStation == 'S4') {
                    s4WarehouseCargoManifestArray.push(freightEntry);
                    divF.hidden = false;
                    divE.hidden = true;
                    divDTransportIDSpan.textContent = "Cargo Diverted to Warehouse - Weight Exceeded";
                    displayWarehouseManifest(s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray);
                }
            }
            // Update display
            displayConfiguredBoxCars(boxCarArray);
        }
    };

    const displayBoxCarManifest = (boxCarCargoManifestArray) => { 
        // Check if tbody exists and remove it
        let oldTbody = boxcarManifestTable.querySelector('tbody');
        if (oldTbody) {
            boxcarManifestTable.removeChild(oldTbody);
            $("#divETotalCargoWeightIntValue").textContent = "0";
        }
    
        let tableBody = document.createElement('tbody');
        let totalCargoWeight = 0;
    
        boxCarCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeight += parseFloat(freightEntry[key]);
                }
            }
            tableBody.append(tableRow);
        });
    
        boxcarManifestTable.append(tableBody);
        $("#divETotalCargoWeightIntValue").textContent = totalCargoWeight;
    }

    const displayWarehouseManifest = (s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray) => {
        // Check if tbody exists and remove it || S1
        let oldTbodyS1 = warehouseManifestTableS1.querySelector('tbody');
        if (oldTbodyS1) {
            warehouseManifestTableS1.removeChild(oldTbodyS1);
            $(`#divFTotalCargoWeightIntValueS1`).textContent = "0";
        }
    
        let tableBodyS1 = document.createElement('tbody');
        let totalCargoWeightS1 = 0;
    
        s1WarehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeightS1 += parseFloat(freightEntry[key]);
                }
            }
            tableBodyS1.append(tableRow);
        });
    
        warehouseManifestTableS1.append(tableBodyS1);
        $(`#divFTotalCargoWeightIntValueS1`).textContent = totalCargoWeightS1;

        // Check if tbody exists and remove it || S2
        let oldTbodyS2 = warehouseManifestTableS2.querySelector('tbody');
        if (oldTbodyS2) {
            warehouseManifestTableS2.removeChild(oldTbodyS2);
            $(`#divFTotalCargoWeightIntValueS2`).textContent = "0";
        }
    
        let tableBodyS2 = document.createElement('tbody');
        let totalCargoWeightS2 = 0;
    
        s2WarehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeightS2 += parseFloat(freightEntry[key]);
                }
            }
            tableBodyS2.append(tableRow);
        });
    
        warehouseManifestTableS2.append(tableBodyS2);
        $(`#divFTotalCargoWeightIntValueS2`).textContent = totalCargoWeightS2;

        // Check if tbody exists and remove it || S3
        let oldTbodyS3 = warehouseManifestTableS3.querySelector('tbody');
        if (oldTbodyS3) {
            warehouseManifestTableS3.removeChild(oldTbodyS3);
            $(`#divFTotalCargoWeightIntValueS3`).textContent = "0";
        }
    
        let tableBodyS3 = document.createElement('tbody');
        let totalCargoWeightS3 = 0;
    
        s3WarehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeightS3 += parseFloat(freightEntry[key]);
                }
            }
            tableBodyS3.append(tableRow);
        });
    
        warehouseManifestTableS3.append(tableBodyS3);
        $(`#divFTotalCargoWeightIntValueS3`).textContent = totalCargoWeightS3;

        // Check if tbody exists and remove it || S4
        let oldTbodyS4 = warehouseManifestTableS4.querySelector('tbody');
        if (oldTbodyS4) {
            warehouseManifestTableS4.removeChild(oldTbodyS2);
            $(`#divFTotalCargoWeightIntValueS4`).textContent = "0";
        }
    
        let tableBodyS4 = document.createElement('tbody');
        let totalCargoWeightS4 = 0;
    
        s4WarehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
    
                // Check if the key is 'cargoWeight' and add to totalCargoWeight
                if (key === 'cargoWeight') {
                    totalCargoWeightS4 += parseFloat(freightEntry[key]);
                }
            }
            tableBodyS4.append(tableRow);
        });
    
        warehouseManifestTableS1.append(tableBodyS4);
        $(`#divFTotalCargoWeightIntValueS4`).textContent = totalCargoWeightS4;
    };

    const displayCompleteFreightStatus = (boxCarCargoManifestArray, warehouseCargoManifestArray) => {
        // Check if tbody exists and remove ot
        let oldTbody = completeFreightStatusTable.querySelector('tbody');
        if (oldTbody) {
            completeFreightStatusTable.removeChild('tbody');
        }

        let tableBody = document.createElement('tbody');

        boxCarCargoManifestArray.forEach(boxCar => {
            let boxCarID = "";
            let tableRow = document.createElement('tr');
            for (let key in boxCar) {
                if (key === 'boxCarID') {
                    boxCarID = boxCar[key];
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = boxCar[key];
                tableRow.append(tableCell);
            }
            let tableCellStatus = document.createElement('td');
            tableCellStatus.textContent = boxCarID;
            tableRow.append(tableCellStatus);
            tableBody.append(tableRow);
        });

        warehouseCargoManifestArray.forEach(freightEntry => {
            let tableRow = document.createElement('tr');
            for (let key in freightEntry) {
                if (key === 'boxCarID') {
                    continue;
                }
                let tableCell = document.createElement('td');
                tableCell.textContent = freightEntry[key];
                tableRow.append(tableCell);
            }
            let tableCellStatus = document.createElement('td');
            tableCellStatus.textContent = 'Warehouse';
            tableRow.append(tableCellStatus);
            tableBody.append(tableRow);
        });

        completeFreightStatusTable.append(tableBody);
    }
    
    /*
        Function which passes in "inputsToReset" and "inputDefaultValue"
        This is a master function to reset forms.
        {inputsToReset} is a list of inputs which need to be reset.
        {inputDefaultValue} is a list of the default values for the inputs that are being reset.
    */
    const resetForm = (inputsToReset, inputDefaultValue) => {
        inputsToReset.forEach(input => {
            inputDefaultValue.forEach(value => {
                input.value = value;
            })
        });
    };

    // Function to clear all radio button selections
    const clearRadioSelections = () => {
        radioB.checked = false;
        radioD.checked = false;
        radioC.checked = false;
        radioF.checked = false;
        radioG.checked = false;
    };

    const advanceDay = (boxCarCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray) => {
        if (currentDay <= 4 && currentStationNum <= maxStationNum) {
            currentDay += 1;
            currentStationNum += 1;
            $("#dayInput").value = currentDay;
            if (currentStationNum == 1) {
                currentStation = 'S1';
            } else if (currentStationNum == 2) {
                currentStation = 'S2';
                boxCarCargoManifestArray.forEach(item => {
                    for (let key in item) {
                        if (item === "")
                    }
                });
            } else if (currentStationNum == 3) {
                currentStation = 'S3';
            } else if (currentStationNum == 4) {
                currentStation = 'S4';
            }
        }
    }

    /*
        Event listeners for each div. When radio button selected, calls the changeDiv function and displays the corresponding div.
    */

    // Div B
    radioB.addEventListener("click", () => {
        clearRadioSelections();
        radioB.checked = true;
        changeDiv(divB);
    });

    // Div C
    radioC.addEventListener("click", () => {
        clearRadioSelections();
        radioC.checked = true;
        changeDiv(divC);
    });

    // Div D
    radioD.addEventListener("click", () => {
        clearRadioSelections();
        radioD.checked = true;
        changeDiv(divD);
        divDOnStart(boxCarArray);
    });

    // Div F
    radioF.addEventListener("click", () => {
        clearRadioSelections();
        radioF.checked = true;
        changeDiv(divF);
    });

    // Div G
    radioG.addEventListener("click", () => {
        clearRadioSelections();
        radioG.checked = true;
        changeDiv(divG);
        displayCompleteFreightStatus(boxCarCargoManifestArray, totalWarehouseCargoManifestArray);
    });

    // Attach event listeners to buttons
    processBoxCarBtn.addEventListener("click", () => processBoxCar(boxCarArray));
    divBResetFormBtn.addEventListener("click", () => resetForm([boxCarIDInput, tareWeightInput, maxGrossWeightInput], [" ", 0, 0]));
    divBReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divCReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divDReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divEReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divFReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    divGReturnToMainPageBtn.addEventListener("click", () => changeDiv(divA));
    processCargoBtn.addEventListener("click", () => processCargo(boxCarCargoManifestArray, boxCarArray, totalWarehouseCargoManifestArray, s1WarehouseCargoManifestArray, s2WarehouseCargoManifestArray, s3WarehouseCargoManifestArray, s4WarehouseCargoManifestArray));
    returnToCreateBoxCar.addEventListener("click", () => changeDiv(divB));
    returnToCreateBoxCar.addEventListener("click", () => resetForm([boxCarIDInput, tareWeightInput, maxGrossWeightInput], [" ", 0, 0]));
    divDResetFormBtn.addEventListener("click", () => divDResetForm());
    returnToCreateFreightEntryBtn.addEventListener("click", () => divDResetForm());
    returnToCreateFreightEntryBtn.addEventListener("click", () => changeDiv(divD));
    divFReturnToCreateFreightEntryBtn.addEventListener("click", () => divDResetForm());
    divFReturnToCreateFreightEntryBtn.addEventListener("click", () => changeDiv(divD));
    $("#advanceDayBtn").addEventListener("click", () => advanceDay());


    // Attach event listeners to select elements
    divDSelectBoxCar.addEventListener("change", () => divDSelectChange(boxCarArray));

    $("#dayInput").value = currentDay;
});
