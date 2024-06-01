// Select all the boxes, buttons, and message elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newgameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerTurn = document.querySelector("#player-turn");
let playerOWins = document.querySelector("#player-o-wins");
let playerXWins = document.querySelector("#player-x-wins");

// Initialize variables for the game state
let turnO = true; // Player O starts
let oWins = 0; // Count of Player O wins
let xWins = 0; // Count of Player X wins

// Define winning patterns for the game
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click event listeners to each box
boxes.forEach((box) =>
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O"; // Player O's turn
            turnO = false; // Switch turn to Player X
            playerTurn.innerText = "Player X's turn"; // Update turn display
        } else {
            box.innerText = "X"; // Player X's turn
            turnO = true; // Switch turn to Player O
            playerTurn.innerText = "Player O's turn"; // Update turn display
        }
        box.disabled = true; // Disable the box after it's clicked
        checkWinner(); // Check if there's a winner
    })
);

// Function to display the winner and update the win count
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Disable all boxes after game ends
    if (winner === "O") {
        oWins++; // Increment Player O's win count
        playerOWins.innerText = `Player O Wins: ${oWins}`; // Update the display
    } else {
        xWins++; // Increment Player X's win count
        playerXWins.innerText = `Player X Wins: ${xWins}`; // Update the display
    }
};

// Function to check if there's a winner or if the game is a draw
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("winner");
                showWinner(pos1Val); // Show the winner
                return; // Stop checking after finding a winner
            }
        }
    }

    // Check for draw condition
    let draw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            draw = false; // If there's an empty box, it's not a draw
        }
    });

    if (draw) {
        msg.innerText = "It's a Draw!";
        msgContainer.classList.remove("hide");
    }
};

// Function to reset the game state
const reset = () => {
    turnO = true; // Reset to Player O's turn
    enableBoxes(); // Enable all boxes
    msgContainer.classList.add("hide"); // Hide the message container
    msg.innerText = ""; // Clear any previous messages
    playerTurn.innerText = "Player O's turn"; // Reset the turn display
};

// Function to disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Function to enable all boxes and clear their content
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Add event listeners for the reset and new game buttons
newgameBtn.addEventListener("click", reset);
resetBtn.addEventListener("click", reset);
