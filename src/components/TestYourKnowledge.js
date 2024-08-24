import React, { useState } from 'react';
import './TestYourKnowledge.css'; // Ensure you add specific styling here
import Quiz from './Quiz'; // Import Quiz component

const categories = {
  'General Knowledge': ['GK Social', 'GK Geography'],
  'Web DevelopMent': ['React', 'JavaScript', 'NodeJS'],
  'Languages': ['Java', 'C++'],
  'Entertainment': ['Movies', 'Music', 'Books']
};

const TestYourKnowledge = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubCategory(''); // Reset subcategory when category changes
  };

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const handleStartQuiz = () => {
    if (selectedSubCategory) {
      setQuizStarted(true);
    }
  };

  return (
    <div className="test-knowledge-container">
      {quizStarted ? (
        <Quiz category={selectedSubCategory} onQuizEnd={() => setQuizStarted(false)} />
      ) : (
        <div className="selection-container">
          <h2>Test Your Knowledge</h2>
          <div className="category-select">
            <label htmlFor="category">Select a Category:</label>
            <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
              <option value="" disabled>Select Category</option>
              {Object.keys(categories).map(section => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
          {selectedCategory && (
            <div className="subcategory-select">
              <label htmlFor="subcategory">Select a Subcategory:</label>
              <select id="subcategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
                <option value="" disabled>Select Subcategory</option>
                {categories[selectedCategory].map(subCat => (
                  <option key={subCat} value={subCat}>
                    {subCat}
                  </option>
                ))}
              </select>
            </div>
          )}
          <button onClick={handleStartQuiz} disabled={!selectedSubCategory}>
            Start Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default TestYourKnowledge;
