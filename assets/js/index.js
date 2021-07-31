$("#update").submit(function (event) {
  alert("Data Updated Successfully!");
});

if (window.location.pathname == "/") {
  $ondelete = $(".table tbody td a.delete");
  $ondelete.click(function () {
    var id = $(this).attr("data-id");

    var request = {
      // url: `http://localhost:5000/api/urls/${id}`,
      url: `https://${baseUrl}/api/urls/${id}`,
      method: "DELETE",
    };

    if (confirm("Delete url record?")) {
      $.ajax(request).done(function (response) {
        alert("Data Deleted Successfully!");
        location.reload();
      });
    }
  });
}
