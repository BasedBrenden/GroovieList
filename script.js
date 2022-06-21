const testBtn = document.getElementById('testBtn');
const testDiv = document.getElementById('testDiv');
const view = document.getElementById('view')
const movieSearch = document.getElementById('movieSearch');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const listContainer = document.getElementById('listContainer');

let testArr = []
let listLength = localStorage.length
let i=0;
let myList = [];

const newMovie = (result) =>{
  const title = result.title;
  const overview = result.overview;
  const rating = result.vote_average;
  const image = result.poster_path;
  const movieId = result.id;

  const displayMovie = () =>{
    let cardDiv = document.createElement('div');
    cardDiv.setAttribute('class','cardDiv')
    

    let cardImg = document.createElement('img');
    cardImg.src = "https://image.tmdb.org/t/p/original"+image;
    cardImg.setAttribute('class','cardImg')

    let cardTitle = document.createElement('h1');
    cardTitle.setAttribute('class','cardTitle')
    cardTitle.innerHTML = title;

    /*let cardDescr = document.createElement('p');
    cardDescr.setAttribute('class','cardDescr');
    cardDescr.innerHTML = overview;*/
    
    let cardBtn = document.createElement('button');
    cardBtn.setAttribute('type','button');
    cardBtn.setAttribute('class','cardBtn');
    cardBtn.innerHTML = "+";
    cardBtn.addEventListener("click", addToList)

    cardDiv.appendChild(cardImg)
    cardDiv.appendChild(cardTitle)
    //cardDiv.appendChild(cardDescr)
    cardDiv.appendChild(cardBtn)

    view.appendChild(cardDiv);


  }

  const addToList =() =>{

    localStorage.setItem(listLength++, JSON.stringify(result));
      let listCard = document.createElement('div')
      listCard.setAttribute('class', 'listCard');

      let listImg = document.createElement('img');
      listImg.src = "https://image.tmdb.org/t/p/w220_and_h330_face"+image;
      listImg.setAttribute('class','listImg')

      let listTitle = document.createElement('h1');
      listTitle.setAttribute('class','listTitle')
      listTitle.innerHTML =title;

      let listDescr = document.createElement('p');
      listDescr.setAttribute('class','listDescr');
      listDescr.innerHTML = overview;

      let listBtn = document.createElement('button');
      listBtn.setAttribute('type','button');
      listBtn.setAttribute('class','listBtn');
      listBtn.setAttribute('value', listLength-1)
      listBtn.innerHTML = "X";
      listBtn.addEventListener("click", removeFromList)
  
      listCard.appendChild(listImg)
      listCard.appendChild(listTitle)
      listCard.appendChild(listDescr)
  
      listContainer.appendChild(listCard);

  }

  const removeFromList = () =>{
      let temp = 

  }

  


  return{displayMovie, addToList};
}

function displayMyList(){
  let localIndex = listLength;
  keys = Object.keys(localStorage);
  while (localIndex--){

    myList.push(JSON.parse(localStorage.getItem(keys[localIndex])))

  }

  localStorage.clear();

  myList.forEach( x =>{ x=newMovie(x); x.addToList()}) 

}

async function getMovie() {
  view.innerHTML = " "
  testArr.length = 0;
  let search = movieSearch.value;
    const response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=da87ee5e1c569e22e8ea6b05d42444d1&language=en-US&query='+search,{mode: 'cors'});
    response.json().then((response)=>{
      //let result = newMovie(response['results']); 
      /* displays ALL search results*/
      response['results'].forEach( x =>{ x=newMovie(x); testArr.push(x)})
      testArr[0].displayMovie();
      testArr[1].displayMovie();

    })
  }

testBtn.addEventListener("click", () =>{getMovie()});


nextBtn.addEventListener("click", () =>{

  view.innerHTML="";
  i++;
  if(i >= testArr.length){
    i = 0;
  }

  testArr[i].displayMovie();
  if(i+1 >= testArr.length){
    testArr[0].displayMovie();
  }else{
    testArr[i+1].displayMovie();
  }
  console.log(i)
})

prevBtn.addEventListener("click", () =>{

  view.innerHTML="";
  i--;
  if(i <1){
    i = testArr.length-1;
  }
  console.log(i)
  testArr[i-1].displayMovie();
  testArr[i].displayMovie();

})

window.onload = displayMyList();