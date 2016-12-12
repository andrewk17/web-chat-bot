'use strict';

module.exports = {
  // The order of questions
  order: [
    'name',
    'address',
    'education',
    'workExperience',
    'resume',
    'linkedIn'
  ],
  // The set of questions the bot asks
  questions: {
    name: 'What\'s your name?',
    address: 'What\'s your address?',
    education: 'Tell me about your education.',
    workExperience: 'Tell me about your work experience.',
    resume: 'Where can I see your resume?',
    linkedIn: 'What\'s the link to your LinkedIn profile?'
  },
  commands: {
    // the commands that map to a field on User document
    'Show my name': 'name',
    'Show my address': 'address',
    'Show my education': 'education',
    'Show my work experience': 'workExperience',
    'Show my resume': 'resume',
    'Show my LinkedIn': 'linkedIn',
  },
  // help statement
  printHelp:
  `List of available commands:
  Start over - starts the onboarding process all over
  Show my name - shows your name
  Show my work experience - shows your experience
  Show my address - shows your address
  Show my education - shows your education
  Show my resume - shows your resume
  Show my LinkedIn - shows your LinkedIn`,
};
