// Retrieve score from db

let mytable = "<table cellpadding=\"0\" cellspacing=\"20\"><tbody><tr> <td><b>Username</b></td><td><b>Score</b></td><td><b>Accuracy</b></td>";
function getScore() {
    fetch('/score', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            console.log(data);
            for(let i = 0; i < data.length; i++){
                mytable += "</tr><tr>";
                mytable += "<td>" + data[i].user + "</td> <td>" + data[i].score  +"   </td> <td>" + Math.floor(data[i].acu) +"% </td>";
            }
            mytable += "</tr></tbody></table>";
            document.getElementById("leaderboard").innerHTML = mytable;
        })
        .catch(function(error) {
            console.log(error);
        });
}

getScore();