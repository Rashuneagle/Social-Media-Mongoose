const names = [
  'Ava', 'Liam', 'Olivia', 'Noah', 'Emma', 'Elijah', 'Charlotte', 'Lucas', 'Sophia', 'Oliver',
  'Mia', 'Ethan', 'Amelia', 'Benjamin', 'Isabella', 'William', 'Harper', 'James', 'Evelyn',
  'Alexander', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Matthew', 'Ella', 'Jackson',
  'Avery', 'David', 'Sofia', 'Joseph', 'Scarlett', 'Logan', 'Madison', 'Samuel', 'Grace', 'Gabriel',
  'Lily', 'Henry', 'Chloe', 'Jacob', 'Aria', 'Jackson', 'Natalie', 'Luke', 'Harper', 'Dylan', 'Zoey',
  'Isaac', 'Layla'
];

const thoughtContent = [
  'I love spending time with my family.', 'Learning something new every day is exciting.', 'Helping others brings me joy.',
  'Spending time in nature rejuvenates my soul.', 'Music has the power to uplift my spirits.', 'Kindness is contagious.',
  'Setting and achieving goals empowers me.', 'Laughter is the best medicine.', 'Gratitude transforms my outlook on life.',
  'Embracing change leads to growth.', 'Challenges make me stronger.', 'Finding beauty in small things brings me happiness.',
  'Being present in the moment enhances my life.', 'Expressing creativity fuels my soul.', 'Positive affirmations shape my reality.',
  'Forgiveness sets me free.', 'Mindfulness brings peace to my mind.', 'Connecting with others fills my heart with joy.',
  'Learning from mistakes helps me grow.', 'Taking risks leads to new opportunities.'
];

const possibleReactions = [
  'Like', 'Love', 'Wow', 'Haha', 'Sad', 'Angry', 'Thankful', 'Inspiring', 'Thoughtful', 'Supportive',
  'Encouraging', 'Motivating', 'Funny', 'Touching', 'Heartwarming', 'Intriguing', 'Interesting', 'Cool',
  'Awesome', 'Impressive'
];

const users = [];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Generate random email address
const generateRandomEmail = (firstName, lastName) => {
  const randomNumber = Math.floor(Math.random() * 1000);
  const domain = 'example.com'; 
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNumber}@${domain}`;
};

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Generate random thoughts
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
      results.push({
          thoughtText: getRandomArrItem(thoughtContent),
          username: getRandomName(),
          createdAt: new Date(),
          reactions: [...getThoughtReactions(3)],
      });
  }
  return results;
};

// Create the reactions that will be added to each thought
const getThoughtReactions = (numReactionsPerThought) => {
  const results = [];
  for (let i = 0; i < numReactionsPerThought; i++) {
      results.push({
          reactionBody: getRandomArrItem(possibleReactions),
          username: getRandomName(),
          createdAt: new Date(),
      });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomName, getRandomThoughts, generateRandomEmail };
