
//setup table structure to be output via innerhtml
let mytable = "<table cellpadding=\"0\" cellspacing=\"20\"><tbody><tr> <td><b>Username</b></td><td><b>Score</b></td><td><b>Accuracy</b></td>";

//function send a /score GET request and format the response
function getScore() {
    fetch('/score', {method: 'GET'})
        .then(function(response) {
            if(response.ok) return response.json();
            throw new Error('Request failed.');
        })
        .then(function(data) {
            //for each element in data
            for(let i = 0; i < data.length; i++){
                //add a tabke row to the table structure
                mytable += "</tr><tr>";
                //add the username/score/rounded down % accuracy to their own tds
                mytable += "<td>" + data[i].user + "</td> <td>" + data[i].score  +"   </td> <td>" + Math.floor(data[i].acu) +"% </td>";
            }
            //close the table, add the replay butotn
            mytable += "<td><a href=\"http://localhost:8080/start.html\"><img src=\"icon.png\"></a></td></tr></tbody></table>";
            //output the table to the leaderboard div via innerhtml
            document.getElementById("leaderboard").innerHTML = mytable;
        })
        .catch(function(error) {
            console.log(error);
        });
}

//when the page is loaded
window.onload = function () {
    //execute getScore (explained above)
    getScore();
    //Output the previous games stats to the lastgame div
    document.getElementById( "lastGame").innerHTML = 'Well done ' + localStorage.getItem("newUser") + ' ' + localStorage.getItem("curScore");
    //end of the game - clear local storage
    localStorage.clear();
}

