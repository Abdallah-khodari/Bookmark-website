var sitename = document.getElementById("sitename");
var siteurl = document.getElementById("siteurl");
var all = JSON.parse(localStorage.getItem("allwebsites")) || [];
displaysite();

function getsitedetails() {
  if (validinput() === true && validurl() === true) {
    var website = {
      name: sitename.value.trim(),
      url: encodeURIComponent(siteurl.value.trim()),
    };

    var name = all.some(function (web) {
      return web.name.toLowerCase() === website.name.toLowerCase();
    });

    if (name) {
      Swal.fire({
        title: "Error",
        text: "A website with this name already exists. Please choose a different name.",
        icon: "error",
      });
    } else {
      all.push(website);
      localStorage.setItem("allwebsites", JSON.stringify(all));
      displaysite();
      clear();
    }
  } else {
    Swal.fire({
      title: "Error",
      text: `Site Name or Url is not valid, Please follow the rules below :
      \n\nSite name must contain at least 3 characters\nSite URL must be a valid one`,
      icon: "error",
    });
  }
}

function displaysite() {
  var cartona = "";

  for (var i = 0; i < all.length; i++) {
    cartona += `<tr>
                <td>${i + 1}</td>
                <td>${all[i].name}</td>
                <td>
                 <button class="btn btn-visit" onclick="visitWebsite('${
                   all[i].url
                 }')">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
                </td>
                <td>
                  <button class="btn btn-delete" onclick="deleteWebsite(${i})">
                                    <i class="fa-solid fa-trash-can pe-1"></i>Delete
                  </button>
                </td>
            </tr>`;
  }

  if (cartona === "") {
    cartona = `<tr><td colspan="4" class="text-center">No websites to display</td></tr>`;
  }

  document.getElementById("tablebody").innerHTML = cartona;
}

function visitWebsite(url) {
  const decodedUrl = decodeURIComponent(url);
  window.open(decodedUrl, "_blank");
}

function deleteWebsite(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "This will delete the website permanently.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      all.splice(index, 1);
      localStorage.setItem("allwebsites", JSON.stringify(all));
      displaysite();
      Swal.fire("Deleted!", "The website has been removed.", "success");
    }
  });
}

function clear() {
  sitename.value = "";
  siteurl.value = "";
  sitename.classList.remove("is-valid", "is-invalid");
  siteurl.classList.remove("is-valid", "is-invalid");
}

function validinput() {
  var regex = /^.{3,}$/;
  var test = sitename.value.trim();
  if (test === "" || !regex.test(test)) {
    sitename.classList.add("is-invalid");
    sitename.classList.remove("is-valid");
    return false;
  } else {
    sitename.classList.add("is-valid");
    sitename.classList.remove("is-invalid");
    return true;
  }
}

function validurl() {
  var regex =
    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
  var test = siteurl.value.trim();
  if (test === "" || !regex.test(test)) {
    siteurl.classList.add("is-invalid");
    siteurl.classList.remove("is-valid");
    return false;
  } else {
    siteurl.classList.add("is-valid");
    siteurl.classList.remove("is-invalid");
    return true;
  }
}
