var readlineSync = require('readline-sync');
var chalk = require('chalk');

/** --- Quiz: The Kapil Sharma Show  ----
 * Features:
 ** WELCOME: Game will first ask your name & welcome you.
 ** OPTIONS: Instead of typing out the entire answer, user only need to select from the 4 options(a, B, c or D).
 ** SCORE: Based upon your correct answers in the quiz, it will auto update your scores (1 score for each correct answer).
 ** COLORFUL UI: Greeetings, score and important alerts have customised colors other than just boring white one.
 ** HIGHEST SCORE: It willprint the top 5 highest scores & will also let you know, if you were able to beat the already highest scores of other users.
 */

// // DATABASE
const highestScores = [
  {
    name: 'Sarthak',
    score: 9,
  },
  {
    name: 'Neha',
    score: 7,
  },
  {
    name: 'Baibo',
    score: 6,
  },
  {
    name: 'Kartik',
    score: 5,
  },
  {
    name: 'Aunam',
    score: 2,
  },
];

let quiz = [
  {
    question: 'Who is the Judge of the Kapil Sharma show? ',
    options: {
      a: 'Navjot Singh Sidhu',
      b: 'Jassi gill',
      c: 'Archana Puran Singh',
      d: 'Shekhar Suman',
    },
    answer: 'c',
  },
  {
    question: 'Which Bollywood star co-produced The Kapil Sharma Show 2 ? ',
    options: {
      a: 'Shah Rukh Khan',
      b: 'Salman Khan',
      c: 'Akshay Kumar',
      d: 'Aamir Khan',
    },
    answer: 'b',
  },
  {
    question: 'Which comedian had an infamous fallout with Kapil Sharma? ',
    options: {
      a: 'Sumona Chakravarti',
      b: 'Sunil Grover',
      c: 'Chandan Prabhakar',
      d: 'Krushna Abhishek',
    },
    answer: 'b',
  },
  {
    question: "From which place 'Sapna' belongs? ",
    options: { a: 'Maharashtra', b: 'Haveli', c: 'Punjab', d: 'Nara Sopara' },
    answer: 'd',
  },
  {
    question: 'Who is the person famous of just sitting and laughing? ',
    options: { a: 'Chandu', b: 'Archana', c: 'Bacha Yadav', d: 'Sidhu' },
    answer: 'b',
  },
  {
    question: 'How many childrens does Bacha Yadav have? ',
    options: { a: '11', b: '16', c: '21', d: 'None' },
    answer: 'a',
  },
  {
    question:
      'Which of the following is not played by Kapil Sharma in his show? ',
    options: {
      a: 'Shamsher Singh',
      b: 'Mashoor Singh',
      c: 'Rajesh Aurora',
      d: 'Chappu Sharma',
    },
    answer: 'b',
  },
  {
    question:
      "Who was the first-ever celebrity guest of 'The Kapil Sharma Show' ",
    options: {
      a: 'Akshay Kumar',
      b: 'Shah Rukh Khan',
      c: 'Salman Khan',
      d: 'Hrithik Roshan',
    },
    answer: 'b',
  },
  {
    question: "When did the first episode of TKSS' first season premiere? ",
    options: {
      a: 'April 20 (2016)',
      b: 'April 24 (2016)',
      c: 'April 23 (2016)',
      d: 'April 28 (2016)',
    },
    answer: 'c',
  },
];

// GAME LOGIC
const play = (quiz, index) => {
  const { question, options, answer } = quiz;
  let str = ' ';

  for (let [key, value] of Object.entries(options)) {
    str = `${str}${key}. ${value}\n `;
  }

  let userAnswer = readlineSync.question(
    `${chalk.bold(`Q${index + 1}: ${question}\n`)}${str}`
  );

  if (userAnswer.toLowerCase() == answer.toLowerCase()) {
    console.log(
      `${chalk.bold.green(`\nYay! `)} ${chalk.bgGreen(
        options[answer]
      )}${chalk.bold.green(` is the Correct answer🎉`)}`
    );
    score++;
  } else {
    console.log(
      `${chalk.bold.red(`\nOops! `)} ${chalk.bgRed(
        options[userAnswer]
      )}${chalk.bold.red(` is a Wrong answer.`)}`
    );
    // score--;
  }
};

