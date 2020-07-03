// Hashlaag verwijderen
let removeHashFromData = async () => {
  let result = await someAPICallToGetAllTasks();
  let tasks = Object.keys(result).map((key) => ({
    id: key,
    description: result[key].description,
    done: result[key].done,
  }));
  // Voor elke taak de naam etc aanmaken
  tasks.forEach((task) => {
    let item = task.description;
    let taskList = document.getElementById("task-list");
    let listItem = document.createElement("li");
    let icon = document.createElement("button");
    icon.classList.add("delete-button");
    icon.id = task.id;
    listItem.innerHTML = item;
    listItem.appendChild(icon);
    taskList.appendChild(listItem);
  });
};
// Ophalen van de taken
let someAPICallToGetAllTasks = async () => {
  try {
    let apiUrl = "https://wincacademydatabase.firebaseio.com/peter/tasks.json";
    let res = await fetch(apiUrl, { method: "GET" });
    let json = await res.json();
    return json;
  } catch (err) {
    console.log(err);
  }
};
// Toevoegen van de taken
let addTask = async () => {
  try {
    let header = new Headers();
    let newTask = document.getElementById("newTask").value;
    header.append("Content-Type", "application/json");
    let raw = JSON.stringify({ description: newTask, done: false });
    let requestOptions = {
      method: "POST",
      headers: header,
      body: raw,
      redirect: "follow",
    };
    let apiUrl = "https://wincacademydatabase.firebaseio.com/peter/tasks.json";
    let res = await fetch(apiUrl, requestOptions);
    let resUrl = await res.json();
    window.location.reload();
    return resUrl;
  } catch (err) {
    console.log(err);
  }
};
// Verwijderen van de taken
// Het if statement is nodig om te kijken of de button al bestaat.
document.body.addEventListener("click", function (event) {
  if (event.srcElement.classList == "delete-button") {
    try {
      let requestOptions = {
        method: "DELETE",
        redirect: "follow",
      };
      fetch(
        `https://wincacademydatabase.firebaseio.com/peter/tasks/${event.target.id}.json`,
        requestOptions
      );
      alert("Taak verwijderd, refresh");
      (respons) => response.text();
      (result) => alert.log(result);
    } catch (err) {
      alert(err);
    }
  }
});
// Op de één of andere manier wil het niet lukken om na het verwijderen te refreshen

removeHashFromData();
