class Question {
  constructor(questionField, option1, option2, option3, option4, correct) {
    this.questionField = questionField;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.correct = correct;
  }

  toggleAnswer() {
    this.answer = !this.answer;
  }
}

class QuestionManager {
  constructor() {
    this.questions = [];
  }

  removeQuestion(index) {
    this.questions.splice(index, 1);
  }
  addQuestion(question) {
    this.questions.push(question);
  }

  modQuestion(index, question) {
    this.questions.splice(index, 1, question);
  }

  getQuestion() {
    return this.questions;
  }
}
let tempIndice = 0;
const questionManager = new QuestionManager();
const questionManagerMod = new QuestionManager();

const questionForm = document.querySelector('#questions-form');
const questionFieldInput = document.querySelector('#questions');
const option1Input = document.querySelector('#option1');
const option2Input = document.querySelector('#option2');
const option3Input = document.querySelector('#option3');
const option4Input = document.querySelector('#option4');
const correctInput = document.querySelector('#correct');
const questionList = document.querySelector('#container-Questions');

questionForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const questionField = questionFieldInput.value;
  const option1 = option1Input.value;
  const option2 = option2Input.value;
  const option3 = option3Input.value;
  const option4 = option4Input.value;
  const correct = correctInput.value;
  const question = new Question(
    questionField,
    option1,
    option2,
    option3,
    option4,
    correct
  );
  questionManager.addQuestion(question);
  renderQuestions();
  questionForm.reset();
  questionForm.classList.add('d-none');
});

function renderQuestions() {
  questionList.innerHTML = ``;
  const questions = questionManager.getQuestion();
  questions.forEach((question, index) => {
    const { questionField, option1, option2, option3, option4 } = question;
    const listItem = document.createElement('div');
    listItem.innerHTML = `        <form
    class="question1Form mt-3 mb-4 border-top border-dark"
    id="question1-Form"
  >
    <div class="countainer-flex mx-3">
      <div class="row">
        <div class="col-10">
          <p class="question1 mt-3" id="question1">
            ${index + 1}. ${questionField}
          </p>
          <input type="radio" id="radio1" name="q${index}" /> ${option1}
          <br />
          <input type="radio" id="radio2" name="q${index}" /> ${option2}
          <br />
          <input type="radio" id="radio3" name="q${index}" /> ${option3}
          <br />
          <input type="radio" id="radio4" name="q${index}" /> ${option4}
          <br />
        </div>
        <div class="col-2 d-flex flex-column">
          <button onclick="detectEditar(${index})" class="modBtn mt-4 " type="button" id="mod-Btn${index}">
            <i
              class="fa-solid fa-pen-to-square fa-xl"
              style="color: #ffffff"
            ></i>
          </button>
          <button onclick="removeQuestion(${index})" class="deleteBtn mt-4 justify-content-end" type="button" id="delete-Btn${index}">
            <i class="fa-solid fa-trash-can fa-xl" style="color: #ffffff"></i>
          </button>
        </div>
      </div>
    </div>  
  </form>
  `;
    questionList.appendChild(listItem);
  });
}

const detectEditar = (index) => {
  tempIndice = index;
  const questions = questionManager.getQuestion();
  questionFieldInput.value = questions[tempIndice].questionField;
  option1Input.value = questions[tempIndice].option1;
  option2Input.value = questions[tempIndice].option2;
  option3Input.value = questions[tempIndice].option3;
  option4Input.value = questions[tempIndice].option4;
  correctInput.value = questions[tempIndice].correct;
  newBtn.classList.add('d-none');
  editBtn.classList.remove('d-none');
  showForm();
};

function addQuestionMod() {
  const questionField = questionFieldInput.value;
  const option1 = option1Input.value;
  const option2 = option2Input.value;
  const option3 = option3Input.value;
  const option4 = option4Input.value;
  const correct = correctInput.value;
  const questionMod = new Question(
    questionField,
    option1,
    option2,
    option3,
    option4,
    correct
  );
  questionManagerMod.addQuestion(questionMod);
  const getQuestionMod = questionManagerMod.getQuestion();
  const temp = getQuestionMod[0];
  questionManagerMod.removeQuestion(0);
  modQuestion(tempIndice, temp);
}

function modQuestion(tempIndice, temp) {
  questionManager.modQuestion(tempIndice, temp);
  renderQuestions();
  cancelar();
}

function removeQuestion(index) {
  questionManager.removeQuestion(index);
  cancelar();
  renderQuestions();
}

//-----------logica visual de los botones------------
//botones principales
const addBtn = document.querySelector('#add-Btn');
const modBtn = document.querySelector('#mod-Btn');
const deleteBtn = document.querySelector('#delete-Btn');

//botones dentro del formulario
const newBtn = document.querySelector('#new-Btn');
const cancelBtn = document.querySelector('#cancel-Btn');
const editBtn = document.querySelector('#edit-Btn');

//funciones para controlar el formulario
const showForm = () => {
  questionForm.classList.remove('d-none');
};

const cancelar = () => {
  questionForm.reset();
  questionForm.classList.add('d-none');
};
//Control de botones agregar y modificar
addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newBtn.classList.remove('d-none');
  editBtn.classList.add('d-none');
  showForm();
});

editBtn.addEventListener('click', addQuestionMod);

cancelBtn.addEventListener('click', cancelar);
