const hideGame = () => {
  const game = document.getElementById('game');
  document.getElementById('leaderboard').style.display = 'none';
  document.getElementById('about').style.display = 'none';
  if (game.style.display === 'block') {
    game.style.display = 'none';
  } else {
    game.style.display = 'block';
  }
};

const populateLeaderboard = async () => {
  const apiData = await axios.get(
    'https://donutdash.herokuapp.com/leaderboards/1'
  );
  const data = apiData.data.users;
  const leaderboard = document.getElementById('leaderboard');
  leaderboard.innerHTML = '';
  const title = document.createElement('p');
  title.innerHTML = 'Highscores';
  title.className = 'package-name';
  leaderboard.append(title);
  data.sort(function(a, b) {
    return b.score - a.score;
  });
  data.forEach((user, index) => {
    if (index < 3) {
      const divider = document.createElement('hr');
      const topScores = document.createElement('p');
      const topScoresNames = document.createElement('p');
      topScores.className = 'price';
      topScores.innerHTML = `${user.score}`;
      topScoresNames.className = 'disclaimer';
      topScoresNames.innerHTML = `${user.name}`;
      leaderboard.append(divider, topScores, topScoresNames, divider);
    } else {
      const otherScores = document.createElement('li');
      otherScores.className = 'features';
      otherScores.innerHTML = `${user.name}: ${user.score}`;
      leaderboard.append(otherScores);
    }
  });
};

const hideLeaderboard = () => {
  const leaderboard = document.getElementById('leaderboard');
  document.getElementById('game').style.display = 'none';
  document.getElementById('about').style.display = 'none';
  if (leaderboard.style.display === 'block') {
    leaderboard.style.display = 'none';
  } else {
    leaderboard.style.display = 'block';
    populateLeaderboard();
  }
};

const hideAbout = () => {
  const about = document.getElementById('about');
  document.getElementById('game').style.display = 'none';
  document.getElementById('leaderboard').style.display = 'none';
  if (about.style.display === 'block') {
    about.style.display = 'none';
  } else {
    about.style.display = 'block';
  }
};

const postScore = async () => {
  const highScore = parseInt(localStorage.getItem('runnerHighScore'));
  const playerName = document.getElementById('username').value;

  const newUser = await axios.post(
    'https://donutdash.herokuapp.com/leaderboards/1/users',
    {
      name: playerName,
      score: highScore
    }
  );
  document.getElementById('username').value = '';
  hideLeaderboard();
};
