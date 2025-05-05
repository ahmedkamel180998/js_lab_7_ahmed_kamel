import { FlyingCar } from "./flyingcarmodule.js";

let myFlyCar = new FlyingCar("BMW", 2024);
console.log(myFlyCar.toString());

// 2. Fetch from API and display in a table
(async function fetchUsers() {
  let usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
  let users = await usersRes.json();

  let postsRes = await fetch("https://jsonplaceholder.typicode.com/posts");
  let posts = await postsRes.json();

  let commentsRes = await fetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  let comments = await commentsRes.json();

  // Map posts and comments by userId and postId for quick lookup
  let postsByUser = {};
  posts.forEach((post) => {
    if (!postsByUser[post.userId]) postsByUser[post.userId] = [];
    postsByUser[post.userId].push(post);
  });

  let commentsByPost = {};
  comments.forEach((comment) => {
    if (!commentsByPost[comment.postId]) commentsByPost[comment.postId] = [];
    commentsByPost[comment.postId].push(comment);
  });

  // Create table
  let table = document.createElement("table");
  table.className = "styled-table";

  // Create thead and insert columns
  let thead = document.createElement("thead");
  let headerRow = document.createElement("tr");
  ["UserName", "Email", "Company Name", "Address Geo", "Posts"].forEach(
    (col) => {
      let th = document.createElement("th");
      th.textContent = col;
      headerRow.appendChild(th);
    }
  );
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create tbody for user rows
  let tbody = document.createElement("tbody");

  users.forEach((user) => {
    let row = tbody.insertRow();
    // UserName
    row.insertCell().innerHTML = `<p class="user-name">${user.name}</p>`;
    // Email
    row.insertCell().textContent = user.email;
    // Company Name
    row.insertCell().textContent = user.company?.name || "";
    // Address Geo
    row.insertCell().innerHTML = user.address?.geo
      ? `<p class="geo">Latitude: ${user.address.geo.lat}</p>
      <p class="geo">Longitude: ${user.address.geo.lng}</p>`
      : "";

    let postsCell = row.insertCell();
    let ul = document.createElement("ul");

    if (postsByUser[user.id]) {
      postsByUser[user.id].forEach((post) => {
        let li = document.createElement("li");
        let commentCount = commentsByPost[post.id]
          ? commentsByPost[post.id].length
          : 0;
        li.innerHTML = `
        <p class="comment">${post.title}</p> 
        <span class="comment-count">${commentCount} comments</span>`;

        ul.appendChild(li);
      });
    }
    postsCell.appendChild(ul);
  });

  table.appendChild(tbody);
  document.body.appendChild(table);
})();
