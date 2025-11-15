// for pronounce add speaker
function pronounceWord(word){
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}



//shows synonyms 
const createElements = (arr)=>{
    const htmlElements = arr.map((el)=> `<span class= "text-[10px] font-medium bg-slate-300 p-1 rounded-md">${el}</span>`);
    return htmlElements.join(" ");
}
// end shows synonyms


// manage spinner "loadLevelWord" "displayLevelWord" function er moddhe use kora hoyeche 
const manageSpinner = (status)=>{
  if(status === true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }
  else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
}


const loadLessons = ()=>{
fetch("https://openapi.programming-hero.com/api/levels/all")
.then((res) => res.json())
.then((data) => 
  displayLesson(data.data))
};

const removeActive = ()=>{
  const lessonButtons = document.querySelectorAll(".lesson-button");
  lessonButtons.forEach((button) =>
  button.classList.remove("active"));
}

// manage spinner part also added
const loadLevelWord = (id)=>{
  manageSpinner(true);
  const url=`https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    removeActive();
    const clickBtn = document.getElementById(`lesson-btn-${id}`);
    clickBtn.classList.add("active");
   displayLevelWord(data.data)
})
};

// info button - detail load function start
const loadWordDetail = async(id)=>{
const url = `https://openapi.programming-hero.com/api/word/${id}`;
const res = await fetch (url);
const details = await res.json();
displayWordDetail(details.data);
};

const displayWordDetail = (word)=>{
  const detailCard = document.getElementById("detail-card");
  detailCard.innerHTML = `  <h1 class="text-[15px] font-bold mb-2">${word.word} (<i class="fa-solid fa-microphone"></i>${word.pronunciation})</h1>

  <div class="mb-2">
  <h1 class="text-[10px] font-bold">Meaning</h1>
  <p class="text-[10px] font-medium">${word.meaning}</p>
  </div>

  <div class="mb-2">
  <h1 class="text-[10px] font-bold">Example</h1> 
  <p class="text-[10px] font-medium">${word.sentence}</p>
  </div>


<div class="mb-4">
  <h1 class="text-[10px] font-bold">সমার্থক শব্দ গুলো</h1>
  <div">${createElements(word.synonyms)}</div>
</div>`;
document.getElementById("my_modal_5").showModal();
}
// info button - detail load function end



const displayLevelWord = (words)=>{
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  
  if(words.length===0){
    wordContainer.innerHTML = `     <div class="text-center col-span-full space-y-2">
       <img class="mx-auto" src="assets/alert-error.png">
       <p class="font-body text-[12px] text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
       <h2 class="font-bold font-body text-gray-600">নেক্সট Lesson এ যান</h2>
      </div>`;
    manageSpinner(false);
    return;
  }

  words.forEach (word => {
    console.log(word);  

  const card = document.createElement("div");
  card.innerHTML = `  <div class="bg-white rounded-xl shadow-sm text-center px-3 py-8 h-50">
    <h2 class="font-semibold text-[12px] text-cyan-900">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
    <p class="font-semibold text-[12px] text-gray-400">Meaning / Pronunciation</p>
    <div class="font-body font-medium">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}
    <div class="flex justify-between pt-[15px] px-5">

    <button onclick = "loadWordDetail('${word.id}')" class="bg-slate-200 rounded-lg p-2">
             <i class="fa-solid fa-circle-info text-sky-950 text-[15px]"></i>
    </button>

    <button onclick="pronounceWord('${word.word}')" class="bg-slate-200 rounded-lg p-2">
             <i class="fa-solid fa-volume-high text-sky-950 text-[15px]"></i>
    </button>
    
    </div> </div>
  </div>`
  wordContainer.append(card);})
manageSpinner(false);
}



const displayLesson = (lessons)=>{
  const lessonsContainer = document.getElementById("lessons-container");
  lessonsContainer.innerHTML = "";

  lessons.forEach (lesson => {
    console.log(lesson);
  const lessonDiv = document.createElement("div");
  lessonDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord('${lesson.level_no}')" class="btn btn-dash btn-primary text-[10px] lesson-button"><i class="fa-brands fa-leanpub"></i>Lesson -${lesson.level_no}</button>`

  lessonsContainer.append(lessonDiv);
  });
}

loadLessons();