// CHECK HIGHEST SCORE
const checkForHighest = current => {
  let highestBeaten = false;
  let newHighestPosition = null;

  for (let i = highestScores.length - 1; i >= 0; i--) {
    if (highestScores[i].score >= current) {
      if (!highestBeaten) {
        // if even lowest score is high than current
        return null;
      }
      break;
    } else {
      highestBeaten = true;
      newHighestPosition = i + 1; // 3
    }
  }

  return newHighestPosition;
};

// // GAME
// 1. Welcome Msg ------------
const userName = readlineSync.question(chalk.bold('What is your name ? '));
console.log(
  chalk.bold.hex('#E9AB17')(
    `\nWelcome ${userName}!\n\nThis quiz is all about the comedian 'Kapil Sharma' & his famous comdey show.\nLet's Play to see how much you adore him 😉\n`
  )
);

// VARIABLES
let score = 0;

// Initiate Quiz
for (let i = 0; i < quiz.length; i++) {
  play(quiz[i], i);

  if (i != quiz.length - 1) {
    console.log(chalk.bold.cyan(`\nScore: ${score}`));
    console.log(chalk.bold.cyan('-----------------'));
  }
}
console.log(chalk.bold.hex('#E9AB17')('\n==========================='));
console.log(chalk.bold.hex('#E9AB17')(`Your Final Score:  ${score}`));
console.log(chalk.bold.hex('#E9AB17')('==========================='));

// Highest Score
console.log(chalk.bold.cyan('\nTop 5 Highest Scores'));
for (let i = 0; i < highestScores.length; i++) {
  console.log(
    chalk.cyan(`${i + 1}. ${highestScores[i].name}: ${highestScores[i].score}`)
  );
}

// // Final Message
const newHighest = checkForHighest(score);
newHighest
  ? console.log(
      chalk.hex('#E9AB17')(
        `\nCongratulations!🥳 You have just beaten up the scores of '${
          highestScores[newHighest - 1].name
        }' (Rank-${newHighest} highest scorer).\n\nIf you feel your name deserves to be up in the list as well, send me a screenshot, and I'll proudly update it.`
      )
    )
  : console.log(
      chalk.hex('#E9AB17')(
        '\nNot Bad huh! 😏\nYou can always replay to beat the highest scores. Good Luck :)'
      )
    );

/**----- EXTRA FEATURES (to be implemented)------
 * Ask the user if the LEVEL OF DIFFICULTY at the start (easy: only increment the score, difficult: will also result in reduction of the score)
 * MUTIPLE LEVELS: level 1 (answer 5 correct questions), level 2 (anser 10 correct questions)
 * Ask user to type again, if anything other than abcd typed. We can also give them an option to calculate.
 * Ask them, if they want to update their score and update their score right away in database, and print the new list.
 */

/* Quiz Questions (19)

1. What is name of his first debut film? (a)
A. Kis Kisko Pyaar Karu
B. Firangi
C. ABCD 2
D. Son of Manjeet Singh

2. Where Kapil Sharma was born? (c)
A. Pune
B. Mumbai
C. Amritsar
D. Bhubaneswar

3. What is the name of his comedy show along with Sony TV? (c)
A. Comedy Nights with Kapil
B. Comedy Circus
C. The Kapil Sharma Show
D. Family Time with Kapil

4. Before being a comedian what he wanted to be (a)
A. Singer
B. Actor
C. Dancer
D. Player

5. In which reality he was the winner first time in his career? (c)
A. The Kapil Sharma Show
B. Comedy Circus
C. The Laughter Challange
D. Comedy ka Badshah

6. What is the name of his first show along with his own production?
A. Comedy Night With Kapil (a)
B. The Kapil Sharma Show
C. Comedy Circus
D. The Laughter Challenge

7. What is name of his production house? (d)
A. Half Moon Entertainment
B. K10 Production
C. Looking Glass Studios
D. K9 Production


8. How many reality show he has won? (c)
A. 7
B. 8
C. 9
D. 10

9. What is the name of his first show where he was anchor? (a)
A. Chote Miyan
B. Kaun Banega Corepoti
C. 60th Film Fare Award
D. Koffee With Karan

10. In which year Kapil Sharma had been awarded with CNN-IBN, Indian of the Year? (d)
A. 2009
B. 2010
C. 2012
D. 2013

*/
