var search_terms = ["Audi", "McLaren", "Kia", "Mini", "Volkswagen", "Porsche", "Bentley", "BMW", "Genesis", 
    "Hyundai", "Jaguar", "Land Rover", "Lotus", "Mercedes", "Tesla", "Volvo", "Lamborghini", "Honda", 
    "Chevrolet", "Jeep", "Toyota", "Buick", "Cadillac", "Acura", "Fiat", "Ram", "Ford", "Chrysler", 
    "Dodge", "Alfa Romeo", "Subaru", "Carfax", "GMC", "Lexus", "Mitsubishi", "EV", "Hybrid", "Auto Show", "Racing"];

function autocompleteMatch(input) {
    if (input == '') {
        return [];
    }
    return search_terms.filter(function(term) {
        if (term.substring(0, input.length).toLowerCase() == input.toLowerCase()) {
            return term;
        }
    });
}
    
function showResults(input) {
    var res = document.getElementById("autocomplete");
    res.innerHTML = '';
    var ul = document.createElement("ul");
    let terms = autocompleteMatch(input);
    for (i=0; i<terms.length; i++) {
        var li = document.createElement("li");
        li.id = terms[i];
        li.innerHTML = '<strong>' + terms[i].substring(0, input.length) + "</strong>" + terms[i].substring(input.length);
        li.onclick = function() {
            document.getElementById("search").value = this.id;
            showResults(this.id);
        };
        ul.append(li);
    }
    res.append(ul);
}