// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD39KiMGczYA4w1rziULOeCVV5Dx7_L9rQ",
  authDomain: "chatapp-be65e.firebaseapp.com",
  databaseURL: "https://chatapp-be65e-default-rtdb.firebaseio.com",
  projectId: "chatapp-be65e",
  storageBucket: "chatapp-be65e.firebasestorage.app",
  messagingSenderId: "937577350231",
  appId: "1:937577350231:web:fbfaa6d68a5b34a3498f12",
  measurementId: "G-8TWX22KSHW"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Database
  const db = firebase.database();
  
  // Prompt for username
  const username = prompt("Please Tell Us Your Name");
  
  // Send message function
  function sendMessage(e) {
    e.preventDefault();
  
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // Clear the input box
    messageInput.value = "";
  
    // Auto-scroll to bottom of messages
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // Send message data to Firebase
    db.ref("messages/" + timestamp).set({
      username: username,
      message: message,
      timestamp: timestamp,
    });
  }
  
  // Listen for form submission
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // Fetch chat messages
  const fetchChat = db.ref("messages/");
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    document.getElementById("messages").innerHTML += message;
  });
  