document.getElementById("carromForm").addEventListener("submit", function(e){
  e.preventDefault();

  const formURL = "https://docs.google.com/forms/d/e/1FAIpQLSceWmR7Xxea7dr537xjFajltfze5GWYXi2x__q6bmGPjVcndg/formResponse";

  const formData = new FormData();
  formData.append("entry.823367903", document.getElementById("name").value);
  formData.append("entry.1220683438", document.getElementById("auid").value);
  formData.append("entry.1418684154", document.getElementById("dep").value);
  formData.append("entry.1913456757", document.getElementById("sem").value);
  formData.append("entry.602067814", document.getElementById("number").value);
  formData.append("entry.528041579", document.getElementById("mail").value);

  fetch(formURL, {
    method: "POST",
    mode: "no-cors",
    body: formData
  })
  .then(() => {
    alert("Registration Successful!");
    document.getElementById("carromForm").reset();
  })
  .catch(() => {
    alert("Submission failed. Try again.");
  });
});

