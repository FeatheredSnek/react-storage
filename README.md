# reactStorage

A simple storage/warehouse management app made with React using modern frontend solutions.

## Background and purpose

With this project I wanted to learn and practice modern React with several important libraries from the ecosystem. Some time ago I built a similar solution using scripts over Google Apps so I had very good idea about which functionalities would be required

## How it's made

I've used Redux and Redux-Saga for state management, and Ant Design for a slick UI. Although it's by no means a a full-fledged analysis solution, I've added some data trend previews via Apex Charts. The Redux-Saga front communicates with a simple PHP+MySQL backend. 

## Concluding remarks

It turned out to be quite a substantial task, but I've been able to implement almost all of the functionalities I imagined beforehand. For a sort-of-production build only an additional security checkup and an authorization system would be required - which should be easy to introduce with manually handled user creation.
Among several todos are (1) custom styling, (2) refactoring saga system, as it's not at all dry atm, quite moist in fact, (3) optimization of multiple renders and memoizing selectors, (4) splitting and recomposing some of the larger components. 
Licensed MIT.
