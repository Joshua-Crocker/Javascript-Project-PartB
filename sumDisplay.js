"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const $ = selector => document.querySelector(selector);

    // Get the buttons in summary display
    const sumDisplayButton = $("#returnToMainPageSumDisplay");

    // Event listener for the return to main page button in summary display
    sumDisplayButton.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    // Function to get the value of a specific cookie by name
    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      };

    // Retrieve cookie values
    let totalOverallWeight = 0;
    let totalWeightBoxCarsCookie = getCookie("totalWeightBoxCars");
    let totalWeightWarehousesCookie = getCookie("totalWeightWarehouses");
    if (!getCookie("totalWeightWarehouses")) {
      totalOverallWeight = parseInt(totalWeightBoxCarsCookie);
    } else if (!getCookie("totalWeightBoxCars")) {
      totalOverallWeight = parseInt(totalWeightWarehousesCookie);
    } else {
      totalOverallWeight = parseInt(totalWeightBoxCarsCookie) + parseInt(totalWeightWarehousesCookie);
    }

    // Display the retrieved cookie values
    $("#totalWeightBoxCars").value = totalWeightBoxCarsCookie;
    $("#totalWeightBoxCars").textContent = totalWeightBoxCarsCookie;
    $("#totalWeightWarehouse").value = totalWeightWarehousesCookie;
    $("#totalWeightWarehouse").textContent = totalWeightWarehousesCookie;
    if (totalOverallWeight > 0) {
        $("#railSystemTotalWeight").value = totalOverallWeight;
        $("#railSystemTotalWeight").textContent = totalOverallWeight;
    }
});
