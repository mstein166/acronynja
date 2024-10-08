import React, { useState, useEffect } from 'react';
import { Input } from "./components/ui/input"
import { Button } from "./components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import Confetti from 'react-confetti'
import { Clover } from 'lucide-react'
//


const AcronymGuesser = () => {
  const [acronym, setAcronym] = useState('');
  const [answer, setAnswer] = useState([]);
  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [feedback, setFeedback] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');
  const [showAnswerButton, setShowAnswerButton] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameStarted, setGameStarted] = useState(false); 

  const easyAcronyms = [
    { acronym: 'NASA', words: ['National', 'Aeronautics', 'and', 'Space', 'Administration'] },
    { acronym: 'WHO', words: ['World', 'Health', 'Organization'] },
    { acronym: 'ASAP', words: ['As', 'Soon', 'As', 'Possible'] },
    { acronym: 'SCUBA', words: ['Self', 'Contained', 'Underwater', 'Breathing', 'Apparatus'] },
    { acronym: 'RADAR', words: ['Radio', 'Detection', 'And', 'Ranging'] },
    { acronym: 'UNICEF', words: ['United', 'Nations', 'International', 'Children\'s', 'Emergency', 'Fund'] },
    { acronym: 'POTUS', words: ['President', 'Of', 'The', 'United', 'States'] },
    { acronym: 'SCOTUS', words: ['Supreme', 'Court', 'Of', 'The', 'United', 'States'] },
    { acronym: 'STEM', words: ['Science', 'Technology', 'Engineering', 'Mathematics'] },
    { acronym: 'SWOT', words: ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'] },
    { acronym: 'CAPTCHA', words: ['Completely', 'Automated', 'Public', 'Turing', 'test', 'to', 'tell', 'Computers', 'and', 'Humans', 'Apart'] },
    { acronym: 'BASIC', words: ['Beginner\'s', 'All-purpose', 'Symbolic', 'Instruction', 'Code'] },
    { acronym: 'IMF', words: ['International', 'Monetary', 'Fund'] },
    { acronym: 'WHO', words: ['World', 'Health', 'Organization'] },
    { acronym: 'NATO', words: ['North', 'Atlantic', 'Treaty', 'Organization'] },
    { acronym: 'OCD', words: ['Obsessive', 'Compulsive', 'Disorder'] },
    { acronym: 'NIMBY', words: ['Not', 'In', 'My', 'Back', 'Yard'] },
    { acronym: 'YOLO', words: ['You', 'Only', 'Live', 'Once'] },
    { acronym: 'FOMO', words: ['Fear', 'Of', 'Missing', 'Out'] },
    { acronym: 'FAQ', words: ['Frequently', 'Asked', 'Questions'] },
    { acronym: 'GDP', words: ['Gross', 'Domestic', 'Product'] },
    { acronym: 'BYOB', words: ['Bring', 'Your', 'Own', 'Bottle'] },
    { acronym: 'PTSD', words: ['Post', 'Traumatic', 'Stress', 'Disorder'] },
    { acronym: 'ADHD', words: ['Attention', 'Deficit', 'Hyperactivity', 'Disorder'] },
    { acronym: 'DIY', words: ['Do', 'It', 'Yourself'] }
  ]; 

  const mediumAcronyms = [
    { acronym: 'JPEG', words: ['Joint', 'Photographic', 'Experts', 'Group'] },
    { acronym: 'SMART', words: ['Specific', 'Measurable', 'Achievable', 'Relevant', 'Time-bound'] },
    { acronym: 'OPEC', words: ['Organization', 'of', 'Petroleum', 'Exporting', 'Countries'] },
    { acronym: 'AWOL', words: ['Absent', 'Without', 'Official', 'Leave'] },
    { acronym: 'RSVP', words: ['Répondez', 'S\'il', 'Vous', 'Plaît'] },
    { acronym: 'HVAC', words: ['Heating', 'Ventilation', 'and', 'Air', 'Conditioning'] },
    { acronym: 'WYSIWYG', words: ['What', 'You', 'See', 'Is', 'What', 'You', 'Get'] },
    { acronym: 'BRIC', words: ['Brazil', 'Russia', 'India', 'China'] },
    { acronym: 'LIFO', words: ['Last', 'In', 'First', 'Out'] },
    { acronym: 'API', words: ['Application', 'Programming', 'Interface'] },
    { acronym: 'GUI', words: ['Graphical', 'User', 'Interface'] },
    { acronym: 'SEO', words: ['Search', 'Engine', 'Optimization'] },
    { acronym: 'PIN', words: ['Personal', 'Identification', 'Number'] },
    { acronym: 'CRM', words: ['Customer', 'Relationship', 'Management'] },
    { acronym: 'CMS', words: ['Content', 'Management', 'System'] },
    { acronym: 'PDF', words: ['Portable', 'Document', 'Format'] },
    { acronym: 'DNA', words: ['Deoxyribonucleic', 'Acid'] },
    { acronym: 'RNA', words: ['Ribonucleic', 'Acid'] },
    { acronym: 'FIFO', words: ['First', 'In', 'First', 'Out'] },
    { acronym: 'LED', words: ['Light', 'Emitting', 'Diode'] },
    { acronym: 'RAM', words: ['Random', 'Access', 'Memory'] },
    { acronym: 'DNS', words: ['Domain', 'Name', 'System'] }
  ]; 

  const hardAcronyms = [
    { acronym: 'SONAR', words: ['Sound', 'Navigation', 'And', 'Ranging'] },
    { acronym: 'LASER', words: ['Light', 'Amplification', 'by', 'Stimulated', 'Emission', 'of', 'Radiation'] },
    { acronym: 'USB', words: ['Universal', 'Serial', 'Bus'] },
    { acronym: 'BIOS', words: ['Basic', 'Input/Output', 'System'] },
    { acronym: 'COBOL', words: ['Common', 'Business', 'Oriented', 'Language'] },
    { acronym: 'FORTRAN', words: ['Formula', 'Translation'] },
    { acronym: 'UNESCO', words: ['United', 'Nations', 'Educational', 'Scientific', 'and', 'Cultural', 'Organization'] },
    { acronym: 'IAEA', words: ['International', 'Atomic', 'Energy', 'Agency'] },
    { acronym: 'OPEC', words: ['Organization', 'of', 'the', 'Petroleum', 'Exporting', 'Countries'] },
    { acronym: 'NAFTA', words: ['North', 'American', 'Free', 'Trade', 'Agreement'] },
    { acronym: 'PETA', words: ['People', 'for', 'the', 'Ethical', 'Treatment', 'of', 'Animals'] },
    { acronym: 'MADD', words: ['Mothers', 'Against', 'Drunk', 'Driving'] },
    { acronym: 'DARE', words: ['Drug', 'Abuse', 'Resistance', 'Education'] },
    { acronym: 'SWIFT', words: ['Society', 'for', 'Worldwide', 'Interbank', 'Financial', 'Telecommunication'] },
    { acronym: 'AMBER', words: ['America\'s', 'Missing:', 'Broadcast', 'Emergency', 'Response'] },
    { acronym: 'PATRIOT', words: ['Providing', 'Appropriate', 'Tools', 'Required', 'to', 'Intercept', 'and', 'Obstruct', 'Terrorism'] },
    { acronym: 'CARE', words: ['Cooperative', 'for', 'Assistance', 'and', 'Relief', 'Everywhere'] },
    { acronym: 'ECOWAS', words: ['Economic', 'Community', 'of', 'West', 'African', 'States'] },
    { acronym: 'ASEAN', words: ['Association', 'of', 'Southeast', 'Asian', 'Nations'] },
    { acronym: 'MERCOSUR', words: ['Mercado', 'Común', 'del', 'Sur'] },
    { acronym: 'SAARC', words: ['South', 'Asian', 'Association', 'for', 'Regional', 'Cooperation'] },
    { acronym: 'APEC', words: ['Asia-Pacific', 'Economic', 'Cooperation'] },
    { acronym: 'BENELUX', words: ['Belgium', 'Netherlands', 'Luxembourg'] },
    { acronym: 'INTERPOL', words: ['International', 'Criminal', 'Police', 'Organization'] },
    { acronym: 'EUROPOL', words: ['European', 'Union', 'Agency', 'for', 'Law', 'Enforcement', 'Cooperation'] },
    { acronym: 'CERN', words: ['Conseil', 'Européen', 'pour', 'la', 'Recherche', 'Nucléaire'] },
    { acronym: 'ESA', words: ['European', 'Space', 'Agency'] },
    { acronym: 'JAXA', words: ['Japan', 'Aerospace', 'Exploration', 'Agency'] },
    { acronym: 'ISRO', words: ['Indian', 'Space', 'Research', 'Organisation'] },
    { acronym: 'MOSSAD', words: ['HaMossad', 'leModiʿin', 'uleTafkidim', 'Meyuḥadim'] },
    { acronym: 'GCHQ', words: ['Government', 'Communications', 'Headquarters'] },
    { acronym: 'DARPA', words: ['Defense', 'Advanced', 'Research', 'Projects', 'Agency'] },
    { acronym: 'ARPANET', words: ['Advanced', 'Research', 'Projects', 'Agency', 'Network'] },
    { acronym: 'ENIAC', words: ['Electronic', 'Numerical', 'Integrator', 'and', 'Computer'] },
    { acronym: 'ASCII', words: ['American', 'Standard', 'Code', 'for', 'Information', 'Interchange'] },
    { acronym: 'MIDI', words: ['Musical', 'Instrument', 'Digital', 'Interface'] },
    { acronym: 'SCSI', words: ['Small', 'Computer', 'System', 'Interface'] },
    { acronym: 'RAID', words: ['Redundant', 'Array', 'of', 'Independent', 'Disks'] },
    { acronym: 'VPN', words: ['Virtual', 'Private', 'Network'] },
    { acronym: 'HTTP', words: ['Hypertext', 'Transfer', 'Protocol'] },
    { acronym: 'HTML', words: ['Hypertext', 'Markup', 'Language'] },
    { acronym: 'CSS', words: ['Cascading', 'Style', 'Sheets'] },
    { acronym: 'PHP', words: ['PHP:', 'Hypertext', 'Preprocessor'] },
    { acronym: 'SQL', words: ['Structured', 'Query', 'Language'] },
    { acronym: 'AJAX', words: ['Asynchronous', 'JavaScript', 'and', 'XML'] },
    { acronym: 'JSON', words: ['JavaScript', 'Object', 'Notation'] },
    { acronym: 'REST', words: ['Representational', 'State', 'Transfer'] },
    { acronym: 'SOAP', words: ['Simple', 'Object', 'Access', 'Protocol'] },
    { acronym: 'XML', words: ['eXtensible', 'Markup', 'Language'] },
    { acronym: 'VOIP', words: ['Voice', 'Over', 'Internet', 'Protocol'] },
    { acronym: 'ERP', words: ['Enterprise', 'Resource', 'Planning'] },
    { acronym: 'EDI', words: ['Electronic', 'Data', 'Interchange'] },
    { acronym: 'OCR', words: ['Optical', 'Character', 'Recognition'] },
    { acronym: 'IDE', words: ['Integrated', 'Development', 'Environment'] },
    { acronym: 'SDK', words: ['Software', 'Development', 'Kit'] },
    { acronym: 'BLOB', words: ['Binary', 'Large', 'Object'] },
    { acronym: 'CRUD', words: ['Create', 'Read', 'Update', 'Delete'] },
    { acronym: 'DRY', words: ['Don\'t', 'Repeat', 'Yourself'] },
    { acronym: 'KISS', words: ['Keep', 'It', 'Simple', 'Stupid'] },
    { acronym: 'SOLID', words: ['Single', 'Open-Closed', 'Liskov', 'Interface', 'Dependency'] },
    { acronym: 'ACID', words: ['Atomicity', 'Consistency', 'Isolation', 'Durability'] },
    { acronym: 'CAP', words: ['Consistency', 'Availability', 'Partition', 'Tolerance'] }
    // ... (the rest of the acronyms remain the same as in the previous version)
  ];

  const getAcronyms = () => {
    switch (difficulty) {
      case 'easy':
        return easyAcronyms;
      case 'hard':
        return hardAcronyms;
      default:
        return mediumAcronyms;
    }
  };
  // useEffect(() => {
  //   newGame();
  // }, []);

  const newGame = () => {
    const acronyms = getAcronyms(); 
    const randomAcronym = acronyms[Math.floor(Math.random() * acronyms.length)];
    setAcronym(randomAcronym.acronym);
    setAnswer(randomAcronym.words);
    setGuesses([]);
    setFeedback([]);
    setGameOver(false);
    setMessage('');
    setShowAnswerButton(false);
    setShowConfetti(false); 
    setGameStarted(true); 
  };

useEffect(() => {
    newGame();
  }, [difficulty]);

  const handleGuess = () => {
    if (guesses.length >= 5 || gameOver) return;

    const guessWords = currentGuess.split(' ');
    const guessesLeft = 5 - (guesses.length + 1);
    setMessage(
      <span className={`font-bold ${guessesLeft === 1 ? 'text-red-500' : ''}`}>
        You have {guessesLeft} {guessesLeft === 1 ? 'guess' : 'guesses'} left!
      </span>
    );
    const newFeedback = guessWords.map((word, index) => {
      if (word.toLowerCase() === answer[index]?.toLowerCase()) {
        return 'correct';
      } else if (answer.some(answerWord => answerWord.toLowerCase() === word.toLowerCase())) {
        return 'wrong-position';
      } else {
        return 'incorrect';
      }
    });

    setGuesses([...guesses, currentGuess]);
    setFeedback([...feedback, newFeedback]);
    setCurrentGuess('');

    if (!showAnswerButton) {
      setShowAnswerButton(true);
    }

    // Check if all words are correct and the number of guessed words matches the answer
    if (newFeedback.every(fb => fb === 'correct') && guessWords.length === answer.length) {
      setGameOver(true);
      setMessage('Congratulations! You guessed the acronym correctly!');
      setShowConfetti(true);
    } else if (guesses.length === 4) {
      setGameOver(true);
      setMessage(`Game over! The correct answer was: ${answer.join(' ')}`);
    }
  };

  const handleShowAnswer = () => {
    setGameOver(true); // End the game
    setMessage(`Game over! The correct answer was: ${answer.join(' ')}`); // Show the correct answer
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      {showConfetti && <Confetti />}
      <h1 className="text-2xl font-bold mb-4">🥷 Acronynja 🥷</h1>
      <p className="font-semibold mb-2">Think you know you know your acronyms?</p>
      <p className="font-semibold mb-4">You have <span className="text-red-500">5</span> guesses total to show it. Good luck!</p>

      <div className="mb-4">
        <p className="mb-2">Select difficulty:</p>
        <div className="flex space-x-2">
          <Button 
            onClick={() => handleDifficultyChange('easy')}
            className={difficulty === 'easy' ? 'bg-green-400' : 'bg-gray-100'}
          >
            Easy
          </Button>
          <Button 
            onClick={() => handleDifficultyChange('medium')}
            className={difficulty === 'medium' ? 'bg-cyan-500' : 'bg-gray-100'}
          >
            Medium
          </Button>
          <Button 
            onClick={() => handleDifficultyChange('hard')}
            className={difficulty === 'hard' ? 'bg-red-500' : 'bg-gray-100'}
          >
            Hard
          </Button>
        </div>
      </div>
      <p className="mb-2">Guess the meaning of: <strong>{acronym}</strong></p>
      
      
      {guesses.map((guess, index) => (
        <div key={index} className="mb-2">
          <p className="font-bold">Guess {index + 1}:</p>
          <p>
            {guess.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className={
                feedback[index][wordIndex] === 'correct' ? 'text-green-500 font-bold' :
                feedback[index][wordIndex] === 'wrong-position' ? 'text-yellow-500 font-bold' :
                ''
              }>
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      ))}

      {!gameOver && (
        <div className="relative flex space-x-4 mb-4 min-w-[150px]">
          <Input
            type="text"
            value={currentGuess}
            onChange={(e) => setCurrentGuess(e.target.value)}
            placeholder={`Enter guess ${guesses.length + 1} of 5`}
            className="mb-2 w-full min-w-[200px]"
          />
          <Button onClick={handleGuess} disabled={!currentGuess} className="relative flex px-6 min-w-[150px]">
            <span className="absolute top-0 right-0 mt-1 mr-1 flex h-3 w-3">  
            </span>
            Submit Guess
          </Button>
        
  {showAnswerButton && !gameOver && (
    <Button className="relative flex items-center justify-center px-6 min-w-[200px] whitespace-nowrap" onClick={handleShowAnswer}>
      <span className="absolute top-0 right-0 mt-1 mr-1 flex h-3 w-3">
      </span>
      Show me the answer!
    </Button>
    )}
  </div>
    )}

      {message && (
        <Alert className="mb-4">
          <AlertTitle>Game Result</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}

{gameStarted && gameOver && (
      <Button onClick={newGame}>New Game</Button>
)}
    </div>
  );
};

export default AcronymGuesser;