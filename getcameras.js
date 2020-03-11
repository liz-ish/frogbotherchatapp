var COC = COC || {};
COC.ESRIMapCityParkingLot = (function () {
    var init = function (view, Graphic, itemID) {
        var layer =        
        {
            URL: "https://services1.arcgis.com/AVP60cs0Q9PEA8rH/arcgis/rest/services/City_Parking_Lots/FeatureServer/0/query?where=1%3D1&outFields=*&returnGeometry=true&outSR=4326&f=pjson",
            iconURL: "iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAYAAAC4JqlRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA9BJREFUeNrMV21IFFEUPSPrulq2Rh+mm1ptaVSYaWXRj7QIIaKCKIQiEEEQorT6J4UU/YuyX4EQQVQs9Uf7ZAszoTATzaKiwvVb08psjVpdpemdl8rutjO7WWoXHjvzZt65Z9+79547iqqq8DRFUTIwgSb8PfSd4E9GQsKCRt5OxhjxlTH65/mP1UMFh9XqJ0/VibQvX5zSB32NkMkA2XBiso0+6VshE8EK69LXBD7AISfQ8xDq10b0977B8MgWGhQFM2YthRK5GIgWGxpqDgj1pKYW69ethSQgtgZm8wztwHG1Y/DtBRg/3oBiisP3yHR0KvO93rGoHYj4WgN1oB3uOdsRlpQLJTxOl4QI+F8EfDPBy5ovY8BRijDzCrTH5iHekoLy169hdzi8XsuyWrFj2TK0dTYgrqsUg86XMFnzgIX7xk9goKEYxr4q9FhPwDQ7FUUVD3D+xTNxFG7/iKFG5CevwqnNmzDwqR7RjuNwz9wIU0rxnxOg8zBXE7qsx3C/zYkc+x1tx36IXMzaii3xZsQ6TmIwfJFfEtoExLb/aLmA98tLYXvbjaMVdjl9dusOTZ/Pe7pR1duL5s5WQXRIzp3enIXspHmIeZWHkAW5vx2HXwIy4B7vRV/iKdg/hCPnVtnYs/oDhQH/vNP1HZnXrwH9ffL+4radyJrrwsx3RQjbcMUrMEkgxBeA0c6A45nLbf9DM4dHoHL3HnEMofKeGMQiJrF9LcQ3z5lqjHYGnN6ZH7xnR6rtqhy7bt3E865OLxILLQkjmG6JRUxiy1qiSUAUGeY5U01Gu449+twLfOqRo7mlETl3b3s9T46cPnZNLGISmz40CbDCscgwz4OO+FFzfdOpoG6JSWz60CTA8soK51tkgsq8WP2qR0xi04enGTxvWNsNxmlBOSxITEJzTIy83rkkEStjLV7Py1tb/a4b9kl5w3gbi/2paZrPqpqaxtIwkHkRoKoNu3mWxnF3PJfq61BSW63tUFG0CVBSDYMdQlhW43xdja4jpqHMBE9jVmgYxcriLkOE8KEZhNRzSipVjfU82DQcGzraQExiy55Bsw6IZoJ6Tkmlqv0rIxYxiS0bFk0CopNhM0E9p6QG2oVglZFYxCS2b7f0mxawk2EzQT2npP6tEYNYxCS2vhYwDoRasZNhM0E9p6R6ptfogDtwpeRaYhCLmP5atClvSEK0MLiAC9lMUM8/Fx5Bflq6flywJRPv8F2u4Vot5wF34L9oSieyLXc6+xEVZcaUf5j8F59mLE2VYgLZ2dmYDLPZbDhXcoaXmVP+ef5TgAEAv+WBWGLljcIAAAAASUVORK5CYII=",
            fillColour: null,
            lineColour: null
        };
        getCityParkingLots(view, Graphic, itemID, layer);                
    };
    var renderCityParkingLots = function (view, Graphic, itemID, dataSet, layer) {
        COC.ESRIMap.renderMapGraphics(view, Graphic, itemID, dataSet, layer);
        COC.ESRIMap.renderDataPanel(view, itemID, dataSet);        
    };
    var getCityParkingLots = function (view, Graphic, itemID, layer) {
        $.ajax({
            url: layer.URL,
            async: true,
            type: "GET",
            contentType: "text/plain",
            dataType: "text",
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            },
            success: function (data, status, xhr) {
                $xmlResponse = xhr.responseXML || xhr.responseText;
                var results = JSON.parse($xmlResponse);
                var dataSet = transformData(results);
                renderCityParkingLots(view, Graphic, itemID, dataSet, layer);
            }
        });
    };
    var transformData = function (cityParkingLots) {
        var dataSet = [];
        var i;
        var globalID;
        var ID;
        var type;
        var lotNumber;
        var name;
        var address1;
        var address2;
        var homePage;
        var geometry;
        var record;
        for (i = 0; i < cityParkingLots.features.length; i++) {
            globalID = cityParkingLots.features[i].attributes.GLOBALID || "";
            ID = cityParkingLots.features[i].attributes.OBJECTID || "";
            type = cityParkingLots.features[i].attributes.TYPE || "";
            lotNumber = cityParkingLots.features[i].attributes.LOTNUMBER || "";
            name = cityParkingLots.features[i].attributes.NAME || "";
            address1 = cityParkingLots.features[i].attributes.ADDRESS1 || "";
            address2 = cityParkingLots.features[i].attributes.ADDRESS2 || "";
            homePage = cityParkingLots.features[i].attributes.HOME_PAGE || "";
            if (homePage != "") {
                if (!homePage.includes("http://"))
                    homePage = "http://" + homePage;
                homePage = "<a href='" + homePage + "' target='_blank'>View page</a>";
            }
            geometry = cityParkingLots.features[i].geometry;
            record =
            {
                fields:
                [
		            {
		                name: "GLOBALID",
		                label: "Global ID",
		                value: globalID,
		                visible: false
		            },
		            {
		                name: "OBJECTID",
		                label: "ID",
		                value: ID,
		                visible: false
		            },
		            {
		                name: "TYPE",
		                label: "Type",
		                value: type,
		                visible: true
		            },
		            {
		                name: "LOTNUMBER",
		                label: "Lot number",
		                value: lotNumber,
		                visible: true
		            },
		            {
		                name: "NAME",
		                label: "Name",
		                value: name,
		                visible: true
		            },
		            {
		                name: "ADDRESS1",
		                label: "Address 1",
		                value: address1,
		                visible: true
		            },
		            {
		                name: "ADDRESS2",
		                label: "Address 2",
		                value: address2,
		                visible: true
		            },
		            {
		                name: "HOME_PAGE",
		                label: "Home page",
		                value: homePage,
		                visible: true
		            }
                ],
                geometry: geometry
            };
            dataSet.push(record);
        }
        return dataSet;
    };
    return {
        init: init
    };
})();
