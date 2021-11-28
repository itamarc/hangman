function generateRandomList() {
    var lines = document.getElementById('list').value.split('\n');
    var numLines = [];
    var randomNumbLines = "";
    for(var i = 0; i < lines.length; i++) {
        if (lines[i].trim() != "") {
            var num = Math.round(Math.random(lines.length)*1000);
            numLines.push(num.toString().padStart(3, '0')+") "+lines[i]);
            randomNumbLines += numLines[i]+"<br/>\n";
        }
    }
    var sortedLines = numLines.sort();
    var randomList = "";
    for (var i = 0; i < sortedLines.length; i++) {
        randomList += sortedLines[i].split(") ")[1]+"<br/>\n";
    }
    document.getElementById('numberedList').innerHTML = randomNumbLines;
    document.getElementById('sortedList').innerHTML = randomList;
}
