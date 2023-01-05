const searchHandler = (element) => {
  value = $(element).val().toLowerCase();

  $("#urlTable tr").filter(function () {
    $(this).toggle($(this).text().toLowerCase().includes(value));
  });
};

const clearSearchHandler = () => {
  value = $("#search").val("");

  $("#urlTable tr").filter(function () {
    $(this).toggle(!$(this).text().toLowerCase().includes(value));
  });
};

const copyHandler = (element) => {
  const baseUrl = $(element).attr("url");
  let shorturl = baseUrl + "/" + $(element).attr("data");

  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(shorturl).select();
  document.execCommand("copy");
  $temp.remove();

  $(".alert").fadeIn(500, () => {
    $(".alert").fadeOut();
  });
};

const deleteHandler = (element) => {
  const id = $(element).attr("data");
  const baseUrl = $(element).attr("url");

  var request = {
    url: `${baseUrl}/api/urls/${id}`,
    method: "DELETE",
  };

  if (confirm("Delete url record?")) {
    $.ajax(request).done(function (response) {
      alert("Data Deleted Successfully!");
      location.reload();
    });
  }
};
