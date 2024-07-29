"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Function to get the value of a specific cookie by name
    const getCookie = (name) => {
        let cookieArr = document.cookie.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (name === cookiePair[0].trim()) {
                return decodeURIComponent(cookiePair[1]);
            }
        }
        return null;
    };

    // Get the buttons in summary display
    const sumDisplayButton = $("#returnToMainPageSumDisplay");

    // Retrieve cookie values
    let totalWeightBoxCarsCookie = getCookie("totalWeightBoxCars");
    let totalWeightWarehousesCookie = getCookie("totalWeightWarehouses");
    let totalOverallWeight = parseInt(totalWeightBoxCarsCookie) + parseInt(totalWeightWarehousesCookie);

    // Display the retrieved cookie values
    $("#totalWeightBoxCars").value = totalWeightBoxCarsCookie;
    $("#totalWeightBoxCars").textContent = totalWeightBoxCarsCookie;
    $("#totalWeightWarehouses").value = totalWeightWarehousesCookie;
    $("#totalWeightWarehouses").textContent = totalWeightWarehousesCookie;
    $("#totalOverallWeight").value = totalOverallWeight;
    $("#totalOverallWeight").textContent = totalOverallWeight;

    // Event listener for the return to main page button in summary display
    sumDisplayButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});
