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
    workExperience: 'Tell me about your work experience',
    resume: 'Where can I see your resume?',
    linkedIn: 'What\'s the link to your LinkedIn profile?'
  }
}
