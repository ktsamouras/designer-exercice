# designer-exercice

## Installation and launch
First clone the project:
```bash
git clone https://github.com/ktsamouras/designer-exercice.git
cd designer-exercice
```

Then install the dependencies:
```bash
npm i
```

And launch the application:
```bash
npm start
```

## Additional notes
Additionally to the notes inside of the code, I would like to add:
- I will use the BEM methodology to organize any additional custom styles for the exercice.
- Most of the time, I will use helper classes provided from Bootstrap. You will also find some of my own.
- I only imported what I needed from Bootstrap for performance purposes.
- I am using autoprefixer (along with other things) in gulp to take care of all the web browser prefixes.
- Concerning the calendar/scheduler, I took the opportunity to learn about the CSS grid layout to build it (I generally use flexbox). Also, I don't usually use inline styles, but I made an exception for the placement of the events on the timeline (the way I did it, I didn't think it made sense to use a multitude of classes to place them).
- For the icons, I used an external library called Font Awesome.
- There is definitively room for improvement (accessibility, usability, (SEO), performance, ...).

## Comments on the design

### What do you find good/bad about this screen ?
#### The good
- I really like the horizontal display of the tasks and the monthly view gives you a great overview of them.
- The fact that the gray tasks line show the total of them.
- The navbar is good on a visual level.

#### The bad
- The copywriting
- The search component with it's zoom out icon and it's filters.
- The today, yesterday (arrow left) and tommorow (arrow right) buttons I believe aren't clear enough for the user on what they should do since there is a monthly/weekly view display (is there a daily view?)

### What would you improve on it ?
- I would improve the search component on a visual/interaction level.
- Concerning the today button, I would probably change it to the month name (here "February") in case it is the monthly view, and maybe the week number ("week 6" for example) for the weekly view. And keep it like that for a potential daily view.
- I would review some part of the typography size/weight, to emphasize even more to the user on what he should focus first.
- Maybe add a legend with the colors representation for the calendar/scheduler.
- On an interaction level, I would definitively add signifiers like tooltips to help the user understand better the UI. I would also make it easier to interact with buttons like "Primary" or the buttons in the navbar and allow him to click on the whole rectangle and letting him know with signifiers like the pointer cursor and/or a light grey background when he is hovering.

### What would you change about it ?
- I wouldn't do any radical changes here, mostly improvements I suggested above. I would probably review the user action part on top of the calender/scheduler with the buttons and search component and see if I can somehow improve the user experience by sketching some wireframes and do some user flows to try to put myself as a potential user to improve it's use of the product.
