# queens-attack-every-square

## Algo Question

Given an NxN chessboard, place the minimum number of queens necessary to attack every square on the board. Reminder that queens attack in straight and diagonal lines. I coded the problem in Javascript and implemented a browser view that uses the functions I wrote.

My approach was to use depth first search (DFS) and then added a few heuristics to trim the trees. This was effective for N = 1 to ~6. However, the complexity grew a lot with each increase in N. We need to check around N^2 squares for each queen we place, and at best we know that N queens would definitely do it (can be argued N-1 would also definitely do it but for time-complexity let's just say N). Therefore we really need to check (N^2)^N or N^(2N) squares.

## Pseudocode 

1. Create board as 2D array, all squares empty. Create a minimum solution variable and let it be null 
2. To do DFS I create a stack, add our first empty board to it 
3. Enter a while loop - while stack is not empty we:
  a. Take top of stack as current board 
  b. Do nested for loops to check every space 
  c. If the space is empty, it's a candidate spot for a queen 
     i. To optimize we also throw out spots that are within one space in a straight line or diagonally from another queen. This is because all queens attack the 8 squares around it.
     ii. Another optimization is to only attack spots that are not attacked by other queens, since queen attacks are reciprocal. However I am not 100% convinced this always finds the optimal solution.
  d. For each candidate spot, make a copy of the board, and put it on the stack
  e. Check if every space on the board is a queen or attacked. If so, and if it has less queens than our current minimum solution, save it as our minimum solution (or if current minimum solution is null)
4. After while loop ends return our minimum solution 
