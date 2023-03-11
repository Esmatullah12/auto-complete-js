let targetInput = document.getElementById("country"),
    result = document.getElementById("auto-complete-result"),
    countryList = ["Afghanistan", "Colombia", "Cuba", "Turkey", "China", "Canada", "Greek", "Rusia", "Nigeria", "Japan", "Germany"],
    matches = [], 
    resultsCursor = 0;


targetInput.focus();

targetInput.addEventListener("keydown", function(event){
    if(event.keyCode == "13"){
        event.preventDefault();
    }
})

targetInput.addEventListener("keyup", function(event){
    result.innerHTML = "";
    toggleResult("hide")

    if(this.value.length > 0){
        matches = gitMatches(this.value)
        if (matches.length > 0){
            displayMatches(matches)
        }
    }
    
    if (result.classList.contains("visible")){
        switch(event.keyCode){
            case 13:
                targetInput.value = result.children[resultsCursor].innerHTML;
                toggleResult("hide");
                resultsCursor = 0;
                break
            case 38:
                if(resultsCursor > 0){
                    resultsCursor --;
                    moveCursor(resultsCursor);
                }
                break
            case 40:
                if(resultsCursor < (matches.length -1)){
                    resultsCursor++;
                    moveCursor(resultsCursor)
                }

                  
        }
    }
})


function toggleResult(action){
    if(action == "show"){
        result.classList.add("visible");
    }else if(action == "hide"){
        result.classList.remove("visible")
    }
}

function gitMatches(inputText){
    var matchList = [];
    for (var i = 0; i < countryList.length; i++){
        if( countryList[i].toLowerCase().indexOf(inputText.toLowerCase()) != -1){
            matchList.push( countryList[i]);
        }
    }

    return matchList
}

function displayMatches(matchList){
    var j = 0;

    while(j < matchList.length){
        result.innerHTML += '<li class="result">' + matchList[j] +"</li>";
        j++
    }
    
    moveCursor(resultsCursor);
   

    toggleResult("show")
}

function moveCursor(pos){
    for (var x = 0; x < result.children.length; x++){
        result .children[x].classList.remove("highlighted")
    }

    result.children[pos].classList.add("highlighted")
}