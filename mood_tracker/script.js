var nodeList;

document.addEventListener("DOMContentLoaded", function() {
    const months = {
        1: {days: 31, name: "January"},
        2: {days: 29, name: "February"},
        3: {days: 31, name: "March"},
        4: {days: 30, name: "April"},
        5: {days: 31, name: "May"},
        6: {days: 30, name: "June"},
        7: {days: 31, name: "July"},
        8: {days: 31, name: "August"},
        9: {days: 30, name: "September"},
        10: {days: 31, name: "October"},
        11: {days: 30, name: "November"},
        12: {days: 31, name: "December"}
    }

    const tables = []

    for (var count = 1; count <= 12; count++) {
        const table = document.getElementById(`moodTable${count}`)

        var numDays = 1;
        var month = months[count];
        
        var newCaption = document.createElement("caption");
        newCaption.textContent = month.name
        table.appendChild(newCaption);

        for (var week = 0; week < 6; week++) {
            var row = table.insertRow();

            for (var day = 1; day <= 7 && numDays <= month.days; day++, numDays++) {
                var cell = row.insertCell();
                var button = document.createElement("button")
                button.textContent = numDays;
                button.id = month.name + numDays;
                button.className = "button"
                cell.appendChild(button);
            }
        }

        tables.push(table);
    }

    
    const colors = {
        0: {color: "deep_orange", name: "Very Bad Day"},
        1: {color: "amber", name: "Bad Day"}, 
        2: {color: "yellow", name: "Average"}, 
        3: {color: "tea_green", name: "Good Day"},
        4: {color: "green", name: "Very Good Day"}
    };

    let colorTable = document.getElementById('colorTable');

    for (var i = 0; i < 5; i++) {
        var row = colorTable.insertRow();
        var cell = row.insertCell();
        var colorButton = document.createElement("button");

        colorButton.className = "color-button"
        colorButton.classList.add(`color-${colors[i].color}`)

        var label = document.createElement("span");
        label.className = "color-label";
        label.textContent = colors[i].name;

        cell.appendChild(colorButton)
        cell.appendChild(label);
    }

    nodeList = document.querySelectorAll('.button');
    var list2 = document.querySelectorAll('.color-button');

    let buttonToColor;
    nodeList.forEach(function(button) {
        button.addEventListener("click", function(event) {
            buttonToColor = event.target;
        })
    })
    
    list2.forEach(function(colorButton) {
        colorButton.addEventListener("click", function(event) {
            if (buttonToColor) {
                let color = window.getComputedStyle(event.target).getPropertyValue("background-color");
                buttonToColor.style.backgroundColor = color;

                localStorage.setItem(buttonToColor.id, color);

                buttonToColor = null;
            }
        })
    })

    var resetButton = document.getElementById("reset")
    resetButton.addEventListener("click", function(event) {
        localStorage.clear()
        nodeList.forEach(function(button) {
            button.style.backgroundColor = "";
        })
    })
})


document.addEventListener("DOMContentLoaded", function() {
    nodeList.forEach(function(button) {
        let storedColor = localStorage.getItem(button.id);
        if (storedColor) {
            button.style.backgroundColor = storedColor;
        }
    });
});