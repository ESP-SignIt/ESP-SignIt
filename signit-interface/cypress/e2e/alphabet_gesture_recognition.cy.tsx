describe('Alphabet Letter Gesture Recognition', () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const results: { letter: string; detectedLetter: string; score: string }[] = [];

  letters.forEach(letter => {
    it(`should recognize letter ${letter}`, () => {
      cy.visit('/'); // Assuming the app is running on the root URL 
      cy.get('input[type="checkbox"]').check(); // Select video input
      cy.get('.signlang_video').invoke('attr', 'src', `/video/${letter}.mp4`); // Change the video source
      cy.get('button#start-btn').click(); // Start the recognition

      // Wait for the recognition to complete
      cy.wait(5000); // Adjust the wait time as needed

      // Get the score
      cy.get('.gesture_output').invoke('text').then(detectedLetter => {
        if (detectedLetter !== letter) {
          cy.log(`Warning: Detected letter ${detectedLetter} does not match expected letter ${letter}`);
        }
        cy.get('.score').invoke('text').then(score => {
          results.push({ letter, detectedLetter, score });
        });
      });
    });
  });

  after(() => {
    // Output the results in a table format
    console.table(results);
  });
});
