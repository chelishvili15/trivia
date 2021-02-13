var start = document.getElementById('start'),
    main = document.getElementById('main'), 
    main2 = document.getElementById('questdiv'),
    quest = document.getElementById('question'),
    ansdiv = document.getElementById('ansdiv'),
    ans1 = document.getElementById('ans1'),
    ans2 = document.getElementById('ans2'),
    ans3 = document.getElementById('ans3'),
    ans4 = document.getElementById('ans4'),
    ans5 = document.getElementById('ans5'),
    ans6 = document.getElementById('ans6'),
    ansform1 =document.getElementById('form1'),
    ansform2 =document.getElementById('form2'),
    next =document.getElementById('next'),
    submit = document.getElementById('submit'),
    countDiv = document.getElementById('count'),
    bestScore = document.getElementById('bestscore'),
    countSection = document.getElementById('countsection'),
    resetButton = document.getElementById('reset'),
    count = 0, ansArr = [], i=0 
    ;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function colorReset(){
  var arr1 = document.getElementsByClassName('ans1div');
  for (let j=0; j<arr1.length; j++){
    arr1[j].style.backgroundColor = '#D1EDF2';
    arr1[j].style.color = 'black';
  }
  var arr2 = document.getElementsByClassName('ans2div');
  for (let j=0; j<arr2.length; j++){
    arr2[j].style.backgroundColor = '#D1EDF2';
    arr2[j].style.color = 'black';
  }
}

function unhideTrivia(){
  main.style.display = 'none';
  main2.style.display = 'block';
  next.style.display = 'none';
  submit.style.display = 'block';
  countSection.style.display = 'block';
  resetButton.style.display = 'block';
}

function makeAnswersBoolean(ansArr){
  ansform2.style.display = 'block';
  ans5.innerHTML = ansArr[0];
  ans6.innerHTML = ansArr[1]; 
}
function makeAnswersMultiple(ansArr){
  ansform1.style.display = 'block'   
  ans1.innerHTML = ansArr[0];
  ans2.innerHTML = ansArr[1];
  ans3.innerHTML = ansArr[2];
  ans4.innerHTML = ansArr[3];      
}

function makeColors(inputar,labelar,correct_answer, n){
   for (let j=0; j<n; j++){
          if (inputar[j].checked == true ){
            if(labelar[j].textContent != correct_answer){
              inputar[j].parentElement.style.backgroundColor = 'red';
              inputar[j].parentElement.style.color = 'white';
            } else { 
                count++;
                countDiv.innerHTML = count;
                if (count > bestScore.textContent){
                  bestScore.innerHTML = count;                  
                }
              }
          }
          if(labelar[j].textContent == correct_answer){
              labelar[j].parentElement.style.backgroundColor = 'green';
              labelar[j].parentElement.style.color = 'white';
          }
    }     
}

function end(){
  submit.style.display = 'none';
  next.style.display = 'none';
  ansform1.style.display = 'none';
  ansform2.style.display = 'none';
  quest.innerHTML = 'End of Trivia, please click Reset button for new game'; 
}

function reset(){
  count = 0; 
  colorReset();
  main.style.display = 'block';
  main2.style.display = 'none';
  // next.style.display = 'none';
  submit.style.display = 'none';
  start.style.display = 'block';
  countDiv.innerHTML = '0';
  ansform1.style.display = 'none';
  ansform2.style.display = 'none';
  countSection.style.display = 'none'
  resetButton.style.display = 'none';
  start.children[0].innerHTML = 'START';

}


start.addEventListener('click', mainfunction);
    


function mainfunction(){ 
  //linkis damushaveba
  var str = 'https://opentdb.com/api.php?amount=';
  var str1 = document.getElementsByTagName('input')[0].value;
  var str2 = document.getElementById('category').value;
  var str3 = document.getElementById('difficulty').value;
  var str4 = document.getElementById('type').value;
  str += str1;
  if (str2 != '') { str += "&" +'category='+ str2 };
  if (str3 != '') { str += "&" +'difficulty='+ str3 };
  if (str4 != '') { str += "&" +'type='+ str4 };

  //APIS gadmotana
  function getApi(){
    fetch(str)
    .then((response) => response.json())
    .then((dat) => {
        i=0;
        //davasrulot trivia tu bazashi ar gvaqvs mititebuli kitxva an raodenoba
        if (dat.results.length == 0){
          start.children[0].innerHTML = 'Question not found, Try Again'; 
        }
        // I - avigot pasuxebi masivshi da mashivi avriot
        ansArr.push(dat.results[i].correct_answer);
        //radgan gvaqvs araswori pasuxebis ori shesadzlo masivi, amitom viyeneb cikls
        for (let j in dat.results[i].incorrect_answers){
          ansArr.push(dat.results[i].incorrect_answers[j])
        }
        //ansArr shi ulve gvaqvs 4(multiple) an 2(boolean) pasuxi, axla avriot
        ansArr = shuffleArray(ansArr);
        //________________________
        
        unhideTrivia();
        quest.innerHTML = dat.results[i].question;

        if (dat.results[i].type == 'boolean'){
          makeAnswersBoolean(ansArr);
        } else {
          makeAnswersMultiple(ansArr);
        }
        
        //next buttonze dachera da gadasvla shemdeg kitxvaze
        //vaketebt igives rac start buttonze i gaizrdeba
        next.addEventListener('click', nextfunction)
          function nextfunction(){
            next.style.display = 'none'; //next buttonis damalva
            submit.style.display = 'block'; //submit buttonis gamochena
            colorReset(); ansArr = [];
            
            i++;
            if (i == parseInt(str1)){   
              end();
            } 
            
            ansArr.push(dat.results[i].correct_answer);
            for (let j in dat.results[i].incorrect_answers){
              ansArr.push(dat.results[i].incorrect_answers[j])
            }
            ansArr = shuffleArray(ansArr);
            quest.innerHTML = dat.results[i].question;
            
            if (dat.results[i].type == 'boolean'){
              ansform1.style.display = 'none'
              makeAnswersBoolean(ansArr);
            } else {
              ansform2.style.display = 'none' 
              makeAnswersMultiple(ansArr);
            }
          }
      //aq dasrulda trivias awyoba 
      //axla vaketebt submit clicks
      submit.addEventListener('click', submitfunction) 
      function submitfunction(){
        next.style.display = 'block'; //next buttonis gamochena
        submit.style.display = 'none'; //submit buttonis damalva 
        if (dat.results[i].type == 'boolean'){
          var inputar1 = document.getElementsByName('truefalse');
          var labelar1 = document.getElementsByClassName('truefalse'); 
          makeColors(inputar1, labelar1, dat.results[i].correct_answer, 2);
        }else {
          var labelar2 = document.getElementsByClassName('multi');
          var inputar2 = document.getElementsByName('multi');
          makeColors(inputar2, labelar2, dat.results[i].correct_answer, 4);
        }
      }
      //reseti cda 15764
      document.getElementById('reset').addEventListener("click", ()=>{
            submit.removeEventListener('click', submitfunction);
            next.removeEventListener('click', nextfunction);
      }) 
    })
  }
  getApi();
}
