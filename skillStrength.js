
function getSkills() {


var data = JSON.parse(document.getElementsByTagName("pre")[0].innerText);
var vocab = data.vocab_overview;
var skillSort = groupBy(vocab, "skill");
var current = Date.now();
var result = [["Skill", "Strength", "Average Days Since Last Practice"]];


var averageStrength = average(vocab.map(function(v) {return v.strength}));


function average(nums) {
	var sum = nums.reduce(function(a, b) { return a + b; });
	return sum / nums.length;
}

function calculateSkillStrength(vocab) {
	var skillStrength = Object.keys(skillSort).forEach(function(skill) {
		var tmpArray = [skill];
		var strength = 0;
		var time = 0;
		var len = skillSort[skill].length;
		for (let i = 0; i < len; i++) {
			strength += Math.round(skillSort[skill][i]["strength"] * 100);
			time += Math.round((current - skillSort[skill][i]["last_practiced_ms"])/ 86400000);
		}
		tmpArray.push(Math.round(strength / len ), Math.round(time / len));
		result.push(tmpArray);
		//console.log(result);
	})
        result.sort(compareSecondColumn);
	return result;
}

function groupBy(vocabList, property) {
	return vocabList.reduce(function (acc, obj) {
		var key = obj[property];
		if (!acc[key]) {
			acc[key] = [];
		}
		acc[key].push(obj);
		return acc;
	}, {});
}

function compareSecondColumn(a, b) {
    if (a[1] === b[1]) {
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');
    

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
      });

    tableBody.appendChild(row);
    });

  table.appendChild(tableBody);
  document.body.insertAdjacentElement("afterbegin", table);
}

  var skills = calculateSkillStrength();
  createTable(skills);
}
