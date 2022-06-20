async function fetchData() {
    const xhttp = new XMLHttpRequest();
    const url = "https://pokeapi.co/api/v2/pokemon?limit=30";
    const httpMethod = "GET";
    xhttp.onload = function() {
        //bertukar data
        const response = JSON.parse(this.responseText);
        const results = response.results;

        let data = "";
        for (i = 0; i < results.length; i++) {
            //data yang diambil dalam bentuk promise
            const hasil = fetchData1(results[i].url);

            //metode untuk fetch hasil promise
            hasil.then(function(result) {
                console.log(result);
                let color = "";
                if (result.types[0].type.name == 'grass') {
                    color = "#159415";
                } else if (result.types[0].type.name == 'fire') {
                    color = "#b0310e";
                } else if (result.types[0].type.name == 'water') {
                    color = "#152c94";
                } else if (result.types[0].type.name == 'bug') {
                    color = "#3b3737";
                } else if (result.types[0].type.name == 'normal') {
                    color = "#85815d";
                } else if (result.types[0].type.name == 'poison') {
                    color = "#7314a6";
                } else if (result.types[0].type.name == 'electric') {
                    color = "#bab40f";
                } else if (result.types[0].type.name == 'ground') {
                    color = "#5e4413";
                }
                data = data + `
					<div style='display: inline-block; background: ${color}; text-align: center;' id="pokemon">
						<span style="color: white;" id="id">${result.id}</span>
						<span style="color: white;" id="name">${result.name}</span>
						<div>
							<img src="${result.sprites.front_shiny}">
						</div>
						<span style="color: white;" id="type"> Type: ${result.types[0].type.name}</span>
					</div>`;

                document.getElementById("pokemon").innerHTML = data;
            });


        }


    };
    xhttp.open(httpMethod, url);
    xhttp.send();
}
async function fetchData1(url) {
    const response = await fetch(url, {
        method: "GET",
    });

    const json = await response.json();
    return json;

};