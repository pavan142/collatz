## Why ?
When you think of a beautiful problem in math, the most important component to it is 
visualizing the problem in various ways.

I have been grappling with **Collatz Conjecture**  for a while, and have come up with some visual ways of thinking it for myself.

But on some long and tiring days, I don't want to come up with new visualizations. 
I would like to just delegate the job  of visualizing to a computer program, so I can use the rest of my energy in just observing patterns.

Till I have a functional **AI** to automate the new visualizations for me, I have to code them by myself for my tired future self.

## Ok, But what is Collatz conjecture ?
Well it is one of those problems that are extremely easy to describe, but very very difficult so solve.

Take any positive number.
  1) If it is odd: Mutiply it with 3 and add 1. i.e (3n +1)
  2) If it is even: Divide it by 2. i.e  (n/2)
  3) Repeat the above steps with the resultant number.

The conjecture states that when you do the above , you will always end up at 1.

## Dependencies
1) node.js
2) npm or yarn

## How to Use this ?
1) You can use ```yarn build``` or ```npm install``` to install dependencies
2) You can use ```yarn deploy-local``` to load the page in localhost

It should be usually hosted at ```http://localhost:8080```, or the port http-server displays when you run ```yarn deploy-local```

Use PageUp and PageDown to go forward and backward in collatz number marking<br/>
Use Spacebar to pause and play automatic forwarding
