
describe('Alphabet Letter Gesture Recognition', () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXY'.split('');
  const results: { letter: string; detectedLetter: string; score: string }[] = [];

    it(`should init website`, () => {
      cy.visit('/'); // Assuming the app is running on the root URL
      cy.get('.switch').click() // Select video input

      cy.get('button#start-btn').click(); // Start the recognition

      cy.wait(3000);
    })
  letters.forEach(letter => {
    it(`should recognize letter ${letter}`, () => {
      cy.visit('/'); // Assuming the app is running on the root URL 
      cy.get('.switch').click() // Select video input
      cy.get('.signlang_video').invoke('attr', 'srcObject', null)
      cy.get('.signlang_video').invoke('attr', 'src', `/video/${letter}.mp4`).then((video)=>{

        console.log(video)
        cy.wait(3000); // Adjust the wait time as needed
        // Wait for the video to start playing
        // Adjust the wait time as needed
        cy.get('button#start-btn').click(); // Start the recognition
  
        // Wait for the recognition to complete
        cy.wait(3000); // Adjust the wait time as needed
  
        // Get the score
        cy.get('.gesture_output').invoke('text').then(detectedLetter => {
          
          
          cy.get('.score').invoke('text').then(score => {
            console.log({ letter, detectedLetter, score })
            // results.push({ letter, detectedLetter, score });
            results.push({ letter, detectedLetter, score });
            letter = letter.replace(/^.../, '');
            detectedLetter = detectedLetter.replace(/^.../, '');
            detectedLetter = detectedLetter.length > 1 ? detectedLetter.slice(0, 1) : detectedLetter;
            expect(letter).to.eq(detectedLetter)
          });
        });
      })  // Change the video source
      
    });
  }); 
    
    it('should export tests results', ()=>{
      const date = new Date().getTime()
          // Output the results in a table format
      cy.writeFile('cypress/reports/results-'+date+'.json',{results : results});
    })

 
});
