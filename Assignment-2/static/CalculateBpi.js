function calcBpi(){
    const uri = "https://rohitkumarputcha.pythonanywhere.com/bpi";

    const age = document.getElementById("Age").value;
    const weight = document.getElementById("Weight").value;

    if (age <= 0 || weight <= 0){
        document.getElementById("bpi-value").innerText = "Enter Age or Weight greater than 0"
        document.getElementById("Age").value = ""
        document.getElementById("Weight").value = ""
    }
    else{
        const item = {
            age: age,
            weight: weight
        };

        fetch(uri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            mode:"cors",
            body: JSON.stringify(item)
        })
        .then(response => {
            res = response.json();
            return res;
        })
        .then(jsonData => {
            document.getElementById("bpi-value").innerText = jsonData['bpi']
        })
        .catch(error => {
            alert('Unable to calculate BPI')
            console.log('Unable to calculate BPI', error)
        });
    }
}

function clearInputFields(){
    document.getElementById("Age").value = ""
    document.getElementById("Weight").value = ""
    document.getElementById("bpi-value").innerText = ""
}