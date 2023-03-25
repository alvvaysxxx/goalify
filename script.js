lifeArea = document.querySelector('.life')
goalDifficulty = document.querySelector('.difficulty')
goalImportance = document.querySelector('.importance')
goalName = document.querySelector('.goal-name')
goalDesc = document.querySelector('.goal-desc')
submitGoalInfoBtn = document.querySelector('.submit-goal-info')
goalsOutput = document.querySelector('.goals')
progress = document.querySelector(".progress-bar")

goalsList = []



submitGoalInfoBtn.addEventListener('click', function () {
  createGoal()
  lifeArea.value = ""
  goalDifficulty.value = ""
  goalImportance.value = ""
  goalName.value = ""
  goalDesc.value = ""
})


function createGoal () {
  const goal = {
    name: goalName.value,
    description: goalDesc.value,
    difficulty: goalDifficulty.value,
    importance: goalImportance.value,
    lifeArea: lifeArea.value,
    completed: false,
    id: goalsList.length + 1
    
    }
  goalsList.push(goal)
  localStorage.setItem('goalsList', JSON.stringify(goalsList))
  renderGoals()
}

function renderGoal (goal, index) {

  card = document.createElement('div')
  cardHeader = document.createElement('div')
  cardBody = document.createElement('div')
  cardFooter = document.createElement('div')

  cardTitle = document.createElement('h5')
  cardText = document.createElement('p')
  cardCompleted = document.createElement('span')

  cardDifficulty = document.createElement('span')
  cardImportance = document.createElement('span')
  cardLifeArea = document.createElement('span')

  completedGoal = document.createElement('h6')

  card.append(cardHeader)
  card.append(cardBody)
  card.append(cardFooter)
  
  cardHeader.append(cardLifeArea)
  cardHeader.append(cardImportance)
  cardHeader.append(cardDifficulty)

  cardBody.append(cardTitle)
  cardBody.append(cardText)
  cardBody.append(cardCompleted)

  cardFooter.append(completedGoal)

  card.classList.add('card', 'border-primary', 'mb-3')
  cardHeader.classList.add('card-header', 'bg-transparent')
  cardBody.classList.add('card-body')
  cardFooter.classList.add('card-footer', 'bg-transparent')

  cardDifficulty.classList.add('badge', 'rounded-pill', 'text-bg-primary')
  cardImportance.classList.add('badge', 'rounded-pill', 'text-bg-primary')
  cardLifeArea.classList.add('badge', 'rounded-pill', 'text-bg-primary')
  cardCompleted.classList.add('badge', 'rounded-pill', 'text-bg-success')
  
  cardTitle.classList.add('cardtext')

  cardTitle.innerText = goal.name
  cardText.innerText = goal.description
  cardCompleted.innerText = goal.completed ? 'Завершено' : 'Не завершено'
  cardLifeArea.innerText = goal.lifeArea
  cardImportance.innerText = goal.importance
  cardDifficulty.innerText = goal.difficulty

  if (goal.completed == false) {
    cardBtn = document.createElement('button')
    cardBtn.classList.add('btn', 'btn-success')
    cardBtn.innerHTML = 'Я завершил цель'
    cardFooter.append(cardBtn)
    deleteCardBtn = document.createElement('button')
    deleteCardBtn.classList.add('btn', 'btn-danger')
    deleteCardBtn.innerHTML = 'Удалить'
    cardFooter.append(deleteCardBtn)
    cardCompleted.classList.add('badge', 'rounded-pill', 'text-bg-danger')

    cardBtn.addEventListener('click', function () {
      goal.completed = true
      localStorage.setItem('goalsList', JSON.stringify(goalsList))
      renderGoals()
    })
    
    deleteCardBtn.addEventListener("click", function () {
      goalsList.splice(index, 1)
      localStorage.setItem('goalsList', JSON.stringify(goalsList))
      renderGoals()
    })
  } else {
    completedGoal.innerHTML = 'Поздравляю! Ты выполнил эту цель!'
    completedGoal.classList.add('success')
    cardCompleted.classList.add('badge', 'rounded-pill', 'text-bg-success')
  }

  goalsOutput.append(card)


}

function renderGoals () {
  goalsOutput.innerHTML = ''

  if (goalsList.length === 0) {
    return
  }
  // Отображение незавершенных целей
  for (let i = goalsList.length - 1; i >= 0; i--) {
    const goal = goalsList[i]
    const index = i
    if (!goal.completed) {
      renderGoal(goal, index)
      applyBadgeStyles(goal)
    }
  }
  // Отображение завершенных целей
  for (let i = goalsList.length - 1; i >= 0; i--) {
    const goal = goalsList[i]
    const index = i
    if (goal.completed) {
      renderGoal(goal, index)
      applyBadgeStyles(goal)
    }
  }
}

function applyBadgeStyles(goal) {

  if (goal.difficulty == 'Легко') {
    cardDifficulty.classList.add('badge', 'rounded-pill', 'text-bg-primary')
  }
  if (goal.difficulty == 'Средне') {
    cardDifficulty.classList.add('badge', 'rounded-pill', 'text-bg-warning')
  }
  if (goal.difficulty == 'Сложно') {
    cardDifficulty.classList.add('badge', 'rounded-pill', 'text-bg-danger')
  }

  if (goal.completed == false) {
    cardCompleted.classList.add('badge', 'rounded-pill', 'text-bg-danger')
  } else {
    cardCompleted.classList.add('badge', 'rounded-pill', 'text-bg-success')
  }

  progress.innerHTML = calcProgress()
}



if (goalsList.length === 0) {
  progress.innerHTML = calcProgress()
} else {
  renderGoals()
}

function calcProgress() {
  const totalGoals = goalsList.length;
  let completedGoals = 0

  if (totalGoals === 0) {
    progress.style.width = Math.round((completedGoals / totalGoals) * 100) + "%"
    return 0 + "%"
  }

  for (let i = 0; i < totalGoals; i++) {
    if (goalsList[i].completed) {
      completedGoals++
    }
  }

  progress.style.width = Math.round((completedGoals / totalGoals) * 100) + "%"
  
  return Math.round((completedGoals / totalGoals) * 100) + "%"
}

if (localStorage.getItem('goalsList') == null) {
  
} else {
  goalsList = JSON.parse(localStorage.getItem('goalsList'))
  renderGoals()
}